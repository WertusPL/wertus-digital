"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { SCOPE_ANCHOR, serviceAnchors, ANCHOR_SCROLL_MT } from "./anchors";

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
const rowVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  },
};

type Capabilities = Dictionary["servicesPage"]["capabilities"];

export function Capabilities({
  capabilities,
  locale,
}: {
  capabilities: Capabilities;
  locale: Locale;
}) {
  // Two pillars are direct mega-menu anchor targets.
  const anchorFor = (id: string): string | undefined =>
    id === "cms"
      ? serviceAnchors.cms[locale]
      : id === "care"
        ? serviceAnchors.care[locale]
        : undefined;
  return (
    <section
      id={SCOPE_ANCHOR}
      aria-labelledby="capabilities-heading"
      className="scroll-mt-[calc(var(--nav-height)+1rem)] border-t border-[var(--border-light)]"
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
            <span className="text-label text-accent">02 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {capabilities.label}
            </span>
          </motion.div>

          <motion.h2
            id="capabilities-heading"
            variants={y18}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {capabilities.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={y10}
            className="hero-body max-w-[50ch] md:col-span-7 md:col-start-5"
          >
            {capabilities.description}
          </motion.p>
        </InView>

        {/* Pillars — editorial rows */}
        <AnimatedGroup
          as="div"
          itemAs="div"
          inView
          viewOptions={{ once: true, amount: 0.08, margin: "0px 0px -10% 0px" }}
          variants={rowVariants}
          className="mt-12 border-t border-[var(--border-light)] lg:mt-16"
        >
          {capabilities.items.map((item) => (
            <div
              key={item.id}
              id={anchorFor(item.id)}
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-5 border-b border-[var(--border-light)] py-9 md:grid-cols-12 lg:py-11",
                anchorFor(item.id) && ANCHOR_SCROLL_MT,
              )}
            >
              {/* Left — index + name */}
              <div className="md:col-span-3">
                <span className="text-[13px] font-medium tabular-nums tracking-[0.1em] text-accent">
                  {item.index}
                </span>
                <span className="mt-2 block text-[1.05rem] font-medium uppercase tracking-[0.06em] text-ink">
                  {item.name}
                </span>
                {item.price ? (
                  <span className="mt-3 inline-block text-[14px] font-medium tabular-nums text-muted">
                    {item.price}
                  </span>
                ) : null}
              </div>

              {/* Right — headline + copy + scope */}
              <div className="md:col-span-8 md:col-start-5">
                <h3 className="text-[clamp(1.25rem,1.3vw+0.9rem,1.6rem)] font-medium leading-[1.2] tracking-[-0.01em] text-ink">
                  {item.headline}
                </h3>
                <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.6] text-muted">
                  {item.description}
                </p>

                {item.note ? (
                  <p className="mt-4 max-w-[58ch] border-l-2 border-accent/40 pl-4 text-[14px] leading-[1.55] text-muted">
                    {item.note}
                  </p>
                ) : null}

                <div className="mt-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                    {capabilities.scopeLabel}
                  </span>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.scope.map((entry) => (
                      <li
                        key={entry}
                        className="rounded-full border border-[var(--border-light)] px-3.5 py-1.5 text-[13px] text-ink"
                      >
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
