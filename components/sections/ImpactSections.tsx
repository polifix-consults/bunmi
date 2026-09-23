import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { INITIATIVES } from "@/lib/content";
import { getIcon } from "@/lib/icons";

/**
 * Policy & Impact body — one numbered chapter per initiative in the
 * white/slate/Inter system. The set is a real typology of the work (advisory,
 * legislation, advocacy, analysis), so the 01–04 numerals carry meaning. Each
 * chapter is hairline-separated; features become bordered call-outs.
 */
export function ImpactSections() {
  return (
    <section className="w-full bg-white font-inter text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {INITIATIVES.map((initiative) => {
          const headingId = `${initiative.id}-heading`;
          const Icon = getIcon(initiative.icon);

          return (
            <div
              key={initiative.id}
              id={initiative.id}
              className="grid grid-cols-1 gap-10 border-t border-slate-200 py-16 first:border-t-0 lg:grid-cols-12 lg:gap-16 lg:py-24"
            >
              {/* Index rail */}
              <div className="lg:col-span-4">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-inter text-5xl font-bold leading-none tracking-tight text-slate-200">
                      {initiative.index}
                    </span>
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {initiative.label}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h2
                    id={headingId}
                    className="mt-7 max-w-sm text-3xl font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl"
                  >
                    {initiative.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.16}>
                  <span className="mt-8 flex h-14 w-14 items-center justify-center rounded border border-slate-200 bg-white text-slate-900">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </Reveal>
              </div>

              {/* Body + feature */}
              <div className="lg:col-span-8">
                <Reveal delay={0.12}>
                  <p className="max-w-2xl font-inter text-lg font-light leading-loose text-slate-600 sm:text-xl">
                    {initiative.body}
                  </p>
                </Reveal>

                {initiative.feature ? (
                  <Reveal delay={0.2}>
                    <aside className="mt-10 border-l-2 border-slate-900 bg-slate-50 p-7 sm:p-9">
                      <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {initiative.feature.eyebrow}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                        {initiative.feature.title}
                      </h3>
                      <p className="mt-4 max-w-xl font-inter text-base font-light leading-relaxed text-slate-600">
                        {initiative.feature.body}
                      </p>
                      {initiative.feature.action ? (
                        <div className="mt-6">
                          <Link
                            href={initiative.feature.action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-[0.16em] text-slate-900 transition-colors duration-200 hover:text-slate-500"
                          >
                            {initiative.feature.action.label}
                          </Link>
                        </div>
                      ) : null}
                    </aside>
                  </Reveal>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
