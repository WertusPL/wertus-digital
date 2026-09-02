"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { CtaButton } from "@/components/ui/CtaButton";

const EASE = [0.22, 1, 0.36, 1] as const;

const copyContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const y8 = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const y18 = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const tierVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  },
};

/** Split "od 1200 zł" → ["od", "1200 zł"] so the qualifier can be de-emphasised. */
function splitPrice(price: string): [string, string] {
  const [qualifier, ...rest] = price.split(" ");
  return [qualifier, rest.join(" ")];
}

export function PricingSection({
  locale,
  pricing,
}: {
  locale: Locale;
  pricing: Dictionary["pricing"];
}) {
  const contactHref = routes.contact[locale];
  const servicesHref = routes.services[locale];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[44px] lg:py-[60px]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[40fr_60fr]">
          {/* Copy column */}
          <InView
            as="div"
            className="flex flex-col lg:max-w-[42ch]"
            variants={copyContainer}
            viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
          >
            <motion.div variants={y8}>
              <span className="text-label text-accent">04 /</span>
              <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
                {pricing.label}
              </span>
            </motion.div>

            <motion.h2
              id="pricing-heading"
              variants={y18}
              className="section-heading mt-7"
            >
              {pricing.heading}
            </motion.h2>

            <motion.p
              variants={y10}
              className="mt-3 text-[clamp(1.3rem,1.1vw+0.9rem,1.75rem)] font-medium leading-[1.2] tracking-[-0.01em] text-muted text-balance"
            >
              {pricing.statement}
            </motion.p>

            <motion.p variants={y10} className="hero-body mt-6 max-w-[48ch]">
              {pricing.description}
            </motion.p>

            <motion.p
              variants={y10}
              className="mt-5 flex items-center gap-2.5 text-[14px] text-muted"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {pricing.microcopy}
            </motion.p>

            <motion.div
              variants={y10}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <CtaButton href={contactHref} label={pricing.cta} />
              <Link
                href={servicesHref}
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink"
              >
                {pricing.secondaryCta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.div>
          </InView>

          {/* Price tiers */}
          <AnimatedGroup
            as="ol"
            itemAs="li"
            inView
            viewOptions={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
            variants={tierVariants}
            className="border-b border-[var(--border-light)]"
          >
            {pricing.tiers.map((tier, i) => {
              const [qualifier, amount] = splitPrice(tier.price);
              return (
                <div
                  key={tier.id}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-4 border-t border-[var(--border-light)] py-6 transition-colors duration-300 group-hover:border-accent lg:gap-x-6 lg:py-7"
                >
                  <span className="text-[13px] font-medium tabular-nums tracking-[0.1em] text-muted transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-col gap-1.5 lg:flex-row lg:items-baseline lg:justify-between lg:gap-6">
                      <h3 className="text-[clamp(0.95rem,0.45vw+0.82rem,1.1rem)] font-medium uppercase tracking-[0.13em] text-ink">
                        {tier.name}
                        <span
                          aria-hidden="true"
                          className="ml-2 inline-block text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </h3>
                      <p className="flex items-baseline gap-1.5 whitespace-nowrap tabular-nums lg:shrink-0">
                        <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted lg:text-[14px]">
                          {qualifier}
                        </span>
                        <span className="text-[clamp(1.75rem,1.3vw+1.15rem,2.5rem)] font-medium leading-none tracking-[-0.02em] text-ink">
                          {amount}
                        </span>
                      </p>
                    </div>
                    <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.55] text-muted transition-transform duration-300 ease-out group-hover:translate-x-1">
                      {tier.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </AnimatedGroup>
        </div>

        {/* What influences the quote — secondary info */}
        <InView
          as="div"
          className="mt-12 border-t border-[var(--border-light)] pt-6 lg:mt-16"
          variants={y10}
          viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <p className="max-w-[72ch] text-[14px] leading-relaxed text-muted">
            {pricing.factors}
          </p>
        </InView>
      </div>
    </section>
  );
}
