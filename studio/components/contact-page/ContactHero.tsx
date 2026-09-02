"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { SITE } from "@/lib/site";
import { InView } from "@/components/motion/InView";

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

const panelContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const rowVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function ContactHero({
  hero,
  details,
}: {
  hero: Dictionary["contactPage"]["hero"];
  details: Dictionary["contactPage"]["details"];
}) {
  const rows = [
    { index: "01", label: details.emailLabel, value: SITE.email, href: `mailto:${SITE.email}` },
    { index: "02", label: details.phoneLabel, value: SITE.phone, href: `tel:${SITE.phoneTel}` },
    { index: "03", label: details.locationLabel, value: details.location, href: null },
  ];

  return (
    <section aria-labelledby="contact-hero-heading">
      <div className="wd-container relative isolate overflow-hidden pt-14 pb-16 lg:pt-20 lg:pb-20">
        {/* Subtle technical ambient on the right — light theme, no glow/blobs. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] lg:block"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-ink)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink)_5%,transparent)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(120%_100%_at_100%_0%,#000_35%,transparent_78%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_22%,transparent)_1px,transparent_1.4px)] bg-[size:34px_34px] opacity-40 [mask-image:radial-gradient(90%_70%_at_100%_10%,#000_10%,transparent_70%)]" />
          <div className="absolute left-0 top-[10%] h-[80%] w-px bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--color-accent)_28%,transparent),transparent)]" />
        </div>

        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-[54fr_46fr]">
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

            <motion.h1 id="contact-hero-heading" variants={y18} className="hero-h1 mt-6">
              {hero.headingLead}
              <span className="hero-accent">{hero.headingAccent}</span>
            </motion.h1>

            <motion.p variants={y10} className="hero-body mt-7 max-w-[36rem]">
              {hero.description}
            </motion.p>

            <motion.p
              variants={y10}
              className="mt-6 flex items-center gap-2.5 text-[15px] text-ink"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {hero.microcopy}
            </motion.p>
          </motion.div>

          {/* Right — dense, editorial contact panel */}
          <InView
            as="div"
            variants={panelContainer}
            viewOptions={{ once: true }}
            className="relative w-full lg:justify-self-end lg:max-w-[440px]"
          >
            <div className="relative border border-[var(--border-light)] border-t-2 border-t-accent bg-[color-mix(in_srgb,var(--color-canvas)_60%,#ffffff)] p-7 lg:p-8">
              <motion.div
                variants={rowVariant}
                className="flex items-baseline justify-between"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                  {hero.panelLabel}
                </p>
                <span
                  aria-hidden="true"
                  className="text-[11px] font-medium tabular-nums tracking-[0.1em] text-muted/60"
                >
                  03
                </span>
              </motion.div>

              <ul className="mt-6 divide-y divide-[var(--border-light)]">
                {rows.map((row) => (
                  <motion.li
                    key={row.index}
                    variants={rowVariant}
                    className="flex gap-5 py-4 first:pt-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[12px] font-medium tabular-nums tracking-[0.1em] text-accent"
                    >
                      {row.index}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                        {row.label}
                      </p>
                      <p className="mt-1 text-[16px] text-ink">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="inline-block underline decoration-[var(--border-light)] underline-offset-[5px] transition-colors duration-200 hover:text-accent hover:decoration-accent"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Real availability status — honest, not a fake response time. */}
              <motion.div
                variants={rowVariant}
                className="mt-5 flex items-center gap-3 border-t border-[var(--border-light)] pt-5"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  {hero.statusLabel}
                </p>
                <span className="ml-auto flex items-center gap-2 text-[13px] font-medium text-ink">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {hero.status}
                </span>
              </motion.div>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
