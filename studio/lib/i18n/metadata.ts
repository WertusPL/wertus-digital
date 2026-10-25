import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { ogLocale, type Locale } from "./config";
import { routes, type RouteKey } from "./routes";

/** Canonical production origin — used for hreflang / OpenGraph foundation. */
export const SITE_URL = "https://wertusdigital.pl";

/**
 * Default share card per locale (1200×630, public/og/). Built from existing
 * brand assets: the logo, the canvas/ink/accent tokens and the site's copy.
 */
const ogImage: Record<Locale, { url: string; alt: string }> = {
  pl: {
    url: "/og/wertus-digital-pl.png",
    alt: "Wertus Digital — projektowanie i tworzenie stron internetowych dla firm",
  },
  en: {
    url: "/og/wertus-digital-en.png",
    alt: "Wertus Digital — custom website design for small businesses",
  },
};

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
  const image = { ...ogImage[locale], width: 1200, height: 630 };

  return {
    metadataBase: new URL(SITE_URL),
    title: resolved.title,
    description: resolved.description,
    alternates: {
      canonical: path,
      languages: {
        "pl-PL": routes[key].pl,
        "en-US": routes[key].en,
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
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: resolved.title,
      description: resolved.description,
      images: [image],
    },
  };
}
