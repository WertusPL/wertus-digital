"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

/**
 * Wertus Digital wordmark. Uses the transparent dark horizontal lockup
 * (assets/logo-horizontal-dark.png → public/brand/wertus-digital.png)
 * on the light navbar/menu. Intrinsic 710×140; width is set responsively
 * and height stays auto so proportions are never distorted.
 *
 * Behaviour: the logo always points at the locale homepage (`/` or `/en`).
 * When the user is already on that homepage, clicking scrolls back to the
 * hero instead of triggering a no-op navigation — no hash ever enters the URL.
 */
function normalize(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function Logo({
  href,
  onClick,
  priority = false,
  className,
}: {
  href: string;
  onClick?: () => void;
  priority?: boolean;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const reduced = usePrefersReducedMotion();
  const isHome = normalize(pathname) === normalize(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (isHome) {
      // Already on this locale's homepage — scroll to the top (hero) rather
      // than re-navigating. Native scroll, honouring reduced-motion.
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }
    // Otherwise fall through: <Link> handles client-side navigation to home.
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-label="Wertus Digital"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/brand/wertus-digital.png"
        alt="Wertus Digital"
        width={710}
        height={140}
        priority={priority}
        sizes="164px"
        className="h-auto w-[132px] sm:w-[146px] lg:w-[164px]"
      />
    </Link>
  );
}
