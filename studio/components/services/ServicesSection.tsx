"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { ServicesNavigation } from "./ServicesNavigation";
import { ServiceDesktop } from "./ServiceDesktop";
import { ServiceMobile } from "./ServiceMobile";

const EASE = [0.22, 1, 0.36, 1] as const;

const introContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const y18 = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const mobileVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  },
};

export function ServicesSection({
  locale,
  services,
}: {
  locale: Locale;
  services: Dictionary["services"];
}) {
  const reducedMotion = usePrefersReducedMotion();
  const items = services.items;
  const href = routes.services[locale];
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll drives the active step: a 0-height band at viewport centre picks the
  // step crossing it. No scroll-jacking, no smooth-scroll library — native.
  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  const goToStep = (i: number) => {
    stepRefs.current[i]?.scrollIntoView({
      block: "center",
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-[var(--border-light)]"
    >
      <div className="wd-container py-[44px] lg:py-[60px]">
        {/* Intro */}
        <InView
          as="div"
          className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12"
          variants={introContainer}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <motion.div variants={y10} className="md:col-span-3">
            <span className="text-label text-accent">02 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {services.kicker}
            </span>
          </motion.div>

          <motion.h2
            id="services-heading"
            variants={y18}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {services.headline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={y10}
            className="hero-body max-w-[52ch] md:col-span-7 md:col-start-5"
          >
            {services.description}
          </motion.p>
        </InView>

        {/* Desktop: sticky storytelling. Invisible step-track sets scroll length
            and drives `active`; the two columns are pinned over it. */}
        <div className="relative mt-16 hidden lg:block">
          <div aria-hidden="true" className="pointer-events-none">
            {items.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-index={i}
                className="h-[72vh]"
              />
            ))}
          </div>

          <div className="absolute inset-0 grid grid-cols-[34fr_66fr] gap-x-16">
            <div>
              <nav
                aria-label={services.kicker}
                className="sticky top-[calc(var(--nav-height)+2rem)]"
              >
                <ServicesNavigation
                  items={items}
                  active={active}
                  onSelect={goToStep}
                />
              </nav>
            </div>
            <div>
              <div className="sticky top-[calc(var(--nav-height)+2rem)]">
                <ServiceDesktop
                  service={items[active]}
                  cta={services.cta}
                  href={href}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Touch layout: each service a full-width block */}
        <AnimatedGroup
          as="div"
          itemAs="div"
          inView
          viewOptions={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
          variants={mobileVariants}
          className="mt-12 flex flex-col gap-12 lg:hidden"
        >
          {items.map((item) => (
            <ServiceMobile
              key={item.id}
              service={item}
              cta={services.cta}
              href={href}
              locale={locale}
            />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
