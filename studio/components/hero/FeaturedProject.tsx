"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type Featured = Dictionary["featured"];

/**
 * The featured "concept project" — a website presented as a designed
 * digital object rather than a stock laptop photo. A light browser
 * window sits inside a dark panel, with a second offset layer behind it
 * and hairline technical annotations. Reacts to the cursor with a few
 * pixels of opposing parallax (disabled under reduced-motion).
 */
export function FeaturedProject({ featured }: { featured: Featured }) {
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Only for precise pointers (never touch); resolves after mount so SSR markup
  // is unaffected.
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 120, damping: 18, mass: 0.3 };
  const sx = useSpring(mx, springCfg);
  const sy = useSpring(my, springCfg);

  // Barely-there parallax: front layer max 4px, back layer max 3px (opposing).
  const frontX = useTransform(sx, (v) => v * 4);
  const frontY = useTransform(sy, (v) => v * 4);
  const backX = useTransform(sx, (v) => v * -3);
  const backY = useTransform(sy, (v) => v * -3);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !finePointer) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative select-none"
    >
      {/* Offset layer behind — adds depth without a heavy shadow */}
      <motion.div
        aria-hidden="true"
        style={{ x: backX, y: backY }}
        className="absolute -right-3 -top-3 hidden h-full w-full rounded-xl border border-[var(--border-dark)] bg-surface-2 sm:block"
      />

      {/* Dark panel */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-dark)] bg-surface p-5 sm:p-6">
        {/* Top annotation row */}
        <div className="mb-5 flex items-center justify-between text-white/55">
          <span className="text-label">{featured.kicker}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        </div>

        {/* Browser window (parallax layer) */}
        <motion.figure
          style={{ x: frontX, y: frontY }}
          className="overflow-hidden rounded-lg bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
        >
          <figcaption className="sr-only">{featured.caption}</figcaption>

          {/* Chrome bar */}
          <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#f1efe9] px-3.5 py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-black/15" />
              <span className="h-2 w-2 rounded-full bg-black/15" />
              <span className="h-2 w-2 rounded-full bg-black/15" />
            </div>
            <div className="flex h-5 flex-1 items-center gap-1.5 rounded-full bg-white px-2.5 text-[9px] text-black/40">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[2px] border border-black/20" />
              meridian-studio.com
            </div>
          </div>

          {/* Abstract site body */}
          <div className="bg-[#faf9f6] px-5 pb-5 pt-4">
            {/* preview nav */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-[0.14em] text-[#101114]">
                {featured.projectName.toUpperCase()}
              </span>
              <nav aria-hidden="true" className="flex gap-3 text-[8px] text-black/45">
                {featured.previewNav.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </nav>
            </div>

            {/* hero of the concept site */}
            <div className="mt-5 grid grid-cols-[1.15fr_0.85fr] gap-4">
              <div className="flex flex-col">
                <span className="text-[7px] uppercase tracking-[0.2em] text-black/35">
                  {featured.discipline}
                </span>
                <p className="mt-1.5 text-[13px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#101114]">
                  {featured.previewTagline}
                </p>
                <span className="mt-3 h-px w-10 bg-black/15" aria-hidden="true" />
                <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[8px] font-medium text-white">
                  {featured.previewCta}
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
              {/* image block — tonal, not stock photography */}
              <div
                aria-hidden="true"
                className="aspect-[4/5] rounded-md bg-[linear-gradient(150deg,#dfe6f6_0%,#c7d2ec_55%,#aebbdf_100%)] ring-1 ring-inset ring-black/[0.04]"
              />
            </div>

            {/* project grid hint */}
            <div className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-7 rounded-[5px] border border-black/[0.07] bg-white"
                />
              ))}
            </div>
          </div>
        </motion.figure>

        {/* Bottom annotation row */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-label text-white/55">{featured.discipline}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-dark)] px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-white/70">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
            {featured.conceptBadge}
          </span>
        </div>

        {/* Corner tick — subtle technical detail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-5 h-3 w-3 border-r border-t border-white/15"
        />
      </div>
    </div>
  );
}
