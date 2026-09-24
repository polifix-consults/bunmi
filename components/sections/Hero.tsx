"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useWaitlistModal } from "@/components/context/WaitlistModalContext";
import { cn } from "@/lib/cn";

const SLIDES = [
  { id: "book", label: "01 · The Book", title: "Featured Publication" },
  { id: "about", label: "02 · Profile", title: "About Olubunmi" },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const { openWaitlistModal } = useWaitlistModal();

  // Autoplay carousel every 7 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + SLIDES.length) % SLIDES.length);
  };

  const setSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section
      aria-label="Hero Section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[calc(100vh-var(--nav-h))] lg:min-h-screen w-full bg-white text-slate-900 overflow-x-hidden font-inter border-b border-slate-200 flex flex-col justify-between pt-[var(--nav-h)]"
    >
      {/* Background Vertical Alignment Lines (Grid Architecture) */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-1 md:grid-cols-5 divide-x divide-slate-200/60 z-0">
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
      </div>

      {/* Main Structural Container */}
      <div className="relative z-10 h-full flex flex-col justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* ==================== HERO CAROUSEL CONTAINER ==================== */}
        <div className="relative my-auto py-3 lg:py-6 w-full">
          <div className="relative overflow-hidden w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
            {currentSlide === 0 ? (
              /* ==================== SLIDE 1: THE BOOK ==================== */
              <motion.div
                key="slide-book"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
              >
                {/* Book Cover Showcase (First on mobile, right on desktop) */}
                <div className="order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[240px] sm:max-w-[320px] md:max-w-[410px] lg:max-w-[450px] xl:max-w-[480px] aspect-[1/1.38] overflow-hidden rounded-md border border-slate-200/80 bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    <Image
                      src="/images/book_cover.png"
                      alt="Book cover"
                      fill
                      priority
                      quality={95}
                      sizes="(min-width: 1024px) 50vw, 85vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                {/* Book Info & Action Buttons (Second on mobile, left on desktop) */}
                <div className="order-2 lg:order-1 lg:col-span-6 space-y-6 max-w-xl">
                  <div className="space-y-3">
                    <p className="font-inter text-base sm:text-lg leading-relaxed text-slate-700 font-light">
                      Olubunmi Ayantunji takes readers on a compelling journey into one of Africa&apos;s most enduring governance challenges: why do some imported policy solutions work, while others, despite the best intentions, fail to create meaningful change?
                    </p>
                    <div className="font-inter text-xs uppercase tracking-widest leading-relaxed text-slate-500 font-light">
                      Available in Hardcover, Paperback &amp; Digital Editions
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4 w-full">
                    <button
                      type="button"
                      onClick={openWaitlistModal}
                      className="group inline-flex items-center gap-3 py-1 font-inter text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-slate-900 transition-colors duration-200 hover:text-[#0A2540] cursor-pointer shrink-0"
                    >
                      <span className="relative pb-1">
                        Order Your Copy
                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 transition-all duration-300 group-hover:bg-[#0A2540] group-hover:h-[2.5px]" />
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-all duration-300 group-hover:bg-[#0A2540] group-hover:text-white group-hover:translate-x-1.5 shadow-sm">
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </button>
                    <div className="relative inline-flex items-center justify-end shrink-0">
                      <Image
                        src="/media/pictures/signature.png"
                        alt="Olubunmi Ayantunji Signature"
                        width={180}
                        height={70}
                        className="h-10 sm:h-12 md:h-14 w-auto object-contain select-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ==================== SLIDE 2: ABOUT HIM ==================== */
              <motion.div
                key="slide-about"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
              >
                {/* Portrait Image (First on mobile, right on desktop) */}
                <div className="order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[240px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[490px] xl:max-w-[520px] aspect-[4/5] overflow-hidden rounded-md border border-slate-200/80 bg-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    <Image
                      src="/images/pictures/mainpic1.jpeg"
                      alt="Olubunmi (Bunmi) Ayantunji"
                      fill
                      priority
                      sizes="(min-width: 1024px) 50vw, (min-width: 640px) 75vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* About Intro & Action Buttons (Second on mobile, left on desktop) */}
                <div className="order-2 lg:order-1 lg:col-span-6 space-y-6 max-w-xl">
                  <div className="space-y-3">
                    <p className="font-inter text-base sm:text-lg leading-relaxed text-slate-700 font-light">
                      Olubunmi (Bunmi) Ayantunji is a legal practitioner by training and a public policy practitioner whose work focuses on strategic governance, legislation, and institutional development. With nearly a decade of experience in legislative governance and public policy, he brings a practical perspective to designing effective institutions and locally grounded policy solutions and innovation.
                    </p>
                    <div className="font-inter text-xs uppercase tracking-widest leading-relaxed text-slate-500 font-light">
                      The Policy Roundtable &bull; The Knights Collective
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4 w-full">
                    <Link
                      href="/about"
                      className="group inline-flex items-center gap-3 py-1 font-inter text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-slate-900 transition-colors duration-200 hover:text-[#0A2540] shrink-0"
                    >
                      <span className="relative pb-1">
                        Meet Bunmi
                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 transition-all duration-300 group-hover:bg-[#0A2540] group-hover:h-[2.5px]" />
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-all duration-300 group-hover:bg-[#0A2540] group-hover:text-white group-hover:translate-x-1.5 shadow-sm">
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </Link>
                    <div className="relative inline-flex items-center justify-end shrink-0">
                      <Image
                        src="/media/pictures/signature.png"
                        alt="Olubunmi Ayantunji Signature"
                        width={180}
                        height={70}
                        className="h-10 sm:h-12 md:h-14 w-auto object-contain select-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* ==================== CAROUSEL CONTROLS & PAGINATION ==================== */}
          <div className="mt-4 sm:mt-6 pt-3 flex items-center justify-between border-t border-slate-100 shrink-0 z-20">
            {/* Slide Indicator Tabs */}
            <div className="flex items-center gap-2 sm:gap-3">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setSlide(idx)}
                  className={cn(
                    "flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded text-[11px] font-inter uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    currentSlide === idx
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "bg-slate-100/80 text-slate-500 hover:bg-slate-200/80 hover:text-slate-900 font-medium"
                  )}
                  aria-label={`Go to ${slide.title}`}
                  aria-current={currentSlide === idx ? "true" : undefined}
                >
                  <span>{slide.label}</span>
                </button>
              ))}
            </div>

            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous Slide"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors duration-200 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next Slide"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors duration-200 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* ==================== FOOTER BAR ==================== */}
        <footer className="border-t border-slate-200 py-3 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] uppercase tracking-widest text-slate-500 font-inter">
          <div>
            © {new Date().getFullYear()} OLUBUNMI AYANTUNJI. ALL RIGHTS RESERVED.
          </div>
          <div>AVAILABLE TO TRAVEL ANYWHERE</div>
        </footer>
      </div>
    </section>
  );
}
