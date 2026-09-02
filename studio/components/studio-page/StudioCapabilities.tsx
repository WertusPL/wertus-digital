"use client";

import { cn } from "@/lib/utils";
import type { Dictionary } from "@/dictionaries/types";
import { InView } from "@/components/motion/InView";
import { SectionIntro } from "./SectionIntro";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StudioCapabilities({
  capabilities,
}: {
  capabilities: Dictionary["studioPage"]["capabilities"];
}) {
  const items = capabilities.items;

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[52px] lg:py-[76px]">
        <SectionIntro
          index={capabilities.index}
          label={capabilities.label}
          heading={capabilities.heading}
          headingId="capabilities-heading"
        />

        <InView
          as="div"
          variants={reveal}
          viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
          className="mt-12 lg:mt-14"
        >
          <ul className="grid grid-cols-1 gap-x-12 border-t border-[var(--border-light)] sm:grid-cols-2">
            {items.map((item, i) => (
              <li
                key={item}
                className={cn(
                  "flex items-baseline gap-5 border-b border-[var(--border-light)] py-5",
                )}
              >
                <span className="text-label tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[clamp(1.15rem,1.1vw+0.85rem,1.5rem)] font-medium tracking-[-0.01em] text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
}
