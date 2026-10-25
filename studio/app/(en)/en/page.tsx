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

// Section order and numbering mirror the PL homepage — see app/(pl)/page.tsx.

export const metadata = buildMetadata("en", "home");

export default function HomePageEn() {
  const dict = getDictionary("en");
  const work = publishedWork(dict.work);
  return (
    <>
      <Hero locale="en" hero={dict.hero} />
      <StudioSection studio={dict.studio} />
      <SelectedWork locale="en" projects={work.projects} work={work.work} />
      <ServicesSection locale="en" services={dict.services} />
      <ProcessSection locale="en" process={dict.process} />
      <PricingSection locale="en" pricing={dict.pricing} />
      <FaqSection faq={dict.faq} />
      <FinalCtaSection locale="en" contactCta={dict.contactCta} />
    </>
  );
}
