"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { InView } from "@/components/motion/InView";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function MoreWork({ more }: { more: Dictionary["workPage"]["more"] }) {
  return (
    <section aria-labelledby="more-work-heading" className="pb-20 lg:pb-28">
      <div className="wd-container">
        <InView
          as="div"
          variants={container}
          viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
          className="mx-auto max-w-[1360px] border-t border-[var(--border-light)] pt-12 lg:pt-16"
        >
          <motion.div variants={y10} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            <span className="text-label text-muted">2026 —</span>
          </motion.div>

          <motion.h2
            id="more-work-heading"
            variants={y10}
            className="mt-5 max-w-[20ch] text-[clamp(1.6rem,2.4vw+1rem,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink"
          >
            {more.heading}
          </motion.h2>

          <motion.p
            variants={y10}
            className="mt-4 max-w-[52ch] text-[15px] leading-[1.6] text-muted"
          >
            {more.description}
          </motion.p>
        </InView>
      </div>
    </section>
  );
}
