"use client";

import { cn } from "@/lib/utils";
import type { Dictionary } from "@/dictionaries/types";
import { InView } from "@/components/motion/InView";
import { SectionIntro } from "./SectionIntro";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StudioProcess({
  process,
}: {
  process: Dictionary["studioPage"]["process"];
}) {
  const steps = process.steps;
  const lastIndex = steps.length - 1;

  return (
    <section
      aria-labelledby="how-we-work-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[52px] lg:py-[76px]">
        <SectionIntro
          index={process.index}
          label={process.label}
          heading={process.heading}
          headingId="how-we-work-heading"
          description={process.description}
        />

        {/* Desktop — horizontal axis, one node per stage */}
        <InView
          as="div"
          variants={reveal}
          viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
          className="mt-14 hidden border-t border-[var(--border-light)] pt-10 md:block lg:mt-16 lg:pt-12"
        >
          <ol className="grid grid-cols-4 gap-x-8">
            {steps.map((step, i) => (
              <li
                key={step.index}
                className={cn(
                  i > 0 && "border-l border-[var(--border-light)] pl-8",
                  i < lastIndex && "pr-8",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-label tabular-nums text-accent">
                    {step.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[var(--border-light)]"
                  />
                </div>
                <h3 className="mt-5 text-[1.15rem] font-medium leading-[1.2] tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </InView>

        {/* Mobile — vertical timeline with a connecting rail */}
        <InView
          as="div"
          variants={reveal}
          viewOptions={{ once: true, margin: "0px 0px -8% 0px" }}
          className="mt-10 md:hidden"
        >
          <ol>
            {steps.map((step, i) => (
              <li key={step.index} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="text-label tabular-nums text-accent">
                    {step.index}
                  </span>
                  {i < lastIndex && (
                    <span
                      aria-hidden="true"
                      className="mt-2 w-px flex-1 bg-[var(--border-light)]"
                    />
                  )}
                </div>
                <div className={cn(i < lastIndex ? "pb-9" : "pb-0")}>
                  <h3 className="text-[1.2rem] font-medium leading-[1.2] tracking-[-0.01em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.55] text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
