"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";

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
const listVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  },
};

type Deliverables = Dictionary["servicesPage"]["deliverables"];

export function Deliverables({
  deliverables,
}: {
  deliverables: Deliverables;
}) {
  return (
    <section
      id="deliverables"
      aria-labelledby="deliverables-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[52px] lg:py-[72px]">
        {/* Intro */}
        <InView
          as="div"
          className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12"
          variants={introContainer}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <motion.div variants={y10} className="md:col-span-3">
            <span className="text-label text-accent">03 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {deliverables.label}
            </span>
          </motion.div>

          <motion.h2
            id="deliverables-heading"
            variants={y18}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {deliverables.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>
        </InView>

        {/* Pipeline strip */}
        <InView
          as="div"
          variants={y10}
          viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-10 overflow-x-auto"
        >
          <div className="flex min-w-max items-center gap-x-2 rounded-xl border border-[var(--border-light)] px-4 py-3.5 sm:gap-x-3 sm:px-5">
            {deliverables.pipeline.map((step, i) => (
              <Fragment key={step}>
                <span className="flex items-center gap-2 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.12em] text-ink sm:text-[13px]">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {step}
                </span>
                {i < deliverables.pipeline.length - 1 && (
                  <span aria-hidden="true" className="shrink-0 text-muted/60">
                    →
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </InView>

        {/* Checklist */}
        <AnimatedGroup
          as="ol"
          itemAs="li"
          inView
          viewOptions={{ once: true, amount: 0.08, margin: "0px 0px -10% 0px" }}
          variants={listVariants}
          className="mt-12 grid grid-cols-1 border-t border-[var(--border-light)] sm:grid-cols-2 sm:gap-x-14 lg:mt-14"
        >
          {deliverables.items.map((item) => (
            <div
              key={item.index}
              className="flex items-baseline gap-5 border-b border-[var(--border-light)] py-4"
            >
              <span className="text-[13px] font-medium tabular-nums tracking-[0.1em] text-accent">
                {item.index}
              </span>
              <span className="text-[16px] leading-[1.4] text-ink">{item.title}</span>
            </div>
          ))}
        </AnimatedGroup>

        {/* Scope note */}
        <InView
          as="div"
          variants={y10}
          viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-8 flex items-center gap-2.5 text-[14px] text-muted"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{deliverables.note}</span>
        </InView>
      </div>
    </section>
  );
}
