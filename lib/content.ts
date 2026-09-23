import type { IconName } from "@/lib/icons";

/**
 * Every string, icon name and grid hint on the site lives here so a headless
 * CMS can replace this module wholesale without touching a component. Icons are
 * referenced by serializable name — see `lib/icons.ts` for why.
 */

/* -------------------------------------------------------------------------- */
/*  Social proof                                                              */
/* -------------------------------------------------------------------------- */

export type Institution = {
  name: string;
  icon?: IconName;
  logo?: string;
};

export const INSTITUTIONS: Institution[] = [
  {
    name: "Government of Saskatchewan, Canada",
    logo: "/images/media/government.png",
  },
  {
    name: "The Policy Roundtable",
    logo: "/images/media/pRoundT.webp",
  },
  {
    name: "The Knights Collective",
    logo: "/images/media/tkcc.webp",
  },
  {
    name: "Senate of the Federal Republic of Nigeria",
    logo: "/images/media/senate.webp",
  },
  {
    name: "House of Representatives, Nigeria",
    logo: "/images/media/hOfRep.webp",
  },
  {
    name: "Africa Policy Research Institute (APRI)",
    logo: "/images/media/apri.svg",
  },
];

/* -------------------------------------------------------------------------- */
/*  About — leadership timeline & education                                    */
/* -------------------------------------------------------------------------- */

export type TimelineEntry = {
  role: string;
  org: string;
  status?: string;
  body?: string;
};

export const TIMELINE: TimelineEntry[] = [
  {
    role: "Acting Director of Strategic Policy and Legislation",
    org: "Provincial Government of Saskatchewan, Canada",
    status: "Present",
    body: "Providing leadership on cabinet-level policy development and strategic governance initiatives.",
  },
  {
    role: "Senior Legislative Advisor",
    org: "Senate of Nigeria (Federal Parliament)",
    body: "Managed inter-parliamentary and intergovernmental relations and contributed to national-level legislative strategy.",
  },
  {
    role: "Board Leadership & Civic Governance",
    org: "IPAC-Regina · SCIC · SaskCulture",
    body: "Served as Board Secretary of the Institute of Public Administration of Canada (IPAC-Regina Region), Vice President of the Board of the Saskatchewan Council for International Cooperation (SCIC), and a Board Member of SaskCulture, among other roles supporting civic engagement and cultural development.",
  },
  {
    role: "Founder & Convener",
    org: "The Policy Roundtable",
    body: "An Abuja-headquartered NGO dedicated to simplifying government policies, educating citizens, and advocating for grassroots change.",
  },
  {
    role: "Executive Director",
    org: "The Knights Collective",
    status: "Present",
    body: "A Chess community dedicated to developing young leaders at the intersection of innovation and community impact. Creating opportunities for youth to engage, learn, and lead.",
  },
];

export type EducationEntry = {
  qualification: string;
  institution: string;
  note?: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    qualification: "Master of Public Administration (MPA)",
    institution:
      "Johnson Shoyama Graduate School of Public Policy, University of Regina, Canada",
    note: "Public Administration & Policy",
  },
  {
    qualification: "Master of Legislative Studies (MLS)",
    institution:
      "National Institute for Legislative and Democratic Studies / University of Benin, Nigeria",
    note: "Statutory Drafting & Governance",
  },
  {
    qualification: "Bachelor of Laws (LL.B)",
    institution: "University of Benin, Nigeria",
    note: "Law",
  },
  {
    qualification: "Barrister-at-Law (B.L)",
    institution: "Nigerian Law School",
    note: "Legal Practice",
  },
  {
    qualification: "Executive Certificate in Anti-Corruption & Governance",
    institution: "Transparency International School on Integrity, Lithuania",
    note: "Integrity & Compliance",
  },
];

/* -------------------------------------------------------------------------- */
/*  Media & Press                                                             */
/* -------------------------------------------------------------------------- */

import { mediaAppearances } from "@/data/mockData";

export const FEATURED_MEDIA = {
  eyebrow: "Media & Press",
  platform: mediaAppearances[0].category_tag,
  title: mediaAppearances[0].title,
  description:
    "Analyzing Nigerian democracy, youth participation in electoral processes, and the power of the electorate in modern governance.",
  href: mediaAppearances[0].video_url,
  video: "/videos/featured.mp4",
  poster: mediaAppearances[0].thumbnail_url,
};

export type MediaCardItem = {
  title: string;
  platform: string;
  description?: string;
  icon: IconName;
  image: string;
  href?: string;
  className: string;
};

export const MEDIA_CARDS: MediaCardItem[] = mediaAppearances.map((item, index) => {
  const layouts = [
    "lg:aspect-auto lg:row-span-2",
    "sm:col-span-2 lg:aspect-auto lg:col-span-2",
    "lg:aspect-auto",
    "lg:aspect-auto",
    "sm:col-span-2 lg:aspect-auto lg:col-span-2",
    "lg:aspect-auto",
    "lg:aspect-auto",
    "lg:aspect-auto lg:row-span-2",
  ];

  const icons: IconName[] = ["vote", "tv", "mic", "radio", "mic", "mic", "tv", "barChart"];

  return {
    title: item.title,
    platform: item.category_tag,
    href: item.video_url,
    image: item.thumbnail_url,
    icon: icons[index % icons.length],
    className: layouts[index % layouts.length],
  };
});

