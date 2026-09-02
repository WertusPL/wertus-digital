"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * reducedMotion="user" lets Motion neutralise transform/layout animations
 * for users who prefer reduced motion — at animation time, on the client.
 * Because `initial`/`animate` props stay static, server and client render
 * identical markup (no hydration mismatch), while reduced-motion users
 * still get a complete, correct page.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
