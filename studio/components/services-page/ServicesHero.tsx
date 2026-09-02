"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { InView } from "@/components/motion/InView";
import { CtaButton } from "@/components/ui/CtaButton";
import { SCOPE_ANCHOR } from "./anchors";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const y8 = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const y18 = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function ServicesHero({
  hero,
  locale,
}: {
  hero: Dictionary["servicesPage"]["hero"];
  locale: Locale;
}) {
  const contactHref = routes.contact[locale];

  return (
    <section aria-labelledby="services-hero-heading">
      <div className="wd-container pt-14 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-14 lg:grid-cols-[52fr_48fr]">
          {/* Left — copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-[42rem]"
          >
            <motion.p
              variants={y8}
              className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent"
            >
              {hero.label}
            </motion.p>

            <motion.h1 id="services-hero-heading" variants={y18} className="hero-h1 mt-6">
              <span className="block">{hero.headingLine1}</span>
              <span className="block">
                {hero.headingLine2Lead}
                <span className="hero-accent">{hero.headingAccent}</span>
              </span>
            </motion.h1>

            <motion.p variants={y10} className="hero-body mt-7 max-w-[38rem]">
              {hero.description}
            </motion.p>

            <motion.p
              variants={y10}
              className="mt-4 max-w-[38rem] text-[15px] leading-[1.55] text-muted"
            >
              {hero.secondary}
            </motion.p>

            <motion.div
              variants={y10}
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <CtaButton href={contactHref} label={hero.primaryCta} />
              <a
                href={`#${SCOPE_ANCHOR}`}
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink"
              >
                <span className="relative">
                  {hero.secondaryCta}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — dark product-evolution panel */}
          <InView
            as="div"
            viewOptions={{ once: true }}
            className="w-full lg:justify-self-end lg:max-w-[560px]"
          >
            <HeroVisual hero={hero} />
          </InView>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Dark panel — the product journey from structure to a live site.
 * A stack of offset interface layers (wireframe → UI → live) on the
 * left, a labelled progress rail on the right. Pure CSS/SVG, no images
 * and no invented brand. Micro-motion is a small mount stagger.
 * ------------------------------------------------------------------ */
function HeroVisual({ hero }: { hero: Dictionary["servicesPage"]["hero"] }) {
  const steps = hero.visualSteps;
  const lastIndex = steps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-white/12 bg-surface"
    >
      {/* Chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
          {hero.visualTitle}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-accent/70" />
        </span>
      </div>

      <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:gap-5">
        {/* Layered screens */}
        <div className="relative h-[236px] w-full min-w-0 sm:h-[260px] lg:w-auto lg:flex-1">
          {/* Back — wireframe */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            className="absolute right-0 top-0 h-[62%] w-[74%] rounded-lg border border-dashed border-white/20 bg-white/[0.02] p-3"
          >
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-6 rounded-sm bg-white/25" />
              <span className="h-2.5 w-6 rounded border border-white/25" />
            </div>
            <div className="mt-2.5 space-y-1.5">
              <span className="block h-1.5 w-4/5 rounded bg-white/18" />
              <span className="block h-1.5 w-3/5 rounded bg-white/18" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <span className="h-6 rounded border border-white/12" />
              <span className="h-6 rounded border border-white/12" />
              <span className="h-6 rounded border border-white/12" />
            </div>
            <span className="mt-2 block text-[8px] uppercase tracking-[0.18em] text-white/30">
              Wireframe
            </span>
          </motion.div>

          {/* Front — live UI */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="absolute bottom-0 left-0 h-[70%] w-[78%] overflow-hidden rounded-lg border border-white/12 bg-[#0e1218] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]"
          >
            {/* browser bar */}
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </span>
              <span className="ml-1 h-3 flex-1 rounded-full bg-white/[0.06]" />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" />
                  <span className="h-1.5 w-9 rounded bg-white/70" />
                </span>
                <span className="h-3.5 w-10 rounded-full bg-accent" />
              </div>
              <div className="mt-3 space-y-1.5">
                <span className="block h-2.5 w-11/12 rounded bg-white/85" />
                <span className="block h-2.5 w-2/3 rounded bg-white/85" />
              </div>
              <div className="mt-2 space-y-1">
                <span className="block h-1.5 w-full rounded bg-white/20" />
                <span className="block h-1.5 w-4/5 rounded bg-white/16" />
              </div>
              <div className="mt-3 h-10 rounded bg-[linear-gradient(135deg,#1c2434_0%,#2b3652_60%,#3a4a6e55_100%)] ring-1 ring-inset ring-white/8" />
            </div>
          </motion.div>
        </div>

        {/* Progress rail */}
        <ol className="flex shrink-0 flex-col justify-between gap-3 lg:w-[164px]">
          {steps.map((step, i) => {
            const isLast = i === lastIndex;
            return (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.35 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="relative mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center">
                  {isLast && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                  )}
                  <span
                    className={
                      "relative h-2 w-2 rounded-full " +
                      (isLast ? "bg-accent" : "bg-white/25")
                    }
                  />
                  {i < lastIndex && (
                    <span className="absolute left-1/2 top-3 h-[calc(100%+0.75rem-0.25rem)] w-px -translate-x-1/2 bg-white/12" />
                  )}
                </span>
                <span className="min-w-0">
                  <span
                    className={
                      "block text-[11px] font-medium uppercase tracking-[0.14em] " +
                      (isLast ? "text-accent" : "text-white/70")
                    }
                  >
                    {step.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-[1.4] text-white/40">
                    {step.caption}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </motion.div>
  );
}
