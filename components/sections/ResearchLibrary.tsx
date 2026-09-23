"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { useWaitlistModal } from "@/components/context/WaitlistModalContext";
import { RESEARCH, RESEARCH_INTRO, type ResearchWork } from "@/lib/content";
import { cn } from "@/lib/cn";

type ResearchLibraryProps = {
  initialWorks?: ResearchWork[];
};

export function ResearchLibrary({ initialWorks }: ResearchLibraryProps) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<string>("All");

  const works = useMemo(() => {
    const list = initialWorks && initialWorks.length > 0 ? initialWorks : RESEARCH;
    return [...list].sort((a, b) => b.year - a.year);
  }, [initialWorks]);

  // Section 1: Lead featured work (Copy and Paste Governance)
  const featured = useMemo(() => works.filter((w) => w.featured), [works]);

  // Section 2: Indexed catalogue including Book part (Minutes from the roundtable)
  const indexed = useMemo(() => works.filter((w) => !w.featured), [works]);

  const catalogue = useMemo(
    () => new Map(indexed.map((w, i) => [w.id, i + 1])),
    [indexed],
  );

  // Filters with "Book" placed prominently right after "All"
  const filters = useMemo(() => {
    const uniqueKinds = Array.from(new Set(indexed.map((w) => w.kind)));
    const hasBook = uniqueKinds.includes("Book");
    const otherKinds = uniqueKinds.filter((k) => k !== "Book");
    return ["All", ...(hasBook ? ["Book"] : []), ...otherKinds];
  }, [indexed]);

  const shown = useMemo(
    () => (filter === "All" ? indexed : indexed.filter((w) => w.kind === filter)),
    [filter, indexed],
  );

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white font-inter text-slate-900">
      {/* Vertical alignment grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 mx-auto grid max-w-7xl grid-cols-1 divide-x divide-slate-200/60 px-4 sm:px-6 md:grid-cols-5 lg:px-8"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="hidden h-full md:block" />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-[calc(var(--nav-h)+2rem)] pb-24">
        <h1 className="sr-only">Research &amp; Publications</h1>

        {/* ==================== SECTION 1: FEATURED LEAD ==================== */}
        {featured.map((work) => (
          <FeaturedWork key={work.id} work={work} reduceMotion={!!reduceMotion} />
        ))}

        {/* ==================== SECTION 2: RESEARCH & PUBLICATIONS INDEX ==================== */}
        <section aria-labelledby="index-heading" className="pt-14 sm:pt-16 lg:pt-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="block font-inter text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                Catalogue &amp; Archive
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="index-heading"
                className="mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
              >
                Research &amp; Publications Index
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 max-w-2xl font-inter text-base font-light leading-relaxed text-slate-600">
                {RESEARCH_INTRO}
              </p>
            </Reveal>
          </div>

          {/* ==================== FILTER RAIL ==================== */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-slate-200 pb-6">
            <span className="font-inter text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Filter
            </span>
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={cn(
                    "relative font-inter text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 lg:text-xs",
                    active
                      ? "font-bold text-slate-900"
                      : "font-normal text-slate-500 hover:text-slate-900",
                  )}
                >
                  {f}
                  {active ? (
                    <motion.span
                      layoutId="researchFilterLine"
                      className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-[#0A2540]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* ==================== INDEX OF WORKS ==================== */}
          <ol className="pb-16 lg:pb-24">
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((work) => (
                <motion.li
                  key={work.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <IndexRow work={work} no={catalogue.get(work.id) || 1} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>

          {shown.length === 0 ? (
            <p className="border-b border-slate-200 py-16 text-center font-inter text-sm text-slate-500">
              No works in this category yet.
            </p>
          ) : null}
        </section>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 1: Featured Lead Work Component                                   */
/* -------------------------------------------------------------------------- */

function FeaturedWork({
  work,
  reduceMotion,
}: {
  work: ResearchWork;
  reduceMotion: boolean;
}) {
  const { openWaitlistModal } = useWaitlistModal();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-slate-200 py-14 lg:py-20"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Book Cover Image */}
        <div className="lg:col-span-4">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[15rem] overflow-hidden rounded-md border border-slate-200 bg-[#0A2540] shadow-xl ring-1 ring-slate-900/10 lg:mx-0">
            <Image
              src="/images/book_cover.png"
              alt={`Book Cover — ${work.title}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
              priority
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900">
              Featured
            </span>
            {work.status ? (
              <span className="border border-slate-300 px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {work.status}
              </span>
            ) : null}
          </div>
          <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
            {work.title}
          </h2>
          <p className="mt-4 max-w-2xl font-inter text-base font-light leading-relaxed text-slate-600">
            {work.abstract}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={openWaitlistModal}
              className="inline-flex items-center justify-center rounded bg-[#0A2540] px-6 py-3 font-inter text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-[#061628] cursor-pointer"
            >
              Order Your Copy Here
            </button>
            <div className="flex flex-wrap gap-x-2 gap-y-1 font-inter text-[11px] uppercase tracking-[0.14em] text-slate-400">
              {work.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2: Index Row Component (with Book & Download support)              */
/* -------------------------------------------------------------------------- */

function IndexRow({ work, no }: { work: ResearchWork; no: number }) {
  const label = String(no).padStart(2, "0");
  const isDownloadable = Boolean(work.downloadUrl);
  const external = Boolean(work.href || work.downloadUrl);
  const targetHref = work.downloadUrl || work.href;
  const isRoundtable = work.id === "minutes-from-roundtable";

  return (
    <div
      className={cn(
        "group grid grid-cols-1 gap-x-6 gap-y-4 border-b border-slate-200 py-7 transition-colors duration-200 sm:grid-cols-12 sm:items-start",
        isRoundtable ? "bg-slate-50/60 p-4 sm:p-6 rounded-lg my-2 border border-slate-200" : "hover:bg-slate-50/60",
      )}
    >
      {/* Catalogue number + year/date */}
      <div className="flex items-baseline gap-4 sm:col-span-2 sm:block">
        <span className="font-inter text-xs font-bold tabular-nums tracking-widest text-slate-300">
          {label}
        </span>
        <span className="font-inter text-xs font-semibold tabular-nums tracking-wide text-slate-900 sm:mt-1 sm:block">
          {work.date || work.year}
        </span>
        {isRoundtable && (
          <span className="mt-2 inline-block rounded bg-amber-50 border border-amber-200/80 px-2 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wider text-amber-900">
            Book
          </span>
        )}
      </div>

      {/* Title + abstract / blurb + action */}
      <div className="sm:col-span-7">
        <h3 className="flex items-start gap-2 text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl">
          {external ? (
            <a
              href={targetHref}
              target="_blank"
              rel="noopener noreferrer"
              {...(isDownloadable ? { download: "minutes_from_roundtable.pdf" } : {})}
              className="hover:underline flex items-center gap-1.5"
            >
              <span>{work.title}</span>
              {isDownloadable ? (
                <Download className="h-4 w-4 shrink-0 text-[#0A2540]" aria-hidden="true" />
              ) : (
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              )}
            </a>
          ) : (
            <span>{work.title}</span>
          )}
        </h3>

        <p className="mt-2.5 max-w-xl font-inter text-sm font-light leading-relaxed text-slate-600">
          {work.abstract}
        </p>

        {/* Download action button for Minutes from the roundtable */}
        {isDownloadable && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={targetHref}
              download="minutes_from_roundtable.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-[#0A2540] px-4 py-2 font-inter text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-colors duration-200 hover:bg-[#061628]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download Literature (PDF)</span>
            </a>
          </div>
        )}

        {/* Tags (hidden for roundtable card per request) */}
        {!isRoundtable && work.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-inter text-[11px] text-slate-400">
            {work.tags.map((tag) => (
              <span key={tag} className="text-slate-500">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Kind · venue · status */}
      <div className="sm:col-span-3 sm:text-right">
        <div className="font-inter text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900">
          {work.kind}
        </div>
        <div className="mt-1.5 font-inter text-[12px] leading-relaxed text-slate-500">
          {work.venue}
        </div>
        {work.status ? (
          <div className="mt-2 font-inter text-[10px] uppercase tracking-[0.16em] text-slate-400">
            {work.status}
          </div>
        ) : null}
      </div>
    </div>
  );
}
