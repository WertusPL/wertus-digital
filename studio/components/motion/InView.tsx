"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  type Variants,
  type Transition,
  type UseInViewOptions,
} from "motion/react";

/**
 * Adapted from Motion Primitives (motion-primitives.com) "In View".
 * Animates once when scrolled into view — used for the featured project on
 * small screens where it sits below the first viewport. Transform+opacity
 * only, so reduced-motion users get a plain fade via <MotionConfig>.
 */
const tags = {
  div: motion.div,
  section: motion.section,
  figure: motion.figure,
} as const;

type Tag = keyof typeof tags;

const defaultVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  className,
  as = "div",
  variants = defaultVariants,
  transition,
  viewOptions,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  variants?: Variants;
  transition?: Transition;
  viewOptions?: UseInViewOptions;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewOptions);
  const Comp = tags[as];

  return (
    <Comp
      ref={ref as never}
      className={className}
      variants={variants}
      transition={transition}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </Comp>
  );
}
