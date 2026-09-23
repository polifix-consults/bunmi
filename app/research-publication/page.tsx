import type { Metadata } from "next";

import { ResearchLibrary } from "@/components/sections/ResearchLibrary";
import { RESEARCH, RESEARCH_INTRO, type ResearchKind } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research & Publications",
  description: RESEARCH_INTRO,
  alternates: { canonical: "/research-publication" },
  openGraph: {
    title: `Research & Publications | ${SITE.name}`,
    description: RESEARCH_INTRO,
    url: "/research-publication",
  },
};

/** Map an editorial work type onto the closest schema.org CreativeWork type. */
const SCHEMA_TYPE: Record<string, string> = {
  Book: "Book",
  "Journal Article": "ScholarlyArticle",
  "Working Paper": "ScholarlyArticle",
  "Report / Working Paper": "ScholarlyArticle",
  "Policy Brief": "Report",
  "Policy Brief / Legislative Draft": "Legislation",
  "Legislative Draft": "Legislation",
  Report: "Report",
  Essay: "Article",
  "Essay / Media": "Article",
  Newsletter: "Article",
};

const author = { "@type": "Person", name: SITE.name, url: SITE.url };

/**
 * A CollectionPage whose mainEntity is an ordered ItemList of every work —
 * each surfaced as the CreativeWork subtype that best matches its kind, so the
 * bibliography is machine-readable, not just visible.
 */
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Research & Publication | ${SITE.name}`,
  description: RESEARCH_INTRO,
  url: `${SITE.url}/research-publication`,
  about: "Public policy, legislative drafting and public administration",
  mainEntity: {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: RESEARCH.length,
    itemListElement: RESEARCH.map((work, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": SCHEMA_TYPE[work.kind] || "CreativeWork",
        name: work.title,
        abstract: work.abstract,
        datePublished: String(work.year),
        inLanguage: "en",
        author,
        about: work.tags,
        ...(work.venue ? { publisher: { "@type": "Organization", name: work.venue } } : {}),
        ...(work.href ? { url: work.href } : {}),
      },
    })),
  },
};

export default function BookPage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <ResearchLibrary />
    </main>
  );
}
