"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { InView } from "@/components/motion/InView";

const EASE = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StudioLocation({
  location,
}: {
  location: Dictionary["studioPage"]["location"];
}) {
  return (
    <section
      aria-labelledby="location-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[52px] lg:py-[76px]">
        <InView
          as="div"
          variants={container}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
          className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-12"
        >
          <motion.div variants={y10} className="md:col-span-3">
            <span className="text-label text-accent">{location.label}</span>
          </motion.div>

          <div className="md:col-span-8 md:col-start-5">
            <motion.h2
              id="location-heading"
              variants={y10}
              className="text-[clamp(1.75rem,2.4vw+1rem,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink"
            >
              {location.place}
            </motion.h2>
            <motion.p
              variants={y10}
              className="mt-4 max-w-[46ch] text-[15px] leading-[1.65] text-muted"
            >
              {location.body}
            </motion.p>
          </div>
        </InView>
      </div>
    </section>
  );
}
