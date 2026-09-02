import { Hero } from "@/components/hero/Hero";
import { StudioSection } from "@/components/studio/StudioSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCtaSection } from "@/components/contact/FinalCtaSection";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";

// NOTE: `SelectedWork` is intentionally NOT rendered for now — see the PL page
// for the rationale (visible sections are numbered contiguously). Code/data/
// assets are kept for later reuse.

export const metadata = buildMetadata("en", "home");

export default function HomePageEn() {
  const dict = getDictionary("en");
  return (
    <>
      <Hero locale="en" hero={dict.hero} featured={dict.featured} />
      <StudioSection studio={dict.studio} />
      <ServicesSection locale="en" services={dict.services} />
      <ProcessSection locale="en" process={dict.process} />
      <PricingSection locale="en" pricing={dict.pricing} />
      <FaqSection faq={dict.faq} />
      <FinalCtaSection locale="en" contactCta={dict.contactCta} />
    </>
  );
}
