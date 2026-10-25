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

        {/* One list for every breakpoint (no duplicated headings in the DOM).
            Mobile: vertical timeline with a connecting rail.
            md+: horizontal axis, one column per stage. */}
        <InView
          as="div"
          variants={reveal}
          viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-10 md:mt-14 md:border-t md:border-[var(--border-light)] md:pt-10 lg:mt-16 lg:pt-12"
        >
          <ol className="md:grid md:grid-cols-4 md:gap-x-8">
            {steps.map((step, i) => (
              <li
                key={step.index}
                className={cn(
                  "flex gap-5 md:block",
                  i > 0 && "md:border-l md:border-[var(--border-light)] md:pl-8",
                  i < lastIndex && "md:pr-8",
                )}
              >
                {/* Mobile rail */}
                <div className="flex flex-col items-center md:hidden">
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

                <div className={cn(i < lastIndex ? "pb-9" : "pb-0", "md:pb-0")}>
                  {/* md+ axis node */}
                  <div className="hidden items-center gap-3 md:flex">
                    <span className="text-label tabular-nums text-accent">
                      {step.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-[var(--border-light)]"
                    />
                  </div>
                  <h3 className="text-[1.2rem] font-medium leading-[1.2] tracking-[-0.01em] text-ink md:mt-5 md:text-[1.15rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.55] text-muted md:mt-3 md:text-[14px]">
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
