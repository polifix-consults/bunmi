import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
  /** Draws the short rule before the label. */
  rule?: boolean;
};

/**
 * Small uppercase kicker that sits above section headings. Establishes the
 * editorial rhythm without competing with the serif H2.
 */
export function Eyebrow({
  children,
  className,
  tone = "light",
  rule = true,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.24em]",
        tone === "light" ? "text-accent" : "text-paper-deep/75",
        className,
      )}
    >
      {rule ? (
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8 shrink-0",
            tone === "light" ? "bg-accent/50" : "bg-paper-deep/40",
          )}
        />
      ) : null}
      {children}
    </p>
  );
}
