"use client";

import { useState } from "react";
import { mediaAppearances } from "@/data/mockData";
import { VideoHero } from "@/components/sections/VideoHero";
import { MediaShowcase } from "@/components/sections/MediaShowcase";
import { VideoModal } from "@/components/ui/VideoModal";
import type { MediaItem } from "@/lib/media";

// Default top featured video for the hero
const featuredMedia =
  mediaAppearances.find((m) => m.id === "m6") ||
  mediaAppearances.find((m) => m.title.includes("Open and Digital Governance")) ||
  mediaAppearances[0];

export function MediaPageClient() {
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

  const handleSelectCard = (card: MediaItem) => {
    if (card.videoUrl) {
      setModalVideo({
        isOpen: true,
        videoUrl: card.videoUrl,
        title: card.title,
        platform: card.platform,
      });
    } else if (card.href) {
      window.open(card.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <VideoHero
        activeMedia={featuredMedia}
        isPlayingInline={true}
        onPlayInline={() => {
          setModalVideo({
            isOpen: true,
            videoUrl: featuredMedia.video_url,
            title: featuredMedia.title,
            platform: featuredMedia.category_tag,
          });
        }}
      />

      <MediaShowcase
        onSelectCard={handleSelectCard}
      />

      <VideoModal
        isOpen={modalVideo.isOpen}
        onClose={() => setModalVideo((prev) => ({ ...prev, isOpen: false }))}
        videoUrl={modalVideo.videoUrl}
        title={modalVideo.title}
        platform={modalVideo.platform}
      />
    </>
  );
}
