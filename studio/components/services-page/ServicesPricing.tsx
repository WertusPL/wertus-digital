"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { CtaButton } from "@/components/ui/CtaButton";

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
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
};

/** Split "od 1200 zł" → ["od", "1200 zł"] so the qualifier can be de-emphasised. */
function splitPrice(price: string): [string, string] {
  const [qualifier, ...rest] = price.split(" ");
  return [qualifier, rest.join(" ")];
}

type Pricing = Dictionary["servicesPage"]["pricing"];

export function ServicesPricing({
  pricing,
  locale,
}: {
  pricing: Pricing;
  locale: Locale;
}) {
  const contactHref = routes.contact[locale];

  return (
    <section
      id="starting-prices"
      aria-labelledby="starting-prices-heading"
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
            <span className="text-label text-accent">05 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {pricing.label}
            </span>
          </motion.div>

          <motion.h2
            id="starting-prices-heading"
            variants={y18}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {pricing.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>
        </InView>

        {/* Price rows */}
        <AnimatedGroup
          as="ol"
          itemAs="li"
          inView
          viewOptions={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
          variants={rowVariants}
          className="mt-12 border-t border-[var(--border-light)] lg:mt-14"
        >
          {pricing.rows.map((row, i) => {
            const [qualifier, amount] = splitPrice(row.price);
            return (
              <div
                key={row.name}
                className="flex items-baseline gap-x-5 border-b border-[var(--border-light)] py-6 lg:py-7"
              >
                <span className="text-[13px] font-medium tabular-nums tracking-[0.1em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(1.05rem,0.6vw+0.9rem,1.35rem)] font-medium text-ink">
                  {row.name}
                </h3>
                <p className="ml-auto flex items-baseline gap-1.5 whitespace-nowrap tabular-nums">
                  <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted lg:text-[14px]">
                    {qualifier}
                  </span>
                  <span className="text-[clamp(1.4rem,1.4vw+1.15rem,2.5rem)] font-medium leading-none tracking-[-0.02em] text-ink">
                    {amount}
                  </span>
                </p>
              </div>
            );
          })}
        </AnimatedGroup>

        {/* Note + CTA */}
        <InView
          as="div"
          variants={y10}
          viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-center gap-2.5 text-[14px] text-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {pricing.note}
          </p>
          <CtaButton href={contactHref} label={pricing.cta} />
        </InView>

        {/* What affects the price */}
        <InView
          as="div"
          variants={y10}
          viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-12 rounded-xl border border-[var(--border-light)] p-6 lg:mt-14 lg:p-8"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            {pricing.factorsLabel}
          </span>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {pricing.factors.map((factor) => (
              <li
                key={factor}
                className="rounded-full border border-[var(--border-light)] px-3.5 py-1.5 text-[13px] uppercase tracking-[0.04em] text-ink"
              >
                {factor}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.6] text-muted">
            {pricing.factorsNote}
          </p>
        </InView>
      </div>
    </section>
  );
}
