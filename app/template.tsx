"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * App Router `template.tsx` — remounts on every route change, so this is the
 * single place a soft page fade lives. Content fades in over 0.35s and the
 * window returns to top, which reads as a deliberate editorial page turn.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
