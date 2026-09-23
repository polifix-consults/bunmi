export type PolicyInstitution = {
  id: string;
  name: string;
  tagline: string;
  role: string;
  category: string;
  headerCategory: string;
  description: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  link: { label: string; href: string };
  image: string;
  overlayTitle: string;
  overlaySubtitle: string;
  brandTag: string;
  icon: "building" | "users" | "chess" | "scale";
};

export type PolicyVideo = {
  id: string;
  category_tag: string;
  network: string;
  title: string;
  date: string;
  year: number;
  description: string;
  video_url: string;
  thumbnail_url: string;
  type: "television" | "dialogue" | "analysis";
};

export const POLICY_INSTITUTIONS: PolicyInstitution[] = [
  {
    id: "theknightscollective",
    name: "The Knights Collective",
    tagline: "Youth Leadership, Strategic Play & Civic Innovation",
    role: "Co-Founder & Advisor",
    category: "Youth & Innovation",
    headerCategory: "Youth Mentor & Strategist",
    description:
      "The Knights Collective is a vibrant community built around curiosity, inclusivity, connection, and growth. We use Chess as a bridge to bring people together in a safe, welcoming space where everyone can learn, play, connect, and grow.",
    highlights: [
      "Fostering strategic decision-making through structured Chess pedagogy and game theory.",
      "Mentorship incubators connecting youth to governance, tech, and civic innovation.",
      "Community tournaments and educational bootcamps cultivating intellectual leadership.",
    ],
    metrics: [
      { label: "Cohort", value: "Emerging Leaders" },
      { label: "Core Tool", value: "Strategic Chess" },
      { label: "Mission", value: "Youth Empowerment" },
    ],
    link: { label: "Explore Youth Programs", href: "/contact" },
    image: "/images/policy_engagement/tkc_community.jpg",
    overlayTitle: "The Knights Collective",
    overlaySubtitle: "Strategic Decision-Making & Youth Leadership Incubation",
    brandTag: "TKC LEADERSHIP",
    icon: "chess",
  },
  {
    id: "policyroundtable",
    name: "The Policy Roundtable",
    tagline: "Simplifying Public Policy for Everyday Citizens",
    role: "Founder & Convener",
    category: "Civic Think Tank",
    headerCategory: "Civic Communicator & Convener",
    description:
      "The Policy Roundtable is an Abuja-based, non-governmental organization (NGO) and youth-driven think tank focused on governance, policy reform, and national issues in Nigeria. Deliberating on government policies, socio-economic issues, and white papers engaging young professionals and citizens to create actionable policy recommendations for government agencies.",
    highlights: [
      "Translating complex statutory language and budgetary frameworks into plain-language civic briefs.",
      "Convening town halls, civic forums, and grassroots policy dialogues across Nigeria.",
      "Submitting actionable policy advocacy briefs to parliamentary committees and executive bodies.",
    ],
    metrics: [
      { label: "Focus", value: "Citizen Empowerment" },
      { label: "Format", value: "Town Halls & Briefs" },
      { label: "Impact", value: "Civic Literacy" },
    ],
    link: { label: "Join Policy Dialogues", href: "/contact" },
    image: "/images/policy_engagement/policy_roundtable001.jpg",
    overlayTitle: "The Policy Roundtable Town Hall",
    overlaySubtitle: "Demystifying Legislative Budgets & Civic Accountability",
    brandTag: "ROUNDTABLE",
    icon: "users",
  },
];

export const POLICY_VIDEOS: PolicyVideo[] = [
  {
    id: "v-ait-weekend",
    category_tag: "AIT WEEKEND SHOW",
    network: "AIT Television",
    title: "Discussing Constitutional Amendment & State Autonomy",
    date: "2023",
    year: 2023,
    type: "television",
    description:
      "Tune in to THE WEEKEND SHOW every Saturday | 8-10am | AIT DSTV Channel 254 \n\nDon't forget to subscribe to our YouTube Channel\n\nWatch more interesting videos on www.tostvnetwork.com",
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
      "As Nigeria enters into an election year in 2023, it is important that electorates are properly educated on their rights and responsibilities as citizens and the voting process and we foster conversations to promote an active civic space. It is clear that though much of electoral discussions happen on social media, many electorates who go out to vote in rural communities are not online due to the gap in digital inclusion. It is therefore important that more grassroots sensitisation is done in underserved communities. This radio dialogue across all geo-political zones in Nigeria educates Nigerians in rural communities on electoral processes and political participation. We cannot truly move forward when half of the population is left behind. \n\nProject Manager: Blossom Egbude - CIPE Youth Leader\nPowered by: Center for International Private Enterprise (CIPE)",
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
      "#TheConversation\nBig Story - Call For Restructuring Analyzing The Need \n\nGuest - Olubunmi Ayantunji\n\nWatch more on www.tostvnetwork.com",
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
      "Our guest Olubunmi Ayantunji (@olubunmi.ayantunji) is a policy and governance expert and Executive Director of 'The Policy Roundtable'. \nHe shares his opinions on what diaspora communities can do to support Nigerians in Nigeria in bringing an end to bad governance.\n\n\nShot and edited by: IG - @idrex_imagery\nDirected by: IG - @grey_kene\nProduced by: IG - @LolaAded",
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
      "Senator Babajide Omoworare is the Senior Special Assistant (SSA) to the President on National Assembly Matters. \nThe session was an insightful and informative one, particularly his position on the National Assembly rejected Gender-related Bills. \n\nFeaturing: Olubunmi Ayantunji \n\n\nTimestamp:\n00:00-03:52 - Introduction\n\n03:53 - 09:49 - Motivation to transition from Law to politics/Public service\n\n09:50- 17:15    What are the preparatory step(s) one has to take before venturing into politics and who motivated and/or inspired you growing up? \n\n17:15 - 27:30 What role does character play when aspiring for public office? \n\n27:33 - 32:12 What keeps you going in spite of the challenges associated with Electioneering in Nigeria? \n\n32:12 - 37:10 - What is your take as the SSA to the President on National Assembly matters, on the recent rejection of gender-related bills?\n\n37:12 - What is your advice to young aspirants of public offices?\n\n#Leadership #Governance #Politics #Purpose #Goals #Elections #NationalAssembly #Nigeria #Transformation #2023elections\n\nVisuals: Imolekrafts",
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
      "This episode features Olubunmi Ayantunji, Esq., a lawyer and Convener of The Policy Roundtable. He shares insightful discussions on:\n\n- How his time at the University of Benin shaped his approach to life's challenges \n- The connection between student politics and mainstream politics.\n- His National Assembly Experience.\n- Other valuable discussions and reflections from his journey.\n\n\n\n\n\n\nKindly Subscribe and turn on notification to watch the full interview every Wednesday\nhttps://infiurl.site/KEMEDIA",
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
      "MORNING SPRING with TUNDE IDOWU and FEMI OJO\nGUEST: BARR. OLUBUNMI AYANTUNJI (POLICY ANALYST)",
    video_url: "https://www.youtube.com/live/8yU11bV-opg",
    thumbnail_url: "https://img.youtube.com/vi/8yU11bV-opg/hqdefault.jpg",
  },
];
