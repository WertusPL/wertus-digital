"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Very subtle content transition on client-side route changes: a short
 * opacity fade with a small rise, keyed by pathname so each navigation
 * replays the enter animation.
 *
 * - The first paint is NOT animated (initial={false}) so above-the-fold
 *   content is instant, SSR-stable, and free of layout shift / hidden flash.
 * - Reduced-motion users get content immediately, with no movement.
 * - Only transform + opacity are animated, and the wrapper settles with no
 *   lasting transform, so it never affects the pages it wraps.
 *
 * Navbar and Footer are rendered outside this wrapper (in RootShell), so they
 * never re-mount or flash during navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const isFirst = useRef(true);
  const skipEnter = isFirst.current;

  useEffect(() => {
    isFirst.current = false;
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={skipEnter || reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
