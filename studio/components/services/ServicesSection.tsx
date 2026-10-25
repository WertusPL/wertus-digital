"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { ServicesNavigation } from "./ServicesNavigation";
import { ServiceCopy, ServiceDetail } from "./ServiceDesktop";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Native scroll drives the active service (no scroll-jacking). The pinned
  // columns travel `track height − pinned height` while stuck; that distance
  // is split evenly between the services, so each — the last included — gets
  // the same dwell. Measured per frame, so it adapts to any viewport.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const pinned = pinnedRefs.current.filter(Boolean) as HTMLElement[];
    if (!track || !pinned.length) return null;
    const pinTop = parseFloat(getComputedStyle(pinned[0]).top) || 0;
    const pinnedHeight = Math.max(...pinned.map((el) => el.offsetHeight));
    const travel = Math.max(track.offsetHeight - pinnedHeight, 1);
    return { track, pinTop, travel };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const m = measure();
      if (!m) return;
      const progress = (m.pinTop - m.track.getBoundingClientRect().top) / m.travel;
      const next = Math.min(items.length - 1, Math.max(0, Math.floor(progress * items.length)));
      setActive(next);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items.length, measure]);

  // List click → scroll to the middle of that service's share of the travel.
  const goToStep = (i: number) => {
    const m = measure();
    if (!m) return;
    const trackTop = m.track.getBoundingClientRect().top + window.scrollY;
    const target = trackTop - m.pinTop + m.travel * ((i + 0.5) / items.length);
    window.scrollTo({ top: target, behavior: reducedMotion ? "auto" : "smooth" });
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
            <span className="text-label text-accent">03 /</span>
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

        {/* Desktop: sticky storytelling. The track sets the scroll length
            (48vh per service); both columns are pinned over it. Left: the
            service list + the active service's copy. Right: its visual,
            benefits and link. */}
        <div
          ref={trackRef}
          className="relative mt-14 hidden lg:block"
          style={{ height: `${items.length * 48}vh` }}
        >
          <div className="absolute inset-0 grid grid-cols-[34fr_66fr] gap-x-16">
            <div>
              <div
                ref={(el) => {
                  pinnedRefs.current[0] = el;
                }}
                className="sticky top-[calc(var(--nav-height)+2rem)]"
              >
                <nav aria-label={services.kicker}>
                  <ServicesNavigation
                    items={items}
                    active={active}
                    onSelect={goToStep}
                  />
                </nav>
                <div className="mt-9">
                  <ServiceCopy service={items[active]} />
                </div>
              </div>
            </div>
            <div>
              <div
                ref={(el) => {
                  pinnedRefs.current[1] = el;
                }}
                className="sticky top-[calc(var(--nav-height)+2rem)]"
              >
                <ServiceDetail
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
          className="mt-10 grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:hidden"
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
