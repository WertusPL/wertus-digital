"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { InView } from "@/components/motion/InView";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FeaturedProject } from "./FeaturedProject";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({
  locale,
  hero,
  featured,
}: {
  locale: Locale;
  hero: Dictionary["hero"];
  featured: Dictionary["featured"];
}) {
  const fadeUp = (delay: number, y = 12) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="wd-container grid items-center gap-x-12 gap-y-12 py-14 sm:py-16 min-[1400px]:min-h-[calc(100svh-var(--nav-height)-6vh)] min-[1400px]:grid-cols-[53fr_47fr] min-[1400px]:gap-x-16 min-[1400px]:gap-y-0 min-[1400px]:py-16"
    >
      {/* Left — brand communication */}
      <div className="order-1 max-w-[46rem]">
        <motion.p {...fadeUp(0.12, 8)} className="text-eyebrow">
          {hero.eyebrow}
        </motion.p>

        <h1 id="hero-heading" className="hero-h1 mt-6">
          {hero.headline.map((line, lineIndex) => (
            <span
              key={lineIndex}
              className="-mb-[0.1em] block overflow-hidden pb-[0.14em]"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.2 + lineIndex * 0.08 }}
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
            </span>
          ))}
        </h1>

        <motion.p {...fadeUp(0.62)} className="hero-body mt-7 max-w-[34rem]">
          {hero.description}
        </motion.p>

        <AnimatedGroup
          as="div"
          className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
          variants={{
            container: {
              hidden: {},
              visible: { transition: { delayChildren: 0.72, staggerChildren: 0.07 } },
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

        <motion.div
          {...fadeUp(0.9)}
          className="mt-12 border-t border-[var(--border-light)] pt-5"
        >
          <h2 className="sr-only">{hero.capabilitiesLabel}</h2>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
            {hero.capabilities.map((item, i) => (
              <li key={item} className="flex items-center gap-x-5">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[var(--border-light)]"
                  />
                )}
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right — featured concept project.
          Stacked: capped so it stays a strong element without going oversized;
          split (min-1400+): fills its column.
          Reveals once on scroll-into-view (matters on stacked layouts where it
          sits below the fold). Scale+opacity → collapses to a plain fade under
          reduced motion via <MotionConfig reducedMotion="user">. */}
      <InView
        as="div"
        className={cn("order-2 w-full max-w-[680px] min-[1400px]:max-w-none")}
        variants={{
          hidden: { opacity: 0, scale: 0.985, y: 12 },
          visible: { opacity: 1, scale: 1, y: 0 },
        }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
        viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
      >
        <FeaturedProject featured={featured} />
      </InView>
    </section>
  );
}
