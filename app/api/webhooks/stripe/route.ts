import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  isWebhookEventProcessed,
  recordWebhookEvent,
  getOrderById,
  getOrderBySessionId,
  markOrderPaid,
  updateOrderRefund,
  updateOrderEmailDelivery,
} from "@/lib/orders";
import { sendOrderConfirmationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET environment variable.");
    return NextResponse.json(
      { error: "Webhook secret is not configured on the server." },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  let rawBody: string;

  try {
    rawBody = await req.text();
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn("Stripe webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  // Idempotency check: Have we processed this event already?
  const alreadyProcessed = await isWebhookEventProcessed(event.id);
  if (alreadyProcessed) {
    return NextResponse.json({ received: true, status: "duplicate_ignored" });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode !== "payment") {
          await recordWebhookEvent({
            id: event.id,
            eventType: event.type,
            apiVersion: event.api_version,
            payload: event.data.object as unknown as Record<string, unknown>,
            status: "ignored",
          });
          break;
        }

        // Only transition to paid if payment is actually received
        if (session.payment_status === "paid") {
          const orderId =
            session.metadata?.orderId || (session.client_reference_id as string);
          let order = orderId ? await getOrderById(orderId) : null;

          if (!order && session.id) {
            order = await getOrderBySessionId(session.id);
          }

          if (!order) {
            console.error(
              `Webhook Error: No order found for session ${session.id} / metadata orderId ${orderId}`
            );
            await recordWebhookEvent({
              id: event.id,
              eventType: event.type,
              apiVersion: event.api_version,
              payload: event.data.object as unknown as Record<string, unknown>,
              status: "failed",
              error: `Order not found for session ${session.id}`,
            });
            // Return 200 so Stripe does not endlessly retry unlinked session, or 400 if unexpected
            return NextResponse.json({
              received: true,
              warning: "Order not found",
            });
          }

          // Invariant checks
          const amountTotal = session.amount_total ?? 0;
          const currency = (session.currency || "").toLowerCase();

          if (
            amountTotal !== order.expected_amount ||
            currency !== order.currency.toLowerCase()
          ) {
            const mismatchError = `Business invariant mismatch: Expected ${order.expected_amount} ${order.currency}, got ${amountTotal} ${currency}`;
            console.error(`Webhook Security Warning: ${mismatchError}`);
            await recordWebhookEvent({
              id: event.id,
              eventType: event.type,
              apiVersion: event.api_version,
              payload: event.data.object as unknown as Record<string, unknown>,
              status: "failed",
              error: mismatchError,
            });
            return NextResponse.json(
              { error: mismatchError },
              { status: 400 }
            );
          }

          // If already marked paid (e.g. from prior race or webhook retry), ensure email delivery check
          let updatedOrder = order;
          if (order.order_status !== "paid") {
            const buyerName =
              session.customer_details?.name ||
              (session.metadata?.buyerName as string) ||
              order.buyer_name;
            const buyerEmail =
              session.customer_details?.email ||
              (session.metadata?.buyerEmail as string) ||
              order.buyer_email;
            const paymentIntentId =
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id || null;
            const customerId =
              typeof session.customer === "string"
                ? session.customer
                : session.customer?.id || null;

            updatedOrder = await markOrderPaid({
              orderId: order.id,
              buyerName,
              buyerEmail,
              paidAmount: amountTotal,
              stripePaymentIntentId: paymentIntentId,
              stripeCustomerId: customerId,
            });
          }

          // Dispatch confirmation email if not already sent
          if (updatedOrder.email_delivery_status !== "sent") {
            const emailResult = await sendOrderConfirmationEmail(updatedOrder);
            await updateOrderEmailDelivery({
              orderId: updatedOrder.id,
              status: emailResult.success ? "sent" : "failed",
              attempts: (updatedOrder.email_attempts || 0) + 1,
              lastError: emailResult.error || null,
            });
          }

          await recordWebhookEvent({
            id: event.id,
            eventType: event.type,
            apiVersion: event.api_version,
            payload: event.data.object as unknown as Record<string, unknown>,
            status: "processed",
          });
        } else {
          // Asynchronous payment method pending
          await recordWebhookEvent({
            id: event.id,
            eventType: event.type,
            apiVersion: event.api_version,
            payload: event.data.object as unknown as Record<string, unknown>,
            status: "processed",
          });
        }
        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId =
          session.metadata?.orderId || (session.client_reference_id as string);
        if (orderId) {
          const order = await getOrderById(orderId);
          if (order && order.order_status === "pending") {
            // Note failure in metadata/status
            await recordWebhookEvent({
              id: event.id,
              eventType: event.type,
              apiVersion: event.api_version,
              payload: event.data.object as unknown as Record<string, unknown>,
              status: "processed",
            });
          }
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId =
          typeof charge.payment_intent === "string"
            ? charge.payment_intent
            : charge.payment_intent?.id;

        if (paymentIntentId) {
          const isFull =
            charge.amount_refunded >= (charge.amount ?? 0) &&
            charge.amount > 0;
          await updateOrderRefund({
            stripePaymentIntentId: paymentIntentId,
            refundedAmount: charge.amount_refunded,
            isFullRefund: isFull,
          });
        }

        await recordWebhookEvent({
          id: event.id,
          eventType: event.type,
          apiVersion: event.api_version,
          payload: event.data.object as unknown as Record<string, unknown>,
          status: "processed",
        });
        break;
      }

      case "charge.dispute.created":
      case "charge.dispute.closed": {
        const dispute = event.data.object as Stripe.Dispute;
        console.warn(
          `Dispute alert [${event.type}] for charge ${dispute.charge}: status ${dispute.status}, reason ${dispute.reason}`
        );

        await recordWebhookEvent({
          id: event.id,
          eventType: event.type,
          apiVersion: event.api_version,
          payload: event.data.object as unknown as Record<string, unknown>,
          status: "processed",
        });
        break;
      }

      default: {
        // Record all other verified Stripe events as ignored/audited
        await recordWebhookEvent({
          id: event.id,
          eventType: event.type,
          apiVersion: event.api_version,
          payload: event.data.object as unknown as Record<string, unknown>,
          status: "ignored",
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error("Error processing Stripe webhook:", err);
    // Return 500 so Stripe will retry transient database / network failures
    return NextResponse.json(
      { error: "Internal webhook processing error" },
      { status: 500 }
    );
  }
}
