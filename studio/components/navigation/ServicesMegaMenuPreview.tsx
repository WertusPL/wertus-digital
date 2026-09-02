"use client";

import Link from "next/link";
import type { Dictionary } from "@/dictionaries/types";

type MegaItem = Dictionary["navMegaMenu"]["items"][number];

/**
 * Right-hand dark preview for the services mega menu. One component, four
 * variants selected by `item.key`. Pure CSS/SVG in the studio's dark technical
 * language — no images, brands or invented domains. Presentational: the parent
 * animates it via AnimatePresence, so it renders identically under reduced
 * motion.
 */
export function ServicesMegaMenuPreview({
  item,
  href,
  detailsCta,
  onNavigate,
}: {
  item: MegaItem;
  href: string;
  detailsCta: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/12 bg-surface p-5">
      <div className="relative min-h-0 flex-1">{renderVisual(item.key)}</div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <h3 className="text-[1.05rem] font-medium leading-tight text-white">
          {item.previewTitle}
        </h3>
        <p className="mt-2 max-w-[42ch] text-[13px] leading-[1.5] text-white/60">
          {item.previewText}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.microLabels.map((label) => (
            <li
              key={label}
              className="rounded border border-white/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white/60"
            >
              {label}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          onClick={onNavigate}
          className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-white"
        >
          {detailsCta}
          <span
            aria-hidden="true"
            className="text-accent transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

// Secondary technical label — legible on the dark panel but clearly below the
// preview title (which is full white).
const VLABEL = "text-[8px] uppercase tracking-[0.16em] text-white/55";

function renderVisual(key: MegaItem["key"]) {
  switch (key) {
    case "landing":
      return <LandingVisual />;
    case "cms":
      return <CmsVisual />;
    case "care":
      return <CareVisual />;
    case "websites":
    default:
      return <WebsitesVisual />;
  }
}

function Arrow() {
  return (
    <span aria-hidden="true" className="shrink-0 text-white/30">
      →
    </span>
  );
}

/* Websites — STRUCTURE → WIREFRAME → UI → DEVELOPMENT */
function WebsitesVisual() {
  return (
    <div className="flex h-full items-center gap-2">
      {/* Structure — mini sitemap */}
      <Stage label="Structure">
        <div className="flex flex-col items-center gap-1.5">
          <span className="h-2.5 w-6 rounded-sm bg-white/25" />
          <span className="h-2 w-px bg-white/18" />
          <div className="flex gap-1.5">
            <span className="h-2 w-3 rounded-sm border border-accent/50" />
            <span className="h-2 w-3 rounded-sm border border-white/18" />
            <span className="h-2 w-3 rounded-sm border border-white/18" />
          </div>
        </div>
      </Stage>
      <Arrow />
      {/* Wireframe */}
      <Stage label="Wireframe">
        <div className="w-full space-y-1 rounded border border-dashed border-white/20 p-1.5">
          <span className="block h-1.5 w-4/5 rounded-sm bg-white/25" />
          <span className="block h-1 w-full rounded-sm bg-white/12" />
          <span className="block h-3 w-full rounded-sm border border-white/15" />
        </div>
      </Stage>
      <Arrow />
      {/* UI */}
      <Stage label="UI">
        <div className="w-full space-y-1 rounded border border-white/12 bg-white/[0.04] p-1.5">
          <span className="block h-1.5 w-4/5 rounded-sm bg-white/80" />
          <span className="block h-1 w-full rounded-sm bg-white/25" />
          <span className="block h-3 w-full rounded-sm bg-[linear-gradient(135deg,#1c2434,#2b3652)]" />
        </div>
      </Stage>
      <Arrow />
      {/* Development */}
      <Stage label="Dev">
        <div className="w-full space-y-1 rounded border border-white/12 bg-black/30 p-1.5 font-mono">
          <span className="block h-1 w-1/2 rounded-sm bg-accent/70" />
          <span className="block h-1 w-4/5 rounded-sm bg-white/25" />
          <span className="block h-1 w-2/3 rounded-sm bg-white/25" />
          <span className="block h-1 w-3/5 rounded-sm bg-white/15" />
        </div>
      </Stage>
    </div>
  );
}

function Stage({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
      <div className="flex h-14 w-full items-center justify-center">{children}</div>
      <span className={VLABEL}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Landing — a miniature landing-page outline. Labelled bands read top to
 * bottom as HERO → VALUE → PROOF → CTA → FORM (a real page structure, not
 * a dashboard). A small VISIT → MESSAGE → ACTION flow stays secondary.
 * Compact single rows because the preview area is short (~74px).
 * ------------------------------------------------------------------ */
function LandingVisual() {
  return (
    <div className="flex h-full gap-3">
      {/* Page frame */}
      <div className="flex min-w-0 flex-[5] flex-col overflow-hidden rounded-md border border-white/12 bg-white/[0.02]">
        <LandingRow label="Hero">
          <span className="h-2 flex-1 rounded-sm bg-white/70" />
          <span className="h-2.5 w-8 shrink-0 rounded-full bg-accent/85" />
        </LandingRow>

        <LandingRow label="Value">
          <span className="h-2.5 flex-1 rounded-sm border border-white/15 bg-white/[0.03]" />
          <span className="h-2.5 flex-1 rounded-sm border border-white/15 bg-white/[0.03]" />
          <span className="h-2.5 flex-1 rounded-sm border border-white/15 bg-white/[0.03]" />
        </LandingRow>

        <LandingRow label="Proof">
          <span className="h-2 flex-1 rounded-sm bg-white/15" />
        </LandingRow>

        <LandingRow label="CTA">
          <span className="h-1.5 flex-1 rounded-sm bg-white/30" />
          <span className="h-3 w-10 shrink-0 rounded-full bg-accent" />
        </LandingRow>

        <LandingRow label="Form" last>
          <span className="h-3 flex-1 rounded-[3px] border border-white/15 bg-white/[0.02]" />
          <span className="h-3 w-6 shrink-0 rounded-[3px] bg-white/25" />
        </LandingRow>
      </div>

      {/* Secondary flow — kept small so it doesn't dominate */}
      <div className="hidden shrink-0 flex-col justify-center gap-2 sm:flex">
        {["Visit", "Message", "Action"].map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={"h-1.5 w-1.5 rounded-full " + (i === 2 ? "bg-accent" : "bg-white/35")}
            />
            <span className="text-[9px] uppercase tracking-[0.12em] text-white/55">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LandingRow({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-1 items-center gap-2 px-2.5 " +
        (last ? "" : "border-b border-white/8")
      }
    >
      <span className="w-9 shrink-0 text-[7px] uppercase tracking-[0.1em] text-white/55">
        {label}
      </span>
      <div className="flex flex-1 items-center gap-1.5">{children}</div>
    </div>
  );
}

/* CMS — content fields → live preview */
function CmsVisual() {
  return (
    <div className="flex h-full items-center gap-3">
      <div className="min-w-0 flex-1 space-y-1.5">
        <span className={"block " + VLABEL}>Content</span>
        {["Title", "Image", "Text"].map((f) => (
          <div key={f} className="rounded border border-white/12 bg-white/[0.04] px-2 py-1">
            <span className="block text-[8px] uppercase tracking-[0.12em] text-white/55">
              {f}
            </span>
            <span className="mt-0.5 block h-1.5 w-3/4 rounded-sm bg-white/25" />
          </div>
        ))}
      </div>

      <div className="flex shrink-0 flex-col items-center">
        <span className="text-[8px] uppercase tracking-[0.14em] text-accent">Update</span>
        <span aria-hidden="true" className="text-white/35">→</span>
      </div>

      <div className="min-w-0 flex-1">
        <span className={"block " + VLABEL}>Live preview</span>
        <div className="mt-1 space-y-1 rounded border border-white/12 bg-white/[0.03] p-2">
          <span className="block h-1.5 w-5/6 rounded-sm bg-white/80" />
          <span className="block h-8 w-full rounded-sm bg-[linear-gradient(135deg,#1c2434,#2b3652)]" />
          <span className="block h-1 w-full rounded-sm bg-white/20" />
          <span className="block h-1 w-2/3 rounded-sm bg-white/15" />
        </div>
      </div>
    </div>
  );
}

/* Care & Growth — maintenance status board */
function CareVisual() {
  const rows = [
    { label: "Status", value: "Live", ok: true },
    { label: "Updates", value: "03" },
    { label: "Performance", value: "Good" },
    { label: "Next", value: "Improvement" },
  ];
  return (
    <div className="flex h-full flex-col justify-center divide-y divide-white/8">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2 text-[11px] text-white/70">
            {r.ok && (
              <span className="text-accent" aria-hidden="true">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8.5 6.5 12 13 4.5" />
                </svg>
              </span>
            )}
            {r.label}
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/55">
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}
