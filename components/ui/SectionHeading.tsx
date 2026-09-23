import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Heading level — keeps the document outline strict for SEO. */
  as?: "h2" | "h3";
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/**
 * Eyebrow + display heading + optional intro, revealed as one staggered unit.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={tone} className={align === "center" ? "justify-center" : undefined}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={0.08}>
        <Tag
          className={cn(
            "mt-5 text-balance",
            Tag === "h2"
              ? "text-3xl leading-[1.12] sm:text-4xl lg:text-[3.25rem]"
              : "text-2xl leading-[1.18] sm:text-3xl lg:text-4xl",
            tone === "light" ? "text-ink" : "text-paper-bright",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {intro ? (
        <Reveal delay={0.16}>
          <div
            className={cn(
              "mt-6 text-lg leading-[1.75] sm:text-xl",
              tone === "light" ? "text-ink-soft" : "text-paper-deep/70",
            )}
          >
            {intro}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
