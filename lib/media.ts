export type MediaType = "podcast" | "newsletter";

export type MediaItem = {
  id: string;
  type: MediaType;
  title: string;
  platform: string;
  date: string;
  year: number;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  href?: string;
  featured?: boolean;
};

export const MEDIA_ITEMS: MediaItem[] = [
  // ==================== PODCASTS ====================
  {
    id: "pod-growth",
    type: "podcast",
    title: "Growth, Grit, and Greatness: Navigating New Terrains as Professionals",
    platform: "Policy Podcast",
    date: "2024",
    year: 2024,
    description:
      "Welcome to the PoliFIX Podcast! In this episode, we explore the realities of career growth, leadership, resilience, and personal development as an immigrant.\n\nDiscover how these immigrant professionals overcome obstacles, embrace change, and build a growth mindset to thrive in today’s evolving world of work. It is perfect for immigrant professionals, leaders, and innovators seeking career advice and motivation.\n\nDon’t forget to like, comment, and subscribe for more insights on professional development, leadership, and success strategies.",
    imageUrl: "https://img.youtube.com/vi/fv_vdIQ-7e4/hqdefault.jpg",
    videoUrl: "https://youtu.be/fv_vdIQ-7e4",
    href: "https://youtu.be/fv_vdIQ-7e4",
  },
  {
    id: "pod-dream",
    type: "podcast",
    title: "Dare to Dream: An Immigrant Professional’s Journey to making Public Impact",
    platform: "Policy Podcast",
    date: "2024",
    year: 2024,
    description:
      "It’s Here! \n🚨 From an Immigrant Professional to being a Politician\nHer Story Drops Today!\nIt is an inspiring story you must see.\nShe came as an immigrant. She stayed as an international student. She rose through the ranks, from corporate boardrooms to community halls and today, she’s making moves in politics.\n\nThis is more than an interview, it’s a masterclass in resilience, identity, and leadership.\nIf you’ve ever felt like the odds were stacked against you, this conversation will reignite your belief in what’s possible.\n\nWatch now and be inspired.",
    imageUrl: "https://img.youtube.com/vi/PxAO4J2UaAc/hqdefault.jpg",
    videoUrl: "https://youtu.be/PxAO4J2UaAc",
    href: "https://youtu.be/PxAO4J2UaAc",
  },
  {
    id: "pod-budgeting",
    type: "podcast",
    title: "Effective Budgeting and Economic Development in African Countries",
    platform: "Policy Podcast",
    date: "2024",
    year: 2024,
    description:
      "Learn the nexus between great economic policies and effective fiscal processes. Why some countries borrow and some other lend!.",
    imageUrl: "https://img.youtube.com/vi/1EWpeQT5VqE/hqdefault.jpg",
    videoUrl: "https://youtu.be/1EWpeQT5VqE",
    href: "https://youtu.be/1EWpeQT5VqE",
  },
  {
    id: "pod-failure",
    type: "podcast",
    title: "What is FAILURE within a government?",
    platform: "Policy Podcast",
    date: "2024",
    year: 2024,
    description:
      "What exactly is FAILURE when it comes to project management within governments? Catch up with the latest episode with Kris Wanner",
    imageUrl: "https://img.youtube.com/vi/uaAb8wBIf-s/hqdefault.jpg",
    videoUrl: "https://youtu.be/uaAb8wBIf-s",
    href: "https://youtu.be/uaAb8wBIf-s",
  },
  {
    id: "pod-project-failure",
    type: "podcast",
    title: "Why Projects Fail: The Nexus Between Governmental Fiscal Innovations and Project Implementation",
    platform: "Policy Podcast",
    date: "2024",
    year: 2024,
    description:
      "In this episode of The Civic Policy Archive Podcast, Kris Wanner discusses how data can be used for evidence-based public policy decisions and the factors that impede government projects.",
    imageUrl: "https://img.youtube.com/vi/ADBxsLJy4hc/hqdefault.jpg",
    videoUrl: "https://youtu.be/ADBxsLJy4hc",
    href: "https://youtu.be/ADBxsLJy4hc",
  },
  {
    id: "pod-governance",
    type: "podcast",
    title: "Open and Digital Governance Reform: Shaping Democracy in Developing Countries",
    platform: "Policy Podcast",
    date: "2024",
    year: 2024,
    description:
      "You are listening to the first episode of The Civic Policy Archive. In this episode, Justin Longo, PhD, an Assistant Professor at the Johnson Shoyama Graduate School of Public Policy at the University of Regina, joins host Olubunmi Ayantunji to explore significant and unique contexts, particularly in developing countries, to better understand open governance.",
    imageUrl: "https://img.youtube.com/vi/HLZVVu2U2uc/hqdefault.jpg",
    videoUrl: "https://youtu.be/HLZVVu2U2uc",
    href: "https://youtu.be/HLZVVu2U2uc",
    featured: true,
  },
  {
    id: "pod-statecraft",
    type: "podcast",
    title: "The Policy and Statecraft Experience: An Introductory Montage",
    platform: "Policy Podcast",
    date: "2024",
    year: 2024,
    description:
      "An introductory montage exploring public policy, statecraft, and governance conversations.",
    imageUrl: "https://img.youtube.com/vi/_rNVb6jZLaw/hqdefault.jpg",
    videoUrl: "https://youtu.be/_rNVb6jZLaw",
    href: "https://youtu.be/_rNVb6jZLaw",
  },

  // ==================== NEWSLETTERS (SIDE WALK PARLIAMENT) ====================
  {
    id: "swp-sos-from-south-sudan",
    type: "newsletter",
    title: "SOS from South Sudan",
    platform: "Side Walk Parliament",
    date: "May 2026",
    year: 2026,
    description:
      "While the world’s attention gravitates toward familiar theatres of war, far less is said about the humanitarian emergencies unfolding quietly in South Sudan and across vulnerable regions.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/e0bd66bb-9d3f-1198-c4af-8460b604c0ad.jpeg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=2989dc59bb",
  },
  {
    id: "swp-authoritarian-nostalgia",
    type: "newsletter",
    title: "Let’s talk about “Authoritarian Nostalgia”",
    platform: "Side Walk Parliament",
    date: "April 2026",
    year: 2026,
    description:
      "Examining the psychological and political phenomenon of authoritarian nostalgia—why citizens in transitioning democracies sometimes yearn for past strongman regimes.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/5c6c9956-96a8-5ba4-2987-63f3ca49e3d5.jpeg",
    href: "https://mailchi.mp/2916c907274d/sidewalk-parliament-sos-from-south-sudan-7507354",
  },
  {
    id: "swp-international-womens-day",
    type: "newsletter",
    title: "Happy International Women's Day",
    platform: "Side Walk Parliament",
    date: "March 8, 2026",
    year: 2026,
    description:
      "Looking beyond immediate circles to call for systemic inclusion, gender-responsive policy reform, and legislative equity in democratic governance.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/a9f4c565-34de-05cc-6399-069ba495428e.jpeg",
    href: "https://mailchi.mp/a44d8b89cf5f/side-walk-parliament-happy-international-womens-day",
  },
  {
    id: "swp-act",
    type: "newsletter",
    title: "ACT! — Power, Agency, and Civic Participation",
    platform: "Side Walk Parliament",
    date: "February 2026",
    year: 2026,
    description:
      "Our problems are not just leaders consolidating power, but the creeping normalization of apathy. A call to civic agency, active participation, and democratic renewal.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/ebc56222-e62d-82b9-8cfb-9205af8f56a2.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f01de20dbd",
  },
  {
    id: "swp-venezuela-new-year",
    type: "newsletter",
    title: "Happy New Year from Venezuela!",
    platform: "Side Walk Parliament",
    date: "January 2026",
    year: 2026,
    description:
      "Stirring civic curiosity and critical reflection on global governance, economic policies, and institutional realities observed through international perspectives.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/8cd4c96b-4f93-4911-c61c-936ef52b40b3.jpeg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=e2fd919462",
  },
  {
    id: "swp-isolationism",
    type: "newsletter",
    title: "Isolationism: Can Nations Survive Alone?",
    platform: "Side Walk Parliament",
    date: "December 2025",
    year: 2025,
    description:
      "Closing borders triggers global shockwaves. Analyzing how economic protectionism, immigration barriers, and isolationist foreign policies undermine multilateral resilience.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/e3c3c9a9-cc51-ad3b-d5da-fae1f5a443e0.jpg",
    href: "https://mailchi.mp/850b82230497/side-walk-parliament-isolationism-can-nations-survive-alone",
  },
  {
    id: "swp-brick-by-brick",
    type: "newsletter",
    title: "Brick by Brick: The Quiet Art of Public Service Innovation",
    platform: "Side Walk Parliament",
    date: "November 2025",
    year: 2025,
    description:
      "Breaking down bureaucratic inertia through the quiet, persistent craft of incremental public sector innovation and institutional governance.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/c8c2e7d2-cd89-916e-182d-da7354ff8313.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=7ee4ac8338",
  },
  {
    id: "swp-wars-diplomacy",
    type: "newsletter",
    title: "Wars, Diplomacy, and (Foreign) Policy",
    platform: "Side Walk Parliament",
    date: "October 2025",
    year: 2025,
    description:
      "A country that shows discipline rather than aggression signals confidence in its strength. Examining international diplomacy, deterrence, and strategic foreign policy.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/b0de8a10-edca-a897-46e1-e7239d653af7.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f219a1685e",
  },
  {
    id: "swp-policy-paralysis",
    type: "newsletter",
    title: "Policy Paralysis and the Price of Inaction",
    platform: "Side Walk Parliament",
    date: "October 2025",
    year: 2025,
    description:
      "Institutions crumble gradually through complacency and administrative inertia. Examining the profound economic and social costs of policy paralysis in public governance.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/581aa584-912b-b4a0-8284-a3eefca01a81.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=5c0e214aea",
  },
  {
    id: "swp-when-sport-divides",
    type: "newsletter",
    title: "When Sport Divides, Who Really Wins?",
    platform: "Side Walk Parliament",
    date: "September 2025",
    year: 2025,
    description:
      "Examining controversy at the US Open and what happens when international athletic competition intersects with geopolitical polarization and civic division.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/cb938820-587e-1272-ab42-399729fcca27.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=d5d3a0aa11",
  },
  {
    id: "swp-world-could-use-some-peace",
    type: "newsletter",
    title: "The World Could Use Some Peace",
    platform: "Side Walk Parliament",
    date: "August 2025",
    year: 2025,
    description:
      "The world could use some peace… and it starts with the leaders you elect. Exploring how citizen responsibility in elections dictates war, peace, and human dignity.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/c88a8bd6-e7f6-335b-1152-1d454a3728d9.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0450c45c78",
  },
  {
    id: "swp-leadership-save-lives",
    type: "newsletter",
    title: "Leadership Can Save Lives or Destroy Them",
    platform: "Side Walk Parliament",
    date: "July 2025",
    year: 2025,
    description:
      "A critical reflection on executive authority, moral courage in public office, and how leadership decisions hold the direct power to protect lives or inflict systemic devastation.",
    imageUrl:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/24802c26-fb38-06cf-50a0-a1ee30083e07.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0db9154bc9",
  },
];

/**
 * Helper to fetch media items.
 * Returns static MEDIA_ITEMS by default, and queries Supabase table `media_publications`
 * when SUPABASE_URL and SUPABASE_ANON_KEY are present.
 */
export async function getMediaItems(): Promise<MediaItem[]> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/media_publications?select=*&order=year.desc`,
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
          return data.map((item: Record<string, unknown>) => ({
            id: String(item.id),
            type: (item.type as MediaType) || "podcast",
            title: String(item.title),
            platform: String(item.platform || ""),
            date: String(item.date || ""),
            year: Number(item.year || new Date().getFullYear()),
            description: String(item.description || ""),
            imageUrl: String(item.image_url || item.imageUrl || ""),
            videoUrl: item.video_url ? String(item.video_url) : undefined,
            href: item.href ? String(item.href) : undefined,
            featured: Boolean(item.featured),
          }));
        }
      }
    } catch (err) {
      console.warn("Supabase fetch failed for media, falling back to local dataset:", err);
    }
  }

  return MEDIA_ITEMS;
}
