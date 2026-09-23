import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

type CtaBandProps = {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/**
 * Reusable closing band in the white/slate system. Keeps the conversion path
 * consistent across routes: an uppercase eyebrow, a heavy headline, and the
 * two-button action set (solid slate primary, hairline-bordered secondary).
 */
export function CtaBand({
  eyebrow = "Next step",
  title,
  body,
  primary = { label: "Join the Book Waitlist", href: "/research-publication" },
  secondary = { label: "Get in Touch", href: "/contact" },
}: CtaBandProps) {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="relative w-full overflow-hidden border-t border-slate-200 bg-white font-inter text-slate-900"
    >
      {/* Vertical alignment grid — matches the masthead and footer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 mx-auto grid max-w-7xl grid-cols-1 divide-x divide-slate-200/60 px-4 sm:px-6 md:grid-cols-5 lg:px-8"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="hidden h-full md:block" />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="cta-band-heading"
                className="mt-4 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl"
              >
                {title}
              </h2>
            </Reveal>
            {body ? (
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl font-inter text-base font-light leading-loose text-slate-600">
                  {body}
                </p>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.18} className="lg:col-span-5">
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href={primary.href}
                className="group inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] px-7 py-3.5 font-inter text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-[#061628]"
              >
                {primary.label}
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center rounded border border-[#0A2540] bg-white px-7 py-3.5 font-inter text-xs font-bold uppercase tracking-[0.15em] text-[#0A2540] transition-colors duration-200 hover:bg-slate-50"
              >
                {secondary.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
