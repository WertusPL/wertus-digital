/** Inline segment of a headline — allows one accented word mid-line. */
export type HeadlineSegment = { text: string; accent?: boolean };

/** A headline modelled as lines of segments, for line-by-line reveal. */
export type Headline = HeadlineSegment[][];

export type Dictionary = {
  nav: {
    services: string;
    work: string;
    studio: string;
    contact: string;
    cta: string;
    /** aria-label for the language switcher group */
    languageLabel: string;
    openMenu: string;
    closeMenu: string;
    /** aria-label for the primary navigation landmark */
    primaryNav: string;
    skipToContent: string;
  };
  navMegaMenu: {
    /** Column heading over the service list, e.g. "USŁUGI" / "SERVICES". */
    label: string;
    /** Accessible label for the dropdown panel. */
    panelLabel: string;
    /** Bottom link to the full offer page. */
    allServices: string;
    /** Per-item "see details" link in the preview. */
    detailsCta: string;
    items: Array<{
      /** Selects the anchor (serviceAnchors) and the preview variant. */
      key: "websites" | "landing" | "cms" | "care";
      index: string; // "01"
      title: string;
      subtitle: string;
      previewTitle: string;
      previewText: string;
      microLabels: string[];
    }>;
  };
  hero: {
    eyebrow: string;
    headline: Headline;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    capabilitiesLabel: string;
    capabilities: string[];
  };
  featured: {
    kicker: string; // e.g. "CONCEPT PROJECT / 2026"
    conceptBadge: string; // e.g. "CONCEPT PROJECT"
    discipline: string; // e.g. "Architecture / Web Design"
    projectName: string; // fictional concept brand
    previewNav: string[]; // abstract nav items inside the preview
    previewTagline: string; // short neutral tagline in the preview
    previewCta: string; // small button label inside the preview
    caption: string; // accessible description of the mockup
  };
  studio: {
    kicker: string; // section label, e.g. "STUDIO" (index "01 /" is structural)
    headline: string[]; // main heading, one entry per line
    description: string;
    pillars: Array<{
      eyebrow: string; // DESIGN / DEVELOPMENT / GROWTH
      headline: string;
      description: string;
    }>;
  };
  work: {
    kicker: string; // "SELECTED WORK"
    headline: string[]; // one entry per line
    description: string;
    viewAll: string; // link to all work
    counter: string; // "PROJECT" / "PROJEKT" (used as "PROJECT 01 / 03")
    scope: string; // "WEB DESIGN / DEVELOPMENT"
    conceptTag: string; // "CONCEPT PROJECT" (year appended in component)
    conceptShort: string; // "Koncepcja" / "Concept" — list sub-line
    cta: string; // "Zobacz projekt" / "View project"
    /** Localised industry label per project id. */
    industries: Record<string, string>;
  };
  services: {
    kicker: string; // "SERVICES"
    headline: string[]; // one entry per line
    description: string;
    cta: string; // "Dowiedz się więcej" / "Learn more"
    items: Array<{
      id: string; // "web-design" | "development" | "cms" | "care" — selects the visual
      index: string; // "01"
      name: string; // "WEB DESIGN"
      title: string;
      description: string;
      benefits: string[];
    }>;
  };
  process: {
    label: string; // "PROCESS" (section index "04 /" is structural)
    heading: string[]; // one entry per line
    description: string;
    steps: Array<{
      id: "discovery" | "direction" | "design" | "development" | "launch"; // selects the visual
      title: string;
      description: string;
    }>;
  };
  pricing: {
    label: string; // "WYCENA" / "PRICING" (section index "05 /" is structural)
    heading: string; // the question, e.g. "Ile kosztuje dobra strona?"
    statement: string; // secondary line under the heading
    description: string;
    microcopy: string; // reassurance line near the CTA
    cta: string; // primary CTA label (arrow added in component)
    secondaryCta: string; // secondary link label (arrow added in component)
    factors: string; // what influences the quote — secondary info
    tiers: Array<{
      id: "landing" | "business" | "advanced" | "care";
      name: string; // uppercase tier name
      price: string; // starting price, kept in PLN in both languages
      description: string;
    }>;
  };
  faq: {
    label: string; // "FAQ" (section index "06 /" is structural)
    heading: string; // e.g. "Najczęstsze pytania."
    description: string;
    items: Array<{
      id: string; // stable slug — drives the trigger/panel aria ids
      question: string;
      answer: string;
    }>;
  };
  contactCta: {
    label: string; // "KONTAKT" / "CONTACT" (section index "07 /" is structural)
    heading: string[]; // one entry per line, revealed line by line
    description: string;
    primaryCta: string; // arrow added in component
    secondary: string; // lead-in before the email link
  };
  contactPage: {
    meta: { title: string; description: string };
    hero: {
      label: string; // "KONTAKT / START PROJEKTU"
      /** H1 split so the trailing phrase can be rendered as a serif accent. */
      headingLead: string;
      headingAccent: string;
      description: string;
      microcopy: string; // "Wstępna rozmowa i wycena są bezpłatne."
      panelLabel: string; // small heading above the contact facts panel
      statusLabel: string; // "STATUS"
      status: string; // real availability line, e.g. "Przyjmujemy nowe projekty"
    };
    details: {
      emailLabel: string;
      phoneLabel: string;
      locationLabel: string;
      location: string; // localized "Białystok / Polska" | "Białystok / Poland"
    };
    form: {
      label: string; // small section label, e.g. "FORMULARZ"
      heading: string; // e.g. "Napisz do nas"
      optionalTag: string; // "(opcjonalnie)"
      requiredHint: string; // a11y note about required fields
      fields: {
        name: string;
        email: string;
        company: string;
        service: string; // legend for the service group
        budget: string;
        message: string;
      };
      messagePlaceholder: string;
      budgetPlaceholder: string; // native select placeholder
      /** Subtle editorial guide shown beside the form (not a checklist). */
      guide: { label: string; intro: string; items: string[] };
      serviceOptions: Array<{ value: string; label: string }>;
      budgetOptions: Array<{ value: string; label: string }>;
      privacy: { pre: string; linkLabel: string; post: string };
      submit: string;
      submitting: string;
      success: { heading: string; body: string };
      /** Neutral message shown when a send fails; email is rendered between pre/post. */
      errorSend: { pre: string; post: string };
      /** Shown when too many attempts are made in a short time (HTTP 429). */
      errorRate: string;
      errors: {
        name: string;
        email: string;
        emailInvalid: string;
        company: string;
        service: string;
        message: string;
      };
    };
    nextSteps: {
      label: string;
      heading: string;
      steps: Array<{ index: string; title: string; description: string }>;
    };
    closing: {
      label: string;
      heading: string;
      lead: string; // lead-in before the direct email/phone links
    };
  };
  servicesPage: {
    meta: { title: string; description: string };
    hero: {
      label: string; // "OFERTA / WEB DESIGN & DEVELOPMENT"
      /** H1 across two lines; the trailing phrase is a serif accent. */
      headingLine1: string;
      headingLine2Lead: string;
      headingAccent: string;
      description: string;
      secondary: string; // secondary supporting line
      primaryCta: string; // → contact
      secondaryCta: string; // in-page anchor to the scope section
      /** Right dark panel — product evolution rail. */
      visualTitle: string; // small header label on the panel
      visualSteps: Array<{ label: string; caption: string }>; // STRUCTURE … LAUNCH
    };
    projectTypes: {
      label: string; // "01 /" is structural; this is "CO TWORZYMY"
      heading: string[]; // one entry per line
      description: string;
      bestForLabel: string;
      includesLabel: string;
      previewLabels: { pages: string; cms: string; scope: string };
      priceLabel: string; // "od" prefix note is inside price string
      items: Array<{
        id: "landing" | "business" | "advanced";
        index: string; // "01"
        name: string;
        headline: string;
        description: string;
        bestFor: string;
        includes: string[];
        price: string; // kept in PLN in both languages
        // Preview meta (values localized; the diagram itself is id-driven)
        pages: string;
        cms: string;
        scope: string;
      }>;
    };
    capabilities: {
      label: string; // "ZAKRES"
      heading: string[];
      description: string;
      scopeLabel: string; // "Zakres" small label above the chips
      items: Array<{
        id: "web-design" | "development" | "cms" | "care";
        index: string;
        name: string;
        headline: string;
        description: string;
        note?: string; // e.g. technology / CMS clarification
        scope: string[];
        price?: string; // only Care carries a price marker
      }>;
    };
    deliverables: {
      label: string; // "CO OTRZYMUJESZ"
      heading: string[];
      note: string; // "Dokładny zakres zależy od projektu."
      pipeline: string[]; // BRIEF → … → LAUNCH
      items: Array<{ index: string; title: string }>;
    };
    scopeSelector: {
      label: string; // "JAK DOBIERAMY ZAKRES"
      heading: string[];
      description: string;
      goalLabel: string; // legend, e.g. "CEL"
      options: Array<{
        id: string;
        label: string; // the goal phrasing
        result: string; // suggested scope name
        price: string;
      }>;
      resultLead: string; // "Najbardziej zbliżony zakres:"
      cta: string; // "Omów projekt →"
      disclaimer: string; // "To nie jest automatyczna wycena…"
    };
    pricing: {
      label: string; // "CENY STARTOWE"
      heading: string[];
      note: string; // footnote under the rows
      cta: string; // "Poproś o dokładną wycenę"
      rows: Array<{ name: string; price: string }>;
      factorsLabel: string; // "CO WPŁYWA NA CENĘ"
      factors: string[];
      factorsNote: string; // "Cena zależy przede wszystkim od zakresu…"
    };
    faq: {
      label: string; // "FAQ OFERTY"
      heading: string;
      items: Array<{ id: string; question: string; answer: string }>;
    };
    finalCta: {
      label: string; // small label, e.g. "START PROJEKTU"
      heading: string[]; // one entry per line
      description: string;
      primaryCta: string;
      secondary: string; // lead-in before the email link
    };
  };
  workPage: {
    meta: { title: string; description: string };
    hero: {
      label: string; // eyebrow, e.g. "WYBRANE REALIZACJE" / "SELECTED WORK"
      /** H1 split so the trailing phrase can render as a serif accent. */
      headingLead: string;
      headingAccent: string;
      description: string;
      /** Small meta strip under the hero: project count + year. */
      countLabel: string; // e.g. "01 REALIZACJA" / "01 PROJECT"
      yearLabel: string; // e.g. "2026"
    };
    caseStudy: {
      label: string; // "CASE STUDY"
      name: string; // "LECH-BUD"
      subtitle: string; // "Strona internetowa dla firmy budowlanej"
      description: string;
      metaLabel: string; // small label above the meta block, e.g. "ZAKRES PROJEKTU"
      scopeLabel: string; // "ZAKRES"
      scope: string[]; // Web Design, Development, Responsive, …
      sectorLabel: string; // "BRANŻA"
      sector: string; // "Budownictwo" / "Construction"
      mainCaption: string; // label above the big screen, e.g. "STRONA GŁÓWNA"
      mainAlt: string;
      galleryLabel: string; // "PRZEGLĄD" / "OVERVIEW"
      shots: {
        worksDesktopLabel: string;
        worksDesktopAlt: string;
        homeMobileLabel: string;
        homeMobileAlt: string;
        contactDesktopLabel: string;
        contactDesktopAlt: string;
        worksMobileLabel: string;
        worksMobileAlt: string;
      };
      solutionLabel: string; // "ZAKRES WYKONANIA"
      solution: Array<{ area: string; text: string }>; // Projekt / Development / Mobile
      liveCta: string; // "Zobacz stronę na żywo"
      liveExternalHint: string; // "(nowa karta)" / "(new tab)" — appended to aria-label
    };
    more: {
      heading: string; // "Kolejne realizacje już wkrótce."
      description: string;
    };
    finalCta: {
      label: string;
      heading: string[];
      description: string;
      primaryCta: string;
      secondary: string;
    };
  };
  studioPage: {
    meta: { title: string; description: string };
    hero: {
      label: string; // "O STUDIU" / "ABOUT THE STUDIO"
      /** H1 across two lines; the trailing phrase is a serif accent. */
      headingLine1: string;
      headingLine2Lead: string;
      headingAccent: string;
      lead: string;
      leadSecondary: string;
      /** Right editorial meta panel — positioning facts, no invented stats. */
      metaLabel: string;
      metaItems: Array<{ label: string; value: string }>;
    };
    approach: {
      index: string; // "01"
      label: string; // "PODEJŚCIE" / "APPROACH"
      heading: string[];
      lead: string; // large editorial paragraph
      body: string;
      pointsLabel: string; // small label over the supporting points
      points: string[];
    };
    difference: {
      index: string; // "02"
      label: string; // "CO NAS WYRÓŻNIA" / "WHAT SETS US APART"
      heading: string[];
      items: Array<{ index: string; title: string; description: string }>;
    };
    process: {
      index: string; // "03"
      label: string; // "JAK PRACUJEMY" / "HOW WE WORK"
      heading: string[];
      description: string;
      steps: Array<{ index: string; title: string; description: string }>;
    };
    capabilities: {
      index: string; // "04"
      label: string; // "ZAKRES" / "CAPABILITIES"
      heading: string[];
      items: string[]; // typographic list, no per-item descriptions
    };
    tech: {
      index: string; // "05"
      label: string; // "TECHNOLOGIA" / "TECHNOLOGY"
      heading: string[];
      body: string;
      stackLabel: string; // "STACK"
      stack: string[]; // Next.js … Vercel — shown subtly
    };
    location: {
      label: string; // "WSPÓŁPRACA" / "WORKING TOGETHER"
      place: string; // "Białystok / Polska"
      body: string;
    };
    finalCta: {
      label: string;
      heading: string[];
      description: string;
      primaryCta: string;
      secondary: string;
    };
  };
  footer: {
    studioDescription: string;
    menuLabel: string;
    servicesLabel: string;
    contactLabel: string;
    socialLabel: string;
    services: string[]; // four service labels (title case)
    location: string; // e.g. "Białystok / Polska"
    privacy: string;
    cookies: string;
    copyright: string; // rights phrase — the year is composed in the component
  };
  meta: {
    title: string;
    description: string;
  };
};
