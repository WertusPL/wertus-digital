"use client";

import type { Dictionary } from "@/dictionaries/types";
import { cn } from "@/lib/utils";

type ServiceItem = Dictionary["services"]["items"][number];

export function ServicesNavigation({
  items,
  active,
  onSelect,
}: {
  items: ServiceItem[];
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ul className="border-b border-[var(--border-light)]">
      {items.map((service, i) => {
        const isActive = i === active;
        return (
          <li key={service.id}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group flex w-full items-center gap-4 border-t py-5 text-left transition-colors duration-300",
                isActive ? "border-[#0655fe]" : "border-[var(--border-light)]",
              )}
            >
              <span
                className={cn(
                  "text-[13px] font-medium tabular-nums tracking-[0.1em] transition-colors duration-300",
                  isActive ? "text-accent" : "text-muted",
                )}
              >
                {service.index}
              </span>
              <span
                className={cn(
                  "text-[1.05rem] font-medium tracking-[0.01em] transition-colors duration-300",
                  isActive ? "text-ink" : "text-muted group-hover:text-ink",
                )}
              >
                {service.name}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
