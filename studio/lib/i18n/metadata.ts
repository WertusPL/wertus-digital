import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { ogLocale, type Locale } from "./config";
import { routes, type RouteKey } from "./routes";

/** Canonical production origin — used for hreflang / OpenGraph foundation. */
const SITE_URL = "https://wertusdigital.pl";

/**
 * Build per-page metadata with correct canonical + hreflang alternates
 * derived from the central route map. Extend per page as sections grow.
 *
 * `meta` overrides the default (home) title/description for pages that carry
 * their own — the hreflang/canonical logic stays identical across pages.
 */
export function buildMetadata(
  locale: Locale,
  key: RouteKey,
  meta?: { title: string; description: string },
): Metadata {
  const dict = getDictionary(locale);
  const path = routes[key][locale];
  const resolved = meta ?? dict.meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolved.title,
    description: resolved.description,
    alternates: {
      canonical: path,
      languages: {
        "pl-PL": routes[key].pl,
        "en-GB": routes[key].en,
        "x-default": routes[key].pl,
      },
    },
    openGraph: {
      title: resolved.title,
      description: resolved.description,
      url: path,
      siteName: "Wertus Digital",
      locale: ogLocale[locale],
      type: "website",
    },
  };
}
