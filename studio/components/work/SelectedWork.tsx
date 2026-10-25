"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { InView } from "@/components/motion/InView";
import type { WorkProject } from "./projects";
import { ProjectFeature } from "./ProjectFeature";

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

/**
 * Homepage "Selected work" — real client projects only. Receives already
 * filtered data (`publishedWork()` in projects.ts, called on the server).
 * Renders nothing when no project is published, so the page never shows an
 * empty or placeholder portfolio.
 */
export function SelectedWork({
  locale,
  projects,
  work,
}: {
  locale: Locale;
  projects: WorkProject[];
  work: Dictionary["work"];
}) {
  if (projects.length === 0) return null;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-surface text-canvas"
    >
      <div className="wd-container py-[88px] lg:py-[120px]">
        <InView
          as="div"
          className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12"
          variants={introContainer}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <motion.div variants={y10} className="md:col-span-3">
            <span className="text-label text-accent">02 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-canvas/85">
              {work.kicker}
            </span>
          </motion.div>

          <motion.h2
            id="work-heading"
            variants={y18}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {work.headline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={y10}
            className="hero-body max-w-[44ch] text-white/65 md:col-span-7 md:col-start-5"
          >
            {work.description}
          </motion.p>
        </InView>

        <div className="mt-12 flex flex-col gap-24 border-t border-white/12 pt-12 lg:mt-16 lg:gap-32 lg:pt-16">
          {projects.map((project, i) => (
            <ProjectFeature
              key={project.id}
              project={project}
              number={String(i + 1).padStart(2, "0")}
              locale={locale}
              work={work}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
