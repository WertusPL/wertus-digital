/**
 * Shared shape for the legal pages (privacy + cookies). Content lives in
 * plain data modules per document; the LegalDocument component renders it in
 * the Wertus Digital design system. Copy is authored from the actual code
 * audit — no invented services, cookies or data flows.
 */

/** A paragraph, optionally with a single inline link where `{link}` appears. */
export type LegalParagraph = {
  type: "p";
  text: string;
  link?: { label: string; href: string; external?: boolean };
};

/** A plain bullet list. */
export type LegalList = { type: "ul"; items: string[] };

/** A list of links (e.g. per-browser cookie-management help). */
export type LegalLinkList = {
  type: "links";
  items: Array<{ label: string; href: string }>;
};

export type LegalBlock = LegalParagraph | LegalList | LegalLinkList;

export type LegalSection = {
  id: string; // stable slug — drives the H2 aria id
  heading: string;
  blocks: LegalBlock[];
};

/** Optional definition-style panel (used for the admin/contact details). */
export type LegalPanel = {
  label: string;
  rows: Array<{ label: string; value: string; href?: string }>;
};

export type LegalDoc = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  updatedLabel: string;
  updated: string;
  intro: string[];
  contactPanel?: LegalPanel;
  sections: LegalSection[];
};
