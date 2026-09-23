"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Headphones, Mail, Play } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { cn } from "@/lib/cn";

type PublicationCardProps = {
  item: MediaItem;
  index: number;
  onSelect?: (item: MediaItem) => void;
  isActive?: boolean;
};

/**
 * Editorial media card matching the exact wireframe layout:
 * - Top line: Date in clean muted typography
 * - Image container: Framed rectangular thumbnail with border
 * - Hairline divider under thumbnail
 * - Source/Publication label in uppercase bold
 * - Title and excerpt with interactive hover state
 */
export function PublicationCard({
  item,
  index,
  onSelect,
  isActive,
}: PublicationCardProps) {
  const isVideo = Boolean(item.videoUrl);
  const isNewsletter = item.type === "newsletter";

  const handleClick = (e: React.MouseEvent) => {
    if (isVideo && onSelect) {
      e.preventDefault();
      onSelect(item);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: (index % 4) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group flex flex-col justify-between h-full bg-transparent font-inter",
        isActive && "ring-2 ring-slate-900 rounded-sm p-1"
      )}
    >
      <div>
        {/* Top: Date */}
        <div className="flex items-center justify-between text-[11px] font-medium tracking-wide text-slate-500 mb-2.5">
          <span>{item.date}</span>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            {isNewsletter ? (
              <>
                <Mail className="w-3 h-3 text-slate-400" /> Article
              </>
            ) : isVideo ? (
              <>
                <Play className="w-2.5 h-2.5 text-slate-400 fill-slate-400" /> Video
              </>
            ) : (
              <>
                <Headphones className="w-3 h-3 text-slate-400" /> Audio
              </>
            )}
          </span>
        </div>

        {/* Middle: Framed Thumbnail Container */}
        <a
          href={item.href || item.videoUrl || "#"}
          target={isVideo ? undefined : "_blank"}
          rel={isVideo ? undefined : "noopener noreferrer"}
          onClick={handleClick}
          className="relative block aspect-[16/10] w-full overflow-hidden border border-slate-300 bg-slate-50 transition-all duration-300 group-hover:border-slate-900 shadow-2xs"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            onError={(e) => {
              // Fallback to neutral pattern if image fails
              const target = e.currentTarget;
              target.src =
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop";
            }}
          />

          {/* Video Play Overlay */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-md">
                <Play className="h-4 w-4 fill-slate-900 ml-0.5" />
              </span>
            </div>
          )}
        </a>

        {/* Hairline Divider under thumbnail */}
        <div className="mt-3.5 border-b border-slate-300/90 pb-1 flex items-center justify-between">
          {/* Source / Platform Name */}
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-900 line-clamp-1">
            {item.platform}
          </span>
          {item.href && !isVideo && (
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900" />
          )}
        </div>

        {/* Title / Headline */}
        <h3 className="mt-2 text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug tracking-tight">
          <a
            href={item.href || item.videoUrl || "#"}
            target={isVideo ? undefined : "_blank"}
            rel={isVideo ? undefined : "noopener noreferrer"}
            onClick={handleClick}
            className="hover:underline underline-offset-2 decoration-slate-400"
          >
            {item.title}
          </a>
        </h3>

        {/* Excerpt / Summary */}
        <p className="mt-1.5 text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>

      {/* Action footer link */}
      <div className="mt-4 pt-2">
        <a
          href={item.href || item.videoUrl || "#"}
          target={isVideo ? undefined : "_blank"}
          rel={isVideo ? undefined : "noopener noreferrer"}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-800 transition-colors hover:text-slate-500"
        >
          {isVideo ? "Watch Episode" : isNewsletter ? "Read Article" : "Listen Episode"} &rarr;
        </a>
      </div>
    </motion.article>
  );
}
