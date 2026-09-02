"use client";

import { Children, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

/**
 * Adapted from Motion Primitives (motion-primitives.com) "Animated Group".
 * Staggers its children with a container/item variant pair. Kept minimal —
 * only the tags we use — and driven by transform+opacity so that, under the
 * app-level <MotionConfig reducedMotion="user">, motion collapses to a plain
 * opacity fade for users who prefer reduced motion.
 */
const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  nav: motion.nav,
  section: motion.section,
  li: motion.li,
  span: motion.span,
  p: motion.p,
} as const;

type Tag = keyof typeof tags;

const defaultContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const defaultItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedGroup({
  children,
  className,
  as = "div",
  itemAs = "div",
  variants,
  inView = false,
  viewOptions = { once: true, amount: 0.3 },
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  itemAs?: Tag;
  variants?: { container?: Variants; item?: Variants };
  /** Trigger on scroll-into-view instead of on mount (for below-fold groups). */
  inView?: boolean;
  viewOptions?: { once?: boolean; amount?: number | "some" | "all"; margin?: string };
  "aria-label"?: string;
}) {
  const Container = tags[as];
  const Item = tags[itemAs];
  const container = variants?.container ?? defaultContainer;
  const item = variants?.item ?? defaultItem;

  const activation = inView
    ? ({ whileInView: "visible", viewport: viewOptions } as const)
    : ({ animate: "visible" } as const);

  return (
    <Container
      aria-label={ariaLabel}
      className={className}
      variants={container}
      initial="hidden"
      {...activation}
    >
      {Children.map(children, (child, i) => (
        <Item key={i} variants={item}>
          {child}
        </Item>
      ))}
    </Container>
  );
}
