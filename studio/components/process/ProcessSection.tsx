"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { ProcessVisual } from "./ProcessVisual";

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
const mobileVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  },
};

export function ProcessSection({
  locale,
  process,
}: {
  locale: Locale;
  process: Dictionary["process"];
}) {
  const steps = process.steps;
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // A 0-height band at viewport centre selects the step crossing it — native
  // scroll, no scroll-jacking, no smooth-scroll library. Same predictable
  // pattern as the services section, so activation never flickers at edges.
  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[44px] lg:py-[60px]">
        {/* Intro — matches studio/services rhythm */}
        <InView
          as="div"
          className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12"
          variants={introContainer}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <motion.div variants={y10} className="md:col-span-3">
            <span className="text-label text-accent">03 /</span>
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

        {/* Desktop: left steps scroll, right visual pinned & swaps per active. */}
        <div className="mt-16 hidden grid-cols-[40fr_60fr] gap-x-12 lg:grid xl:gap-x-16">
          {/* Steps track (the scroll length) */}
          <ol className="relative">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <li
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-index={i}
                  aria-current={isActive ? "step" : undefined}
                  className="flex min-h-[44vh] items-center"
                >
                  <div className="flex gap-5">
                    <span
                      className={cn(
                        "pt-1 text-[13px] font-medium tabular-nums tracking-[0.1em] transition-colors duration-500",
                        isActive ? "text-accent" : "text-muted/70",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={cn(
                        "border-l pl-5 transition-colors duration-500",
                        isActive ? "border-accent" : "border-[var(--border-light)]",
                      )}
                    >
                      <h3
                        className={cn(
                          "text-[clamp(1.35rem,1.6vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.01em] transition-colors duration-500",
                          isActive ? "text-ink" : "text-muted/55",
                        )}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 max-w-[34ch] text-[1.0625rem] leading-[1.55] transition-colors duration-500",
                          isActive ? "text-muted" : "text-muted/45",
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Pinned visual */}
          <div>
            <div className="sticky top-[calc(var(--nav-height)+2rem)]">
              <div className="h-[clamp(300px,44vh,460px)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={steps[active].id}
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="h-full"
                  >
                    <ProcessVisual
                      id={steps[active].id}
                      index={active}
                      locale={locale}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Progress dots — a second, non-colour cue for the active step */}
              <div
                className="mt-5 flex items-center gap-2"
                aria-hidden="true"
              >
                {steps.map((step, i) => (
                  <span
                    key={step.id}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      i === active ? "w-8 bg-accent" : "w-4 bg-[var(--border-light)]",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Touch layout: each step is text → visual, all steps visible. */}
        <AnimatedGroup
          as="div"
          itemAs="div"
          inView
          viewOptions={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
          variants={mobileVariants}
          className="mt-12 flex flex-col gap-12 lg:hidden"
        >
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={cn(
                i > 0 && "border-t border-[var(--border-light)] pt-12",
              )}
            >
              <div className="flex gap-4">
                <span className="pt-0.5 text-[13px] font-medium tabular-nums tracking-[0.1em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[clamp(1.4rem,4.5vw,1.7rem)] font-medium leading-[1.15] tracking-[-0.01em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[1.0625rem] leading-[1.55] text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 h-[clamp(260px,58vw,340px)]">
                <ProcessVisual id={step.id} index={i} locale={locale} />
              </div>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
