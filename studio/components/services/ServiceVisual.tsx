"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";

type ServiceItem = Dictionary["services"]["items"][number];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Per-service visual — each looks like a real fragment of studio work
 * (wireframe→UI, code editor, CMS editor, maintenance changelog). Pure
 * HTML/CSS/inline SVG, no images/video/deps. Language-neutral except the CMS
 * editor, whose field labels/values are localised via `locale`. Micro-motion
 * is a small internal stagger on mount (each service switch remounts this);
 * transform+opacity only, so it degrades to a plain fade under reduced motion.
 *
 * Splits use flexbox (not arbitrary grid-template) so mixed px/fr tracks are
 * reliable across Tailwind builds.
 */
export function ServiceVisual({
  service,
  locale,
}: {
  service: ServiceItem;
  locale: Locale;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/12 bg-surface">
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white/40">
        <span>{service.name}</span>
        <span className="tabular-nums">{service.index} / 04</span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden p-4">
        {renderVisual(service.id, locale)}
      </div>
    </div>
  );
}

function renderVisual(id: string, locale: Locale) {
  switch (id) {
    case "development":
      return <DevelopmentVisual />;
    case "cms":
      return <CmsVisual locale={locale} />;
    case "care":
      return <CareVisual />;
    case "web-design":
    default:
      return <WebDesignVisual />;
  }
}

function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * 01 — WEB DESIGN : wireframe → final UI
 * ------------------------------------------------------------------ */
