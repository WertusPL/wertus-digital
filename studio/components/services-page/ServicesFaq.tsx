"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";

const EASE = [0.22, 1, 0.36, 1] as const;

const copyContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const y8 = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const y18 = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const listVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
};

type Faq = Dictionary["servicesPage"]["faq"];
type FaqItem = Faq["items"][number];

export function ServicesFaq({ faq }: { faq: Faq }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="services-faq"
      aria-labelledby="services-faq-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[52px] lg:py-[72px]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[40fr_60fr]">
          {/* Copy column */}
          <InView
            as="div"
            className="flex flex-col lg:max-w-[40ch]"
            variants={copyContainer}
            viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
          >
            <motion.div variants={y8}>
              <span className="text-label text-accent">06 /</span>
              <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
                {faq.label}
              </span>
            </motion.div>

            <motion.h2 id="services-faq-heading" variants={y18} className="section-heading mt-7">
              {faq.heading}
            </motion.h2>
          </InView>

          {/* Accordion */}
          <AnimatedGroup
            as="ul"
            itemAs="li"
            inView
            viewOptions={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
            variants={listVariants}
            className="border-t border-[var(--border-light)]"
          >
            {faq.items.map((item, i) => (
              <FaqRow
                key={item.id}
                item={item}
                index={i}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
              />
            ))}
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const triggerId = `services-faq-${item.id}-trigger`;
  const panelId = `services-faq-${item.id}-panel`;

  return (
    <div
      className={cn(
        "border-b transition-colors duration-300",
        isOpen ? "border-accent" : "border-[var(--border-light)]",
      )}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-start gap-4 py-5 text-left lg:gap-6 lg:py-6"
        >
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 pt-1 text-[13px] font-medium tabular-nums tracking-[0.1em] transition-colors duration-300",
              isOpen ? "text-accent" : "text-muted",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="flex-1 text-[clamp(1.15rem,0.9vw+0.85rem,1.45rem)] font-medium leading-[1.3] tracking-[-0.01em] text-ink">
            {item.question}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              "relative mt-1.5 block h-3.5 w-3.5 shrink-0 transition-colors duration-300",
              isOpen ? "text-accent" : "text-muted group-hover:text-ink",
            )}
          >
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
            <span
              className={cn(
                "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out",
                isOpen ? "rotate-90" : "rotate-0",
              )}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE, delay: 0.04 }}
              className="max-w-[62ch] pb-6 pl-[calc(0.75rem+1.75ch)] pr-8 text-[16px] leading-[1.6] text-muted lg:pl-[calc(1.5rem+1.75ch)] lg:text-[17px]"
            >
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
