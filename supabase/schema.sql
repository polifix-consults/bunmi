-- ==============================================================================
-- Supabase Schema & Seed Data: Olubunmi Ayantunji Portfolio
-- Public Policy Analyst, Legislative Draftsman & Author
-- ==============================================================================

-- ==============================================================================
-- 1. TABLE: research_publications
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.research_publications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  kind TEXT NOT NULL,
  date TEXT,
  year INTEGER NOT NULL,
  venue TEXT,
  abstract TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  status TEXT,
  href TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.research_publications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public research publications are readable by everyone" ON public.research_publications;
CREATE POLICY "Public research publications are readable by everyone"
  ON public.research_publications
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role can insert research publications" ON public.research_publications;
CREATE POLICY "Service role can insert research publications"
  ON public.research_publications
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed Data: Research Works & Publications
INSERT INTO public.research_publications (id, title, kind, date, year, venue, abstract, tags, status, href, featured)
VALUES
  (
    'copy-and-paste-governance',
    'Copy and Paste Governance: Why Borrowed Policies Fail African Realities',
    'Book',
    'Available Now',
    2025,
    'Published Work',
    'Olubunmi Ayantunji takes readers on a compelling journey into one of Africa''s most enduring governance challenges: why do some imported policy solutions spark progress, while others, despite the best intentions, fail to create meaningful change? Drawing on compelling case studies, historical examples, and practical policy insights, Ayantunji examines how governance models, institutions, and development strategies cross borders and shape outcomes across Africa. Essential reading for policymakers, public servants, academics, students, and development practitioners.',
    ARRAY['Policy Transfer', 'African Governance', 'Public Administration', 'Governance Reform'],
    'Available Now',
    NULL,
    TRUE
  ),
  (
    'plastic-bags-prohibition-bill',
    'The Plastic Bags Prohibition and Management Bill',
    'Policy Brief / Legislative Draft',
    '2024',
    2024,
    'National Assembly of Nigeria · Legislative Drafting Committee',
    'Ayantunji served as a consultant and legislative draftsman for a Nigerian parliament committee to structure this bill, which aims to prohibit the manufacture and use of commercial plastic bags to mitigate environmental degradation.',
    ARRAY['Legislative Drafting', 'Environmental Policy', 'Statutory Reform', 'National Assembly'],
    'Legislative Draft',
    NULL,
    FALSE
  ),
  (
    'nigeria-cashless-transition',
    'Nigeria''s Cashless Transition: How Long Will it Take?',
    'Essay / Media',
    'July 2023',
    2023,
    'The Africa Hour Podcast (APRI)',
    'An analysis of the socio-economic and legal implications of Nigeria''s transition to a cashless economy, the Central Bank''s implementation of the eNaira, and the regulatory hurdles of digital payment adoption.',
    ARRAY['Cashless Economy', 'eNaira', 'Digital Governance', 'APRI'],
    'Podcast / Essay',
    'https://afripoli.org/podcast/nigerias-cashless-transition-how-long-will-it-take',
    FALSE
  ),
  (
    'cso-budgeting-process-nigeria',
    'The Role of Civil Society Organizations (CSOs) in Strengthening the Budgeting Process in Nigeria',
    'Report / Working Paper',
    'April 2022',
    2022,
    'National Institute for Legislative and Democratic Studies (NILDS) Repository',
    'A primary research study examining how civil society organizations hold the 9th National Assembly accountable during budget processes. The paper identifies systemic factors militating against legislative budgeting and proposes reforms based on primary interview data.',
    ARRAY['Budgeting Process', 'Civil Society', 'Legislative Accountability', 'NILDS'],
    'Open access',
    'https://ir.nilds.gov.ng/handle/123456789/978?show=full',
    FALSE
  ),
  (
    'change-narrative-youth-patriotism',
    'My Mission is to Change the Narrative, Ignite Sense of Patriotism in Youths',
    'Essay / Media',
    'October 2021',
    2021,
    'THISDAYLive',
    'An extensive interview detailing the founding of The Policy Roundtable. Ayantunji discusses his shift from legal practice to public policy, and how his NGO simplifies complex government policies to foster youth civic engagement.',
    ARRAY['Civic Engagement', 'Youth Advocacy', 'The Policy Roundtable', 'THISDAY'],
    'Media Feature',
    'https://www.thisdaylive.com/2021/10/07/my-mission-is-to-change-the-narrative-ignite-sense-of-patriotism-in-youths/',
    FALSE
  ),
  (
    'swp-sos-from-south-sudan',
    'SOS from South Sudan',
    'Newsletter',
    'May 2026',
    2026,
    'Side Walk Parliament Newsletter',
    'While the world’s attention gravitates toward familiar theatres of war, far less is said about the humanitarian emergencies unfolding quietly in South Sudan and across vulnerable regions.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Humanitarian Policy'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=2989dc59bb',
    FALSE
  ),
  (
    'swp-authoritarian-nostalgia',
    'Let’s talk about “Authoritarian Nostalgia”',
    'Newsletter',
    'April 2026',
    2026,
    'Side Walk Parliament Newsletter',
    'Examining the psychological and political phenomenon of authoritarian nostalgia—why citizens in transitioning democracies sometimes yearn for past strongman regimes.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Democratic Governance'],
    'Newsletter Issue',
    'https://mailchi.mp/2916c907274d/sidewalk-parliament-sos-from-south-sudan-7507354',
    FALSE
  ),
  (
    'swp-international-womens-day',
    'Happy International Women''s Day',
    'Newsletter',
    'March 8, 2026',
    2026,
    'Side Walk Parliament Newsletter',
    'Looking beyond immediate circles to call for systemic inclusion, gender-responsive policy reform, and legislative equity in democratic governance.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Gender Equity'],
    'Newsletter Issue',
    'https://mailchi.mp/a44d8b89cf5f/side-walk-parliament-happy-international-womens-day',
    FALSE
  ),
  (
    'swp-act',
    'ACT! — Power, Agency, and Civic Participation',
    'Newsletter',
    'February 2026',
    2026,
    'Side Walk Parliament Newsletter',
    'Our problems are not just leaders consolidating power, but the creeping normalization of apathy. A call to civic agency, active participation, and democratic renewal.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Civic Participation'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f01de20dbd',
    FALSE
  ),
  (
    'swp-venezuela-new-year',
    'Happy New Year from Venezuela!',
    'Newsletter',
    'January 2026',
    2026,
    'Side Walk Parliament Newsletter',
    'Stirring civic curiosity and critical reflection on global governance, economic policies, and institutional realities observed through international perspectives.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Global Governance'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=e2fd919462',
    FALSE
  ),
  (
    'swp-isolationism',
    'Isolationism: Can Nations Survive Alone?',
    'Newsletter',
    'December 2025',
    2025,
    'Side Walk Parliament Newsletter',
    'Closing borders triggers global shockwaves. Analyzing how economic protectionism, immigration barriers, and isolationist foreign policies undermine multilateral resilience.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Foreign Policy'],
    'Newsletter Issue',
    'https://mailchi.mp/850b82230497/side-walk-parliament-isolationism-can-nations-survive-alone',
    FALSE
  ),
  (
    'swp-brick-by-brick',
    'Brick by Brick: The Quiet Art of Public Service Innovation',
    'Newsletter',
    'November 2025',
    2025,
    'Side Walk Parliament Newsletter',
    'Breaking down bureaucratic inertia through the quiet, persistent craft of incremental public sector innovation and institutional governance.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Public Service'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=7ee4ac8338',
    FALSE
  ),
  (
    'swp-wars-diplomacy',
    'Wars, Diplomacy, and (Foreign) Policy',
    'Newsletter',
    'October 2025',
    2025,
    'Side Walk Parliament Newsletter',
    'A country that shows discipline rather than aggression signals confidence in its strength. Examining international diplomacy, deterrence, and strategic foreign policy.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Diplomacy'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f219a1685e',
    FALSE
  ),
  (
    'swp-policy-paralysis',
    'Policy Paralysis and the Price of Inaction',
    'Newsletter',
    'October 2025',
    2025,
    'Side Walk Parliament Newsletter',
    'Institutions crumble gradually through complacency and administrative inertia. Examining the profound economic and social costs of policy paralysis in public governance.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Policy Analysis'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=5c0e214aea',
    FALSE
  ),
  (
    'swp-when-sport-divides',
    'When Sport Divides, Who Really Wins?',
    'Newsletter',
    'September 2025',
    2025,
    'Side Walk Parliament Newsletter',
    'Examining controversy at the US Open and what happens when international athletic competition intersects with geopolitical polarization and civic division.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Culture & Society'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=d5d3a0aa11',
    FALSE
  ),
  (
    'swp-world-could-use-some-peace',
    'The World Could Use Some Peace',
    'Newsletter',
    'August 2025',
    2025,
    'Side Walk Parliament Newsletter',
    'The world could use some peace… and it starts with the leaders you elect. Exploring how citizen responsibility in elections dictates war, peace, and human dignity.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Peace & Leadership'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0450c45c78',
    FALSE
  ),
  (
    'swp-leadership-save-lives',
    'Leadership Can Save Lives or Destroy Them',
    'Newsletter',
    'July 2025',
    2025,
    'Side Walk Parliament Newsletter',
    'A critical reflection on executive authority, moral courage in public office, and how leadership decisions hold the direct power to protect lives or inflict systemic devastation.',
    ARRAY['Newsletter', 'Side Walk Parliament', 'Leadership'],
    'Newsletter Issue',
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0db9154bc9',
    FALSE
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  kind = EXCLUDED.kind,
  date = EXCLUDED.date,
  year = EXCLUDED.year,
  venue = EXCLUDED.venue,
  abstract = EXCLUDED.abstract,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  href = EXCLUDED.href,
  featured = EXCLUDED.featured;


-- ==============================================================================
-- 2. TABLE: media_publications (PoliFIX Podcasts & Newsletters)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media_publications (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('podcast', 'newsletter')),
  title TEXT NOT NULL,
  platform TEXT NOT NULL,
  date TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  video_url TEXT,
  href TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.media_publications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public media publications are readable by everyone" ON public.media_publications;
CREATE POLICY "Public media publications are readable by everyone"
  ON public.media_publications
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role can manage media publications" ON public.media_publications;
CREATE POLICY "Service role can manage media publications"
  ON public.media_publications
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed Data: Official PoliFIX Podcasts and Side Walk Parliament Newsletters
INSERT INTO public.media_publications (id, type, title, platform, date, year, description, image_url, video_url, href, featured)
VALUES
  -- 1. PoliFIX Podcasts
  (
    'pod-growth',
    'podcast',
    'Growth, Grit, and Greatness: Navigating New Terrains as Professionals',
    'PoliFIX Podcast',
    '2024',
    2024,
    'Exploring professional resilience, career growth, navigating international transitions, and building impactful leadership across public policy and civic spaces.',
    'https://img.youtube.com/vi/fv_vdIQ-7e4/hqdefault.jpg',
    'https://youtu.be/fv_vdIQ-7e4',
    'https://youtu.be/fv_vdIQ-7e4',
    TRUE
  ),
  (
    'pod-dream',
    'podcast',
    'Dare to Dream: An Immigrant Professional’s Journey to making Public Impact',
    'PoliFIX Podcast',
    '2024',
    2024,
    'Exploring the immigrant journey, public sector career transition, and navigating public service institutions to achieve tangible civic impact.',
    'https://img.youtube.com/vi/PxAO4J2UaAc/hqdefault.jpg',
    'https://youtu.be/PxAO4J2UaAc',
    'https://youtu.be/PxAO4J2UaAc',
    FALSE
  ),
  (
    'pod-budgeting',
    'podcast',
    'Effective Budgeting and Economic Development in African Countries',
    'PoliFIX Podcast',
    '2024',
    2024,
    'A critical inquiry into subnational public expenditure, fiscal discipline, and aligning budget frameworks with real economic development.',
    'https://img.youtube.com/vi/1EWpeQT5VqE/hqdefault.jpg',
    'https://youtu.be/1EWpeQT5VqE',
    'https://youtu.be/1EWpeQT5VqE',
    FALSE
  ),
  (
    'pod-failure',
    'podcast',
    'What is FAILURE within a government?',
    'PoliFIX Podcast',
    '2024',
    2024,
    'Deconstructing systemic policy breakdown, administrative inertia, and the diagnostic metrics for identifying and correcting governance failure.',
    'https://img.youtube.com/vi/uaAb8wBIf-s/hqdefault.jpg',
    'https://youtu.be/uaAb8wBIf-s',
    'https://youtu.be/uaAb8wBIf-s',
    FALSE
  ),
  (
    'pod-project-failure',
    'podcast',
    'Why Projects Fail: The Nexus Between Governmental Fiscal Innovations and Project Implementation',
    'PoliFIX Podcast',
    '2024',
    2024,
    'Analyzing the critical connection between public financial management, governmental fiscal mechanisms, institutional capacity, and effective infrastructure project delivery.',
    'https://img.youtube.com/vi/ADBxsLJy4hc/hqdefault.jpg',
    'https://youtu.be/ADBxsLJy4hc',
    'https://youtu.be/ADBxsLJy4hc',
    FALSE
  ),
  (
    'pod-governance',
    'podcast',
    'Open and Digital Governance Reform: Shaping Democracy in Developing Countries',
    'PoliFIX Podcast',
    '2024',
    2024,
    'Exploring digital public infrastructure, transparency standards, and the roadmap for modernizing governance and civic participation in developing economies.',
    'https://img.youtube.com/vi/HLZVVu2U2uc/hqdefault.jpg',
    'https://youtu.be/HLZVVu2U2uc',
    'https://youtu.be/HLZVVu2U2uc',
    FALSE
  ),
  (
    'pod-statecraft',
    'podcast',
    'The Policy and Statecraft Experience: An Introductory Montage',
    'PoliFIX Podcast',
    '2024',
    2024,
    'An introductory exploration of statecraft, evidence-based public policy formulation, and the overarching mission of the PoliFIX Podcast.',
    'https://img.youtube.com/vi/_rNVb6jZLaw/hqdefault.jpg',
    'https://youtu.be/_rNVb6jZLaw',
    'https://youtu.be/_rNVb6jZLaw',
    FALSE
  ),

  -- 2. Side Walk Parliament Newsletters
  (
    'swp-sos-from-south-sudan',
    'newsletter',
    'SOS from South Sudan',
    'Side Walk Parliament',
    'May 2026',
    2026,
    'While the world’s attention gravitates toward familiar theatres of war, far less is said about the humanitarian emergencies unfolding quietly in South Sudan and across vulnerable regions.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/e0bd66bb-9d3f-1198-c4af-8460b604c0ad.jpeg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=2989dc59bb',
    FALSE
  ),
  (
    'swp-authoritarian-nostalgia',
    'newsletter',
    'Let’s talk about “Authoritarian Nostalgia”',
    'Side Walk Parliament',
    'April 2026',
    2026,
    'Examining the psychological and political phenomenon of authoritarian nostalgia—why citizens in transitioning democracies sometimes yearn for past strongman regimes.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/5c6c9956-96a8-5ba4-2987-63f3ca49e3d5.jpeg',
    NULL,
    'https://mailchi.mp/2916c907274d/sidewalk-parliament-sos-from-south-sudan-7507354',
    FALSE
  ),
  (
    'swp-international-womens-day',
    'newsletter',
    'Happy International Women''s Day',
    'Side Walk Parliament',
    'March 8, 2026',
    2026,
    'Looking beyond immediate circles to call for systemic inclusion, gender-responsive policy reform, and legislative equity in democratic governance.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/a9f4c565-34de-05cc-6399-069ba495428e.jpeg',
    NULL,
    'https://mailchi.mp/a44d8b89cf5f/side-walk-parliament-happy-international-womens-day',
    FALSE
  ),
  (
    'swp-act',
    'newsletter',
    'ACT! — Power, Agency, and Civic Participation',
    'Side Walk Parliament',
    'February 2026',
    2026,
    'Our problems are not just leaders consolidating power, but the creeping normalization of apathy. A call to civic agency, active participation, and democratic renewal.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/ebc56222-e62d-82b9-8cfb-9205af8f56a2.jpg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f01de20dbd',
    FALSE
  ),
  (
    'swp-venezuela-new-year',
    'newsletter',
    'Happy New Year from Venezuela!',
    'Side Walk Parliament',
    'January 2026',
    2026,
    'Stirring civic curiosity and critical reflection on global governance, economic policies, and institutional realities observed through international perspectives.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/8cd4c96b-4f93-4911-c61c-936ef52b40b3.jpeg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=e2fd919462',
    FALSE
  ),
  (
    'swp-isolationism',
    'newsletter',
    'Isolationism: Can Nations Survive Alone?',
    'Side Walk Parliament',
    'December 2025',
    2025,
    'Closing borders triggers global shockwaves. Analyzing how economic protectionism, immigration barriers, and isolationist foreign policies undermine multilateral resilience.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/e3c3c9a9-cc51-ad3b-d5da-fae1f5a443e0.jpg',
    NULL,
    'https://mailchi.mp/850b82230497/side-walk-parliament-isolationism-can-nations-survive-alone',
    FALSE
  ),
  (
    'swp-brick-by-brick',
    'newsletter',
    'Brick by Brick: The Quiet Art of Public Service Innovation',
    'Side Walk Parliament',
    'November 2025',
    2025,
    'Breaking down bureaucratic inertia through the quiet, persistent craft of incremental public sector innovation and institutional governance.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/c8c2e7d2-cd89-916e-182d-da7354ff8313.jpg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=7ee4ac8338',
    FALSE
  ),
  (
    'swp-wars-diplomacy',
    'newsletter',
    'Wars, Diplomacy, and (Foreign) Policy',
    'Side Walk Parliament',
    'October 2025',
    2025,
    'A country that shows discipline rather than aggression signals confidence in its strength. Examining international diplomacy, deterrence, and strategic foreign policy.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/b0de8a10-edca-a897-46e1-e7239d653af7.jpg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=f219a1685e',
    FALSE
  ),
  (
    'swp-policy-paralysis',
    'newsletter',
    'Policy Paralysis and the Price of Inaction',
    'Side Walk Parliament',
    'October 2025',
    2025,
    'Institutions crumble gradually through complacency and administrative inertia. Examining the profound economic and social costs of policy paralysis in public governance.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/581aa584-912b-b4a0-8284-a3eefca01a81.jpg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=5c0e214aea',
    FALSE
  ),
  (
    'swp-when-sport-divides',
    'newsletter',
    'When Sport Divides, Who Really Wins?',
    'Side Walk Parliament',
    'September 2025',
    2025,
    'Examining controversy at the US Open and what happens when international athletic competition intersects with geopolitical polarization and civic division.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/cb938820-587e-1272-ab42-399729fcca27.jpg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=d5d3a0aa11',
    FALSE
  ),
  (
    'swp-world-could-use-some-peace',
    'newsletter',
    'The World Could Use Some Peace',
    'Side Walk Parliament',
    'August 2025',
    2025,
    'The world could use some peace… and it starts with the leaders you elect. Exploring how citizen responsibility in elections dictates war, peace, and human dignity.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/c88a8bd6-e7f6-335b-1152-1d454a3728d9.jpg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0450c45c78',
    FALSE
  ),
  (
    'swp-leadership-save-lives',
    'newsletter',
    'Leadership Can Save Lives or Destroy Them',
    'Side Walk Parliament',
    'July 2025',
    2025,
    'A critical reflection on executive authority, moral courage in public office, and how leadership decisions hold the direct power to protect lives or inflict systemic devastation.',
    'https://mcusercontent.com/17c8637aae6a2bc62d636e3b8/images/24802c26-fb38-06cf-50a0-a1ee30083e07.jpg',
    NULL,
    'https://us10.campaign-archive.com/?u=17c8637aae6a2bc62d636e3b8&id=0db9154bc9',
    FALSE
  )
ON CONFLICT (id) DO UPDATE SET
  type = EXCLUDED.type,
  title = EXCLUDED.title,
  platform = EXCLUDED.platform,
  date = EXCLUDED.date,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  video_url = EXCLUDED.video_url,
  href = EXCLUDED.href,
  featured = EXCLUDED.featured;


-- ==============================================================================
-- 3. TABLE: policy_videos (Broadcast Television, Media Commentary & Dialogues)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.policy_videos (
  id TEXT PRIMARY KEY,
  category_tag TEXT NOT NULL,
  network TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  year INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('television', 'dialogue', 'analysis')),
  description TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.policy_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public policy videos are readable by everyone" ON public.policy_videos;
CREATE POLICY "Public policy videos are readable by everyone"
  ON public.policy_videos
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role can manage policy videos" ON public.policy_videos;
CREATE POLICY "Service role can manage policy videos"
  ON public.policy_videos
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed Data: Television Broadcasts, Policy Dialogues & Media Features
INSERT INTO public.policy_videos (id, category_tag, network, title, date, year, type, description, video_url, thumbnail_url)
VALUES
  (
    'v-ait-weekend',
    'AIT WEEKEND SHOW',
    'AIT Television',
    'Discussing Constitutional Amendment & State Autonomy',
    '2023',
    2023,
    'television',
    'Olubunmi Ayantunji breaks down the urgent need for true state policing, local government autonomy, and why piecemeal constitutional amendments fail Nigerians.',
    'https://youtu.be/H9W7NWZcZc0',
    'https://img.youtube.com/vi/H9W7NWZcZc0/hqdefault.jpg'
  ),
  (
    'v-citizen-project',
    'THE CITIZEN PROJECT',
    'Civic Discourse Network',
    'Nigerian Democracy and The Civic Space',
    '2023',
    2023,
    'dialogue',
    'A deep-dive conversation exploring youth participation, constitutional safeguards, and protecting the civic space against authoritarian creep.',
    'https://youtu.be/wOH1OnLdDwo',
    'https://img.youtube.com/vi/wOH1OnLdDwo/hqdefault.jpg'
  ),
  (
    'v-tos-tv',
    'TOS TV NETWORK',
    'TOS TV News',
    'Call For Restructuring: Analyzing The Need',
    '2023',
    2023,
    'television',
    'An exhaustive inquiry into subnational fiscal devolution, revenue allocation formulas, and the governance mechanisms required for true federalism.',
    'https://youtu.be/-bgBMaY64wY',
    'https://img.youtube.com/vi/-bgBMaY64wY/hqdefault.jpg'
  ),
  (
    'v-tensions-podium',
    'TENSIONS PODIUM',
    'Tensions Media',
    'Nigerian Politics and Its Impact on Citizens in Diaspora',
    '2023',
    2023,
    'dialogue',
    'Examining diaspora political engagement, out-of-country voting rights, and how dual-system expertise enriches subnational policy design.',
    'https://youtu.be/fKCKRj6G1sA',
    'https://img.youtube.com/vi/fKCKRj6G1sA/hqdefault.jpg'
  ),
  (
    'v-dignity-stock',
    'DIGNITY STOCK CLIENT SHOW',
    'Dignity Stock Network',
    'Exclusive with Senator Babajide Omoworare',
    '2022',
    2022,
    'analysis',
    'In conversation with Senator Babajide Omoworare on the inner mechanics of legislative drafting, parliamentary committees, and statutory review.',
    'https://youtu.be/_-KAz5NRDZA',
    'https://img.youtube.com/vi/_-KAz5NRDZA/hqdefault.jpg'
  ),
  (
    'v-ke-media',
    'K&E MEDIA',
    'K&E Educational Series',
    'UNIBEN Instills A Coordinated Unconscious Response',
    '2022',
    2022,
    'dialogue',
    'Reflecting on legal training, institutional discipline, and youth mindset cultivation within Nigerian tertiary education.',
    'https://youtu.be/bB6QjFg_Nok',
    'https://img.youtube.com/vi/bB6QjFg_Nok/hqdefault.jpg'
  ),
  (
    'v-western-spring',
    'WESTERN SPRING TV',
    'Western Spring Television',
    'NBS Employment Report Breakdown',
    '2022',
    2022,
    'television',
    'Live economic analysis dissecting National Bureau of Statistics labour data, youth unemployment metrics, and required macroeconomic interventions.',
    'https://www.youtube.com/live/8yU11bV-opg',
    'https://img.youtube.com/vi/8yU11bV-opg/hqdefault.jpg'
  )
ON CONFLICT (id) DO UPDATE SET
  category_tag = EXCLUDED.category_tag,
  network = EXCLUDED.network,
  title = EXCLUDED.title,
  date = EXCLUDED.date,
  year = EXCLUDED.year,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  thumbnail_url = EXCLUDED.thumbnail_url;


-- ==============================================================================
-- 4. TABLE: waitlist_subscribers (Book Launch & Early Access Waitlist)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.waitlist_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'book_waitlist',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.waitlist_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert waitlist submissions" ON public.waitlist_subscribers;
CREATE POLICY "Public can insert waitlist submissions"
  ON public.waitlist_subscribers
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated/service can view waitlist submissions" ON public.waitlist_subscribers;
CREATE POLICY "Only authenticated/service can view waitlist submissions"
  ON public.waitlist_subscribers
  FOR SELECT
  USING (true);


-- ==============================================================================
-- 5. TABLE: contact_messages (Contact form archive in Supabase)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
CREATE POLICY "Public can insert contact messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated/service can view contact messages" ON public.contact_messages;
CREATE POLICY "Only authenticated/service can view contact messages"
  ON public.contact_messages
  FOR SELECT
  USING (true);
