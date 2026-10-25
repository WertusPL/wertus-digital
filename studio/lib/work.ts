/**
 * Portfolio / case-study data — the non-localised facts about each project.
 *
 * Copy (headings, descriptions, scope labels) lives in the dictionaries and is
 * keyed by the project `id`; this file only holds language-neutral values:
 * image files, their intrinsic pixel dimensions (so <Image> can reserve space
 * and avoid layout shift) and the live-site URL.
 */

/** One screenshot with its real intrinsic size — used for CLS-free rendering. */
export type Shot = {
  src: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  id: string;
  /**
   * Live website URL. Left `null` on purpose — we don't invent a domain.
   * When the real Lech-Bud address is known, set it here and the
   * "View live website" button activates automatically.
   */
  liveUrl: string | null;
  main: Shot; // the hero screenshot of the case study
  gallery: {
    worksDesktop: Shot;
    homeMobile: Shot;
    contactDesktop: Shot;
    worksMobile: Shot;
  };
};

const BASE = "/portfolio/lechbud";

export const LECHBUD: CaseStudy = {
  id: "lechbud",
  liveUrl: null,
  main: { src: `${BASE}/lechbud-home-desktop.png`, width: 1887, height: 925 },
  gallery: {
    worksDesktop: { src: `${BASE}/lechbud-realizacje-desktop.png`, width: 1886, height: 922 },
    homeMobile: { src: `${BASE}/lechbud-home-mobile.png`, width: 382, height: 826 },
    contactDesktop: { src: `${BASE}/lechbud-kontakt-desktop.png`, width: 1885, height: 918 },
    worksMobile: { src: `${BASE}/lechbud-realizacje-mobile.png`, width: 375, height: 829 },
  },
};

const PS = "/portfolio/pracownia-s";

/**
 * Pracownia S. — published with the client's consent. Screenshots of the live
 * site (https://pracowniasandra.pl); logo and photos shown in them belong to
 * the client. Gallery slots: offer subpage (Śluby), homepage on mobile,
 * contact form, CMS-fed bouquet gallery on mobile.
 */
export const PRACOWNIA_S: CaseStudy = {
  id: "pracownia-s",
  liveUrl: "https://pracowniasandra.pl",
  main: { src: `${PS}/pracownia-s-home-desktop.png`, width: 1872, height: 918 },
  gallery: {
    worksDesktop: { src: `${PS}/pracownia-s-sluby-desktop.png`, width: 1872, height: 918 },
    homeMobile: { src: `${PS}/pracownia-s-home-mobile.png`, width: 780, height: 1688 },
    contactDesktop: { src: `${PS}/pracownia-s-kontakt-desktop.png`, width: 1872, height: 918 },
    worksMobile: { src: `${PS}/pracownia-s-kwiaty-mobile.png`, width: 780, height: 1688 },
  },
};
