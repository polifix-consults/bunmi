import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** `wide` for full grids, `prose` for long-form reading measure. */
  width?: "default" | "wide" | "prose";
  as?: "div" | "section" | "header" | "footer" | "article" | "nav";
};

const WIDTHS = {
  default: "max-w-shell",
  wide: "max-w-[110rem]",
  prose: "max-w-3xl",
} as const;

/** Horizontal page gutter + max-width. The one layout primitive. */
export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", WIDTHS[width], className)}>
      {children}
    </Tag>
  );
}
