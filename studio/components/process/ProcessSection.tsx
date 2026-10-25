"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { InView } from "@/components/motion/InView";

const EASE = [0.22, 1, 0.36, 1] as const;

const introContainer = {
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

// Timeline: the rail draws first, then the five stages settle in order.
const timeline = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
};
const stage = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const railX = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE } },
};
const railY = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.1, ease: EASE } },
};

/**
 * Five concise stages on one rail — horizontal from `lg`, vertical below.
 * No pinning and no per-step mock-ups: the whole process reads at a glance.
 * Motion is a single authored moment (rail draws, stages follow) and runs
 * once; under reduced motion it collapses to a plain fade (MotionConfig).
 */
export function ProcessSection({
  process,
}: {
  locale: Locale;
  process: Dictionary["process"];
}) {
  const steps = process.steps;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container pt-[68px] pb-[80px] lg:pt-[100px] lg:pb-[120px]">
        {/* Intro — matches studio/services rhythm */}
        <InView
          as="div"
          className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12"
          variants={introContainer}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <motion.div variants={y10} className="md:col-span-3">
            <span className="text-label text-accent">04 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {process.label}
            </span>
          </motion.div>

          <motion.h2
            id="process-heading"
            variants={y18}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {process.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={y10}
            className="hero-body max-w-[52ch] md:col-span-7 md:col-start-5"
          >
            {process.description}
          </motion.p>
        </InView>

        <motion.div
          className="relative mt-14 pl-9 lg:mt-20 lg:pl-0"
          variants={timeline}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Rail — vertical below lg, horizontal from lg */}
          <motion.span
            aria-hidden="true"
            variants={railY}
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-[var(--border-light)] lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            variants={railX}
            className="absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-[var(--border-light)] lg:block"
          />

          <ol className="grid grid-cols-1 gap-y-9 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0">
            {steps.map((step, i) => (
              <motion.li key={step.id} variants={stage} className="relative lg:pt-10 lg:pr-2">
                <span
                  aria-hidden="true"
                  className="absolute -left-9 top-1.5 h-[11px] w-[11px] rounded-full border border-accent bg-canvas lg:left-0 lg:top-0"
                />
                <span className="text-label text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[1.375rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink lg:mt-3">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[15px] leading-[1.6] text-muted lg:max-w-[30ch]">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
