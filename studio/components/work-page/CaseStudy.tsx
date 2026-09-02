"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { CaseStudy as CaseStudyData, Shot } from "@/lib/work";
import { InView } from "@/components/motion/InView";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
};
const y10 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const y16 = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type Copy = Dictionary["workPage"]["caseStudy"];

export function CaseStudy({
  copy,
  data,
}: {
  copy: Copy;
  data: CaseStudyData;
}) {
  return (
    <section aria-labelledby="case-lechbud-heading" className="pb-8 lg:pb-12">
      <div className="wd-container">
        <div className="mx-auto max-w-[1360px]">
          {/* ---- Header: name + subtitle + description | meta ---- */}
          <InView
            as="div"
            variants={container}
            viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
            className="grid grid-cols-1 gap-x-16 gap-y-10 border-t border-[var(--border-light)] pt-10 lg:grid-cols-[1fr_auto] lg:pt-14"
          >
            <div className="max-w-[46ch]">
              <motion.p
                variants={y10}
                className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent"
              >
                {copy.label}
              </motion.p>

              <motion.h2
                id="case-lechbud-heading"
                variants={y16}
                className="section-heading mt-5 tracking-[-0.02em]"
              >
                {copy.name}
              </motion.h2>

              <motion.p
                variants={y10}
                className="mt-4 text-[clamp(1.05rem,0.5vw+0.95rem,1.35rem)] font-medium text-ink"
              >
                {copy.subtitle}
              </motion.p>

              <motion.p
                variants={y10}
                className="mt-6 text-[15px] leading-[1.65] text-muted"
              >
                {copy.description}
              </motion.p>
            </div>

            {/* Meta panel — scope + sector */}
            <motion.dl
              variants={y10}
              className="lg:w-[240px] lg:justify-self-end lg:border-l lg:border-[var(--border-light)] lg:pl-8"
            >
              <div>
                <dt className="text-label text-muted">{copy.scopeLabel}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {copy.scope.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full border border-[var(--border-light)] px-3 py-1 text-[12px] font-medium text-ink"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="mt-7 border-t border-[var(--border-light)] pt-6">
                <dt className="text-label text-muted">{copy.sectorLabel}</dt>
                <dd className="mt-2 text-[15px] text-ink">{copy.sector}</dd>
              </div>
            </motion.dl>
          </InView>

          {/* ---- Main screen ---- */}
          <InView
            as="figure"
            variants={y16}
            viewOptions={{ once: true, margin: "0px 0px -8% 0px" }}
            className="group mt-14 lg:mt-20"
          >
            <figcaption className="mb-3 text-label text-muted">
              {copy.mainCaption}
            </figcaption>
            <div className="overflow-hidden rounded-xl border border-[var(--border-light)] bg-white">
              <Image
                src={data.main.src}
                width={data.main.width}
                height={data.main.height}
                alt={copy.mainAlt}
                priority
                sizes="(min-width: 1360px) 1360px, 100vw"
                className="h-auto w-full object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.012]"
              />
            </div>
          </InView>

          {/* ---- Editorial gallery ---- */}
          <div className="mt-16 lg:mt-24">
            <p className="text-label text-muted">{copy.galleryLabel}</p>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-y-16">
              {/* Row 1 — works desktop (left) + home mobile (right) */}
              <DesktopShot
                shot={data.gallery.worksDesktop}
                alt={copy.shots.worksDesktopAlt}
                label={copy.shots.worksDesktopLabel}
                className="lg:col-span-8 lg:col-start-1 lg:row-start-1"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
              <MobileShot
                shot={data.gallery.homeMobile}
                alt={copy.shots.homeMobileAlt}
                label={copy.shots.homeMobileLabel}
                className="lg:col-span-4 lg:col-start-9 lg:row-start-1"
              />

              {/* Row 2 — works mobile (left) + contact desktop (right) */}
              <MobileShot
                shot={data.gallery.worksMobile}
                alt={copy.shots.worksMobileAlt}
                label={copy.shots.worksMobileLabel}
                className="lg:col-span-4 lg:col-start-1 lg:row-start-2"
              />
              <DesktopShot
                shot={data.gallery.contactDesktop}
                alt={copy.shots.contactDesktopAlt}
                label={copy.shots.contactDesktopLabel}
                className="lg:col-span-8 lg:col-start-5 lg:row-start-2"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </div>

          {/* ---- Solution ---- */}
          <div className="mt-20 border-t border-[var(--border-light)] pt-12 lg:mt-28 lg:pt-14">
            <p className="text-label text-muted">{copy.solutionLabel}</p>
            <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-3">
              {copy.solution.map((s, i) => (
                <div
                  key={s.area}
                  className={
                    i > 0
                      ? "sm:border-l sm:border-[var(--border-light)] sm:pl-8"
                      : undefined
                  }
                >
                  <span className="text-label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[1.15rem] font-medium tracking-[-0.01em] text-ink">
                    {s.area}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-muted">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Live website CTA ---- *
           * Rendered only when a real URL is configured. With no URL we
           * hide the whole block (no "coming soon" hint) — the section's own
           * bottom padding keeps the spacing intact. */}
          {data.liveUrl && (
            <div className="mt-12 lg:mt-16">
              <LiveButton
                url={data.liveUrl}
                label={copy.liveCta}
                externalHint={copy.liveExternalHint}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Screenshot presenters
 * ------------------------------------------------------------------ */
function DesktopShot({
  shot,
  alt,
  label,
  className,
  sizes,
}: {
  shot: Shot;
  alt: string;
  label: string;
  className?: string;
  sizes: string;
}) {
  return (
    <figure className={"group" + (className ? " " + className : "")}>
      <figcaption className="mb-3 text-label text-muted">{label}</figcaption>
      <div className="overflow-hidden rounded-xl border border-[var(--border-light)] bg-white">
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={alt}
          sizes={sizes}
          className="h-auto w-full object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.012]"
        />
      </div>
    </figure>
  );
}

/** Phone screenshot on a calm panel — natural proportions, capped width. */
function MobileShot({
  shot,
  alt,
  label,
  className,
}: {
  shot: Shot;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <figcaption className="mb-3 text-label text-muted">{label}</figcaption>
      <div className="flex justify-center rounded-xl border border-[var(--border-light)] bg-ink/[0.03] px-6 py-8 sm:px-8 sm:py-10">
        <div className="w-full max-w-[248px]">
          <Image
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={alt}
            sizes="(min-width: 1024px) 248px, 60vw"
            className="h-auto w-full rounded-lg border border-[var(--border-light)]"
          />
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * Live-site button — only rendered when a real URL exists (see call
 * site). We never fake a link or show a "coming soon" placeholder.
 * ------------------------------------------------------------------ */
function LiveButton({
  url,
  label,
  externalHint,
}: {
  url: string;
  label: string;
  externalHint: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${externalHint}`}
      className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[14px] font-medium text-white transition-[background-color,transform] duration-200 ease-out hover:bg-[#0546d0] active:scale-[0.98]"
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px"
      >
        ↗
      </span>
    </a>
  );
}
