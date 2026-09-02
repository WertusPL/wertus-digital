"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { SITE } from "@/lib/site";
import { InView } from "@/components/motion/InView";
import { CtaButton } from "@/components/ui/CtaButton";
import { AmbientBackground } from "@/components/contact/AmbientBackground";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const y8 = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const y20 = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

type FinalCta = Dictionary["servicesPage"]["finalCta"];

export function ServicesFinalCta({
  finalCta,
  locale,
}: {
  finalCta: FinalCta;
  locale: Locale;
}) {
  const contactHref = routes.contact[locale];

  return (
    <section
      id="start-project"
      aria-labelledby="start-project-heading"
      className="relative isolate overflow-hidden bg-surface text-canvas"
    >
      <AmbientBackground />

      <div className="wd-container pt-[76px] pb-[84px] lg:pt-[104px] lg:pb-[116px]">
        <InView
          as="div"
          variants={container}
          viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          <motion.div variants={y8} className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
              {finalCta.label}
            </span>
          </motion.div>

          <motion.h2
            id="start-project-heading"
            variants={y8}
            className="mt-7 font-medium leading-[1.04] tracking-[-0.03em] text-canvas [font-size:clamp(2.25rem,4.6vw+1rem,4.5rem)] text-balance"
          >
            {finalCta.heading.map((line, i) => (
              <motion.span key={i} variants={y20} className="block">
                {line}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            variants={y10}
            className="mt-6 max-w-[48ch] text-[clamp(1rem,0.5vw+0.9rem,1.2rem)] leading-[1.55] text-white/65"
          >
            {finalCta.description}
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8"
          >
            <CtaButton href={contactHref} label={finalCta.primaryCta} />

            <span className="text-[15px] text-white/55">
              {finalCta.secondary}{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-canvas underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              >
                {SITE.email}
              </a>
            </span>
          </motion.div>
        </InView>
      </div>
    </section>
  );
}
