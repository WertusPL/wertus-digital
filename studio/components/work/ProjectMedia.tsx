"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import type { WorkProject } from "./projects";

/**
 * Fills its (aspect-locked) parent with the project's media.
 *  - poster present            → optimised <Image> (top-anchored)
 *  - video present + active    → muted/looped/inline <video> over the poster
 *    (autoplay suppressed under reduced motion / on touch = when !active)
 *  - no poster (or load error) → a neutral on-brand placeholder, never a
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
  project: WorkProject;
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
    return <MediaPlaceholder project={project} />;
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

/** Neutral stand-in when a screenshot is missing or fails to load. */
function MediaPlaceholder({ project }: { project: WorkProject }) {
  return (
    <div className="absolute inset-0 flex items-end bg-[linear-gradient(135deg,#0e1116_0%,#161a20_100%)] p-6 sm:p-8">
      <p className="text-2xl font-medium tracking-tight text-white/70 sm:text-3xl">
        {project.title}
      </p>
    </div>
  );
}
