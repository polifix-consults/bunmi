"use client";

import { Container } from "@/components/ui/Container";
import { CoverArt } from "@/components/ui/CoverArt";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { useOrderModal } from "@/components/context/OrderModalContext";
import { BOOK } from "@/lib/content";
import { BookOpen, ArrowRight } from "lucide-react";

/** Book page core: cover wireframe, synopsis and the waitlist capture module. */
export function BookShowcase() {
  const { openOrderModal } = useOrderModal();

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

          {/* Order & Waitlist */}
          <div className="lg:col-span-4">
            <Reveal delay={0.16} direction="right">
              <div className="lg:sticky lg:top-32 space-y-6">
                <div className="border border-line bg-paper-bright p-6 sm:p-8">
                  <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-accent">
                    Book Launch &amp; Attendance
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-ink">
                    Order Inscribed Copy
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed font-light">
                    Every order reserves a personally inscribed copy (Softcover or Hardcover) and includes official admission to the Book Launch and Policy Dialogue.
                  </p>

                  <div className="mt-4 border-t border-line/60 pt-3.5 space-y-1.5 text-xs text-ink-soft">
                    <p className="font-semibold text-accent">
                      Delivery is free on orders shipped to Canada and the United States.
                    </p>
                    <div className="pt-1 text-[11px] leading-relaxed text-ink-faint">
                      <p className="font-medium text-ink">CB 139, College Avenue Campus, University of Regina</p>
                      <p>📍 2155 College Ave, Regina, SK</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={openOrderModal}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded bg-ink px-5 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-paper-bright hover:bg-ink-soft transition-colors cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    Order Book &amp; Attend
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <WaitlistForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

