import type { Locale } from "@/lib/i18n/config";
import type { LegalDoc } from "./types";

/**
 * Cookie policy content — written from the actual code audit. The site sets
 * no cookies (no analytics, marketing or optional cookies), uses no
 * localStorage/sessionStorage, and self-hosts its fonts. No consent banner is
 * needed. No fictional cookie table is invented.
 */

const pl: LegalDoc = {
  meta: {
    title: "Polityka cookies | Wertus Digital",
    description:
      "Strona Wertus Digital nie zapisuje plików cookies — bez analityki, marketingu i śledzenia. Wyjaśniamy, czym są cookies i jak zarządzać nimi w przeglądarce.",
  },
  eyebrow: "DOKUMENTY",
  title: "Polityka cookies",
  updatedLabel: "Ostatnia aktualizacja",
  updated: "2 września 2026",
  intro: [
    "Ta polityka wyjaśnia, czym są pliki cookies i w jakim zakresie wykorzystuje je strona Wertus Digital.",
  ],
  sections: [
    {
      id: "czym-sa",
      heading: "Czym są pliki cookies",
      blocks: [
        {
          type: "p",
          text: "Pliki cookies to niewielkie pliki tekstowe zapisywane w Twoim urządzeniu podczas przeglądania stron internetowych. Są powszechnie stosowane, aby strony działały poprawnie, a na wielu witrynach także do celów analitycznych lub reklamowych.",
        },
      ],
    },
    {
      id: "czy-uzywa",
      heading: "Czy ta strona używa cookies",
      blocks: [
        {
          type: "p",
          text: "Nie. Na dzień ostatniej aktualizacji tej polityki strona Wertus Digital nie zapisuje w Twojej przeglądarce żadnych plików cookies — ani technicznych, ani analitycznych, ani marketingowych.",
        },
        {
          type: "p",
          text: "Nie korzystamy z narzędzi takich jak Google Analytics, Google Tag Manager, Meta Pixel, Hotjar czy Microsoft Clarity. Nie prowadzimy śledzenia ani reklamowego profilowania użytkowników.",
        },
        {
          type: "p",
          text: "Z tego powodu nie wyświetlamy banera zgody na cookies — nie ma zgody, o którą musielibyśmy pytać, ponieważ nie stosujemy cookies opcjonalnych.",
        },
      ],
    },
    {
      id: "storage",
      heading: "localStorage i sessionStorage",
      blocks: [
        {
          type: "p",
          text: "Strona nie zapisuje również danych w mechanizmach localStorage ani sessionStorage przeglądarki.",
        },
      ],
    },
    {
      id: "czcionki",
      heading: "Czcionki i zasoby zewnętrzne",
      blocks: [
        {
          type: "p",
          text: "Czcionki wykorzystywane na stronie są hostowane bezpośrednio w ramach naszej witryny (self-hosting) i nie są pobierane z zewnętrznych serwerów czcionek. Ich użycie nie wiąże się z zapisywaniem cookies ani z przekazywaniem Twoich danych podmiotom trzecim. Strona nie osadza również zewnętrznych elementów takich jak mapy czy odtwarzacze wideo.",
        },
      ],
    },
    {
      id: "formularz",
      heading: "Formularz kontaktowy",
      blocks: [
        {
          type: "p",
          text: "Formularz kontaktowy działa bez użycia cookies. Dane z formularza są przesyłane do nas w formie wiadomości e-mail — więcej informacji znajdziesz w {link}.",
          link: { label: "Polityce prywatności", href: "/polityka-prywatnosci" },
        },
      ],
    },
    {
      id: "zarzadzanie",
      heading: "Jak zarządzać plikami cookies",
      blocks: [
        {
          type: "p",
          text: "Niezależnie od tego, że nasza strona nie zapisuje cookies, możesz samodzielnie zarządzać plikami cookies i danymi witryn w ustawieniach swojej przeglądarki — przeglądać je, blokować i usuwać:",
        },
        {
          type: "links",
          items: [
            { label: "Google Chrome", href: "https://support.google.com/chrome/answer/95647" },
            { label: "Mozilla Firefox", href: "https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" },
            { label: "Safari", href: "https://support.apple.com/pl-pl/guide/safari/sfri11471/mac" },
            { label: "Microsoft Edge", href: "https://support.microsoft.com/microsoft-edge" },
          ],
        },
      ],
    },
    {
      id: "zmiany",
      heading: "Zmiany polityki",
      blocks: [
        {
          type: "p",
          text: "Jeśli w przyszłości wprowadzimy narzędzia wykorzystujące cookies (np. analitykę), zaktualizujemy tę politykę i — jeśli będzie to wymagane — poprosimy o Twoją zgodę, zanim takie pliki zostaną zapisane.",
        },
      ],
    },
  ],
};

