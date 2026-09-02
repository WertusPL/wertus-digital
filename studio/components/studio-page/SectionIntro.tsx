"use client";

import { motion } from "motion/react";
import { InView } from "@/components/motion/InView";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const y18 = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Shared section intro — the studio/process rhythm used across the site:
 * accent index + label on the left, heading (and optional lead) on the right.
 */
export function SectionIntro({
  index,
  label,
  heading,
  headingId,
  description,
}: {
  index: string;
  label: string;
  heading: string[];
  headingId: string;
  description?: string;
}) {
  return (
    <InView
      as="div"
      className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12"
      variants={container}
      viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <motion.div variants={y10} className="md:col-span-3">
        <span className="text-label text-accent">{index} /</span>
        <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
          {label}
        </span>
      </motion.div>

      <motion.h2
        id={headingId}
        variants={y18}
        className="section-heading md:col-span-8 md:col-start-5"
      >
        {heading.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </motion.h2>

      {description && (
        <motion.p
          variants={y10}
          className="hero-body max-w-[52ch] md:col-span-7 md:col-start-5"
        >
          {description}
        </motion.p>
      )}
    </InView>
  );
}
