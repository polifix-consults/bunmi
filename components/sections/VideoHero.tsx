"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

import { mediaAppearances } from "@/data/mockData";

export type MediaItem = (typeof mediaAppearances)[number];

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

type VideoHeroProps = {
  activeMedia?: MediaItem;
  isPlayingInline?: boolean;
  onPlayInline?: () => void;
};

// Default to featured Podcast episode
const defaultPodcast =
  mediaAppearances.find((m) => m.id === "m6") ||
  mediaAppearances.find((m) => m.title.includes("Open and Digital Governance")) ||
  mediaAppearances[0];

/**
 * Media page hero in the white/slate/Inter system. The video itself is the
 * thesis — framed like the home page portrait card (hairline ring + lift) on a
 * clean white field, with a pulled quote set in Inter beneath. Owns the page H1.
 */
export function VideoHero({
  activeMedia = defaultPodcast,
  isPlayingInline = true,
  onPlayInline,
}: VideoHeroProps) {
  const reduceMotion = useReducedMotion();
  const [internalPlaying, setInternalPlaying] = useState(true);

  const isPlaying = isPlayingInline || internalPlaying;
  const youtubeId = getYouTubeId(activeMedia.video_url);

  return (
    <section
      id="media-hero"
      aria-labelledby="media-hero-heading"
      className="relative w-full overflow-hidden bg-white font-inter text-slate-900"
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-[calc(var(--nav-h)+3rem)] sm:px-6 sm:pb-16 sm:pt-[calc(var(--nav-h)+4rem)] lg:px-8 lg:pb-20 lg:pt-[calc(var(--nav-h)+5rem)]">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 font-inter text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500"
          >
            <span aria-hidden="true" className="h-px w-8 bg-slate-300" />
            {activeMedia.category_tag}
          </motion.span>

          <motion.h1
            id="media-hero-heading"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-balance text-4xl font-bold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]"
          >
            {activeMedia.title}
          </motion.h1>
        </div>

        {/* Framed player — echoes the home page portrait treatment. */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 lg:mt-12"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 shadow-xl ring-1 ring-slate-900/10">
            {isPlaying && youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&rel=0`}
                title={activeMedia.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() =>
                  onPlayInline ? onPlayInline() : setInternalPlaying(true)
                }
                className="group absolute inset-0 flex items-center justify-center"
                aria-label={`Play ${activeMedia.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeMedia.thumbnail_url}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-slate-950/40 transition-colors duration-300 group-hover:bg-slate-950/30"
                />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                </span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Pulled quote — set in Inter to hold the home page type system. */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-3xl text-center lg:mt-14"
        >
          <blockquote className="text-balance text-2xl font-light leading-[1.3] tracking-tight text-slate-900 sm:text-3xl">
            &ldquo;Public policy is not just about writing laws; it is about building the institutional capacity that allows laws to work for everyday citizens.&rdquo;
          </blockquote>
          <p className="mx-auto mt-5 max-w-2xl font-inter text-base font-light leading-loose text-slate-600 sm:text-lg">
            Olubunmi Ayantunji hosts policy podcasts and dialogue series, breaking down public service innovation, digital governance reform, and practical policy design across Africa and beyond.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
