import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/ContactSection";
import { PageMasthead } from "@/components/ui/PageMasthead";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquiries for policy consulting, legislative drafting, strategic organizational planning, speaking engagements and media commentary.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${SITE.name}`,
    description:
      "Available for policy consulting, legislative drafting, speaking and media commentary on governance and public administration.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageMasthead
        eyebrow="Contact"
        title="Let’s talk policy."
        intro="Consulting, legislative drafting, speaking engagements and media commentary, start with a note below."
      />
      <ContactSection />
    </main>
  );
}
