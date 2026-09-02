"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";

/**
 * Per-step visual for the process section. Each panel looks like a real
 * fragment of studio work (brief → sitemap → wireframe/UI → code → launch
 * dashboard). Pure HTML/CSS/inline SVG — no images, video or deps, and no
 * invented client/brand. The dark panel chrome matches `ServiceVisual` so the
 * two sections feel part of one system.
 *
 * Only genuinely language-dependent strings are localised (the discovery
 * brief fields); technical micro-labels stay in English, as elsewhere.
 * Motion (fade/scale between steps) is handled by the parent — this component
 * is purely presentational, so it renders identically under reduced motion.
 */

const STEP_IDS = [
  "discovery",
  "direction",
  "design",
  "development",
  "launch",
] as const;
type StepId = (typeof STEP_IDS)[number];

const HEADER: Record<StepId, string> = {
  discovery: "PROJECT BRIEF",
  direction: "INFORMATION ARCHITECTURE",
  design: "INTERFACE DESIGN",
  development: "BUILD",
  launch: "DEPLOYMENT",
};

export function ProcessVisual({
  id,
  index,
  locale,
}: {
  id: StepId;
  index: number;
  locale: Locale;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/12 bg-surface">
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white/40">
        <span>{HEADER[id]}</span>
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")} / 05
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden p-4">
        {renderVisual(id, locale)}
      </div>
    </div>
  );
}

function renderVisual(id: StepId, locale: Locale): ReactNode {
  switch (id) {
    case "discovery":
      return <DiscoveryVisual locale={locale} />;
    case "direction":
      return <DirectionVisual />;
    case "design":
      return <DesignVisual />;
    case "development":
      return <DevelopmentVisual />;
    case "launch":
      return <LaunchVisual locale={locale} />;
  }
}

/* ------------------------------------------------------------------ *
 * 01 — DISCOVERY : project brief / notes interface
 * ------------------------------------------------------------------ */
const BRIEF = {
  pl: {
    heading: "Cele projektu",
    fields: [
      { label: "Grupa odbiorców", w: "w-4/5" },
      { label: "Zakres strony", w: "w-3/5" },
      { label: "Priorytety", w: "w-2/3" },
      { label: "Inspiracje", w: "w-1/2" },
    ],
    note: "Notatki z rozmowy",
  },
  en: {
    heading: "Project goals",
    fields: [
      { label: "Target audience", w: "w-4/5" },
      { label: "Website scope", w: "w-3/5" },
      { label: "Priorities", w: "w-2/3" },
      { label: "Inspiration", w: "w-1/2" },
    ],
    note: "Kick-off notes",
  },
} as const;

