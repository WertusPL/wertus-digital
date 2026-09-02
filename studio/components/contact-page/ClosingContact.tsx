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
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function ClosingContact({
  closing,
  details,
}: {
  closing: Dictionary["contactPage"]["closing"];
  details: Dictionary["contactPage"]["details"];
}) {
  const blocks = [
    { label: details.emailLabel, value: SITE.email, href: `mailto:${SITE.email}` },
    { label: details.phoneLabel, value: SITE.phone, href: `tel:${SITE.phoneTel}` },
  ];

  return (
    <section
      aria-labelledby="closing-heading"
      className="border-t border-[var(--border-light)] bg-[color-mix(in_srgb,var(--color-ink)_4%,var(--color-canvas))]"
    >
      <div className="wd-container py-[64px] lg:py-[96px]">
        <InView
          as="div"
          variants={container}
          viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
          className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-[1fr_auto]"
        >
          {/* Left — label + headline */}
          <div className="max-w-[22ch]">
            <motion.p
              variants={y10}
              className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent"
            >
              {closing.label}
            </motion.p>
            <motion.h2
              id="closing-heading"
              variants={y10}
              className="mt-4 text-[clamp(1.75rem,2.4vw+1rem,2.75rem)] font-medium leading-[1.08] tracking-[-0.025em] text-ink"
            >
              {closing.heading}
            </motion.h2>
            <motion.p
              variants={y10}
              className="mt-4 text-[15px] leading-[1.55] text-muted"
            >
              {closing.lead}
            </motion.p>
          </div>

          {/* Right — labelled direct channels */}
          <motion.div
            variants={y10}
            className="flex flex-col gap-8 border-t border-[var(--border-light)] pt-8 sm:flex-row sm:gap-12 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"
          >
            {blocks.map((block) => (
              <div key={block.label}>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  {block.label}
                </p>
                <a
                  href={block.href}
                  className="mt-2 block text-[clamp(1.15rem,1vw+0.85rem,1.4rem)] font-medium tracking-[-0.01em] text-ink underline decoration-[var(--border-light)] underline-offset-[6px] transition-colors duration-200 hover:text-accent hover:decoration-accent"
                >
                  {block.value}
                </a>
              </div>
            ))}
          </motion.div>
        </InView>
      </div>
    </section>
  );
}
