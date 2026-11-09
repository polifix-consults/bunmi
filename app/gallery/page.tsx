import type { Metadata } from "next";

import { PageMasthead } from "@/components/ui/PageMasthead";
import { GalleryCarousel } from "@/components/sections/GalleryCarousel";
import { CtaBand } from "@/components/sections/CtaBand";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographic archive documenting Olubunmi Ayantunji's engagements across public policy, governance, and civic initiatives.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery | ${SITE.name}`,
    description:
      "A curated photographic archive of engagements, summits, and community initiatives.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main id="main">
      <PageMasthead
        eyebrow="Photographs"
        title="Gallery"
        intro="Captured moments from Olubunmi’s policy engagements, legislative sessions, and community initiatives."
        stats={[
          { label: "Photographs", value: "33" },
        ]}
      />

      <GalleryCarousel />

      <CtaBand
        eyebrow="Press & Media"
        title="High-resolution photography and media requests."
        body="For official publication rights, high-resolution portrait assets, or press coverage inquiries, please connect with the communications team."
        primary={{ label: "Contact Communications", href: "/contact" }}
        secondary={{ label: "About Olubunmi", href: "/about" }}
      />
    </main>
  );
}
