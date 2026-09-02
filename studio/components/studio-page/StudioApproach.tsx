"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";
import { SectionIntro } from "./SectionIntro";

const EASE = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.03 } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StudioApproach({
  approach,
}: {
  approach: Dictionary["studioPage"]["approach"];
}) {
  return (
    <section
      aria-labelledby="approach-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[52px] lg:py-[76px]">
        <SectionIntro
          index={approach.index}
          label={approach.label}
          heading={approach.heading}
          headingId="approach-heading"
        />

        <InView
          as="div"
          variants={container}
          viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
          className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-[var(--border-light)] pt-10 md:grid-cols-12 lg:mt-14 lg:pt-12"
        >
          {/* Big editorial statement */}
          <div className="md:col-span-7">
            <motion.p
              variants={y10}
              className="text-[clamp(1.3rem,1.4vw+0.95rem,1.75rem)] font-medium leading-[1.35] tracking-[-0.01em] text-ink text-balance"
            >
              {approach.lead}
            </motion.p>
            <motion.p
              variants={y10}
              className="mt-6 max-w-[54ch] text-[15px] leading-[1.65] text-muted"
            >
              {approach.body}
            </motion.p>
          </div>

          {/* Supporting points */}
          <motion.div variants={y10} className="md:col-span-4 md:col-start-9">
            <p className="text-label text-muted">{approach.pointsLabel}</p>
            <ul className="mt-4">
              {approach.points.map((point, i) => (
                <li
                  key={point}
                  className={cn(
                    "flex gap-4 py-4",
                    i > 0 && "border-t border-[var(--border-light)]",
                  )}
                >
                  <span className="text-label pt-0.5 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.5] text-ink">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </InView>
      </div>
    </section>
  );
}
