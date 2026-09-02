"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { InView } from "@/components/motion/InView";
import { SectionIntro } from "./SectionIntro";

const EASE = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function StudioTech({
  tech,
}: {
  tech: Dictionary["studioPage"]["tech"];
}) {
  return (
    <section
      aria-labelledby="tech-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[52px] lg:py-[76px]">
        <SectionIntro
          index={tech.index}
          label={tech.label}
          heading={tech.heading}
          headingId="tech-heading"
          description={tech.body}
        />

        {/* Subtle typographic stack strip — no logo wall */}
        <InView
          as="div"
          variants={container}
          viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
          className="mt-11 border-t border-[var(--border-light)] pt-8 lg:mt-12"
        >
          <motion.p variants={y10} className="text-label text-muted">
            {tech.stackLabel}
          </motion.p>
          <motion.ul
            variants={y10}
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {tech.stack.map((item, i) => (
              <Fragment key={item}>
                {i > 0 && (
                  <li aria-hidden="true" className="text-[1.1rem] text-muted/45">
                    /
                  </li>
                )}
                <li className="text-[clamp(1.05rem,0.8vw+0.85rem,1.3rem)] font-medium tracking-[-0.01em] text-ink">
                  {item}
                </li>
              </Fragment>
            ))}
          </motion.ul>
        </InView>
      </div>
    </section>
  );
}
