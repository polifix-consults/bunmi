const fs = require('fs');
const path = require('path');

// Load .env
const envFile = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = env.NEXT_SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !secretKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_SUPABASE_SECRET_KEY in .env");
  process.exit(1);
}

const headers = {
  apikey: secretKey,
  Authorization: `Bearer ${secretKey}`,
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates'
};

const researchData = [
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
    featured: true,
  },
  {
    id: "minutes-from-roundtable",
    year: 2024,
    date: "Special Publication",
    title: "Minutes from the Roundtable",
    kind: "Book",
    venue: "The Policy Roundtable",
    abstract:
      "This literature is a compilation of practical recommendations stemming from the highly cerebral sessions of The Policy Roundtable. A \"not for profit\", policy conversation centered organization, headquatered in Abuja, the capital city of Nigeria.",
    tags: ["The Policy Roundtable", "Policy Recommendations", "Civic Engagement", "Governance"],
    status: "Download Available",
    href: "https://fbzmzvhuutzwcnspotzj.supabase.co/storage/v1/object/public/book/minutes_from_roundtable.pdf",
    featured: true,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
];

const mediaData = [
  {
    id: "pod-growth",
    type: "podcast",
    title: "Growth, Grit, and Greatness: Navigating New Terrains as Professionals",
    platform: "PoliFIX Podcast",
    date: "2024",
    year: 2024,
    description:
      "Exploring professional resilience, career growth, navigating international transitions, and building impactful leadership across public policy and civic spaces.",
    image_url: "https://img.youtube.com/vi/fv_vdIQ-7e4/hqdefault.jpg",
    video_url: "https://youtu.be/fv_vdIQ-7e4",
    href: "https://youtu.be/fv_vdIQ-7e4",
    featured: true,
  },
  {
    id: "pod-dream",
    type: "podcast",
    title: "Dare to Dream: An Immigrant Professional’s Journey to making Public Impact",
    platform: "PoliFIX Podcast",
    date: "2024",
    year: 2024,
    description:
      "Exploring the immigrant journey, public sector career transition, and navigating public service institutions to achieve tangible civic impact.",
    image_url: "https://img.youtube.com/vi/PxAO4J2UaAc/hqdefault.jpg",
    video_url: "https://youtu.be/PxAO4J2UaAc",
    href: "https://youtu.be/PxAO4J2UaAc",
    featured: false,
  },
  {
    id: "pod-budgeting",
    type: "podcast",
    title: "Effective Budgeting and Economic Development in African Countries",
    platform: "PoliFIX Podcast",
    date: "2024",
    year: 2024,
    description:
      "A critical inquiry into subnational public expenditure, fiscal discipline, and aligning budget frameworks with real economic development.",
    image_url: "https://img.youtube.com/vi/1EWpeQT5VqE/hqdefault.jpg",
    video_url: "https://youtu.be/1EWpeQT5VqE",
    href: "https://youtu.be/1EWpeQT5VqE",
    featured: false,
  },
  {
    id: "pod-failure",
    type: "podcast",
    title: "What is FAILURE within a government?",
    platform: "PoliFIX Podcast",
    date: "2024",
    year: 2024,
    description:
      "Deconstructing systemic policy breakdown, administrative inertia, and the diagnostic metrics for identifying and correcting governance failure.",
    image_url: "https://img.youtube.com/vi/uaAb8wBIf-s/hqdefault.jpg",
    video_url: "https://youtu.be/uaAb8wBIf-s",
    href: "https://youtu.be/uaAb8wBIf-s",
    featured: false,
  },
  {
    id: "pod-project-failure",
    type: "podcast",
    title: "Why Projects Fail: The Nexus Between Governmental Fiscal Innovations and Project Implementation",
    platform: "PoliFIX Podcast",
    date: "2024",
    year: 2024,
    description:
      "Analyzing the critical connection between public financial management, governmental fiscal mechanisms, institutional capacity, and effective infrastructure project delivery.",
    image_url: "https://img.youtube.com/vi/ADBxsLJy4hc/hqdefault.jpg",
    video_url: "https://youtu.be/ADBxsLJy4hc",
    href: "https://youtu.be/ADBxsLJy4hc",
    featured: false,
  },
  {
    id: "pod-governance",
    type: "podcast",
    title: "Open and Digital Governance Reform: Shaping Democracy in Developing Countries",
    platform: "PoliFIX Podcast",
    date: "2024",
    year: 2024,
    description:
      "Exploring digital public infrastructure, transparency standards, and the roadmap for modernizing governance and civic participation in developing economies.",
    image_url: "https://img.youtube.com/vi/HLZVVu2U2uc/hqdefault.jpg",
    video_url: "https://youtu.be/HLZVVu2U2uc",
    href: "https://youtu.be/HLZVVu2U2uc",
    featured: true,
  },
  {
    id: "pod-statecraft",
    type: "podcast",
    title: "The Policy and Statecraft Experience: An Introductory Montage",
    platform: "PoliFIX Podcast",
    date: "2024",
    year: 2024,
    description:
      "An introductory exploration of statecraft, evidence-based public policy formulation, and the overarching mission of the PoliFIX Podcast.",
    image_url: "https://img.youtube.com/vi/_rNVb6jZLaw/hqdefault.jpg",
    video_url: "https://youtu.be/_rNVb6jZLaw",
    href: "https://youtu.be/_rNVb6jZLaw",
    featured: false,
  },
  {
    id: "swp-sos-from-south-sudan",
    type: "newsletter",
    title: "SOS from South Sudan",
    platform: "Side Walk Parliament",
    date: "May 2026",
    year: 2026,
    description:
      "While the world’s attention gravitates toward familiar theatres of war, far less is said about the humanitarian emergencies unfolding quietly in South Sudan and across vulnerable regions.",
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/e0bd66bb-9d3f-1198-c4af-8460b604c0ad.jpeg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=2989dc59bb",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/5c6c9956-96a8-5ba4-2987-63f3ca49e3d5.jpeg",
    href: "https://mailchi.mp/2916c907274d/sidewalk-parliament-sos-from-south-sudan-7507354",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/a9f4c565-34de-05cc-6399-069ba495428e.jpeg",
    href: "https://mailchi.mp/a44d8b89cf5f/side-walk-parliament-happy-international-womens-day",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/ebc56222-e62d-82b9-8cfb-9205af8f56a2.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f01de20dbd",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/8cd4c96b-4f93-4911-c61c-936ef52b40b3.jpeg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=e2fd919462",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/e3c3c9a9-cc51-ad3b-d5da-fae1f5a443e0.jpg",
    href: "https://mailchi.mp/850b82230497/side-walk-parliament-isolationism-can-nations-survive-alone",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/c8c2e7d2-cd89-916e-182d-da7354ff8313.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=7ee4ac8338",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/b0de8a10-edca-a897-46e1-e7239d653af7.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f219a1685e",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/581aa584-912b-b4a0-8284-a3eefca01a81.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=5c0e214aea",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/cb938820-587e-1272-ab42-399729fcca27.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=d5d3a0aa11",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/c88a8bd6-e7f6-335b-1152-1d454a3728d9.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0450c45c78",
    featured: false,
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
    image_url:
      "https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/24802c26-fb38-06cf-50a0-a1ee30083e07.jpg",
    href: "https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0db9154bc9",
    featured: false,
  },
];

