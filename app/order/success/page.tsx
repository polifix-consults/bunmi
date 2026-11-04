import Link from "next/link";
import { CheckCircle2, Clock, BookOpen, MapPin, Mail, ArrowRight } from "lucide-react";
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
    <main className="min-h-screen bg-[#081A2F] text-white font-inter py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Status Card */}
        <div className="bg-[#0D233A] border border-slate-700/80 rounded-xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            {isConfirmed ? (
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
            )}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                {isConfirmed ? "Order Confirmed & Ticket Reserved" : "Payment Received"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                {isConfirmed ? "You're All Set!" : "Finalizing Your Confirmation..."}
              </h1>
            </div>
          </div>

          <p className="text-slate-300 text-base leading-relaxed mb-8 font-light">
            {isConfirmed ? (
              <>
                Thank you for your order,{" "}
                <span className="font-semibold text-white">
                  {order?.buyer_name || "Guest"}
                </span>
                . Your{" "}
                {order
                  ? getBookEditionLabel(order.book_edition).toLowerCase()
                  : "book"}{" "}
                edition purchase doubles as your official registration for the{" "}
                <span className="font-semibold text-white">{config.title}</span> and
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
            <div className="bg-[#061628] border border-slate-800 rounded-lg p-5 sm:p-6 mb-8 space-y-3.5">
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                <span className="text-slate-400">Order Reference</span>
                <span className="font-mono font-bold text-amber-400 text-base">
                  {order.order_reference}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Publication</span>
                <span className="font-medium text-white text-right">
                  {config.bookTitle}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Edition</span>
                <span className="font-medium text-white">
                  {getBookEditionLabel(order.book_edition)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Quantity</span>
                <span className="font-medium text-white">
                  {order.quantity} Autographed {getBookEditionLabel(order.book_edition)}{" "}
                  {order.quantity === 1 ? "Copy" : "Copies"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Launch Admission</span>
                <span className="font-semibold text-emerald-400">Confirmed (Included)</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-800 font-bold">
                <span className="text-white">Total Paid</span>
                <span className="text-white text-base">
                  {formatCurrency(
                    order.paid_amount || order.expected_amount,
                    order.currency
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Event & In-Person Pickup Notice */}
          <div className="border-l-4 border-amber-500 bg-[#061628]/60 p-5 rounded-r-lg mb-8 space-y-2.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Event Admission &amp; Book Pickup
            </h2>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              <strong>There is no postal delivery.</strong> You will collect your
              autographed {order ? getBookEditionLabel(order.book_edition).toLowerCase() : "book"} edition
              at the registration desk upon arriving at the event.
            </p>
            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span><strong>Date:</strong> {config.dateText}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span><strong>Venue:</strong> {config.venueText}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span><strong>Proof of Entry:</strong> Your Order Reference or email confirmation</span>
              </p>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-slate-400 font-light leading-relaxed border-t border-slate-800/80 pt-6 mb-8">
            <strong>Privacy Notice:</strong> Your personal information (name and email) is
            collected strictly for order processing, receipt delivery, and event access control
            in accordance with applicable privacy standards. Your payment card details were
            processed directly by Stripe and were never stored on our servers.
          </p>

          {/* Back Home CTA */}
          <div className="flex justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded bg-white px-6 py-3 font-inter text-xs font-bold uppercase tracking-[0.15em] text-black shadow-sm transition-all duration-200 hover:bg-slate-200 cursor-pointer"
            >
              Return to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