const en: LegalDoc = {
  meta: {
    title: "Cookie Policy | Wertus Digital",
    description:
      "The Wertus Digital website sets no cookies — no analytics, marketing or tracking. We explain what cookies are and how to manage them in your browser.",
  },
  eyebrow: "LEGAL",
  title: "Cookie Policy",
  updatedLabel: "Last updated",
  updated: "2 September 2026",
  intro: [
    "This policy explains what cookies are and to what extent the Wertus Digital website uses them.",
  ],
  sections: [
    {
      id: "what-are",
      heading: "What cookies are",
      blocks: [
        {
          type: "p",
          text: "Cookies are small text files stored on your device while you browse websites. They are widely used to make sites work correctly and, on many sites, for analytics or advertising.",
        },
      ],
    },
    {
      id: "does-use",
      heading: "Does this site use cookies",
      blocks: [
        {
          type: "p",
          text: "No. As of the last update of this policy, the Wertus Digital website sets no cookies in your browser — technical, analytical or marketing.",
        },
        {
          type: "p",
          text: "We use no tools such as Google Analytics, Google Tag Manager, Meta Pixel, Hotjar or Microsoft Clarity. We do not track or profile users for advertising.",
        },
        {
          type: "p",
          text: "For that reason we show no cookie-consent banner — there is no consent to ask for, because we use no optional cookies.",
        },
      ],
    },
    {
      id: "storage",
      heading: "localStorage and sessionStorage",
      blocks: [
        {
          type: "p",
          text: "The site also stores no data in the browser's localStorage or sessionStorage.",
        },
      ],
    },
    {
      id: "fonts",
      heading: "Fonts and external resources",
      blocks: [
        {
          type: "p",
          text: "The fonts used on the site are hosted directly within our website (self-hosted) and are not fetched from external font servers. Their use involves no cookies and no sharing of your data with third parties. The site also embeds no external elements such as maps or video players.",
        },
      ],
    },
    {
      id: "form",
      heading: "Contact form",
      blocks: [
        {
          type: "p",
          text: "The contact form works without cookies. Form data is sent to us as an e-mail message — you'll find more in the {link}.",
          link: { label: "Privacy Policy", href: "/en/privacy-policy" },
        },
      ],
    },
    {
      id: "manage",
      heading: "How to manage cookies",
      blocks: [
        {
          type: "p",
          text: "Even though our site sets no cookies, you can manage cookies and site data yourself in your browser settings — view, block and delete them:",
        },
        {
          type: "links",
          items: [
            { label: "Google Chrome", href: "https://support.google.com/chrome/answer/95647" },
            { label: "Mozilla Firefox", href: "https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" },
            { label: "Safari", href: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
            { label: "Microsoft Edge", href: "https://support.microsoft.com/microsoft-edge" },
          ],
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "If in the future we add tools that use cookies (e.g. analytics), we will update this policy and — where required — ask for your consent before any such files are stored.",
        },
      ],
    },
  ],
};

export const cookies: Record<Locale, LegalDoc> = { pl, en };
