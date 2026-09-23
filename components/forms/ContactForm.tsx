"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { submitContactForm } from "@/lib/contact";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const LABEL =
  "block font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500";
const FIELD =
  "mt-3 w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 font-inter text-base text-slate-900 transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-0";

/**
 * Booking & inquiries form in the white/slate/Inter system.
 * Submits directly to Olubunmi Ayantunji's email via FormSubmit/Web3Forms/Formspree.
 */
export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.email.trim() || !values.name.trim() || !values.message.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await submitContactForm({
        name: values.name,
        email: values.email,
        message: values.message,
        botcheck: values.botcheck,
      });

      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(res.message);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please email directly at olubunmiayantunji@gmail.com.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex flex-col items-start gap-4 rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10",
          className,
        )}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          Message received.
        </h3>
        <p className="font-inter text-[0.9375rem] font-light leading-relaxed text-slate-600">
          Thank you{values.name ? `, ${values.name}` : ""}. Your note has been logged — you&rsquo;ll receive a reply shortly.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10",
        className,
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={LABEL}>
              Name <span aria-hidden="true" className="text-slate-400">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Full name"
              className={FIELD}
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={LABEL}>
              Email <span aria-hidden="true" className="text-slate-400">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className={FIELD}
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={LABEL}>
            Message <span aria-hidden="true" className="text-slate-400">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder="How can I help?"
            className={cn(FIELD, "resize-y")}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          />
        </div>

        {/* Honeypot field for bot protection */}
        <input
          type="text"
          name="botcheck"
          value={values.botcheck}
          onChange={(e) => setValues((v) => ({ ...v, botcheck: e.target.value }))}
          className="hidden"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {status === "error" ? (
          <p role="alert" className="text-sm font-medium text-red-600">
            {errorMessage || "Something went wrong. Please try again."}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex w-full items-center justify-center gap-2 rounded bg-slate-900 px-7 py-4 font-inter text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending&hellip;
            </>
          ) : (
            <>
              Send Message
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
