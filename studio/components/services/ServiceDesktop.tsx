"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { ServiceVisual } from "./ServiceVisual";

const EASE = [0.22, 1, 0.36, 1] as const;

type ServiceItem = Dictionary["services"]["items"][number];

export function ServiceDesktop({
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
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="h-[clamp(280px,38vh,420px)]">
          <ServiceVisual service={service} locale={locale} />
        </div>

        <div className="mt-8 max-w-[46ch]">
          <h3 className="text-[clamp(1.5rem,1.8vw,2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-ink">
            {service.title}
          </h3>
          <p className="mt-4 text-[1.0625rem] leading-[1.55] text-muted">
            {service.description}
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2.5 text-[15px] text-ink">
                <Check />
                {benefit}
              </li>
            ))}
          </ul>

          <Link
            href={href}
            className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-ink"
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
      </motion.div>
    </AnimatePresence>
  );
}

function Check() {
  return (
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
  );
}
