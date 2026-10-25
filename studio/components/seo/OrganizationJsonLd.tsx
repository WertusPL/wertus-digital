import { SITE } from "@/lib/site";
import { SITE_URL } from "@/lib/i18n/metadata";

/**
 * schema.org Organization for the homepage (PL + EN).
 *
 * Only verified, public data from lib/site.ts — the same values shown in the
 * footer and on the contact page. Location is the city/country the site
 * already states ("Białystok / Polska"), not a street address. Intentionally
 * NOT LocalBusiness: no confirmed office address or opening hours.
 */
export function OrganizationJsonLd({ description }: { description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Wertus Digital",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/wertus-digital.png`,
    description,
    email: SITE.email,
    telephone: SITE.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Białystok",
      addressCountry: "PL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      telephone: SITE.phoneTel,
      availableLanguage: ["Polish", "English"],
    },
    sameAs: [SITE.instagram],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
