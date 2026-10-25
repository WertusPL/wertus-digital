"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";
import { ProjectFrame } from "./ProjectFrame";
import { ProjectMedia } from "./ProjectMedia";
import type { WorkProject } from "./projects";

const EASE = [0.22, 1, 0.36, 1] as const;

const group = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * One real client project: desktop screenshot in the browser frame with the
 * phone view overlapping it, opposite the project facts. `reverse` mirrors
 * the composition so consecutive projects alternate sides.
 *
 * Below `md` the phone view leads (≈half the width, in front) and the desktop
 * frame sits behind it top-right — a desktop screenshot at phone width is
 * unreadable, the real mobile layout is not. From `md` the desktop frame leads
 * with the phone as a small overlapping detail.
 */
export function ProjectFeature({
  project,
  number,
  locale,
  work,
  reverse = false,
}: {
  project: WorkProject;
  number: string; // "01"
  locale: Locale;
  work: Dictionary["work"];
  reverse?: boolean;
}) {
  const copy = work.projects[project.id];
  const headingId = `work-${project.id}-heading`;

  return (
    <InView
      as="div"
      variants={group}
      viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
      className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-8"
    >
      {/* Media */}
      <motion.div
        variants={rise}
        className={cn(
          "relative pb-[80%] pl-[20%] md:pb-[9%] md:pl-0 md:pr-[5%] lg:col-span-7",
          reverse && "lg:order-2 lg:col-start-6",
        )}
      >
        <ProjectFrame>
          <ProjectMedia
            project={project}
            locale={locale}
            sizes="(min-width: 1024px) 56vw, 92vw"
          />
        </ProjectFrame>

        {project.mobile && (
          <div className="absolute bottom-0 left-0 w-[50%] overflow-hidden rounded-[18px] border border-white/15 bg-[#0e1116] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)] md:left-auto md:right-0 md:w-[23%] md:rounded-[16px]">
            <Image
              src={project.mobile.src}
              width={project.mobile.width}
              height={project.mobile.height}
              alt={project.mobileAlt?.[locale] ?? ""}
              sizes="(min-width: 1024px) 13vw, (min-width: 768px) 22vw, 50vw"
              className="block h-auto w-full"
            />
          </div>
        )}
      </motion.div>

      {/* Facts */}
      <motion.article
        variants={rise}
        aria-labelledby={headingId}
        className={cn(
          "lg:col-span-4 lg:col-start-9",
          reverse && "lg:order-1 lg:col-start-1",
        )}
      >
        <p className="text-label text-accent">{number}</p>
        <h3
          id={headingId}
          className="mt-3 text-[clamp(1.75rem,1.6vw+1.1rem,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white"
        >
          {project.title}
        </h3>
        <p className="mt-4 max-w-[40ch] text-[16px] leading-[1.6] text-white/70">
          {copy.summary}
        </p>

        <dl className="mt-8 border-b border-white/12 text-[14px]">
          <div className="flex gap-6 border-t border-white/12 py-3">
            <dt className="w-[5.5rem] shrink-0 text-white/55">{work.sectorLabel}</dt>
            <dd className="text-white">{copy.sector}</dd>
          </div>
          <div className="flex gap-6 border-t border-white/12 py-3">
            <dt className="w-[5.5rem] shrink-0 text-white/55">{work.scopeLabel}</dt>
            <dd className="text-white">
              <ul className="space-y-1 leading-[1.5]">
                {copy.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <Link
          href={routes[project.linkKey][locale]}
          className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-white"
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
            className="transition-transform duration-200 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </motion.article>
    </InView>
  );
}
