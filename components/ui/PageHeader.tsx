import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  eyebrow: string;
  /** Rendered as the page's single H1. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Interior-page masthead. Owns the H1 so each route has exactly one. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  tone = "light",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden pb-16 pt-[calc(var(--nav-h)+3.5rem)] sm:pb-20 sm:pt-[calc(var(--nav-h)+5rem)]",
        tone === "light" ? "bg-paper-bright" : "dark-section bg-dark",
        className,
      )}
    >
      <Container>
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className={cn(
                "mt-6 text-balance text-4xl leading-[1.06] sm:text-5xl lg:text-6xl",
                tone === "light" ? "text-ink" : "text-paper-bright",
              )}
            >
              {title}
            </h1>
          </Reveal>

          {intro ? (
            <Reveal delay={0.16}>
              <p
                className={cn(
                  "mt-7 max-w-2xl text-lg leading-[1.75] sm:text-xl",
                  tone === "light" ? "text-ink-soft" : "text-paper-deep/70",
                )}
              >
                {intro}
              </p>
            </Reveal>
          ) : null}
        </div>
      </Container>

      {/* Hairline that anchors the masthead to the first content band. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px",
          tone === "light" ? "bg-line" : "bg-dark-line",
        )}
      />
    </header>
  );
}
