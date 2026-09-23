"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds of delay — use to stagger siblings. */
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  /** Travel distance in px before settling. */
  distance?: number;
  as?: "div" | "li" | "article" | "section" | "span";
};

const OFFSETS = {
  up: { y: 1, x: 0 },
  left: { y: 0, x: -1 },
  right: { y: 0, x: 1 },
  none: { y: 0, x: 0 },
} as const;

/**
 * Fade-in-up on scroll, fired once when ~15% of the element enters view.
 * Collapses to a plain fade when the user prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
  distance = 26,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = OFFSETS[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : offset.y * distance,
      x: reduceMotion ? 0 : offset.x * distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.7,
        delay: reduceMotion ? 0 : delay,
        // Custom ease — decelerating, editorial rather than bouncy.
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
