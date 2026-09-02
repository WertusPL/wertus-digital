"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { ProjectFrame } from "./ProjectFrame";
import { ProjectMedia } from "./ProjectMedia";
import type { ResolvedProject } from "./projects";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectPreview({
  project,
  locale,
  work,
  total,
  reducedMotion,
}: {
  project: ResolvedProject;
  locale: Locale;
  work: Dictionary["work"];
  total: number;
  reducedMotion: boolean;
}) {
  return (
    <div>
      {/* Counter */}
      <div className="mb-5 flex items-center justify-end">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
          {work.counter} {project.index} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <ProjectFrame>
        {/* Crossfade: old + new overlap (absolute), no blank frame, no shift */}
        <AnimatePresence initial={false}>
          <motion.div
            key={project.id}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <ProjectMedia
              project={project}
              locale={locale}
              active
              reducedMotion={reducedMotion}
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>
      </ProjectFrame>

      {/* Meta */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
            {work.scope}
          </p>
          {project.type === "concept" && (
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
              {work.conceptTag} / {project.year}
            </p>
          )}
        </div>

        <Link
          href={routes[project.linkKey][locale]}
          prefetch={false}
          className="group inline-flex items-center gap-2 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
        >
          <span className="relative">
            {work.cta}
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </span>
          <span
            aria-hidden="true"
            className="translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px"
          >
            ↗
          </span>
        </Link>
      </div>
    </div>
  );
}
