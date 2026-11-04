import Link from "next/link";
import { XCircle, ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { getEventConfig } from "@/lib/config/event";

export default function OrderCancelledPage() {
  const config = getEventConfig();

  return (
    <main className="min-h-screen bg-[#081A2F] text-white font-inter py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-[#0D233A] border border-slate-700/80 rounded-xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <XCircle className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Checkout Incomplete
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                Order Cancelled
              </h1>
            </div>
          </div>

          <p className="text-slate-300 text-base leading-relaxed mb-6 font-light">
            You exited the checkout session before completing payment. No charges were made
            to your payment method and no copies have been reserved.
          </p>

          <div className="bg-[#061628] border border-slate-800 rounded-lg p-5 mb-8 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 font-light leading-relaxed">
                <p className="font-semibold text-white">Your payment details were not charged.</p>
                <p className="mt-1 text-slate-400">
                  If you cancelled by mistake or experienced an issue with your payment method,
                  you can return anytime to complete your reservation.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded border border-slate-700 px-5 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Website
            </Link>
            <Link
              href="/#book"
              className="inline-flex items-center justify-center gap-2 rounded bg-white px-6 py-3 font-inter text-xs font-bold uppercase tracking-[0.15em] text-black shadow-sm hover:bg-slate-200 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              View Book &amp; Order
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
