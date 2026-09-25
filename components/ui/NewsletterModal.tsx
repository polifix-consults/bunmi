"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Mail, Newspaper, X } from "lucide-react";

import { subscribeToMailchimp } from "@/lib/mailchimp";
import { SITE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    email: "",
  });

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
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.email.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const result = await subscribeToMailchimp({
        email: values.email,
        fullName: values.fullName,
      });

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.message);
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Subscription failed. Please try again."
      );
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl ring-1 ring-slate-900/10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close newsletter modal"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 transition-colors hover:border-slate-400 hover:bg-slate-100 hover:text-slate-950 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              /* Success State */
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF2F9] text-[#0A2540]">
                  <Check className="h-8 w-8 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <span className="font-inter text-xs font-bold uppercase tracking-[0.2em] text-[#0A2540]">
                    Subscription Confirmed
                  </span>
                  <h3
                    id="newsletter-modal-title"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
                  >
                    You’re on the List!
                  </h3>
                </div>

                <p className="max-w-md mx-auto font-inter text-sm sm:text-base font-light leading-relaxed text-slate-600">
                  Thank you{values.fullName ? `, ${values.fullName}` : ""}. You are now subscribed to the <strong className="font-semibold text-slate-900">Sidewalk Parliament Newsletter</strong> by {SITE.name}. Look out for insightful dispatches and policy reflections in your inbox at <strong className="font-semibold text-slate-900">{values.email}</strong>.
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded bg-[#0A2540] hover:bg-[#061628] px-8 py-3.5 font-inter text-xs font-bold uppercase tracking-[0.15em] text-white shadow-sm transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Subscription Form */
              <div className="p-6 sm:p-8 lg:p-10">
                {/* Header Badge & Title */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded bg-[#EBF2F9] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0A2540]">
                    <Newspaper className="w-3 h-3 text-[#0A2540]" />
                    Side Walk Parliament
                  </span>
                </div>

                <h3
                  id="newsletter-modal-title"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug"
                >
                  Subscribe to the Newsletter
                </h3>

                <p className="mt-2.5 font-inter text-xs sm:text-sm font-light leading-relaxed text-slate-600">
                  Join a community of policy professionals, civic leaders, and engaged citizens. Receive regular essays, legislative analysis, and governance commentaries by {SITE.name}.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="newsletter-full-name"
                      className="block font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="newsletter-full-name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Dr. Ngozi Adeleke"
                      value={values.fullName}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      className="w-full rounded border border-slate-300 bg-slate-50/50 px-4 py-3 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0A2540] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A2540] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="block font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700 mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full rounded border border-slate-300 bg-slate-50/50 px-4 py-3 pl-10 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0A2540] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A2540] transition-colors"
                      />
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-600 font-medium">
                      {errorMessage || "Something went wrong. Please check your email and try again."}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting" || !values.email.trim()}
                      className="w-full inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#061628] disabled:opacity-50 disabled:cursor-not-allowed px-7 py-4 font-inter text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Subscribing…</span>
                        </>
                      ) : (
                        <span>Subscribe to the Newsletter &rarr;</span>
                      )}
                    </button>
                  </div>

                  <p className="text-center font-inter text-[11px] font-light text-slate-400">
                    No spam guaranteed. Unsubscribe with one click at any time.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
