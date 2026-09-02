"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { InView } from "@/components/motion/InView";
import { SectionIntro } from "./SectionIntro";

const EASE = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.03 } },
};
const row = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StudioDifference({
  difference,
}: {
  difference: Dictionary["studioPage"]["difference"];
}) {
  return (
    <section
      aria-labelledby="difference-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[52px] lg:py-[76px]">
        <SectionIntro
          index={difference.index}
          label={difference.label}
          heading={difference.heading}
          headingId="difference-heading"
        />

        <InView
          as="div"
          variants={container}
          viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
          className="mt-10 lg:mt-12"
        >
          {difference.items.map((item) => (
            <motion.div
              key={item.index}
              variants={row}
              className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-[var(--border-light)] py-8 md:grid-cols-12 lg:py-10"
            >
              <span className="text-[clamp(1.75rem,2vw+0.5rem,2.5rem)] font-medium leading-none tracking-[-0.02em] tabular-nums text-accent md:col-span-2">
                {item.index}
              </span>
              <h3 className="text-[1.3rem] font-medium leading-[1.2] tracking-[-0.01em] text-ink md:col-span-4">
                {item.title}
              </h3>
              <p className="max-w-[54ch] text-[15px] leading-[1.6] text-muted md:col-span-6">
                {item.description}
              </p>
            </motion.div>
          ))}
        </InView>
      </div>
    </section>
  );
}
