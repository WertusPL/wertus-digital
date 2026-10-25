"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Reads the user's reduced-motion preference via matchMedia.
 * Returns `false` on the server and during hydration, then the live value,
 * so it's only used to gate client-side, interaction-time behaviour (e.g.
 * cursor parallax) — never to branch server-rendered markup.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
