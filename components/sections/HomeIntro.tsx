import { Building2, HeartHandshake, Users } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "The Knights Collective",
    body: "A Chess community dedicated to developing young leaders at the intersection of innovation and community impact. We create opportunities for youth to engage, learn, and lead, transforming ideas into tangible outcomes.",
    href: "/policy-engagement#theknightscollective",
    cta: "The community",
  },
  {
    icon: Users,
    title: "The Policy Roundtable",
    body: "A result-oriented NGO that curates and simplifies government policies into simple language for citizens at all levels. We lead productive conversations on governance reforms and submit actionable recommendations directly to government agencies.",
    href: "/policy-engagement#policyroundtable",
    cta: "Grassroots advocacy",
  },
] as const;

/** Core initiatives overview linking the home page into the deeper routes. */
export function HomeIntro() {
  return (
    <Section tone="paperDeep" aria-labelledby="pillars-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Practice"
              title={
                <span id="pillars-heading">
                  Policy that survives contact with real life.
                </span>
              }
              intro="Core initiatives, one throughline: turning complex legal frameworks into decisions citizens can actually feel."
            />
            <Reveal delay={0.24}>
              <Button href="/policy-engagement" variant="secondary" className="mt-9" withArrow>
                Explore Policy Engagement
              </Button>
            </Reveal>
          </div>

          <ul className="lg:col-span-7 lg:pt-2">
            {PILLARS.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={0.1 + i * 0.08}>
                <a
                  href={pillar.href}
                  className="group flex flex-col gap-4 border-t border-line py-8 transition-colors duration-300 first:border-t-0 first:pt-0 hover:border-accent/40 sm:flex-row sm:gap-6 sm:items-start"
                >
                  <span
                    className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-ink transition-all duration-300 group-hover:scale-125 group-hover:bg-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.375rem]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 max-w-lg text-[0.9375rem] leading-[1.7] text-ink-soft">
                      {pillar.body}
                    </p>
                    <span className="mt-4 inline-block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors duration-300 group-hover:text-accent">
                      {pillar.cta}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