const policyVideosData = [
  {
    id: "v-ait-weekend",
    category_tag: "AIT WEEKEND SHOW",
    network: "AIT Television",
    title: "Discussing Constitutional Amendment & State Autonomy",
    date: "2023",
    year: 2023,
    type: "television",
    description:
      "Olubunmi Ayantunji breaks down the urgent need for true state policing, local government autonomy, and why piecemeal constitutional amendments fail Nigerians.",
    video_url: "https://youtu.be/H9W7NWZcZc0",
    thumbnail_url: "https://img.youtube.com/vi/H9W7NWZcZc0/hqdefault.jpg",
  },
  {
    id: "v-citizen-project",
    category_tag: "THE CITIZEN PROJECT",
    network: "Civic Discourse Network",
    title: "Nigerian Democracy and The Civic Space",
    date: "2023",
    year: 2023,
    type: "dialogue",
    description:
      "A deep-dive conversation exploring youth participation, constitutional safeguards, and protecting the civic space against authoritarian creep.",
    video_url: "https://youtu.be/wOH1OnLdDwo",
    thumbnail_url: "https://img.youtube.com/vi/wOH1OnLdDwo/hqdefault.jpg",
  },
  {
    id: "v-tos-tv",
    category_tag: "TOS TV NETWORK",
    network: "TOS TV News",
    title: "Call For Restructuring: Analyzing The Need",
    date: "2023",
    year: 2023,
    type: "television",
    description:
      "An exhaustive inquiry into subnational fiscal devolution, revenue allocation formulas, and the governance mechanisms required for true federalism.",
    video_url: "https://youtu.be/-bgBMaY64wY",
    thumbnail_url: "https://img.youtube.com/vi/-bgBMaY64wY/hqdefault.jpg",
  },
  {
    id: "v-tensions-podium",
    category_tag: "TENSIONS PODIUM",
    network: "Tensions Media",
    title: "Nigerian Politics and Its Impact on Citizens in Diaspora",
    date: "2023",
    year: 2023,
    type: "dialogue",
    description:
      "Examining diaspora political engagement, out-of-country voting rights, and how dual-system expertise enriches subnational policy design.",
    video_url: "https://youtu.be/fKCKRj6G1sA",
    thumbnail_url: "https://img.youtube.com/vi/fKCKRj6G1sA/hqdefault.jpg",
  },
  {
    id: "v-dignity-stock",
    category_tag: "DIGNITY STOCK CLIENT SHOW",
    network: "Dignity Stock Network",
    title: "Exclusive with Senator Babajide Omoworare",
    date: "2022",
    year: 2022,
    type: "analysis",
    description:
      "In conversation with Senator Babajide Omoworare on the inner mechanics of legislative drafting, parliamentary committees, and statutory review.",
    video_url: "https://youtu.be/_-KAz5NRDZA",
    thumbnail_url: "https://img.youtube.com/vi/_-KAz5NRDZA/hqdefault.jpg",
  },
  {
    id: "v-ke-media",
    category_tag: "K&E MEDIA",
    network: "K&E Educational Series",
    title: "UNIBEN Instills A Coordinated Unconscious Response",
    date: "2022",
    year: 2022,
    type: "dialogue",
    description:
      "Reflecting on legal training, institutional discipline, and youth mindset cultivation within Nigerian tertiary education.",
    video_url: "https://youtu.be/bB6QjFg_Nok",
    thumbnail_url: "https://img.youtube.com/vi/bB6QjFg_Nok/hqdefault.jpg",
  },
  {
    id: "v-western-spring",
    category_tag: "WESTERN SPRING TV",
    network: "Western Spring Television",
    title: "NBS Employment Report Breakdown",
    date: "2022",
    year: 2022,
    type: "television",
    description:
      "Live economic analysis dissecting National Bureau of Statistics labour data, youth unemployment metrics, and required macroeconomic interventions.",
    video_url: "https://www.youtube.com/live/8yU11bV-opg",
    thumbnail_url: "https://img.youtube.com/vi/8yU11bV-opg/hqdefault.jpg",
  },
];

