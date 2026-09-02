import type { Locale } from "@/lib/i18n/config";

/**
 * Shared in-page anchors for the offer page. Components on /oferta render these
 * ids; the hero's "see the scope" link and the navbar mega menu link to them.
 * Kept here as the single source of truth so the ids and the links never drift.
 *
 * A shared component renders both languages, so anchors that must differ per
 * language (only "websites") are modelled per-locale.
 */

/** Capabilities section — hero "Zobacz zakres / Explore the scope" target. */
export const SCOPE_ANCHOR = "zakres";

/** Mega-menu service keys → the slug used on /oferta and /en/services. */
export const serviceAnchors = {
  websites: { pl: "strony-internetowe", en: "websites" },
  landing: { pl: "landing-page", en: "landing-page" },
  cms: { pl: "cms", en: "cms" },
  care: { pl: "care-growth", en: "care-growth" },
} as const;

export type ServiceAnchorKey = keyof typeof serviceAnchors;

export function serviceAnchorId(key: ServiceAnchorKey, locale: Locale): string {
  return serviceAnchors[key][locale];
}

/** Offset so a targeted heading is not hidden under the sticky navbar. */
export const ANCHOR_SCROLL_MT = "scroll-mt-[calc(var(--nav-height)+1.25rem)]";
