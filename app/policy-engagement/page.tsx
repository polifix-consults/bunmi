import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/CtaBand";
import { PolicyEngagementClient } from "@/components/sections/PolicyEngagementClient";
import { getPolicyVideos } from "@/lib/policyEngagement";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Policy Engagement",
  description:
    "Institutional highlights of The Policy Roundtable and The Knights Collective, alongside broadcast television interviews and legislative reform.",
  alternates: { canonical: "/policy-engagement" },
  openGraph: {
    title: `Policy Engagement | ${SITE.name}`,
    description:
      "Grassroots advocacy via The Policy Roundtable, youth Chess leadership at The Knights Collective, and media commentary.",
    url: "/policy-engagement",
  },
};

export default async function PolicyEngagementPage() {
  const videos = await getPolicyVideos();

  return (
    <main id="main">
      <PolicyEngagementClient initialVideos={videos} />
      <CtaBand
        eyebrow="Consulting & Advisory"
        title="Bring rigorous policy thinking to your institution."
        body="Evidence-based policy research, legislative drafting, and organizational capacity building."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Research & Publications", href: "/research-publication" }}
      />
    </main>
  );
}

