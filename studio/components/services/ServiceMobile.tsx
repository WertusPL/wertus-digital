"use client";

import Link from "next/link";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { ServiceVisual } from "./ServiceVisual";

type ServiceItem = Dictionary["services"]["items"][number];

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
    <article className="border-t border-[var(--border-light)] pt-8">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="text-[13px] font-medium tabular-nums text-accent">
          {service.index} /
        </span>
        <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-ink">
          {service.name}
        </span>
      </div>

      <div className="aspect-[4/3] sm:aspect-[16/10]">
        <ServiceVisual service={service} locale={locale} />
      </div>

      <div className="mt-6">
        <h3 className="text-[1.5rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink">
          {service.title}
        </h3>
        <p className="mt-3 text-[1rem] leading-[1.55] text-muted">
          {service.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2.5 text-[15px] text-ink">
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
          className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-ink"
        >
          {cta}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
