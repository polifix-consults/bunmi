"use client";

import { ArrowRight, BookOpen } from "lucide-react";

import { useWaitlistModal } from "@/components/context/WaitlistModalContext";
import { BOOK } from "@/lib/content";

/** Minimalist editorial book teaser section */
export function BookTeaser() {
  const { openWaitlistModal } = useWaitlistModal();

  return (
    <section
      aria-labelledby="book-teaser-heading"
      className="relative w-full bg-[#081A2F] text-white overflow-hidden font-inter border-b border-slate-800 py-20 lg:py-28"
    >
      {/* Background Vertical Alignment Lines (Grid Architecture) */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-1 md:grid-cols-5 divide-x divide-slate-800/50 z-0">
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Eyebrow */}
          <span className="inline-block font-inter text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {BOOK.status}
          </span>

          {/* Book Headline */}
          <h2
            id="book-teaser-heading"
            className="font-inter text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            {BOOK.title}
          </h2>

          {/* Description Blurb */}
          <div className="space-y-4 font-inter text-base sm:text-lg leading-relaxed text-stone-300 font-light max-w-3xl">
            {BOOK.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Order CTA Box */}
          <div className="border-t border-slate-800/80 pt-8 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-1.5 text-left">
              <h3 className="font-inter text-base sm:text-lg font-bold uppercase tracking-[0.08em] text-white">
                Available Now
              </h3>
              <p className="font-inter text-sm text-stone-400 font-light leading-relaxed">
                Order your copy today to explore critical policy insights, case studies, and actionable governance frameworks.
              </p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={openWaitlistModal}
                className="inline-flex items-center gap-3 justify-center rounded bg-white px-7 py-3.5 font-inter text-xs font-bold uppercase tracking-[0.15em] text-black shadow-sm transition-all duration-200 hover:bg-stone-200 hover:shadow-md cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Order Your Copy Here
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
