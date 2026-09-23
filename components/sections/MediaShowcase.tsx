"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { Reveal } from "@/components/ui/Reveal";
import { MEDIA_ITEMS, type MediaItem } from "@/lib/media";

type MediaShowcaseProps = {
  limit?: number;
  activeTitle?: string;
  onSelectCard?: (item: MediaItem) => void;
};

export function MediaShowcase({
  limit,
  activeTitle,
  onSelectCard,
}: MediaShowcaseProps) {
  const reduceMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    const list = MEDIA_ITEMS.filter((item) => item.type === "podcast");
    return limit ? list.slice(0, limit) : list;
  }, [limit]);

  return (
    <section
      id="media-archive"
      aria-labelledby="media-grid-heading"
      className="w-full border-t border-slate-200 bg-white font-inter text-slate-900"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <Reveal>
            <span className="block font-inter text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Broadcasts &amp; Episodes
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="media-grid-heading"
              className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl"
            >
              Policy Podcasts
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-3 font-inter text-base font-light leading-relaxed text-slate-600 sm:text-lg">
              Explore recorded policy podcasts, broadcast commentary, and in-depth discussions on governance, legislative reform, and public administration.
            </p>
          </Reveal>
        </div>

        {/* 4-Column Responsive Grid matching Image Layout */}
        <motion.div layout={!reduceMotion} className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <PublicationCard
                  item={item}
                  index={index}
                  onSelect={onSelectCard}
                  isActive={activeTitle === item.title}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <p className="border-b border-slate-200 py-16 text-center font-inter text-sm text-slate-500">
            No media items available in this category.
          </p>
        )}
      </div>
    </section>
  );
}
