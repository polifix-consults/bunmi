"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  BookOpen,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import {
  BOOK_CURRENCY,
  BOOK_EDITIONS,
  BOOK_EDITION_PRICES_IN_CENTS,
  getBookEditionLabel,
  type BookEdition,
} from "@/lib/book";

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function OrderCheckoutModal({ isOpen, onClose }: OrderModalProps) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [bookEdition, setBookEdition] = useState<BookEdition>("hardcover");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pricePerUnit = BOOK_EDITION_PRICES_IN_CENTS[bookEdition] / 100;
  const totalPrice = (quantity * pricePerUnit).toFixed(2);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setBuyerName("");
      setBuyerEmail("");
      setBookEdition("hardcover");
      setQuantity(1);
      setLoading(false);
      setErrorMessage(null);
    }
  }, [isOpen]);

  async function handleProceedToCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName,
          buyerEmail,
          bookEdition,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to initiate checkout session.");
      }

      if (data.url) {
        // Redirect buyer to Stripe Hosted Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout redirect URL received.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(msg);
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-inter">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl ring-1 ring-slate-900/10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close order modal"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 transition-colors hover:border-slate-400 hover:bg-slate-100 hover:text-slate-950 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <form className="p-6 sm:p-8 lg:p-10" onSubmit={handleProceedToCheckout}>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-[#0A2540]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A2540]">
                  Book Order &amp; Launch Attendance
                </span>
              </div>

              <h2
                id="order-modal-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-2"
              >
                Copy and Paste Governance
              </h2>
              <p className="text-xs text-slate-600 font-light mb-6">
                Why Borrowed Policies Fail African Realities &bull; By Olubunmi Ayantunji
              </p>

              {/* Buyer details and edition selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="order-buyer-name"
                    className="mb-1.5 block font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700"
                  >
                    Full name
                  </label>
                  <input
                    id="order-buyer-name"
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    required
                    value={buyerName}
                    onChange={(event) => setBuyerName(event.target.value)}
                    disabled={loading}
                    className="w-full rounded border border-slate-300 bg-slate-50/50 px-4 py-3 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0A2540] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A2540] transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="order-buyer-email"
                    className="mb-1.5 block font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700"
                  >
                    Email address
                  </label>
                  <input
                    id="order-buyer-email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={buyerEmail}
                    onChange={(event) => setBuyerEmail(event.target.value)}
                    disabled={loading}
                    className="w-full rounded border border-slate-300 bg-slate-50/50 px-4 py-3 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0A2540] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A2540] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <fieldset>
                  <legend className="mb-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                    Choose your edition
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {BOOK_EDITIONS.map((edition) => {
                      const selected = bookEdition === edition;
                      const editionPrice = new Intl.NumberFormat("en-CA", {
                        style: "currency",
                        currency: BOOK_CURRENCY.toUpperCase(),
                      }).format(BOOK_EDITION_PRICES_IN_CENTS[edition] / 100);

                      return (
                        <label
                          key={edition}
                          className={`flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors ${
                            selected
                              ? "border-[#0A2540] bg-[#EBF2F9]"
                              : "border-slate-200 bg-white hover:border-slate-400"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="book-edition"
                              value={edition}
                              checked={selected}
                              onChange={() => setBookEdition(edition)}
                              disabled={loading}
                              className="accent-[#0A2540]"
                            />
                            <span className="text-sm font-semibold text-slate-900">
                              {getBookEditionLabel(edition)}
                            </span>
                          </span>
                          <span className="text-sm text-slate-700">
                            {editionPrice}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              {/* Quantity & Price Selection */}
              <div className="border-t border-b border-slate-200 py-5 my-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                      Quantity
                    </label>
                    <p className="text-[11px] text-slate-500 font-light mt-0.5">
                      Each copy reserves guaranteed seating
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-md p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || loading}
                      className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                      disabled={quantity >= 5 || loading}
                      className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Total Amount (CAD)
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-900">
                      ${totalPrice}
                    </span>
                    <span className="text-xs text-slate-500 ml-1.5 font-light">
                      CAD
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-xs text-red-800 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-3 rounded bg-[#0A2540] hover:bg-[#061628] text-white font-inter font-bold text-xs uppercase tracking-[0.16em] py-4 px-6 shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connecting to Stripe Checkout...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      Proceed to Secure Checkout
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 font-light pt-1">
                  Delivery is free on orders shipped to Canada and the United States.
                </p>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-light border-t border-slate-200 pt-4">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Hosted securely via Stripe. Card details are encrypted end-to-end.</span>
              </div>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
