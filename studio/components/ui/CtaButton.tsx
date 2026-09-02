import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Primary call-to-action. Accent-blue pill with a north-east arrow that
 * nudges on hover — quick and elegant, no glow.
 */
export function CtaButton({
  href,
  label,
  tone = "accent",
  className,
  prefetch,
}: {
  href: string;
  label: string;
  tone?: "accent" | "dark";
  className?: string;
  /** Pass false for routes that don't exist yet, to avoid prefetch 404s. */
  prefetch?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium",
        "transition-[background-color,transform] duration-200 ease-out active:scale-[0.98]",
        tone === "accent"
          ? "bg-accent text-white hover:bg-[#0546d0]"
          : "bg-ink text-canvas hover:bg-black",
        className,
      )}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px"
      >
        ↗
      </span>
    </Link>
  );
}
