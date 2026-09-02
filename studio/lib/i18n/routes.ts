import type { Locale } from "./config";

/**
 * Single source of truth for the site's localized routing.
 *
 * Each page has one stable key; the URL differs per language (PL is
 * un-prefixed, EN lives under /en with translated slugs). The language
 * switcher and navigation both read from here, so a page is never
 * duplicated as "two separate sites" and switching language always
 * lands on the equivalent page — not the homepage.
 */
export type RouteKey =
  | "home"
  | "services"
  | "work"
  | "studio"
  | "contact"
  | "privacy"
  | "cookies";

/** Keys shown in the primary navigation (legal pages live in the footer only). */
export type NavKey = "services" | "work" | "studio" | "contact";

export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { pl: "/", en: "/en" },
  services: { pl: "/oferta", en: "/en/services" },
  work: { pl: "/realizacje", en: "/en/work" },
  studio: { pl: "/o-studiu", en: "/en/studio" },
  contact: { pl: "/kontakt", en: "/en/contact" },
  privacy: { pl: "/polityka-prywatnosci", en: "/en/privacy-policy" },
  cookies: { pl: "/polityka-cookies", en: "/en/cookies" },
};

/** Ordered keys for the primary navigation (excludes home + legal pages). */
export const navKeys: NavKey[] = ["services", "work", "studio", "contact"];

export function localizedPath(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

function normalize(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** Resolve which page a given pathname corresponds to (any locale). */
export function routeKeyFromPath(pathname: string): RouteKey | null {
  const clean = normalize(pathname);
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key].pl === clean || routes[key].en === clean) {
      return key;
    }
  }
  return null;
}

/**
 * Given the current pathname, return the equivalent path in `target`.
 * Falls back to the target homepage for unknown/deep paths so the
 * switcher always produces a valid destination.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const key = routeKeyFromPath(pathname);
  return key ? routes[key][target] : routes.home[target];
}
