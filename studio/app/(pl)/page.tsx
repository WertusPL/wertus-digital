import { Hero } from "@/components/hero/Hero";
import { StudioSection } from "@/components/studio/StudioSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCtaSection } from "@/components/contact/FinalCtaSection";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";

// NOTE: `SelectedWork` is intentionally NOT rendered for now — no concept
// projects on the homepage until real client work is ready. The component,
// data model and assets remain in components/work for later reuse. Section
// numbers are contiguous over the *visible* sections (Studio 01 … Contact 06);
// when Selected Work returns it slots in and the sections renumber.

export const metadata = buildMetadata("pl", "home");

export default function HomePagePl() {
  const dict = getDictionary("pl");
  return (
    <>
      <Hero locale="pl" hero={dict.hero} featured={dict.featured} />
      <StudioSection studio={dict.studio} />
      <ServicesSection locale="pl" services={dict.services} />
      <ProcessSection locale="pl" process={dict.process} />
      <PricingSection locale="pl" pricing={dict.pricing} />
      <FaqSection faq={dict.faq} />
      <FinalCtaSection locale="pl" contactCta={dict.contactCta} />
    </>
  );
}
