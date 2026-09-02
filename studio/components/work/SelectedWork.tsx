"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { InView } from "@/components/motion/InView";
import { workProjects, type ResolvedProject } from "./projects";
import { ProjectList } from "./ProjectList";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectMobileItem } from "./ProjectMobileItem";

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

export function SelectedWork({
  locale,
  work,
}: {
  locale: Locale;
  work: Dictionary["work"];
}) {
  const reducedMotion = usePrefersReducedMotion();
  const projects: ResolvedProject[] = workProjects.map((p) => ({
    ...p,
    industry: work.industries[p.id] ?? "",
  }));
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-surface text-canvas"
    >
      <div className="wd-container py-[72px] lg:py-[120px]">
        {/* Intro */}
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
            className="hero-body max-w-[52ch] text-white/60 md:col-span-7 md:col-start-5"
          >
            {work.description}
          </motion.p>

          <motion.div variants={y10} className="md:col-span-7 md:col-start-5">
            <Link
              href={routes.work[locale]}
              prefetch={false}
              className="group inline-flex items-center gap-2 text-[15px] font-medium text-canvas"
            >
              {work.viewAll}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        </InView>

        {/* Desktop reel: list (left) + large preview (right) */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-[38fr_62fr] lg:items-start lg:gap-x-16">
          <ProjectList
            projects={projects}
            activeId={activeId}
            onActivate={setActiveId}
            work={work}
          />
          <InView
            as="div"
            variants={y18}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            <ProjectPreview
              project={active}
              locale={locale}
              work={work}
              total={projects.length}
              reducedMotion={reducedMotion}
            />
          </InView>
        </div>

        {/* Touch layout: each project a full-width block */}
        <AnimatedGroup
          as="div"
          itemAs="div"
          inView
          viewOptions={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
          variants={mobileVariants}
          className="mt-12 flex flex-col gap-12 lg:hidden"
        >
          {projects.map((project) => (
            <ProjectMobileItem
              key={project.id}
              project={project}
              locale={locale}
              work={work}
              reducedMotion={reducedMotion}
            />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
