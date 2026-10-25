import type { Dictionary } from "@/dictionaries/types";
import type { RouteKey } from "@/lib/i18n/routes";
import { LECHBUD, PRACOWNIA_S, type Shot } from "@/lib/work";

export type ProjectType = "concept" | "client";

/**
 * Language-neutral project registry (assets + structural data) for the
 * homepage "Selected work" section. Localised copy (sector, summary, scope)
 * lives in the dictionary under `work.projects[id]`.
 *
 * Only real client work is listed here, and only `published` entries render.
 * Never add an unpublished project's screenshots to /public before the
 * client has agreed to publication.
 *
 * Server-only by convention: import the registry from server components and
 * pass `publishedWork()` results down, so unpublished entries (and their
 * copy) never reach the client bundle or the serialized page payload.
 */
export type WorkProject = {
  id: string;
  title: string; // brand name — not translated
  type: ProjectType;
  /**
   * Gate for rendering. A real project stays `false` until the client has
   * approved publication and its screenshots are in /public.
   */
  published: boolean;
  /** Desktop screenshot (~2:1, top-anchored in the frame). */
  poster?: string;
  posterAlt: { pl: string; en: string };
  /** Optional phone screenshot shown overlapping the desktop frame. */
  mobile?: Shot;
  mobileAlt?: { pl: string; en: string };
  /** Optional short loop (WebM/MP4). Absent for now — architecture is ready. */
  video?: string;
  /** Internal page with the full case study. */
  linkKey: RouteKey;
  /** Optional in-page anchor of the case study on that page. */
  anchor?: string;
};

export const workProjects: WorkProject[] = [
  {
    id: "lechbud",
    title: "Lech-Bud",
    type: "client",
    published: true,
    poster: LECHBUD.main.src,
    posterAlt: {
      pl: "Strona główna serwisu Lech-Bud na desktopie — nagłówek o usługach budowlanych i wykończeniowych na tle domu jednorodzinnego.",
      en: "Lech-Bud homepage on desktop — headline about construction and finishing services over a photo of a detached house.",
    },
    mobile: LECHBUD.gallery.homeMobile,
    mobileAlt: {
      pl: "Strona główna Lech-Bud w widoku mobilnym.",
      en: "Lech-Bud homepage on mobile.",
    },
    linkKey: "work",
  },
  {
    // Pracownia S. — https://pracowniasandra.pl. Published with the client's consent.
    id: "pracownia-s",
    title: "Pracownia S.",
    type: "client",
    published: true,
    poster: PRACOWNIA_S.main.src,
    posterAlt: {
      pl: "Strona główna Pracowni S. na desktopie — nagłówek o kwiatach i dekoracjach na wyjątkowe chwile obok zdjęć ślubnych.",
      en: "Pracownia S. homepage on desktop — headline about flowers and decorations for special occasions next to wedding photos.",
    },
    mobile: PRACOWNIA_S.gallery.homeMobile,
    mobileAlt: {
      pl: "Strona główna Pracowni S. w widoku mobilnym.",
      en: "Pracownia S. homepage on mobile.",
    },
    linkKey: "work",
    anchor: PRACOWNIA_S.id,
  },
];

/**
 * Published projects plus the dictionary slice trimmed to their copy — the
 * only data the (client) Selected work section receives.
 */
export function publishedWork(work: Dictionary["work"]): {
  projects: WorkProject[];
  work: Dictionary["work"];
} {
  const projects = workProjects.filter((p) => p.published);
  return {
    projects,
    work: {
      ...work,
      projects: Object.fromEntries(projects.map((p) => [p.id, work.projects[p.id]])),
    },
  };
}
