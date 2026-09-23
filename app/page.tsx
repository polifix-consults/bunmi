import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { BookTeaser } from "@/components/sections/BookTeaser";
import { Hero } from "@/components/sections/Hero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd />
      <Hero />
      <BookTeaser />
    </main>
  );
}
