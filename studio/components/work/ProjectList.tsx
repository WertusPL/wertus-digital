"use client";

import type { Dictionary } from "@/dictionaries/types";
import { cn } from "@/lib/utils";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import type { ResolvedProject } from "./projects";

const EASE = [0.22, 1, 0.36, 1] as const;

const listVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
};

export function ProjectList({
  projects,
  activeId,
  onActivate,
  work,
}: {
  projects: ResolvedProject[];
  activeId: string;
  onActivate: (id: string) => void;
  work: Dictionary["work"];
}) {
  return (
    <AnimatedGroup
      as="ul"
      itemAs="li"
      inView
      viewOptions={{ once: true, amount: 0.3 }}
      variants={listVariants}
      className="border-b border-white/12"
    >
      {projects.map((project) => {
        const active = project.id === activeId;
        return (
          <button
            key={project.id}
            type="button"
            onMouseEnter={() => onActivate(project.id)}
            onFocus={() => onActivate(project.id)}
            onClick={() => onActivate(project.id)}
            aria-pressed={active}
            className={cn(
              "group flex w-full items-start gap-5 border-t py-6 text-left transition-colors duration-300",
              active ? "border-[#0655fe]" : "border-white/12",
            )}
          >
            <span
              className={cn(
                "pt-1 text-[13px] font-medium tabular-nums tracking-[0.1em] transition-colors duration-300",
                active ? "text-accent" : "text-white/40",
              )}
            >
              {project.index}
            </span>

            <span className="flex-1">
              <span
                className={cn(
                  "block text-[clamp(1.25rem,1.6vw,1.75rem)] font-medium tracking-[-0.01em] transition-colors duration-300",
                  active ? "text-white" : "text-white/55 group-hover:text-white/80",
                )}
              >
                {project.title}
              </span>
              <span className="mt-1 block text-[13px] text-white/40">
                {project.industry} · {work.conceptShort}
              </span>
            </span>

            <span
              aria-hidden="true"
              className={cn(
                "pt-1 text-accent transition-all duration-300",
                active
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0 group-hover:opacity-40",
              )}
            >
              ↗
            </span>
          </button>
        );
      })}
    </AnimatedGroup>
  );
}