function DiscoveryVisual({ locale }: { locale: Locale }) {
  const t = BRIEF[locale];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="text-[13px] font-medium text-white/85">{t.heading}</span>
        <span className="text-[9px] uppercase tracking-[0.16em] text-white/35">
          {t.note}
        </span>
      </div>
      <ul className="mt-3 flex min-h-0 flex-1 flex-col justify-center gap-3">
        {t.fields.map((field) => (
          <li key={field.label} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border border-white/20 text-accent"
            >
              <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8.5 6.5 12 13 4.5" />
              </svg>
            </span>
            <span className="w-[112px] shrink-0 text-[11px] text-white/55">
              {field.label}
            </span>
            <span className={"h-1.5 rounded bg-white/15 " + field.w} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 02 — DIRECTION : sitemap + layout grid
 * ------------------------------------------------------------------ */
function DirectionVisual() {
  return (
    <div className="flex h-full flex-col gap-4 lg:flex-row">
      {/* Sitemap */}
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
          Sitemap
        </span>
        <div className="relative mt-4 flex flex-col items-center">
          <span className="rounded border border-white/25 bg-white/[0.05] px-3 py-1 text-[10px] text-white/70">
            Home
          </span>
          <span className="h-3 w-px bg-white/18" />
          <span className="h-px w-3/4 bg-white/18" />
          <div className="mt-3 grid w-full grid-cols-3 gap-2">
            {["Oferta", "Realizacje", "Kontakt"].map((n, i) => (
              <div key={n} className="flex flex-col items-center">
                <span className="-mt-3 h-3 w-px bg-white/18" />
                <span className={"rounded border px-2 py-1 text-[9px] " + (i === 0 ? "border-accent/60 text-accent" : "border-white/15 text-white/45")}>
                  {n}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layout grid — desktop only */}
      <div className="hidden min-h-0 shrink-0 flex-col rounded-lg border border-white/10 bg-white/[0.02] p-3 lg:flex lg:w-[150px]">
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
          Layout
        </span>
        <div className="mt-3 grid flex-1 grid-cols-6 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="rounded-sm bg-accent/10 ring-1 ring-inset ring-white/8" />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-[8px] uppercase tracking-[0.16em] text-white/30">
          <span>Grid</span>
          <span>12 Col</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 03 — DESIGN : wireframe → final UI
 * ------------------------------------------------------------------ */
function DesignVisual() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex min-h-0 flex-1 flex-row gap-3">
        {/* Wireframe */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-dashed border-white/20 p-3">
          <div className="flex items-center justify-between">
            <div className="h-2 w-7 rounded-sm bg-white/28" />
            <div className="h-3 w-8 rounded border border-white/25" />
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-5/6 rounded bg-white/22" />
            <div className="h-2 w-3/5 rounded bg-white/22" />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-1.5 pt-3">
            <div className="h-6 rounded border border-white/15" />
            <div className="h-6 rounded border border-white/15" />
            <div className="h-6 rounded border border-white/15" />
          </div>
          <span className="mt-2 text-[8px] uppercase tracking-[0.18em] text-white/30">
            Wireframe
          </span>
        </div>

        {/* Arrow */}
        <div className="flex shrink-0 items-center text-white/30" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>

        {/* Final UI */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-[3px] bg-accent" />
              <span className="h-1.5 w-7 rounded bg-white/70" />
            </span>
            <span className="h-3 w-8 rounded-full bg-accent" />
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-11/12 rounded bg-white/85" />
            <div className="h-2 w-2/3 rounded bg-white/85" />
          </div>
          <div className="mt-auto min-h-[24px] flex-1 rounded bg-[linear-gradient(135deg,#1c2434_0%,#2b3652_60%,#3a4a6e55_100%)] ring-1 ring-inset ring-white/8" />
          <span className="mt-2 text-[8px] uppercase tracking-[0.18em] text-accent">
            Final UI
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-white/45">
        {["Design System", "Responsive", "UI / UX"].map((tag) => (
          <span key={tag} className="rounded border border-white/12 px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 04 — DEVELOPMENT : code + component tree + checks
 * ------------------------------------------------------------------ */
const A = "text-accent";
const P = "text-white/65";
const S = "text-white/40";

const DEV_CODE: Array<Array<[string, string]>> = [
  [["export function ", A], ["Section", "text-white/85"], ["() {", P]],
  [["  return ", A], ["<section>", "text-white/80"]],
  [["    <Heading", "text-white/80"], [" />", P]],
  [["  </section>", "text-white/80"]],
  [["}", P]],
];

function DevelopmentVisual() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex min-h-0 flex-1 gap-3">
        {/* Component tree — desktop only */}
        <div className="hidden min-h-0 shrink-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-[10px] leading-[1.7] text-white/45 lg:flex lg:w-[132px]">
          <div className="text-white/70">&lt;App&gt;</div>
          <div className="pl-2">├─ Navbar</div>
          <div className="pl-2">├─ Hero</div>
          <div className="rounded bg-white/[0.06] pl-2 text-accent">├─ Process</div>
          <div className="pl-2">└─ Footer</div>
        </div>

        {/* Code */}
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-[10px] leading-[1.6] lg:text-[11px]">
          {DEV_CODE.map((tokens, i) => (
            <div key={i} className="flex">
              <span className="mr-3 w-3 shrink-0 select-none text-right text-white/25 tabular-nums">
                {i + 1}
              </span>
              <span className="min-w-0 whitespace-pre">
                {tokens.map(([t, c], j) => (
                  <span key={j} className={c}>
                    {t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Checks */}
      <div className="flex shrink-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-white/55">
          {["Build", "Types", "Responsive", "SEO"].map((check) => (
            <span key={check} className="flex items-center gap-1.5">
              <span className={"text-accent"} aria-hidden="true">
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5 6.5 12 13 4.5" />
                </svg>
              </span>
              {check}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-white/40">
          {["Next.js", "React", "TypeScript", "Tailwind"].map((tag) => (
            <span key={tag} className="rounded border border-white/12 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 05 — LAUNCH : deployment dashboard
 * ------------------------------------------------------------------ */
const LAUNCH_ROWS: Array<{ label: string; status: string }> = [
  { label: "Build", status: "Passed" },
  { label: "Responsive", status: "Passed" },
  { label: "SEO", status: "Ready" },
  { label: "Performance", status: "Ready" },
  { label: "Production", status: "Live" },
];

function LaunchVisual({ locale }: { locale: Locale }) {
  const badge = locale === "pl" ? "Gotowe do publikacji" : "Ready to launch";
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {badge}
        </span>
        <span className="text-[9px] uppercase tracking-[0.16em] text-white/35">
          Deploy
        </span>
      </div>
      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-center divide-y divide-white/8">
        {LAUNCH_ROWS.map((row) => (
          <li key={row.label} className="flex items-center justify-between py-2">
            <span className="flex items-center gap-2.5 text-[12px] text-white/70">
              <span className="text-accent" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5 6.5 12 13 4.5" />
                </svg>
              </span>
              {row.label}
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
