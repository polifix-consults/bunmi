import type { MetadataRoute } from "next";

import { NAV_LINKS, SITE } from "@/lib/site";

export const dynamic = "force-static";

/** Priority hints — home first, then the conversion pages. */
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/research-publication": 0.9,
  "/policy-engagement": 0.8,
  "/about": 0.8,
  "/podcast-newsletter": 0.7,
  "/contact": 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return NAV_LINKS.map(({ href }) => ({
    url: href === "/" ? SITE.url : `${SITE.url}${href}`,
    lastModified,
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: PRIORITY[href] ?? 0.5,
  }));
}
