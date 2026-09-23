import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders a trailing arrow that nudges right on hover. */
  withArrow?: boolean;
  icon?: LucideIcon;
};

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

type LinkProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
    href: string;
  };

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-paper-bright hover:bg-accent-deep border border-transparent",
  secondary:
    "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink hover:text-paper-bright",
  ghost:
    "bg-transparent text-ink border border-transparent hover:text-accent px-0",
  onDark:
    "bg-paper-bright text-dark border border-transparent hover:bg-paper-deep",
};

const SIZES: Record<Size, string> = {
  sm: "text-xs px-4 py-2.5 gap-1.5",
  md: "text-[0.8125rem] px-6 py-3.5 gap-2",
  lg: "text-sm px-8 py-4 gap-2.5",
};

const BASE =
  "group inline-flex items-center justify-center font-sans font-medium uppercase tracking-[0.14em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-55";

/**
 * Single button primitive. Renders a `next/link` when `href` is present,
 * a native `<button>` otherwise — so callers never juggle two components.
 */
export function Button(props: ButtonProps | LinkProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    withArrow = false,
    icon: Icon,
    ...rest
  } = props as BaseProps & Record<string, unknown>;

  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    variant === "ghost" && "tracking-[0.16em]",
    className,
  );

  const inner = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (typeof (props as LinkProps).href === "string") {
    const { href, ...anchorRest } = rest as { href: string } & Record<string, unknown>;
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        {...(anchorRest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  );
}