function WebDesignVisual() {
  return (
    <div className="flex h-full flex-row gap-2.5 sm:gap-4">
      {/* Wireframe */}
      <Reveal
        delay={0}
        className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-dashed border-white/20 p-3"
      >
        <div className="flex items-center justify-between">
          <div className="h-2 w-8 rounded-sm bg-white/30" />
          <div className="hidden gap-1.5 sm:flex">
            <span className="h-1.5 w-4 rounded-sm bg-white/20" />
            <span className="h-1.5 w-4 rounded-sm bg-white/20" />
            <span className="h-1.5 w-4 rounded-sm bg-white/20" />
          </div>
          <div className="h-3.5 w-9 rounded border border-white/30" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-2.5 w-5/6 rounded bg-white/28" />
          <div className="h-2.5 w-3/5 rounded bg-white/28" />
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-full rounded bg-white/15" />
          <div className="h-1.5 w-4/5 rounded bg-white/15" />
        </div>
        <div className="mt-2.5 h-4 w-16 rounded-full border border-white/35" />
        <div className="relative mt-3 min-h-[30px] flex-1 overflow-hidden rounded border border-white/18 bg-white/[0.03]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full text-white/15"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="h-7 rounded border border-white/15" />
          <div className="h-7 rounded border border-white/15" />
          <div className="h-7 rounded border border-white/15" />
        </div>
        <div className="mt-3 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-white/30">
          <span>Wireframe</span>
          <span className="hidden lg:inline">12 Column Grid</span>
          <span>Desktop / 1440</span>
        </div>
      </Reveal>

      {/* Final UI */}
      <Reveal
        delay={0.1}
        className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-white/10 bg-white/[0.04] p-3"
      >
        <div className="flex items-center justify-between">
          {/* Abstract logo mark — deliberately no brand name */}
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" />
            <span className="h-1.5 w-9 rounded bg-white/70" />
          </span>
          <div className="flex items-center gap-2">
            <span className="hidden h-1.5 w-6 rounded bg-white/22 sm:inline-block" />
            <span className="hidden h-1.5 w-6 rounded bg-white/22 sm:inline-block" />
            <span className="h-3.5 w-9 rounded-full border border-white/25" />
          </div>
        </div>
        {/* Headline — solid type placeholders (final hierarchy, no invented copy) */}
        <div className="mt-3 space-y-1.5">
          <div className="h-2.5 w-11/12 rounded bg-white/85" />
          <div className="h-2.5 w-2/3 rounded bg-white/85" />
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-full rounded bg-white/20" />
          <div className="h-1.5 w-4/5 rounded bg-white/16" />
        </div>
        {/* CTA — Wertus accent */}
        <div className="mt-2.5 inline-flex h-4 w-16 items-center rounded-full bg-accent px-2">
          <span className="h-1 w-8 rounded bg-white/75" />
        </div>
        <div className="mt-3 min-h-[30px] flex-1 rounded bg-[linear-gradient(135deg,#1c2434_0%,#2b3652_60%,#3a4a6e55_100%)] ring-1 ring-inset ring-white/8" />
        <div className="mt-3 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-white/35">
          <span>Website Preview</span>
          <span className="text-accent">Final UI</span>
        </div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 02 — DEVELOPMENT : file tree + code editor
 * ------------------------------------------------------------------ */
type Tok = [string, string];
const C = {
  kw: "text-accent",
  fn: "text-white/85",
  str: "text-white/45",
  punct: "text-white/30",
  plain: "text-white/65",
};

const CODE: Tok[][] = [
  [["import ", C.kw], ["type ", C.kw], ["{ Metadata } ", C.plain], ["from ", C.kw], ["'next'", C.str]],
  [],
  [["import ", C.kw], ["{ Hero } ", C.plain], ["from ", C.kw], ["'@/components/hero/Hero'", C.str]],
  [["import ", C.kw], ["{ StudioSection } ", C.plain], ["from ", C.kw], ["'@/components/studio'", C.str]],
  [["import ", C.kw], ["{ ServicesSection } ", C.plain], ["from ", C.kw], ["'@/components/services'", C.str]],
  [],
  [["export const ", C.kw], ["metadata", C.fn], [": Metadata = {", C.punct]],
  [["  title", C.plain], [": ", C.punct], ["'Wertus Digital'", C.str], [",", C.punct]],
  [["  description", C.plain], [": ", C.punct], ["'Web design & development.'", C.str], [",", C.punct]],
  [["}", C.punct]],
  [],
  [["export default function ", C.kw], ["HomePage", C.fn], ["() {", C.punct]],
  [["  return ", C.kw], ["(", C.punct]],
  [["    <main>", C.fn]],
  [["      <Hero />", C.fn]],
  [["      <StudioSection />", C.fn]],
  [["      <ServicesSection />", C.fn]],
  [["    </main>", C.fn]],
  [["  )", C.punct]],
  [["}", C.punct]],
];

/** Line highlighted as the "active" cursor line (0-based). */
const ACTIVE_LINE = 7;

function DevelopmentVisual() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
        {/* File tree — desktop only */}
        <div className="hidden min-h-0 shrink-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-[10px] leading-[1.7] text-white/45 lg:flex lg:w-[132px]">
          <div className="text-white/70">studio/</div>
          <div className="pl-1">├─ app/</div>
          <div className="rounded bg-white/[0.06] pl-3 text-accent">│ page.tsx</div>
          <div className="pl-3">│ layout.tsx</div>
          <div className="pl-3">│ globals.css</div>
          <div className="pl-1">├─ components/</div>
          <div className="pl-3">│ Hero.tsx</div>
          <div className="pl-3">│ StudioSection.tsx</div>
          <div className="pl-3">│ ServicesSection.tsx</div>
          <div className="pl-1">└─ lib/</div>
          <div className="pl-3">&nbsp; i18n.ts</div>
        </div>

        {/* Code */}
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-[10px] leading-[1.55] lg:text-[11px]">
          {CODE.map((tokens, i) => (
            <div
              key={i}
              className={
                "flex " +
                (i === ACTIVE_LINE
                  ? "-mx-3 border-l-2 border-accent bg-white/[0.05] pl-[10px] pr-3 "
                  : "") +
                (i >= 12 ? "hidden lg:flex" : "")
              }
            >
              <span className="mr-3 w-4 shrink-0 select-none text-right text-white/25 tabular-nums">
                {i + 1}
              </span>
              <span className="min-w-0 whitespace-pre">
                {tokens.length === 0
                  ? " "
                  : tokens.map(([t, c], j) => (
                      <span key={j} className={c}>
                        {t}
                      </span>
                    ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-white/45">
        {["Next.js", "TypeScript", "React", "Tailwind"].map((tag) => (
          <span key={tag} className="rounded border border-white/12 px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 03 — CMS : content editor
 * ------------------------------------------------------------------ */
const CMS = {
  pl: {
    sidebar: ["Strony", "Realizacje", "Usługi", "FAQ", "Ustawienia"],
    fields: [
      { label: "Tytuł", value: "Strony dla firm, które chcą wyglądać jak liderzy swojej branży." },
      { label: "Slug", value: "/" },
      { label: "CTA", value: "Rozpocznij projekt" },
    ],
  },
  en: {
    sidebar: ["Pages", "Work", "Services", "FAQ", "Settings"],
    fields: [
      { label: "Title", value: "Websites for businesses that want to look like leaders in their industry." },
      { label: "Slug", value: "/" },
      { label: "CTA", value: "Start a project" },
    ],
  },
} as const;

function CmsVisual({ locale }: { locale: Locale }) {
  const t = CMS[locale];
  return (
    <div className="flex h-full flex-col gap-4 lg:flex-row">
      {/* Sidebar — horizontal on mobile, vertical on desktop */}
      <Reveal
        delay={0}
        className="flex min-w-0 shrink-0 gap-3 overflow-hidden border-b border-white/10 pb-3 lg:w-[136px] lg:flex-col lg:gap-2.5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4"
      >
        <span className="hidden text-[9px] uppercase tracking-[0.18em] text-white/30 lg:block">
          Content
        </span>
        {t.sidebar.map((item, i) => (
          <span
            key={item}
            className={
              "whitespace-nowrap text-[12px] " +
              (i === 0 ? "font-medium text-accent" : "text-white/45")
            }
          >
            {item}
          </span>
        ))}
      </Reveal>

      {/* Editor */}
      <Reveal delay={0.08} className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/40">
            Edit page
          </span>
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Published
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          {t.fields.map((field) => (
            <div key={field.label}>
              <span className="text-[9px] uppercase tracking-[0.14em] text-white/35">
                {field.label}
              </span>
              <div className="mt-1 rounded border border-white/12 bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-snug text-white/75">
                <span className="line-clamp-2">{field.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 text-[9px] uppercase tracking-[0.16em] text-white/30">
          <span>SEO Title</span>
          <span className="text-white/45">Sanity CMS</span>
        </div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 04 — CARE & GROWTH : maintenance changelog
 * ------------------------------------------------------------------ */
const CHANGELOG = [
  { date: "18 AUG 2026", title: "Updated dependencies", tag: "Next.js / security maintenance" },
  { date: "14 AUG 2026", title: "Improved mobile navigation", tag: "Responsive / UX" },
  { date: "09 AUG 2026", title: "SEO metadata update", tag: "Search visibility" },
  { date: "04 AUG 2026", title: "New CMS section", tag: "Content management" },
];

function CareVisual() {
  return (
    <div className="flex h-full flex-col gap-5 lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center">
        {CHANGELOG.map((entry, i) => (
          <Reveal
            key={entry.date}
            delay={i * 0.06}
            className={
              "flex items-start gap-3 " +
              (i > 0 ? "pt-3 " : "") +
              (i >= 3 ? "hidden lg:flex" : "")
            }
          >
            <span className="w-[62px] shrink-0 pt-0.5 text-[10px] tabular-nums tracking-wide text-white/45">
              {entry.date}
            </span>
            <div className="relative flex w-3 shrink-0 justify-center pt-1">
              <span className="z-10 h-2 w-2 rounded-full bg-accent" />
              {i < CHANGELOG.length - 1 && (
                <span className="absolute top-2 h-full w-px bg-white/14" />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <p className="text-[12px] font-medium leading-tight text-white/85">
                {entry.title}
              </p>
              <p className="mt-0.5 text-[10px] text-white/45">{entry.tag}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Status panel — desktop only */}
      <div className="hidden shrink-0 flex-col gap-2.5 border-l border-white/10 pl-5 lg:flex lg:w-[124px]">
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
          Status
        </span>
        {["Deployed", "Security", "SEO", "Content"].map((s) => (
          <span key={s} className="flex items-center gap-2 text-[11px] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
