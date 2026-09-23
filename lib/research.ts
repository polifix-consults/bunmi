export type ResearchKind =
  | "Book"
  | "Newsletter"
  | "Report / Working Paper"
  | "Working Paper"
  | "Essay / Media"
  | "Essay"
  | "Policy Brief / Legislative Draft"
  | "Policy Brief"
  | "Legislative Draft"
  | "Journal Article"
  | "Report"
  | string;

export type ResearchWork = {
  id: string;
  year: number;
  date?: string;
  title: string;
  kind: ResearchKind;
  venue: string;
  abstract: string;
  tags: string[];
  status?: string;
  href?: string;
  downloadUrl?: string;
  coverImage?: string;
  featured?: boolean;
};

export const RESEARCH_INTRO =
  "Peer-reviewed articles, working papers, legislative drafts, policy briefs, and Side Walk Parliament newsletters on governance, legislative drafting, and public administration across Nigeria and Canada.";

/**
 * Primary list of research publications, policy works, and newsletters by Olubunmi Ayantunji.
 * Used for local state and as initial/fallback data for Supabase integration.
 */
export const RESEARCH_WORKS: ResearchWork[] = [
  {
    id: "copy-and-paste-governance",
    year: 2025,
    date: "Available Now",
    title: "Copy and Paste Governance: Why Borrowed Policies Fail African Realities",
    kind: "Book",
    venue: "Published Work",
    abstract:
      "Olubunmi Ayantunji takes readers on a compelling journey into one of Africa's most enduring governance challenges: why do some imported policy solutions spark progress, while others, despite the best intentions, fail to create meaningful change? Drawing on compelling case studies, historical examples, and practical policy insights, Ayantunji examines how governance models, institutions, and development strategies cross borders and shape outcomes across Africa. Essential reading for policymakers, public servants, academics, students, and development practitioners.",
    tags: ["Policy Transfer", "African Governance", "Public Administration", "Governance Reform"],
    status: "Available Now",
    coverImage: "/images/book_cover.png",
    featured: true,
  },
  {
    id: "minutes-from-roundtable",
    year: 2024,
    date: "Special Publication",
    title: "Minutes from the roundtable",
    kind: "Book",
    venue: "The Policy Roundtable",
    abstract:
      "This literature is a compilation of practical recommendations stemming from the highly cerebral sessions of The Policy Roundtable. A \"not for profit\", policy conversation centered organization, headquatered in Abuja, the capital city of Nigeria.",
    tags: ["The Policy Roundtable", "Policy Recommendations", "Civic Engagement", "Governance"],
    status: "Download Available",
    href: "https://fbzmzvhuutzwcnspotzj.supabase.co/storage/v1/object/public/Books/minutes_from_roundtable.pdf",
    downloadUrl: "https://fbzmzvhuutzwcnspotzj.supabase.co/storage/v1/object/public/Books/minutes_from_roundtable.pdf",
    coverImage: "/images/media/pRoundT.webp",
    featured: false,
  },
  {
    id: "plastic-bags-prohibition-bill",
    year: 2024,
    date: "2024",
    title: "The Plastic Bags Prohibition and Management Bill",
    kind: "Policy Brief / Legislative Draft",
    venue: "National Assembly of Nigeria · Legislative Drafting Committee",
    abstract:
      "Ayantunji served as a consultant and legislative draftsman for a Nigerian parliament committee to structure this bill, which aims to prohibit the manufacture and use of commercial plastic bags to mitigate environmental degradation.",
    tags: ["Legislative Drafting", "Environmental Policy", "Statutory Reform", "National Assembly"],
    status: "Legislative Draft",
  },
  {
    id: "nigeria-cashless-transition",
    year: 2023,
    date: "July 2023",
    title: "Nigeria's Cashless Transition: How Long Will it Take?",
    kind: "Essay / Media",
    venue: "The Africa Hour Podcast (APRI)",
    abstract:
      "An analysis of the socio-economic and legal implications of Nigeria's transition to a cashless economy, the Central Bank's implementation of the eNaira, and the regulatory hurdles of digital payment adoption.",
    tags: ["Cashless Economy", "eNaira", "Digital Governance", "APRI"],
    status: "Podcast / Essay",
    href: "https://afripoli.org/podcast/nigerias-cashless-transition-how-long-will-it-take",
  },
  {
    id: "cso-budgeting-process-nigeria",
    year: 2022,
    date: "April 2022",
    title: "The Role of Civil Society Organizations (CSOs) in Strengthening the Budgeting Process in Nigeria",
    kind: "Report / Working Paper",
    venue: "National Institute for Legislative and Democratic Studies (NILDS) Repository",
    abstract:
      "A primary research study examining how civil society organizations hold the 9th National Assembly accountable during budget processes. The paper identifies systemic factors militating against legislative budgeting and proposes reforms based on primary interview data.",
    tags: ["Budgeting Process", "Civil Society", "Legislative Accountability", "NILDS"],
    status: "Open access",
    href: "https://ir.nilds.gov.ng/handle/123456789/978?show=full",
  },
  {
    id: "change-narrative-youth-patriotism",
    year: 2021,
    date: "October 2021",
    title: "My Mission is to Change the Narrative, Ignite Sense of Patriotism in Youths",
    kind: "Essay / Media",
    venue: "THISDAYLive",
    abstract:
      "An extensive interview detailing the founding of The Policy Roundtable. Ayantunji discusses his shift from legal practice to public policy, and how his NGO simplifies complex government policies to foster youth civic engagement.",
    tags: ["Civic Engagement", "Youth Advocacy", "The Policy Roundtable", "THISDAY"],
    status: "Media Feature",
    href: "https://www.thisdaylive.com/2021/10/07/my-mission-is-to-change-the-narrative-ignite-sense-of-patriotism-in-youths/",
  },

  // ==================== SIDE WALK PARLIAMENT NEWSLETTERS ====================
  {
    id: "swp-sos-from-south-sudan",
    year: 2026,
    date: "May 2026",
    title: "SOS from South Sudan",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "While the world’s attention gravitates toward familiar theatres of war, far less is said about the humanitarian emergencies unfolding quietly in South Sudan and across vulnerable regions.",
    tags: ["Newsletter", "Side Walk Parliament", "Humanitarian Policy"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=2989dc59bb",
  },
  {
    id: "swp-authoritarian-nostalgia",
    year: 2026,
    date: "April 2026",
    title: "Let’s talk about “Authoritarian Nostalgia”",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "Examining the psychological and political phenomenon of authoritarian nostalgia—why citizens in transitioning democracies sometimes yearn for past strongman regimes.",
    tags: ["Newsletter", "Side Walk Parliament", "Democratic Governance"],
    status: "Newsletter Issue",
    href: "https://mailchi.mp/2916c907274d/sidewalk-parliament-sos-from-south-sudan-7507354",
  },
  {
    id: "swp-international-womens-day",
    year: 2026,
    date: "March 2026",
    title: "Happy International Women's Day",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "Looking beyond immediate circles to call for systemic inclusion, gender-responsive policy reform, and legislative equity in democratic governance.",
    tags: ["Newsletter", "Side Walk Parliament", "Gender Equity"],
    status: "Newsletter Issue",
    href: "https://mailchi.mp/a44d8b89cf5f/side-walk-parliament-happy-international-womens-day",
  },
  {
    id: "swp-act",
    year: 2026,
    date: "February 2026",
    title: "ACT! — Power, Agency, and Civic Participation",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "Our problems are not just leaders consolidating power, but the creeping normalization of apathy. A call to civic agency, active participation, and democratic renewal.",
    tags: ["Newsletter", "Side Walk Parliament", "Civic Participation"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f01de20dbd",
  },
  {
    id: "swp-venezuela-new-year",
    year: 2026,
    date: "January 2026",
    title: "Happy New Year from Venezuela!",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "Stirring civic curiosity and critical reflection on global governance, economic policies, and institutional realities observed through international perspectives.",
    tags: ["Newsletter", "Side Walk Parliament", "Global Governance"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=e2fd919462",
  },
  {
    id: "swp-isolationism",
    year: 2025,
    date: "December 2025",
    title: "Isolationism: Can Nations Survive Alone?",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "Closing borders triggers global shockwaves. Analyzing how economic protectionism, immigration barriers, and isolationist foreign policies undermine multilateral resilience.",
    tags: ["Newsletter", "Side Walk Parliament", "Foreign Policy"],
    status: "Newsletter Issue",
    href: "https://mailchi.mp/850b82230497/side-walk-parliament-isolationism-can-nations-survive-alone",
  },
  {
    id: "swp-brick-by-brick",
    year: 2025,
    date: "November 2025",
    title: "Brick by Brick: The Quiet Art of Public Service Innovation",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "Breaking down bureaucratic inertia through the quiet, persistent craft of incremental public sector innovation and institutional governance.",
    tags: ["Newsletter", "Side Walk Parliament", "Public Service"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=7ee4ac8338",
  },
  {
    id: "swp-wars-diplomacy",
    year: 2025,
    date: "October 2025",
    title: "Wars, Diplomacy, and (Foreign) Policy",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "A country that shows discipline rather than aggression signals confidence in its strength. Examining international diplomacy, deterrence, and strategic foreign policy.",
    tags: ["Newsletter", "Side Walk Parliament", "Diplomacy"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f219a1685e",
  },
  {
    id: "swp-policy-paralysis",
    year: 2025,
    date: "October 2025",
    title: "Policy Paralysis and the Price of Inaction",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "Institutions crumble gradually through complacency and administrative inertia. Examining the profound economic and social costs of policy paralysis in public governance.",
    tags: ["Newsletter", "Side Walk Parliament", "Policy Analysis"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=5c0e214aea",
  },
  {
    id: "swp-when-sport-divides",
    year: 2025,
    date: "September 2025",
    title: "When Sport Divides, Who Really Wins?",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "Examining controversy at the US Open and what happens when international athletic competition intersects with geopolitical polarization and civic division.",
    tags: ["Newsletter", "Side Walk Parliament", "Culture & Society"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=d5d3a0aa11",
  },
  {
    id: "swp-world-could-use-some-peace",
    year: 2025,
    date: "August 2025",
    title: "The World Could Use Some Peace",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "The world could use some peace… and it starts with the leaders you elect. Exploring how citizen responsibility in elections dictates war, peace, and human dignity.",
    tags: ["Newsletter", "Side Walk Parliament", "Peace & Leadership"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0450c45c78",
  },
  {
    id: "swp-leadership-save-lives",
    year: 2025,
    date: "July 2025",
    title: "Leadership Can Save Lives or Destroy Them",
    kind: "Newsletter",
    venue: "Side Walk Parliament Newsletter",
    abstract:
      "A critical reflection on executive authority, moral courage in public office, and how leadership decisions hold the direct power to protect lives or inflict systemic devastation.",
    tags: ["Newsletter", "Side Walk Parliament", "Leadership"],
    status: "Newsletter Issue",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0db9154bc9",
  },
];

/**
 * Helper to fetch research works.
 * Currently returns the static RESEARCH_WORKS dataset.
 * When Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)
 * are provided, it can query Supabase directly with fallback to the local list.
 */
export async function getResearchWorks(): Promise<ResearchWork[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/research_publications?select=*&order=year.desc`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          next: { revalidate: 60 },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped: ResearchWork[] = data.map((item: Record<string, unknown>) => {
            const id = String(item.id);
            const isRoundtable = id === "minutes-from-roundtable";
            const isCopyAndPaste = id === "copy-and-paste-governance";

            const downloadUrl = item.download_url
              ? String(item.download_url)
              : isRoundtable
              ? "https://fbzmzvhuutzwcnspotzj.supabase.co/storage/v1/object/public/Books/minutes_from_roundtable.pdf"
              : undefined;

            const coverImage = item.cover_image
              ? String(item.cover_image)
              : isCopyAndPaste
              ? "/images/book_cover.png"
              : isRoundtable
              ? "/images/media/pRoundT.webp"
              : undefined;

            return {
              id,
              year: Number(item.year),
              date: item.date ? String(item.date) : undefined,
              title: String(item.title),
              kind: String(item.kind),
              venue: String(item.venue || ""),
              abstract: String(item.abstract || ""),
              tags: Array.isArray(item.tags) ? item.tags : [],
              status: item.status ? String(item.status) : undefined,
              href: item.href ? String(item.href) : (downloadUrl || undefined),
              downloadUrl,
              coverImage,
              featured: Boolean(item.featured),
            };
          });

          // Ensure Minutes from the Roundtable is present
          if (!mapped.some((item) => item.id === "minutes-from-roundtable")) {
            const roundtableFallback = RESEARCH_WORKS.find(
              (w) => w.id === "minutes-from-roundtable"
            );
            if (roundtableFallback) {
              mapped.splice(1, 0, roundtableFallback);
            }
          }

          return mapped;
        }
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local dataset:", err);
    }
  }

  return RESEARCH_WORKS;
}
