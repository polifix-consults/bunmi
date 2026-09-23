"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Tv,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { VideoModal } from "@/components/ui/VideoModal";
import {
  POLICY_INSTITUTIONS,
  POLICY_VIDEOS,
  type PolicyInstitution,
  type PolicyVideo,
} from "@/lib/policyEngagement";
import { cn } from "@/lib/cn";

type VideoFilter = "all" | "television" | "dialogue";

type PolicyEngagementClientProps = {
  initialVideos?: PolicyVideo[];
};

export function PolicyEngagementClient({ initialVideos }: PolicyEngagementClientProps) {
  const reduceMotion = useReducedMotion();
  const [activeVideoFilter, setActiveVideoFilter] = useState<VideoFilter>("all");
  const [modalVideo, setModalVideo] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
    platform: string;
  }>({
    isOpen: false,
    videoUrl: "",
    title: "",
    platform: "",
  });

  const allVideos = useMemo(() => {
    return initialVideos && initialVideos.length > 0 ? initialVideos : POLICY_VIDEOS;
  }, [initialVideos]);

  const filteredVideos = useMemo(() => {
    if (activeVideoFilter === "television") {
      return allVideos.filter((v) => v.type === "television");
    }
    if (activeVideoFilter === "dialogue") {
      return allVideos.filter((v) => v.type === "dialogue" || v.type === "analysis");
    }
    return allVideos;
  }, [activeVideoFilter, allVideos]);

  const handleOpenVideo = (video: PolicyVideo) => {
    setModalVideo({
      isOpen: true,
      videoUrl: video.video_url,
      title: video.title,
      platform: video.category_tag,
    });
  };

  const tvCount = allVideos.filter((v) => v.type === "television").length;
  const dialogueCount = allVideos.filter((v) => v.type === "dialogue" || v.type === "analysis").length;

  return (
    <div className="w-full bg-white font-inter text-slate-900 overflow-hidden">
      <h1 className="sr-only">Policy Engagement</h1>

      {/* ========================================================================= */}
      {/* INSTITUTIONAL PILLARS (SPLIT 2-COLUMN WIREFRAME LAYOUT)                   */}
      {/* ========================================================================= */}
      <section
        id="institutions"
        aria-labelledby="institutions-heading"
        className="relative w-full bg-white pt-[calc(var(--nav-h)+2rem)] sm:pt-[calc(var(--nav-h)+3rem)] lg:pt-[calc(var(--nav-h)+4rem)] pb-16 sm:pb-20 lg:pb-28 border-b border-slate-200 font-inter"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl border-b border-slate-200 pb-10">
            <Reveal>
              <span className="block font-inter text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Institutional Highlights
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="institutions-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              >
                Two Platforms, One Mission.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 font-inter text-base font-light leading-relaxed text-slate-600 sm:text-lg">
                Strategic initiatives designed to address public policy challenges at every level: from institutional governance and statutory reform to grassroots civic empowerment and youth leadership.
              </p>
            </Reveal>
          </div>

          {/* Alternating 2-Column Split Rows */}
          <div className="mt-16 sm:mt-20 lg:mt-24 space-y-20 sm:space-y-28 lg:space-y-36">
            {POLICY_INSTITUTIONS.map((institution, idx) => (
              <InstitutionHighlightRow
                key={institution.id}
                institution={institution}
                index={idx}
                isReversed={idx % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BROADCAST APPEARANCES & YOUTUBE INTERVIEWS                             */}
      {/* ========================================================================= */}
      <section
        id="broadcasts"
        aria-labelledby="broadcasts-heading"
        className="w-full bg-white font-inter text-slate-900 py-16 sm:py-20 lg:py-28 border-b border-slate-200"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Ledger */}
          <div className="grid grid-cols-1 gap-8 border-b border-slate-200 pb-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <span className="block font-inter text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Media &amp; Public Dialogue
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id="broadcasts-heading"
                  className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl"
                >
                  Broadcast Interviews &amp; YouTube Discussions.
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-4 max-w-2xl font-inter text-base font-light leading-loose text-slate-600 sm:text-lg">
                  Television interviews, parliamentary dialogues, and in-depth policy discussions on constitutional reform, state policing, and public administration.
                </p>
              </Reveal>
            </div>

            {/* Counts Ledger */}
            <div className="flex items-end lg:col-span-4 lg:justify-end">
              <dl className="flex gap-8 sm:gap-10 tabular-nums">
                <div>
                  <dt className="font-inter text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Television
                  </dt>
                  <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    {tvCount}
                  </dd>
                </div>
                <div>
                  <dt className="font-inter text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Dialogues
                  </dt>
                  <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    {dialogueCount}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Filter Navigation Rail (Research-page style) */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-slate-200 py-6 mb-12">
            <span className="font-inter text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Filter By
            </span>

            {[
              { key: "all", label: `All Appearances (${allVideos.length})` },
              { key: "television", label: `Television Broadcasts (${tvCount})` },
              { key: "dialogue", label: `Civic & Diaspora Dialogues (${dialogueCount})` },
            ].map(({ key, label }) => {
              const active = activeVideoFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveVideoFilter(key as VideoFilter)}
                  aria-pressed={active}
                  className="relative py-1 font-inter text-xs uppercase tracking-[0.14em] transition-colors duration-200"
                >
                  <span
                    className={
                      active
                        ? "font-bold text-slate-900"
                        : "font-normal text-slate-500 hover:text-slate-900"
                    }
                  >
                    {label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="engagementFilterLine"
                      className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-[#0A2540]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* 4-Column Responsive Grid matching Image Wireframe */}
          <motion.div
            layout={!reduceMotion}
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <VideoInterviewCard
                    video={video}
                    index={index}
                    onOpen={handleOpenVideo}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={modalVideo.isOpen}
        onClose={() => setModalVideo((prev) => ({ ...prev, isOpen: false }))}
        videoUrl={modalVideo.videoUrl}
        title={modalVideo.title}
        platform={modalVideo.platform}
      />
    </div>
  );
}

/* ========================================================================= */
/* SUB-COMPONENTS                                                            */
/* ========================================================================= */

function InstitutionHighlightRow({
  institution,
  index,
  isReversed,
}: {
  institution: PolicyInstitution;
  index: number;
  isReversed: boolean;
}) {
  return (
    <Reveal delay={index * 0.1}>
      <article className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* Text Column */}
        <div
          className={cn(
            "lg:col-span-5 flex flex-col justify-center",
            isReversed ? "lg:order-2" : "lg:order-1"
          )}
        >
          {/* Eyebrow and Tag Badge Row matching reference image */}
          <div className="flex items-center gap-3">
            <span className="font-inter text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
              Featured
            </span>
            <span className="border border-slate-300 px-2.5 py-0.5 font-inter text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
              {institution.category}
            </span>
          </div>

          {/* Large Bold Editorial Title */}
          <h3 className="mt-5 font-inter text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-slate-900 leading-[1.15]">
            {institution.name}
          </h3>

          {/* Body Description matching reference typography */}
          <p className="mt-6 font-inter text-base sm:text-lg font-light leading-relaxed text-slate-600 sm:leading-[1.75]">
            {institution.description}
          </p>
        </div>

        {/* Large Media Card Column */}
        <div
          className={cn(
            "lg:col-span-7",
            isReversed ? "lg:order-1" : "lg:order-2"
          )}
        >
          <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-none border border-slate-200 bg-slate-950 shadow-sm">
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={institution.image}
              alt={institution.name}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Dark Gradient Overlay at Bottom */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"
            />

            {/* Bottom Media Caption Bar */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div className="space-y-0.5">
                <p className="font-inter text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                  {institution.overlayTitle}
                </p>
                <p className="font-inter text-xs sm:text-sm font-light text-slate-300 line-clamp-1">
                  {institution.overlaySubtitle}
                </p>
              </div>

              {/* Brand Tag */}
              <span className="shrink-0 font-inter text-xs sm:text-sm font-black uppercase tracking-widest text-[#F05A47] drop-shadow-sm">
                {institution.brandTag}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function VideoInterviewCard({
  video,
  index,
  onOpen,
}: {
  video: PolicyVideo;
  index: number;
  onOpen: (video: PolicyVideo) => void;
}) {
  return (
    <article className="group flex flex-col justify-between h-full bg-transparent font-inter">
      <div>
        {/* Top: Date & Tag */}
        <div className="flex items-center justify-between text-[11px] font-medium tracking-wide text-slate-500 mb-2.5">
          <span>{video.date}</span>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            <Tv className="w-3 h-3 text-slate-400" /> {video.network}
          </span>
        </div>

        {/* Framed Thumbnail Box matching Wireframe */}
        <button
          type="button"
          onClick={() => onOpen(video)}
          className="relative block aspect-[16/10] w-full overflow-hidden border border-slate-300 bg-slate-900 text-left transition-all duration-300 group-hover:border-slate-900 shadow-2xs cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-md">
              <Play className="h-4 w-4 fill-slate-900 ml-0.5" />
            </span>
          </div>
        </button>

        {/* Hairline Divider under thumbnail */}
        <div className="mt-3.5 border-b border-slate-300/90 pb-1 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-900 line-clamp-1">
            {video.category_tag}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900" />
        </div>

        {/* Title */}
        <h3 className="mt-2 text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug tracking-tight">
          <button
            type="button"
            onClick={() => onOpen(video)}
            className="text-left hover:underline underline-offset-2 decoration-slate-400 cursor-pointer"
          >
            {video.title}
          </button>
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
          {video.description}
        </p>
      </div>

      {/* Action footer */}
      <div className="mt-4 pt-2">
        <button
          type="button"
          onClick={() => onOpen(video)}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-800 transition-colors hover:text-slate-500 cursor-pointer"
        >
          Watch Interview &rarr;
        </button>
      </div>
    </article>
  );
}
