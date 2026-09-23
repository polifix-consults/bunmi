import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export type MastheadStat = { label: string; value: string };

type PageMastheadProps = {
  eyebrow: string;
  /** Rendered as the page's single H1. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Optional right-column figures — set in tabular numerals. */
  stats?: MastheadStat[];
  className?: string;
};

/**
 * Interior-page masthead in the home page's white/slate/Inter system: the
 * vertical alignment grid, an uppercase eyebrow, a heavy Inter headline and a
 * light lede — closed by a hairline that hands off to the first content band.
 * Owns the H1 so each route has exactly one. Top padding clears the fixed nav.
 */
export function PageMasthead({ eyebrow, title, intro, stats, className }: PageMastheadProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-white font-inter text-slate-900",
        className,
      )}
    >
      {/* Vertical alignment grid — the site's connective structural motif. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 mx-auto grid max-w-7xl grid-cols-1 divide-x divide-slate-200/60 px-4 sm:px-6 md:grid-cols-5 lg:px-8"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="hidden h-full md:block" />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-[calc(var(--nav-h)+3.5rem)] sm:px-6 sm:pb-16 sm:pt-[calc(var(--nav-h)+4.5rem)] lg:px-8 lg:pb-20 lg:pt-[calc(var(--nav-h)+6rem)]">
        <div className="grid grid-cols-1 gap-8 border-b border-slate-200 pb-14 lg:grid-cols-12 lg:gap-16 lg:pb-20">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="block font-inter text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                {eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
                {title}
              </h1>
            </Reveal>
            {intro ? (
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-2xl font-inter text-base font-light leading-loose text-slate-600 sm:text-lg">
                  {intro}
                </p>
              </Reveal>
            ) : null}
          </div>

          {stats && stats.length > 0 ? (
            <Reveal delay={0.2} className="flex items-end lg:col-span-4 lg:justify-end">
              <dl className="flex gap-10 tabular-nums">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-inter text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {stat.label}
                    </dt>
                    <dd className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
