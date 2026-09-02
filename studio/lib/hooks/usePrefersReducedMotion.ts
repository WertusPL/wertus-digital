"use client";

import { useEffect, useState } from "react";

/**
 * Reads the user's reduced-motion preference via matchMedia.
 * Starts `false` (matching SSR) and resolves on mount, so it's only
 * used to gate client-side, interaction-time behaviour (e.g. cursor
 * parallax) — never to branch server-rendered markup.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
