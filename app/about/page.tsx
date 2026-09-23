import type { Metadata } from "next";

import { AboutExecutive } from "@/components/sections/AboutExecutive";
import { CtaBand } from "@/components/sections/CtaBand";
import { Timeline } from "@/components/sections/Timeline";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Governance and policy professional whose work spans governance reform, public policy design, and strategic innovation across Nigeria and Canada.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${SITE.name}`,
    description:
      "Governance and policy professional whose work spans governance reform, public policy design, and strategic innovation across Nigeria and Canada.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main id="main">
      <AboutExecutive />
      <Timeline />
      <CtaBand
        eyebrow="Work together"
        title="Bring rigorous policy thinking to your institution."
        body="Advisory, legislative drafting and strategic governance initiatives."
        primary={{ label: "Get in Touch", href: "/contact" }}
        secondary={{ label: "Policy Engagement", href: "/policy-engagement" }}
      />
    </main>
  );
}
