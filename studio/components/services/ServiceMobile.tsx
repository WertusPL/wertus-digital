"use client";

import Link from "next/link";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { ServiceVisual } from "./ServiceVisual";

type ServiceItem = Dictionary["services"]["items"][number];

/**
 * Touch layouts show a visual only for the services whose mock-up explains
 * something to a business owner at a glance (design → final page, editing
 * content). Development and care stay text-only to keep the list short.
 */
const MOBILE_VISUALS = new Set(["web-design", "cms"]);

export function ServiceMobile({
  service,
  cta,
  href,
  locale,
}: {
  service: ServiceItem;
  cta: string;
  href: string;
  locale: Locale;
}) {
  return (
    <article className="border-t border-[var(--border-light)] pt-5">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-[13px] font-medium tabular-nums text-accent">
          {service.index} /
        </span>
        <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-ink">
          {service.name}
        </span>
      </div>

      {MOBILE_VISUALS.has(service.id) && (
        <div className="mb-4 aspect-[16/9]">
          <ServiceVisual service={service} locale={locale} />
        </div>
      )}

      <h3 className="text-[1.375rem] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
        {service.title}
      </h3>
      <p className="mt-2.5 text-[15px] leading-[1.55] text-muted">
        {service.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {service.benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-2.5 text-[14px] text-ink">
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 shrink-0 text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8.5 6.5 12 13 4.5" />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="group mt-3 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-ink"
      >
        {cta}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </article>
  );
}
