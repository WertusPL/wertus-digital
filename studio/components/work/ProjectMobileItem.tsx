"use client";

import Link from "next/link";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { ProjectFrame } from "./ProjectFrame";
import { ProjectMedia } from "./ProjectMedia";
import type { ResolvedProject } from "./projects";

/**
 * One project as a full-width block for touch layouts (no hover dependency).
 * Poster is shown statically; video is never autoplayed here (performance).
 */
export function ProjectMobileItem({
  project,
  locale,
  work,
  reducedMotion,
}: {
  project: ResolvedProject;
  locale: Locale;
  work: Dictionary["work"];
  reducedMotion: boolean;
}) {
  return (
    <article className="border-t border-white/12 pt-8">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-[13px] font-medium tabular-nums text-accent">
          {project.index} /
        </span>
        <div>
          <h3 className="text-[1.35rem] font-medium tracking-[-0.01em] text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-[13px] text-white/45">
            {project.industry} · {work.conceptShort}
          </p>
        </div>
      </div>

      <ProjectFrame>
        <ProjectMedia
          project={project}
          locale={locale}
          reducedMotion={reducedMotion}
          sizes="100vw"
        />
      </ProjectFrame>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
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
          className="group inline-flex items-center gap-2 text-[15px] font-medium text-white"
        >
          {work.cta}
          <span
            aria-hidden="true"
            className="translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px"
          >
            ↗
          </span>
        </Link>
      </div>
    </article>
  );
}
