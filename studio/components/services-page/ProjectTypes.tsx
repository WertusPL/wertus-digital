"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { serviceAnchorId, ANCHOR_SCROLL_MT } from "./anchors";

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

type ProjectTypes = Dictionary["servicesPage"]["projectTypes"];
type TypeItem = ProjectTypes["items"][number];

export function ProjectTypes({
  projectTypes,
  locale,
}: {
  projectTypes: ProjectTypes;
  locale: Locale;
}) {
  const items = projectTypes.items;
  const [active, setActive] = useState(0);
  const activeItem = items[active];

  return (
    <section
      id={serviceAnchorId("websites", locale)}
      aria-labelledby="what-we-build-heading"
      className={cn("border-t border-[var(--border-light)]", ANCHOR_SCROLL_MT)}
    >
      {/* Landing-page anchor lives in the same "what we build" area. */}
      <span
        id={serviceAnchorId("landing", locale)}
        aria-hidden="true"
        className={cn("block", ANCHOR_SCROLL_MT)}
      />
      <div className="wd-container py-[52px] lg:py-[72px]">
        {/* Intro */}
        <InView
          as="div"
          className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12"
          variants={introContainer}
          viewOptions={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <motion.div variants={y10} className="md:col-span-3">
            <span className="text-label text-accent">01 /</span>
            <span className="mt-1.5 block text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {projectTypes.label}
            </span>
          </motion.div>

          <motion.h2
            id="what-we-build-heading"
            variants={y18}
            className="section-heading md:col-span-8 md:col-start-5"
          >
            {projectTypes.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={y10}
            className="hero-body max-w-[54ch] md:col-span-7 md:col-start-5"
          >
            {projectTypes.description}
          </motion.p>
        </InView>

        {/* Desktop: list + dynamic preview */}
        <div className="mt-14 hidden grid-cols-[36fr_64fr] gap-x-16 lg:grid">
          <div>
            <ul className="border-b border-[var(--border-light)]">
              {items.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "true" : undefined}
                      aria-controls="project-type-preview"
                      className={cn(
                        "group flex w-full items-baseline gap-4 border-t py-6 text-left transition-colors duration-300",
                        isActive ? "border-accent" : "border-[var(--border-light)]",
                      )}
                    >
                      <span
                        className={cn(
                          "text-[13px] font-medium tabular-nums tracking-[0.1em] transition-colors duration-300",
                          isActive ? "text-accent" : "text-muted",
                        )}
                      >
                        {item.index}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-[1.05rem] font-medium tracking-[0.01em] transition-colors duration-300",
                            isActive ? "text-ink" : "text-muted group-hover:text-ink",
                          )}
                        >
                          {item.name}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-[14px] leading-[1.4] transition-colors duration-300",
                            isActive ? "text-muted" : "text-muted/70",
                          )}
                        >
                          {item.headline}
                        </span>
                      </span>
                      <span className="ml-auto shrink-0 whitespace-nowrap pl-4 text-[13px] font-medium tabular-nums text-muted">
                        {item.price}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            id="project-type-preview"
            role="group"
            aria-live="polite"
            className="min-w-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="h-[clamp(280px,32vh,360px)]">
                  <TypePreview item={activeItem} labels={projectTypes.previewLabels} />
                </div>
                <TypeDetails item={activeItem} projectTypes={projectTypes} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: stacked blocks */}
        <AnimatedGroup
          as="div"
          itemAs="div"
          inView
          viewOptions={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
          variants={mobileVariants}
          className="mt-12 flex flex-col gap-14 lg:hidden"
        >
          {items.map((item) => (
            <div key={item.id}>
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-[13px] font-medium tabular-nums tracking-[0.1em] text-accent">
                  {item.index}
                </span>
                <h3 className="text-[1.05rem] font-medium uppercase tracking-[0.06em] text-ink">
                  {item.name}
                </h3>
              </div>
              <div className="h-[260px]">
                <TypePreview item={item} labels={projectTypes.previewLabels} />
              </div>
              <TypeDetails item={item} projectTypes={projectTypes} />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Details — headline, description, best-for, includes, price.
 * ------------------------------------------------------------------ */
function TypeDetails({
  item,
  projectTypes,
}: {
  item: TypeItem;
  projectTypes: ProjectTypes;
}) {
  return (
    <div className="mt-8">
      <h4 className="text-[clamp(1.35rem,1.6vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.02em] text-ink">
        {item.headline}
      </h4>
      <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.55] text-muted">
        {item.description}
      </p>

      <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.55] text-ink">
        <span className="font-medium uppercase tracking-[0.1em] text-muted">
          {projectTypes.bestForLabel}:
        </span>{" "}
        {item.bestFor}
      </p>

      <div className="mt-7 border-t border-[var(--border-light)] pt-6">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          {projectTypes.includesLabel}
        </span>
        <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {item.includes.map((entry) => (
            <li key={entry} className="flex items-center gap-2.5 text-[15px] text-ink">
              <Check />
              {entry}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-7 flex items-baseline gap-2.5">
        <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
          {projectTypes.priceLabel}
        </span>
        <span className="text-[clamp(1.5rem,1.2vw+1.1rem,2rem)] font-medium leading-none tracking-[-0.02em] text-ink">
          {item.price}
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Preview — dark structural diagram that differs per project type.
 * Landing = one page; Business = a small sitemap; Advanced = a deeper
 * sitemap with languages + integrations. Pure CSS/SVG, no brand.
 * ------------------------------------------------------------------ */
function TypePreview({
  item,
  labels,
}: {
  item: TypeItem;
  labels: ProjectTypes["previewLabels"];
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/12 bg-surface">
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white/40">
        <span>{item.name}</span>
        <span className="tabular-nums">{item.index} / 03</span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden p-4">
        {item.id === "landing" && <LandingDiagram />}
        {item.id === "business" && <BusinessDiagram />}
        {item.id === "advanced" && <AdvancedDiagram />}
      </div>

      {/* Meta row */}
      <div className="grid shrink-0 grid-cols-3 divide-x divide-white/10 border-t border-white/10">
        <Meta label={labels.pages} value={item.pages} />
        <Meta label={labels.cms} value={item.cms} />
        <Meta label={labels.scope} value={item.scope} />
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-3 py-2.5">
      <span className="block text-[9px] uppercase tracking-[0.16em] text-white/35">
        {label}
      </span>
      <span className="mt-0.5 block truncate text-[11px] text-white/70">{value}</span>
    </div>
  );
}

function PageNode({
  label,
  accent = false,
  className,
}: {
  label: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded border px-2.5 py-1 text-[10px] tracking-wide",
        accent
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-white/18 bg-white/[0.04] text-white/60",
        className,
      )}
    >
      {label}
    </span>
  );
}

/* Landing — a single tall page made of stacked sections. */
function LandingDiagram() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-[62%] max-w-[220px] flex-col gap-2 rounded-lg border border-white/12 bg-white/[0.03] p-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-[3px] bg-accent" />
            <span className="h-1.5 w-7 rounded bg-white/55" />
          </span>
          <span className="h-3 w-8 rounded-full bg-accent/80" />
        </div>
        <div className="mt-1 h-9 rounded bg-[linear-gradient(135deg,#1c2434,#2b3652)] ring-1 ring-inset ring-white/8" />
        <div className="space-y-1">
          <span className="block h-1.5 w-11/12 rounded bg-white/20" />
          <span className="block h-1.5 w-3/4 rounded bg-white/16" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <span className="h-5 rounded border border-white/12" />
          <span className="h-5 rounded border border-white/12" />
          <span className="h-5 rounded border border-white/12" />
        </div>
        <div className="mt-0.5 flex items-center justify-between">
          <span className="h-2.5 w-10 rounded-full bg-accent/70" />
          <span className="text-[8px] uppercase tracking-[0.16em] text-white/35">
            One page
          </span>
        </div>
      </div>
    </div>
  );
}

/* Business — home node branching to a handful of pages. */
function BusinessDiagram() {
  const pages = ["Oferta", "O firmie", "Kontakt"];
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <PageNode label="Home" accent />
      <span className="h-4 w-px bg-white/18" aria-hidden="true" />
      <span className="h-px w-[72%] bg-white/18" aria-hidden="true" />
      <div className="mt-0 grid w-full max-w-[300px] grid-cols-3 gap-2">
        {pages.map((p) => (
          <div key={p} className="flex flex-col items-center">
            <span className="h-3 w-px bg-white/18" aria-hidden="true" />
            <PageNode label={p} className="w-full text-center" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-white/40">
        <span className="rounded border border-white/12 px-2 py-0.5">Forms</span>
        <span className="rounded border border-white/12 px-2 py-0.5">CMS ready</span>
      </div>
    </div>
  );
}

/* Advanced — deeper sitemap + languages + integrations. */
function AdvancedDiagram() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-3 flex items-center gap-2" aria-hidden="true">
        <span className="rounded-full border border-accent/50 px-2 py-0.5 text-[9px] font-medium text-accent">
          PL
        </span>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] text-white/45">
          EN
        </span>
      </div>
      <PageNode label="Home" accent />
      <span className="h-3.5 w-px bg-white/18" aria-hidden="true" />
      <span className="h-px w-[80%] bg-white/18" aria-hidden="true" />
      <div className="grid w-full max-w-[340px] grid-cols-4 gap-1.5">
        {["Oferta", "Blog", "Case", "Kontakt"].map((p, i) => (
          <div key={p} className="flex flex-col items-center">
            <span className="h-3 w-px bg-white/18" aria-hidden="true" />
            <PageNode label={p} className="w-full text-center" accent={i === 1} />
            {i === 1 && (
              <>
                <span className="h-2.5 w-px bg-white/14" aria-hidden="true" />
                <span className="h-4 w-8 rounded border border-white/12 bg-white/[0.02]" />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-white/40">
        {["CMS", "Integracje", "API", "Moduły"].map((tag) => (
          <span key={tag} className="rounded border border-white/12 px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}
