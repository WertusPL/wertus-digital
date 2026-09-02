"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import type { ResolvedProject } from "./projects";

/**
 * Fills its (aspect-locked) parent with the project's media.
 *  - poster present            → optimised <Image> (top-anchored)
 *  - video present + active    → muted/looped/inline <video> over the poster
 *    (autoplay suppressed under reduced motion / on touch = when !active)
 *  - no poster (or load error) → an on-brand "concept" placeholder, never a
 *    broken-image icon.
 */
export function ProjectMedia({
  project,
  locale,
  active = false,
  reducedMotion = false,
  sizes = "100vw",
  priority = false,
}: {
  project: ResolvedProject;
  locale: Locale;
  active?: boolean;
  reducedMotion?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canPlayVideo = Boolean(project.video) && active && !reducedMotion;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (canPlayVideo) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [canPlayVideo]);

  const showPoster = Boolean(project.poster) && !imgError;

  if (!showPoster && !project.video) {
    return <ConceptPlaceholder project={project} />;
  }

  return (
    <>
      {showPoster && (
        <Image
          src={project.poster as string}
          alt={project.posterAlt[locale]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
          onError={() => setImgError(true)}
        />
      )}
      {project.video && !reducedMotion && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
            canPlayVideo ? "opacity-100" : "opacity-0",
          )}
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.poster}
          aria-hidden="true"
        >
          <source src={project.video} />
        </video>
      )}
    </>
  );
}

/** Honest, designed stand-in for concepts without a screenshot yet. */
function ConceptPlaceholder({ project }: { project: ResolvedProject }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[linear-gradient(135deg,#0e1116_0%,#161a20_100%)] p-6 sm:p-8">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/40">
        <span>{project.industry}</span>
        <span>{project.year}</span>
      </div>
      {/* faint hairline grid — technical, not decorative noise */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-white/[0.06]" />
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
          Concept preview
        </p>
        <p className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">
          {project.title}
        </p>
      </div>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent">
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
        Concept
      </div>
    </div>
  );
}
