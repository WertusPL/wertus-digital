"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { cn } from "@/lib/utils";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { InView } from "@/components/motion/InView";

const EASE = [0.22, 1, 0.36, 1] as const;

const introContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const labelVar = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const headlineVar = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const descVar = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const pillarsVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
};

export function StudioSection({ studio }: { studio: Dictionary["studio"] }) {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container pt-[68px] pb-[44px] lg:pt-[100px] lg:pb-[60px]">
        {/* Intro — asymmetric: section label left, headline + description right */}
        <InView
          as="div"
          className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12"
          variants={introContainer}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <motion.div variants={labelVar} className="md:col-span-3">
            <span className="text-label text-accent">01 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {studio.kicker}
            </span>
          </motion.div>

          <motion.h2
            id="studio-heading"
            variants={headlineVar}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {studio.headline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={descVar}
            className="hero-body max-w-[46ch] md:col-span-7 md:col-start-5"
          >
            {studio.description}
          </motion.p>
        </InView>

        {/* Three pillars — separated by hairlines, never cards */}
        <AnimatedGroup
          as="div"
          itemAs="div"
          inView
          viewOptions={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
          variants={pillarsVariants}
          className="mt-14 grid grid-cols-1 border-t border-[var(--border-light)] pt-10 sm:mt-16 lg:grid-cols-3 lg:pt-12"
        >
          {studio.pillars.map((pillar, i) => (
            <div
              key={pillar.eyebrow}
              className={cn(
                "flex flex-col",
                // stacked: horizontal hairline between pillars
                i > 0 && "mt-8 border-t border-[var(--border-light)] pt-8",
                // 3-column: reset stacked rule, use vertical hairline instead
                i > 0 &&
                  "lg:mt-0 lg:border-t-0 lg:pt-0 lg:border-l lg:border-[var(--border-light)]",
                // breathing room around the vertical dividers
                i === 0 && "lg:pr-8",
                i === 1 && "lg:px-8",
                i === 2 && "lg:pl-8",
              )}
            >
              <span className="text-label text-ink">{pillar.eyebrow}</span>
              <h3 className="mt-4 text-[1.2rem] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
                {pillar.headline}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-muted">
                {pillar.description}
              </p>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
