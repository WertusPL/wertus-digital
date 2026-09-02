"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { InView } from "@/components/motion/InView";

const EASE = [0.22, 1, 0.36, 1] as const;

const copyContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const y8 = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const y18 = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stepsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};
const stepItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const ruleItem = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.65, ease: EASE, delay: 0.1 } },
};

export function NextSteps({
  nextSteps,
}: {
  nextSteps: Dictionary["contactPage"]["nextSteps"];
}) {
  return (
    <section
      aria-labelledby="next-steps-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[64px] lg:py-[104px]">
        {/* Heading */}
        <InView
          as="div"
          className="max-w-[34ch]"
          variants={copyContainer}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <motion.p
            variants={y8}
            className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent"
          >
            {nextSteps.label}
          </motion.p>
          <motion.h2
            id="next-steps-heading"
            variants={y18}
            className="section-heading mt-4"
          >
            {nextSteps.heading}
          </motion.h2>
        </InView>

        {/* Steps — editorial columns with drawing rule lines */}
        <InView
          as="div"
          variants={stepsContainer}
          viewOptions={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
          className="mt-12 lg:mt-16"
        >
          <ol className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
            {nextSteps.steps.map((step) => (
              <motion.li key={step.index} variants={stepItem}>
                <span
                  aria-hidden="true"
                  className="block text-[clamp(2rem,2.4vw+1rem,2.75rem)] font-medium leading-none tabular-nums tracking-[-0.02em] text-ink"
                >
                  {step.index}
                </span>

                <div className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <motion.span
                    aria-hidden="true"
                    variants={ruleItem}
                    className="h-px flex-1 origin-left bg-[var(--border-light)]"
                  />
                </div>

                <h3 className="mt-5 text-[clamp(1.15rem,0.9vw+0.85rem,1.4rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[38ch] text-[16px] leading-[1.6] text-muted">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
