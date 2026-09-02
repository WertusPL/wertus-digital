"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const y8 = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const y18 = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function WorkHero({ hero }: { hero: Dictionary["workPage"]["hero"] }) {
  return (
    <section aria-labelledby="work-hero-heading">
      <div className="wd-container pt-14 pb-12 lg:pt-20 lg:pb-16">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p
            variants={y8}
            className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent"
          >
            {hero.label}
          </motion.p>

          <motion.h1
            id="work-hero-heading"
            variants={y18}
            className="hero-h1 mt-6 max-w-[20ch]"
          >
            {hero.headingLead}
            <span className="hero-accent">{hero.headingAccent}</span>
          </motion.h1>

          <motion.p variants={y10} className="hero-body mt-7 max-w-[52ch]">
            {hero.description}
          </motion.p>

          {/* Meta strip — small, technical, honest project count */}
          <motion.div
            variants={y10}
            className="mt-11 flex items-center gap-4 border-t border-[var(--border-light)] pt-5"
          >
            <span className="text-label text-ink">{hero.countLabel}</span>
            <span aria-hidden="true" className="text-label text-muted">
              /
            </span>
            <span className="text-label text-muted">{hero.yearLabel}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
