import { Hero } from "@/components/hero/Hero";
import { StudioSection } from "@/components/studio/StudioSection";
import { SelectedWork } from "@/components/work/SelectedWork";
import { publishedWork } from "@/components/work/projects";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCtaSection } from "@/components/contact/FinalCtaSection";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

// Section numbers are contiguous over the visible sections (Studio 01,
// Selected work 02 … Contact 07). Selected work lists real client projects
// only (components/work/projects.ts) and renders nothing if none is published.

export const metadata = buildMetadata("pl", "home");

export default function HomePagePl() {
  const dict = getDictionary("pl");
  const work = publishedWork(dict.work);
  return (
    <>
      <OrganizationJsonLd description={dict.meta.description} />
      <Hero locale="pl" hero={dict.hero} />
      <StudioSection locale="pl" studio={dict.studio} />
      <SelectedWork locale="pl" projects={work.projects} work={work.work} />
      <ServicesSection locale="pl" services={dict.services} />
      <ProcessSection locale="pl" process={dict.process} />
      <PricingSection locale="pl" pricing={dict.pricing} />
      <FaqSection faq={dict.faq} />
      <FinalCtaSection locale="pl" contactCta={dict.contactCta} />
    </>
  );
}
