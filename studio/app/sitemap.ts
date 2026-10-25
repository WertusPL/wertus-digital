import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n/metadata";
import { routes, type RouteKey } from "@/lib/i18n/routes";

/**
 * Public, canonical, indexable pages — both language versions of each are
 * listed with matching hreflang alternates. Keep in sync with lib/i18n/routes.ts;
 * leave out anything that should stay noindex.
 */
const pages: { key: RouteKey; priority: number }[] = [
  { key: "home", priority: 1 },
  { key: "services", priority: 0.9 },
  { key: "work", priority: 0.8 },
  { key: "studio", priority: 0.7 },
  { key: "contact", priority: 0.8 },
  { key: "privacy", priority: 0.2 },
  { key: "cookies", priority: 0.2 },
];

const url = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ key, priority }) => {
    const languages = {
      "pl-PL": url(routes[key].pl),
      "en-US": url(routes[key].en),
      "x-default": url(routes[key].pl),
    };
    return [
      { url: url(routes[key].pl), priority, alternates: { languages } },
      { url: url(routes[key].en), priority, alternates: { languages } },
    ];
  });
}