/* -------------------------------------------------------------------------- */
/*  Policy & Impact                                                           */
/* -------------------------------------------------------------------------- */

export type Initiative = {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  icon: IconName;
  feature?: {
    eyebrow: string;
    title: string;
    body: string;
    tone: "light" | "dark";
    action?: { label: string; href: string };
  };
};

export const INITIATIVES: Initiative[] = [
  {
    id: "theknightscollective",
    index: "01",
    label: "Youth Leadership & Innovation",
    title: "The Knights Collective",
    body: "A Chess community dedicated to developing young leaders at the intersection of innovation and community impact. We create opportunities for youth to engage, learn, and lead, transforming ideas into tangible outcomes.",
    icon: "users",
  },
  {
    id: "legislative",
    index: "02",
    label: "Legislative Draftsmanship",
    title: "Legislative Impact",
    body: "As a legislative draftsman, I have been instrumental in the creation and drafting of multiple bills within Nigeria.",
    icon: "scale",
    feature: {
      eyebrow: "Featured Bill",
      title: "Plastic Bags Prohibition and Management Bill",
      body: "Distilling complex legal frameworks into actionable, sustainable policies for environmental and civic reform.",
      tone: "dark",
    },
  },
  {
    id: "roundtable",
    index: "03",
    label: "Grassroots Advocacy",
    title: "The Policy Roundtable",
    body: "A result-oriented NGO that curates and simplifies government policies into simple language for citizens at all levels. We lead productive conversations on governance reforms and submit actionable recommendations directly to government agencies.",
    icon: "users",
  },
  {
    id: "insights",
    index: "04",
    label: "Policy Insights & Analysis",
    title: "Economic Policy Analysis",
    body: "Dissecting major governance shifts, macroeconomic policy reforms, and institutional readiness across Africa through empirical research and public policy commentary.",
    icon: "fileText",
    feature: {
      eyebrow: "ECONOMIC POLICY ANALYSIS",
      title: "Deciphering Nigeria’s Cashless Transition",
      body: "Transitioning a massive economy away from cash requires more than just financial directives; it requires intense socio-political engineering. In collaboration with the Africa Policy Research Institute (APRI), Olubunmi dissects the timelines, institutional readiness, and real-world implications of Nigeria’s cashless policy on everyday citizens.",
      tone: "dark",
      action: {
        label: "LISTEN TO THE PODCAST →",
        href: "https://afripoli.org/podcast/nigerias-cashless-transition-how-long-will-it-take",
      },
    },
  },
];

export const BOOK = {
  title: "Copy and Paste Governance: Why Borrowed Policies Fail African Realities",
  workingTitle: "Copy and Paste Governance: Why Borrowed Policies Fail African Realities",
  status: "Available Now",
  cta: "Order your Copy here!",
  teaser:
    "Olubunmi Ayantunji takes readers on a compelling journey into one of Africa's most enduring governance challenges: why do some imported policy solutions work while others, despite the best intentions, fail to create meaningful change?",
  paragraphs: [
    "Olubunmi Ayantunji takes readers on a compelling journey into one of Africa's most enduring governance challenges: why do some imported policy solutions work while others, despite the best intentions, fail to create meaningful change?",
    "Drawing on compelling case studies, historical examples, and practical policy insights, Ayantunji examines how governance models, institutions, and development strategies cross borders and shape outcomes across Africa. Moving beyond simplistic arguments for or against policy exchange, he explores the factors that determine whether imported solutions succeed, fail, or require adaptation to local realities.",
    "The book challenges readers to rethink conventional approaches to governance and development while highlighting the importance of context, innovation, and local ownership in policymaking. It is a timely contribution to ongoing conversations about governance reform, public policy, and Africa's future.",
    "Copy and Paste Governance is essential reading for policymakers, public servants, academics, students, development practitioners, and anyone interested in understanding how better policies can create stronger institutions and more sustainable societies.",
  ],
  synopsis:
    "Olubunmi Ayantunji takes readers on a compelling journey into one of Africa's most enduring governance challenges: why do some imported policy solutions work while others, despite the best intentions, fail to create meaningful change? Drawing on compelling case studies, historical examples, and practical policy insights, Ayantunji examines how governance models, institutions, and development strategies cross borders and shape outcomes across Africa. Moving beyond simplistic arguments for or against policy exchange, he explores the factors that determine whether imported solutions succeed, fail, or require adaptation to local realities.",
  themes: ["Public Policy", "African Governance", "Contextual Innovation", "Governance Reform"],
} as const;

/* -------------------------------------------------------------------------- */
/*  Research & Publications                                                   */
/* -------------------------------------------------------------------------- */

export {
  type ResearchKind,
  type ResearchWork,
  RESEARCH_INTRO,
  RESEARCH_WORKS,
  RESEARCH_WORKS as RESEARCH,
  getResearchWorks,
} from "@/lib/research";

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

export const CONTACT_SUBJECTS = [
  "Policy Consulting",
  "Speaking",
  "Media",
  "General",
] as const;
