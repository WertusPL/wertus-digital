"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";
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

type ScopeSelector = Dictionary["servicesPage"]["scopeSelector"];

export function ScopeSelector({
  scopeSelector,
  locale,
}: {
  scopeSelector: ScopeSelector;
  locale: Locale;
}) {
  const options = scopeSelector.options;
  const [selected, setSelected] = useState(0);
  const current = options[selected];
  const contactHref = routes.contact[locale];

  return (
    <section
      id="scope-selector"
      aria-labelledby="scope-selector-heading"
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
            <span className="text-label text-accent">04 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {scopeSelector.label}
            </span>
          </motion.div>

          <motion.h2
            id="scope-selector-heading"
            variants={y18}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {scopeSelector.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={y10}
            className="hero-body max-w-[52ch] md:col-span-7 md:col-start-5"
          >
            {scopeSelector.description}
          </motion.p>
        </InView>

        {/* Selector + result */}
        <InView
          as="div"
          variants={y10}
          viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-12 grid grid-cols-1 gap-x-14 gap-y-8 lg:mt-16 lg:grid-cols-[52fr_48fr]"
        >
          {/* Goal selector */}
          <fieldset>
            <legend className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              {scopeSelector.goalLabel}
            </legend>
            <div className="mt-5 flex flex-col gap-3">
              {options.map((opt, i) => {
                const checked = i === selected;
                return (
                  <label
                    key={opt.id}
                    className={cn(
                      "group flex cursor-pointer items-center gap-4 rounded-xl border px-5 py-4 transition-colors duration-200",
                      "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                      checked
                        ? "border-accent bg-[color-mix(in_srgb,var(--color-accent)_6%,transparent)]"
                        : "border-[var(--border-light)] hover:border-ink",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                        checked ? "border-accent" : "border-muted/50",
                      )}
                    >
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition-transform duration-200",
                          checked ? "scale-100 bg-accent" : "scale-0 bg-accent",
                        )}
                      />
                    </span>
                    <input
                      type="radio"
                      name="scope-goal"
                      value={opt.id}
                      checked={checked}
                      onChange={() => setSelected(i)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "text-[16px] leading-[1.4] transition-colors duration-200",
                        checked ? "text-ink" : "text-muted group-hover:text-ink",
                      )}
                    >
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Result */}
          <div className="relative flex flex-col justify-between border border-[var(--border-light)] border-t-2 border-t-accent bg-[color-mix(in_srgb,var(--color-canvas)_60%,#ffffff)] p-7 lg:p-8">
            <div aria-live="polite">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                {scopeSelector.resultLead}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="mt-4 flex items-baseline justify-between gap-4"
                >
                  <span className="text-[clamp(1.5rem,1.6vw+1.1rem,2.1rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
                    {current.result}
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-[15px] font-medium tabular-nums text-accent">
                    {current.price}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8">
              <CtaButton href={contactHref} label={scopeSelector.cta} />
              <p className="mt-5 max-w-[46ch] text-[13px] leading-[1.55] text-muted">
                {scopeSelector.disclaimer}
              </p>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
