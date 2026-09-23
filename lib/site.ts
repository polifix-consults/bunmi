function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl && envUrl.length > 0) {
    return envUrl.startsWith("http://") || envUrl.startsWith("https://")
      ? envUrl
      : `https://${envUrl}`;
  }
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl && vercelUrl.length > 0) {
    return `https://${vercelUrl}`;
  }
  return "https://olubunmiayantunji.com";
}

/**
 * Single source of truth for site-wide identity, URLs and contact channels.
 * Replace the placeholder domain, email and social handles before launch.
 */
export const SITE = {
  name: "Olubunmi Ayantunji",
  shortName: "Olubunmi Ayantunji",
  url: getSiteUrl(),
  tagline: "Bridging the Gap Between Policy and the People",
  description:
    "Olubunmi (Bunmi) Ayantunji is a governance and policy professional whose work spans governance reform, public policy design, and strategic innovation across Nigeria and Canada.",
  locale: "en_CA",
  email: "olubunmiayantunji@gmail.com",
  locations: "Available to travel anywhere",
  socials: {
    linkedin: "https://www.linkedin.com/in/bunmi-ayantunji-860355134",
    x: "https://x.com/oluubunmi",
    instagram: "https://www.instagram.com/bunmi.ayantunji",
    facebook: "https://www.facebook.com/share/1F34U7bnzn/",
  },
  keywords: [
    "Olubunmi Ayantunji",
    "public policy analyst",
    "legislative draftsman",
    "policy consulting",
    "The Knights Collective",
    "The Policy Roundtable",
    "governance Nigeria",
    "public administration Canada",
    "legislative drafting",
    "civic engagement",
  ],
} as const;

export type NavSubLink = {
  title: string;
  tagline?: string;
  href: string;
  external?: boolean;
};

export type NavLink = {
  href: string;
  label: string;
  subLinks?: NavSubLink[];
};

export const POLICY_PLATFORMS: NavSubLink[] = [
  {
    title: "The Policy Roundtable",
    tagline: "Informing to Equip Voices",
    href: "https://policyroundtable.org/",
    external: true,
  },
  {
    title: "The Knights Collective",
    tagline: "Where Strategy Meets Culture",
    href: "https://www.theknightscollective.org/",
    external: true,
  },
];

export const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/research-publication", label: "Research & Publications" },
  { href: "/podcast-newsletter", label: "Podcasts" },
  {
    href: "/policy-engagement",
    label: "Policy Engagement",
    subLinks: POLICY_PLATFORMS,
  },
  { href: "/contact", label: "Contact" },
];
