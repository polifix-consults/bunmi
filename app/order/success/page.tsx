import { CheckCircle2, Clock, BookOpen, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getOrderBySessionId,
  getOrderById,
  markOrderPaid,
  updateOrderEmailDelivery,
} from "@/lib/orders";
import { getEventConfig } from "@/lib/config/event";
import { formatCurrency, sendOrderConfirmationEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";
import { getBookEditionLabel } from "@/lib/book";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;
  const config = getEventConfig();

  let order = null;
  if (session_id) {
    try {
      order = await getOrderBySessionId(session_id);

      // Verify & fulfill directly via Stripe if webhook hasn't processed yet
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (!order && session.metadata?.orderId) {
        order = await getOrderById(session.metadata.orderId);
      }

      if (order && session.payment_status === "paid") {
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

          order = await markOrderPaid({
            orderId: order.id,
            buyerName,
            buyerEmail,
            paidAmount: session.amount_total ?? order.expected_amount,
            stripePaymentIntentId: paymentIntentId,
            stripeCustomerId: customerId,
          });
        }

        // Send confirmation email if not yet sent
        if (order.email_delivery_status !== "sent") {
          const emailRes = await sendOrderConfirmationEmail(order);
          await updateOrderEmailDelivery({
            orderId: order.id,
            status: emailRes.success ? "sent" : "failed",
            attempts: (order.email_attempts || 0) + 1,
            lastError: emailRes.error || null,
          });
          order.email_delivery_status = emailRes.success ? "sent" : "failed";
        }
      }
    } catch (err) {
      console.error("Order fulfillment / lookup error on success page:", err);
    }
  }

  const isConfirmed = order?.order_status === "paid";

  return (
    <main className="min-h-screen bg-paper text-ink font-sans px-6 pb-16 pt-[calc(var(--nav-h)+3rem)] sm:px-8 sm:pb-24 sm:pt-[calc(var(--nav-h)+5rem)]">
      <div className="mx-auto max-w-3xl">
        {/* Status Card */}
        <div className="border border-line bg-paper-bright p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="flex items-center gap-4 mb-6">
            {isConfirmed ? (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper-deep text-ink-soft">
                <Clock className="w-6 h-6" />
              </div>
            )}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                {isConfirmed ? "Order Confirmed & Ticket Reserved" : "Payment Received"}
              </span>
              <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {isConfirmed ? "You're All Set!" : "Finalizing Your Confirmation..."}
              </h1>
            </div>
          </div>

          <p className="mb-8 text-base font-light leading-relaxed text-ink-soft">
            {isConfirmed ? (
              <>
                Thank you for your order,{" "}
                <span className="font-semibold text-ink">
                  {order?.buyer_name || "Guest"}
                </span>
                . Your{" "}
                {order
                  ? getBookEditionLabel(order.book_edition).toLowerCase()
                  : "book"}{" "}
                edition purchase doubles as your official registration for the{" "}
                <span className="font-semibold text-ink">{config.title}</span> and
                reserves your personally autographed copy.
              </>
            ) : (
              <>
                Your payment is currently being verified by our secure processor. A full
                confirmation and entry pass will be dispatched to your email address shortly.
              </>
            )}
          </p>

          {/* Order Details Breakdown */}
          {order && (
            <div className="mb-8 space-y-3.5 border border-line bg-paper-deep p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-line pb-3 text-sm">
                <span className="text-ink-faint">Order Reference</span>
                <span className="font-mono text-base font-bold text-accent">
                  {order.order_reference}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-faint">Publication</span>
                <span className="text-right font-medium text-ink">
                  {config.bookTitle}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-faint">Edition</span>
                <span className="font-medium text-ink">
                  {getBookEditionLabel(order.book_edition)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-faint">Quantity</span>
                <span className="text-right font-medium text-ink">
                  {order.quantity} Autographed {getBookEditionLabel(order.book_edition)}{" "}
                  {order.quantity === 1 ? "Copy" : "Copies"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-faint">Launch Admission</span>
                <span className="font-semibold text-accent">Confirmed (Included)</span>
              </div>
              <div className="flex justify-between items-center border-t border-line pt-3 text-sm font-bold">
                <span className="text-ink">Total Paid</span>
                <span className="text-base text-accent">
                  {formatCurrency(
                    order.paid_amount || order.expected_amount,
                    order.currency
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Event & In-Person Pickup Notice */}
          <div className="mb-8 space-y-2.5 border-l-4 border-accent bg-accent-tint p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
              <BookOpen className="w-4 h-4" />
              Event Admission &amp; Book Pickup
            </h2>
            <p className="text-sm font-light leading-relaxed text-ink-soft">
              <strong>There is no postal delivery.</strong> You will collect your
              autographed {order ? getBookEditionLabel(order.book_edition).toLowerCase() : "book"} edition
              at the registration desk upon arriving at the event.
            </p>
            <div className="space-y-1 pt-1 text-xs text-ink-soft">
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                <span><strong>Date:</strong> {config.dateText}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                <span><strong>Venue:</strong> {config.venueText}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                <span><strong>Proof of Entry:</strong> Your Order Reference or email confirmation</span>
              </p>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="mb-8 border-t border-line pt-6 text-xs font-light leading-relaxed text-ink-faint">
            <strong>Privacy Notice:</strong> Your personal information (name and email) is
            collected strictly for order processing, receipt delivery, and event access control
            in accordance with applicable privacy standards. Your payment card details were
            processed directly by Stripe and were never stored on our servers.
          </p>

          {/* Back Home CTA */}
          <div className="flex justify-end">
            <Button href="/" variant="primary" size="md" withArrow>
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
