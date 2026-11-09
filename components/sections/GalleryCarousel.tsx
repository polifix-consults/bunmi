"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";

import { GALLERY_IMAGES } from "@/lib/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const total = GALLERY_IMAGES.length;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + total) % total);
  };

  const setSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailScrollRef.current) return;
    const activeEl = thumbnailScrollRef.current.children[currentIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  // Autoplay support if user toggles play
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      aria-label="Photographic Gallery Carousel"
      className="relative w-full overflow-hidden bg-white font-inter text-slate-900 pb-20 sm:pb-28 lg:pb-36"
    >
      {/* Background Vertical Alignment Lines (5-Column Architectural Grid Motif) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 mx-auto grid max-w-7xl grid-cols-1 divide-x divide-slate-200/60 px-4 sm:px-6 md:grid-cols-5 lg:px-8"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="hidden h-full md:block" />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==================== STAGE VIEWER ==================== */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-5xl">
            {/* Top Bar: Slide Counter & Play/Pause */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-inter text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Slide
                </span>
                <span className="font-inter text-sm font-bold tracking-widest text-slate-900 tabular-nums">
                  {String(currentIndex + 1).padStart(2, "0")}{" "}
                  <span className="font-light text-slate-400">/</span> {String(total).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                  className="inline-flex items-center gap-1.5 border border-slate-200 px-3 py-1 font-inter text-[11px] font-medium uppercase tracking-[0.16em] text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3 w-3" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" />
                      <span>Auto</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Main Stage Image Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden border border-slate-200/80 bg-slate-950 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative h-full w-full"
                >
                  <Image
                    src={GALLERY_IMAGES[currentIndex]}
                    alt={`Photograph ${currentIndex + 1}`}
                    fill
                    priority
                    sizes="(min-width: 1280px) 1024px, 100vw"
                    className="object-contain object-center select-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Floating Navigation Arrows */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-5 pointer-events-none">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous photograph"
                  className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-slate-900 shadow-md backdrop-blur-xs transition-all duration-200 hover:bg-[#0A2540] hover:text-white hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-5 pointer-events-none">
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next photograph"
                  className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-slate-900 shadow-md backdrop-blur-xs transition-all duration-200 hover:bg-[#0A2540] hover:text-white hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Stage Bottom Bar: Progress Indicator */}
            <div className="mt-4 flex items-center justify-between">
              <div className="h-1 flex-1 bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-[#0A2540] transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ==================== THUMBNAIL FILMSTRIP CAROUSEL ==================== */}
        <div className="mx-auto mt-8 w-full max-w-5xl">
          <div className="flex items-center justify-between pb-3">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Filmstrip Navigation
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous image"
                className="flex h-7 w-7 items-center justify-center border border-slate-200 text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next image"
                className="flex h-7 w-7 items-center justify-center border border-slate-200 text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={thumbnailScrollRef}
            className="flex gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {GALLERY_IMAGES.map((src, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSlide(index)}
                  aria-label={`Jump to photograph ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative aspect-[4/3] w-24 sm:w-32 shrink-0 overflow-hidden border bg-slate-100 transition-all duration-200 focus:outline-hidden",
                    isActive
                      ? "border-[#0A2540] ring-2 ring-[#0A2540] opacity-100 scale-[1.02]"
                      : "border-slate-200/80 opacity-60 hover:opacity-100 hover:border-slate-400",
                  )}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="128px"
                    className="object-cover object-center"
                  />
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 py-0.5 px-1.5 text-right font-inter text-[9px] font-bold tabular-nums tracking-wider",
                      isActive
                        ? "bg-[#0A2540] text-white"
                        : "bg-black/60 text-white/90 group-hover:bg-black/80",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
