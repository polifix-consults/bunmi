"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

import { cn } from "@/lib/cn";
import type { MediaCardItem } from "@/lib/content";
import { getIcon } from "@/lib/icons";

type MediaCardProps = {
  item: MediaCardItem;
  index: number;
  onSelect?: (item: MediaCardItem) => void;
  isActive?: boolean;
};

/**
 * Masonry tile for the media grid. A dark photo plate on the white page; text
 * sits over a slate scrim for legibility. Clicking loads the video in the modal.
 */
export function MediaCard({ item, index, onSelect, isActive }: MediaCardProps) {
  const reduceMotion = useReducedMotion();
  const Icon = getIcon(item.icon);
  const isLink = Boolean(item.href);
  const Tag = isLink ? "a" : "div";
  const [imgSrc, setImgSrc] = useState(item.image);

  return (
    <motion.article
      className={cn(
        "group relative min-h-[190px] overflow-hidden rounded-lg bg-slate-900 transition-all duration-300 sm:min-h-[240px] lg:min-h-[280px]",
        isActive && "scale-[1.01] ring-2 ring-slate-900 ring-offset-2 ring-offset-white",
        item.className,
      )}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.75,
        delay: reduceMotion ? 0 : (index % 3) * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Tag
        {...(isLink
          ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onClick={(e) => {
          if (onSelect) {
            e.preventDefault();
            onSelect(item);
          }
        }}
        className="relative flex h-full w-full cursor-pointer flex-col justify-end p-6 sm:p-8"
      >
        {/* Still frame image layer — z-0 */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={false}
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            onError={() => {
              if (imgSrc.includes("maxresdefault.jpg")) {
                setImgSrc(imgSrc.replace("maxresdefault.jpg", "hqdefault.jpg"));
              } else if (imgSrc.includes("hqdefault.jpg")) {
                setImgSrc(imgSrc.replace("hqdefault.jpg", "mqdefault.jpg"));
              }
            }}
          />
        </motion.div>

        {/* Contrast scrim overlay layer — z-10 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-900/25 transition-opacity duration-500 group-hover:opacity-90"
        />

        {/* Active Badge */}
        {isActive ? (
          <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[0.625rem] font-bold uppercase tracking-widest text-slate-900 shadow-lg">
            <Play className="h-3 w-3 fill-current" /> Now Playing
          </div>
        ) : null}

        {/* Content layer — z-20 */}
        <div className="relative z-20 flex h-full flex-col justify-end">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Icon className="h-4 w-4 shrink-0 text-slate-200" aria-hidden="true" />
            <p className="font-inter text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
              {item.platform}
            </p>
          </div>

          <h3 className="mt-4 max-w-md text-balance text-xl font-semibold leading-[1.2] tracking-tight text-white sm:text-2xl">
            {item.title}
          </h3>

          {item.description ? (
            <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-slate-300 transition-all duration-500 lg:max-h-0 lg:translate-y-2 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-40 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              {item.description}
            </p>
          ) : null}

          {isLink ? (
            <span className="mt-5 inline-flex items-center gap-2 font-inter text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-slate-100">
              {isActive ? "Playing Above" : "Watch Video"}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          ) : null}
        </div>

        {/* Hover underline — z-30 */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-30 h-0.5 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
      </Tag>
    </motion.article>
  );
}
