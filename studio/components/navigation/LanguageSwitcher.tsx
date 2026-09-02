"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";

const meta: Record<Locale, { flag: string; label: string; full: string }> = {
  pl: { flag: "🇵🇱", label: "PL", full: "Polski" },
  en: { flag: "🇬🇧", label: "EN", full: "English" },
};

export function LanguageSwitcher({
  current,
  groupLabel,
  size = "sm",
}: {
  current: Locale;
  groupLabel: string;
  /** sm = navbar inline, lg = mobile menu */
  size?: "sm" | "lg";
}) {
  const pathname = usePathname() || "/";
  const isLg = size === "lg";

  return (
    <div
      role="group"
      aria-label={groupLabel}
      className={cn("flex items-center", isLg ? "gap-3" : "gap-2.5")}
    >
      {locales.map((locale, i) => {
        const isActive = locale === current;
        const href = switchLocalePath(pathname, locale);
        return (
          <Fragment key={locale}>
            {i > 0 && (
              <span aria-hidden="true" className="select-none text-muted opacity-50">
                /
              </span>
            )}
            <Link
              href={href}
              hrefLang={locale}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full transition-opacity duration-200",
                isLg ? "min-h-[44px] px-1 text-base" : "text-[13px] leading-none",
                isActive
                  ? "font-semibold opacity-100"
                  : "font-normal opacity-50 hover:opacity-90",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("flag-emoji", isLg ? "text-[17px]" : "text-[15px]")}
              >
                {meta[locale].flag}
              </span>
              <span className="sr-only">{meta[locale].full}</span>
              <span aria-hidden="true">{meta[locale].label}</span>
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}
