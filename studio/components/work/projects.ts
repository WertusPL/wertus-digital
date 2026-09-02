import type { RouteKey } from "@/lib/i18n/routes";

export type ProjectType = "concept" | "client";

/**
 * Language-neutral project registry (assets + structural data). Localised
 * strings (industry, section copy) live in the dictionary and are merged in
 * by id, so concept projects can later be swapped for real client work by
 * editing this file + the poster/video assets — no component changes.
 */
export type WorkProject = {
  id: string;
  index: string; // "01"
  title: string; // brand name — not translated
  type: ProjectType;
  year: string;
  /** Poster in /public. Undefined → a designed concept placeholder is shown. */
  poster?: string;
  posterAlt: { pl: string; en: string };
  /** Optional short loop (WebM/MP4). Absent for now — architecture is ready. */
  video?: string;
  /** Where the list row / "view project" link points (routes may not exist yet). */
  linkKey: RouteKey;
};

export const workProjects: WorkProject[] = [
  {
    id: "lex-finanse",
    index: "01",
    title: "Lex Finanse",
    type: "concept",
    year: "2026",
    poster: "/work/lex-finanse.png",
    posterAlt: {
      pl: "Koncepcyjny projekt strony Lex Finanse — strona główna",
      en: "Lex Finanse concept website design — homepage",
    },
    linkKey: "work",
  },
  {
    id: "miso-sushi",
    index: "02",
    title: "Miso Sushi",
    type: "concept",
    year: "2026",
    poster: "/work/miso-sushi.png",
    posterAlt: {
      pl: "Koncepcyjny projekt strony Miso Sushi — strona główna restauracji",
      en: "Miso Sushi concept website design — restaurant homepage",
    },
    linkKey: "work",
  },
  {
    id: "monaco-performance",
    index: "03",
    title: "Monaco Performance",
    type: "concept",
    year: "2026",
    // No screenshot yet — ProjectMedia renders an on-brand concept placeholder.
    posterAlt: {
      pl: "Monaco Performance — projekt koncepcyjny w przygotowaniu",
      en: "Monaco Performance — concept project in preparation",
    },
    linkKey: "work",
  },
];

export type ResolvedProject = WorkProject & { industry: string };
