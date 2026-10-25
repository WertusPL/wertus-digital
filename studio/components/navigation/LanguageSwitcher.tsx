"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { htmlLang, locales, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";

// `flag` is an emoji (rendered via the Twemoji flag font) or a path to an
// image in /public. EN targets the US market, hence the US flag.
const meta: Record<Locale, { flag: string; label: string; full: string }> = {
  pl: { flag: "🇵🇱", label: "PL", full: "Polski" },
  en: { flag: "/flags/us.svg", label: "EN", full: "English (US)" },
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
              hrefLang={htmlLang[locale]}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full transition-opacity duration-200",
                isLg ? "min-h-[44px] px-1 text-base" : "text-[13px] leading-none",
                isActive
                  ? "font-semibold opacity-100"
                  : "font-normal opacity-50 hover:opacity-90",
              )}
            >
              {meta[locale].flag.startsWith("/") ? (
                <Image
                  src={meta[locale].flag}
                  alt=""
                  aria-hidden="true"
                  width={isLg ? 23 : 20}
                  height={isLg ? 12 : 11}
                  unoptimized
                  className="rounded-[2px]"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className={cn("flag-emoji", isLg ? "text-[17px]" : "text-[15px]")}
                >
                  {meta[locale].flag}
                </span>
              )}
              <span className="sr-only">{meta[locale].full}</span>
              <span aria-hidden="true">{meta[locale].label}</span>
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}
