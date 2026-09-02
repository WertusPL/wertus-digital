import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal browser frame — a thin chrome bar plus an aspect-locked media area.
 * The fixed 2:1 ratio matches the source screenshots (no distortion) and keeps
 * the height stable while the preview switches (no layout shift). Not a laptop.
 */
export function ProjectFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/12 bg-[#0e1116]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </div>
      <div className="relative aspect-[2/1] w-full">{children}</div>
    </div>
  );
}
