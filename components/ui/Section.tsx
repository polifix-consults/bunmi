import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Surface tone — `dark` also flips focus-ring colours via `.dark-section`. */
  tone?: "paper" | "paperDeep" | "bright" | "dark";
  /** Vertical rhythm. `flush` opts out for full-bleed children. */
  spacing?: "default" | "tight" | "loose" | "flush";
  "aria-labelledby"?: string;
};

const TONES = {
  paper: "bg-paper text-ink",
  paperDeep: "bg-paper-deep text-ink",
  bright: "bg-paper-bright text-ink",
  dark: "dark-section bg-dark text-paper-bright",
} as const;

const SPACING = {
  default: "py-12 sm:py-20 lg:py-32",
  tight: "py-8 sm:py-14 lg:py-20",
  loose: "py-16 sm:py-24 lg:py-40",
  flush: "",
} as const;

/** Full-width surface band. Owns background tone and vertical rhythm only. */
export function Section({
  children,
  id,
  className,
  tone = "paper",
  spacing = "default",
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative", TONES[tone], SPACING[spacing], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
