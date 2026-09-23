"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
  platform?: string;
};

/**
 * Fullscreen video lightbox modal matching Dambisa Moyo speaking page player style.
 */
export function VideoModal({
  isOpen,
  onClose,
  videoUrl = "",
  title = "",
  platform = "",
}: VideoModalProps) {
  const youtubeId = getYouTubeId(videoUrl);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && youtubeId ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl bg-slate-900 shadow-2xl ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-950 px-6 py-4">
              <div>
                <p className="font-inter text-[0.625rem] font-medium uppercase tracking-[0.2em] text-slate-300">
                  {platform}
                </p>
                <h3 className="mt-0.5 line-clamp-1 text-base font-semibold text-white sm:text-lg">
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close video"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Fullscreen Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
