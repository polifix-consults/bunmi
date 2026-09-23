import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/CtaBand";
import { MediaPageClient } from "@/components/sections/MediaPageClient";
import { getMediaItems } from "@/lib/media";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Podcasts",
  description:
    "Official podcasts, broadcast appearances, and policy commentary by Olubunmi Ayantunji.",
  alternates: { canonical: "/podcast-newsletter" },
  openGraph: {
    title: `Podcasts | ${SITE.name}`,
    description:
      "Broadcast and policy podcast appearances by Olubunmi Ayantunji.",
    url: "/podcast-newsletter",
  },
};

export default async function MediaPage() {
  const items = await getMediaItems();

  return (
    <main id="main">
      <MediaPageClient initialItems={items} />
      <CtaBand
        eyebrow="Media enquiries"
        title="Booking commentary or a panel appearance?"
        body="Available for media commentary on governance, legislative reform and public administration."
        primary={{ label: "Get in Touch", href: "/contact" }}
        secondary={{ label: "About Olubunmi", href: "/about" }}
      />
    </main>
  );
}

