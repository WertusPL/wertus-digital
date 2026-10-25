"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowLink } from "@/components/ui/ArrowLink";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Typographic homepage hero. The headline spans the full measure; beneath it
 * the pitch + actions (left) sit opposite a short ledger of verifiable studio
 * facts (right). No imagery, no invented numbers — the type carries the page.
 */
export function Hero({
  locale,
  hero,
}: {
  locale: Locale;
  hero: Dictionary["hero"];
}) {
  const fadeUp = (delay: number, y = 12) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="wd-container pt-[clamp(48px,8vh,104px)] pb-[clamp(56px,8vh,96px)]"
    >
      <h1 id="hero-heading" className="home-display">
        {/* From sm each line is its own masked row (authored breaks); on
            phones the lines flow inline so the browser balances the wrap. */}
        {hero.headline.map((line, lineIndex) => (
          <span
            key={lineIndex}
            className="inline sm:-mb-[0.1em] sm:block sm:overflow-hidden sm:pb-[0.12em]"
          >
            <motion.span
              className="inline sm:block"
              initial={{ opacity: 0, y: "0.6em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 + lineIndex * 0.08 }}
            >
              {line.map((segment, i) => (
                <Fragment key={i}>
                  {segment.accent ? (
                    <span className="hero-accent">{segment.text}</span>
                  ) : (
                    segment.text
                  )}
                </Fragment>
              ))}
            </motion.span>
            {lineIndex < hero.headline.length - 1 && " "}
          </span>
        ))}
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-y-12 sm:mt-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-8">
        {/* Pitch + actions */}
        <div className="lg:col-span-5">
          <motion.p {...fadeUp(0.45)} className="hero-body max-w-[34rem]">
            {hero.description}
          </motion.p>

          <AnimatedGroup
            as="div"
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
            variants={{
              container: {
                hidden: {},
                visible: { transition: { delayChildren: 0.55, staggerChildren: 0.07 } },
              },
              item: {
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
              },
            }}
          >
            <CtaButton href={routes.contact[locale]} label={hero.primaryCta} />
            <ArrowLink href={routes.work[locale]} label={hero.secondaryCta} />
          </AnimatedGroup>
        </div>

        {/* Facts ledger — label / value rows on hairlines */}
        <motion.div {...fadeUp(0.7)} className="lg:col-span-6 lg:col-start-7">
          <h2 className="sr-only">{hero.factsLabel}</h2>
          <dl className="grid grid-cols-1 border-b border-[var(--border-light)] sm:grid-cols-2 sm:gap-x-8">
            {hero.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-t border-[var(--border-light)] py-3.5 sm:block sm:py-4"
              >
                <dt className="shrink-0 text-[13px] text-ink/65">{fact.label}</dt>
                <dd className="text-right text-[15px] font-medium leading-[1.4] text-ink sm:mt-1.5 sm:text-left sm:text-[16px]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
