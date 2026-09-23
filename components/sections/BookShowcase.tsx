import { Container } from "@/components/ui/Container";
import { CoverArt } from "@/components/ui/CoverArt";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { BOOK } from "@/lib/content";

/** Book page core: cover wireframe, synopsis and the waitlist capture module. */
export function BookShowcase() {
  return (
    <Section tone="paper" aria-labelledby="synopsis-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Cover */}
          <Reveal direction="left" className="lg:col-span-4">
            <div className="mx-auto max-w-[18rem] lg:sticky lg:top-32 lg:max-w-none">
              <CoverArt />
              <p className="mt-5 text-center font-sans text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint lg:text-left">
                Forthcoming Publication Cover
              </p>
            </div>
          </Reveal>

          {/* Synopsis */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-accent">
                {BOOK.status}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="synopsis-heading"
                className="mt-5 text-balance text-3xl leading-[1.12] text-ink sm:text-[2.25rem]"
              >
                {BOOK.workingTitle}
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-7 text-lg leading-[1.8] text-ink-soft">
                {BOOK.synopsis}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-9 space-y-3 border-t border-line pt-7">
                {BOOK.themes.map((theme) => (
                  <li
                    key={theme}
                    className="flex items-center gap-3 text-[0.9375rem] text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {theme}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Waitlist */}
          <div className="lg:col-span-4">
            <Reveal delay={0.16} direction="right">
              <div className="lg:sticky lg:top-32">
                <WaitlistForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