// Ensure all objects in a collection have the exact same keys for PostgREST
function normalizeResearch(items) {
  return items.map(item => ({
    id: item.id,
    title: item.title,
    kind: item.kind,
    date: item.date || null,
    year: item.year,
    venue: item.venue || '',
    abstract: item.abstract || '',
    tags: item.tags || [],
    status: item.status || null,
    href: item.href || null,
    featured: Boolean(item.featured)
  }));
}

function normalizeMedia(items) {
  return items.map(item => ({
    id: item.id,
    type: item.type,
    title: item.title,
    platform: item.platform,
    date: item.date,
    year: item.year,
    description: item.description,
    image_url: item.image_url,
    video_url: item.video_url || null,
    href: item.href || null,
    featured: Boolean(item.featured)
  }));
}

function normalizePolicyVideos(items) {
  return items.map(item => ({
    id: item.id,
    category_tag: item.category_tag,
    network: item.network,
    title: item.title,
    date: item.date,
    year: item.year,
    type: item.type,
    description: item.description,
    video_url: item.video_url,
    thumbnail_url: item.thumbnail_url
  }));
}

async function seedTable(table, data) {
  console.log(`\nSeeding table '${table}' (${data.length} records)...`);
  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log(`✓ Successfully seeded/upserted table '${table}'`);
      return true;
    } else {
      const err = await res.text();
      console.error(`✗ Failed to seed '${table}': [${res.status}] ${err}`);
      return false;
    }
  } catch (e) {
    console.error(`✗ Error seeding '${table}':`, e.message);
    return false;
  }
}

async function run() {
  console.log('=== Supabase Data Sync & Seeding ===');
  console.log('Target Supabase instance:', url);

  const r1 = await seedTable('research_publications', normalizeResearch(researchData));
  const r2 = await seedTable('media_publications', normalizeMedia(mediaData));
  const r3 = await seedTable('policy_videos', normalizePolicyVideos(policyVideosData));

  if (r1 && r2 && r3) {
    console.log('\n🎉 ALL DATA HAS BEEN SUCCESSFULLY MOVED & SEEDED TO SUPABASE!');
  } else {
    console.log('\n⚠️ Notice: If any table returned 404 (e.g. policy_videos, waitlist_subscribers, contact_messages), run the schema.sql in Supabase Dashboard SQL Editor:');
    console.log('👉 https://supabase.com/dashboard/project/fbzmzvhuutzwcnspotzj/sql');
  }
}

run().catch(console.error);
