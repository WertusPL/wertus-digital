"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";

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

export function StudioHero({ hero }: { hero: Dictionary["studioPage"]["hero"] }) {
  return (
    <section aria-labelledby="studio-hero-heading">
      <div className="wd-container pt-14 pb-14 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.p
              variants={y8}
              className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent"
            >
              {hero.label}
            </motion.p>

            <motion.h1
              id="studio-hero-heading"
              variants={y18}
              className="hero-h1 mt-6 max-w-[16ch]"
            >
              <span className="block">{hero.headingLine1}</span>
              <span className="block">
                {hero.headingLine2Lead}
                <span className="hero-accent">{hero.headingAccent}</span>
              </span>
            </motion.h1>

            <motion.p variants={y10} className="hero-body mt-7 max-w-[52ch]">
              {hero.lead}
            </motion.p>
            <motion.p
              variants={y10}
              className="mt-4 max-w-[52ch] text-[15px] leading-[1.6] text-muted"
            >
              {hero.leadSecondary}
            </motion.p>
          </motion.div>

          {/* Editorial meta panel — real positioning facts, no invented stats */}
          <InView
            as="div"
            variants={y10}
            viewOptions={{ once: true }}
            className="mt-2 border-t border-[var(--border-light)] pt-8 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
          >
            <p className="text-label text-muted">{hero.metaLabel}</p>
            <dl className="mt-5">
              {hero.metaItems.map((item, i) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-baseline justify-between gap-6 py-3.5",
                    i > 0 && "border-t border-[var(--border-light)]",
                  )}
                >
                  <dt className="text-label text-muted">{item.label}</dt>
                  <dd className="text-right text-[14px] font-medium text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </InView>
        </div>
      </div>
    </section>
  );
}
