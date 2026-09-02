"use client";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

/**
 * Ambient backdrop for the dark final CTA.
 *
 * Video is architected but NOT shipped: no asset exists in /public/media yet,
 * so we must never render a <video> pointing at a missing file (that 404s and
 * logs errors). Instead we render an elegant static CSS ambient now, and keep
 * the <video> path behind `HAS_AMBIENT_VIDEO`. When the real files land at
 * /public/media/contact-bg.{webm,mp4}, flip that flag to true — everything
 * else (sources, attributes, reduced-motion gating, overlay) is already wired.
 *
 * Reduced motion: even once a video exists it will not autoplay — we fall back
 * to the same static ambient. Text stays fully legible with or without video.
 */
const HAS_AMBIENT_VIDEO = false;

const VIDEO_SOURCES = [
  { src: "/media/contact-bg.webm", type: "video/webm" },
  { src: "/media/contact-bg.mp4", type: "video/mp4" },
] as const;

// Tiny fractal-noise tile — adds a faint film grain, one small inline SVG.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function AmbientBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const showVideo = HAS_AMBIENT_VIDEO && !reducedMotion;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#080a0d]"
    >
      {/* black → deep navy → black */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#080a0d_0%,#0a0e1a_52%,#07090d_100%)]" />
      {/* soft brand-blue glow, upper area only */}
      <div className="absolute inset-x-0 top-[-15%] h-[65%] bg-[radial-gradient(55%_80%_at_50%_0%,rgba(6,85,254,0.16),transparent_72%)]" />
      {/* very faint film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: "140px 140px" }}
      />

      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          {VIDEO_SOURCES.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}

      {/* readability overlay — keeps text crisp with or without a video */}
      <div className="absolute inset-0 bg-[#080a0d]/45" />
    </div>
  );
}
