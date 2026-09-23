import { GraduationCap } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { EDUCATION } from "@/lib/content";

/**
 * Education section — qualifications and institutions.
 */
export function Timeline() {
  return (
    <section
      aria-labelledby="education-heading"
      className="w-full border-t border-slate-200 bg-white font-inter text-slate-900"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <h2
                id="education-heading"
                className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                <GraduationCap className="h-6 w-6 shrink-0 text-slate-900" aria-hidden="true" />
                Education
              </h2>
            </Reveal>
          </div>

          {/* Ruled hairline grid of qualifications. */}
          <ul className="grid border-l border-t border-slate-200 lg:col-span-8 sm:grid-cols-2">
            {EDUCATION.map((entry, i) => (
              <Reveal
                as="li"
                key={entry.qualification}
                delay={i * 0.05}
                className="border-b border-r border-slate-200 p-6 sm:p-7"
              >
                {entry.note ? (
                  <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {entry.note}
                  </p>
                ) : null}
                <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight text-slate-900 sm:text-lg">
                  {entry.qualification}
                </h3>
                <p className="mt-2.5 font-inter text-sm font-light leading-relaxed text-slate-600">
                  {entry.institution}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
