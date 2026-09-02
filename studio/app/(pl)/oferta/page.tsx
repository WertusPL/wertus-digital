import { ServicesHero } from "@/components/services-page/ServicesHero";
import { ProjectTypes } from "@/components/services-page/ProjectTypes";
import { Capabilities } from "@/components/services-page/Capabilities";
import { Deliverables } from "@/components/services-page/Deliverables";
import { ScopeSelector } from "@/components/services-page/ScopeSelector";
import { ServicesPricing } from "@/components/services-page/ServicesPricing";
import { ServicesFaq } from "@/components/services-page/ServicesFaq";
import { ServicesFinalCta } from "@/components/services-page/ServicesFinalCta";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";

const dict = getDictionary("pl");

export const metadata = buildMetadata("pl", "services", dict.servicesPage.meta);

export default function ServicesPagePl() {
  const s = dict.servicesPage;
  return (
    <>
      <ServicesHero hero={s.hero} locale="pl" />
      <ProjectTypes projectTypes={s.projectTypes} locale="pl" />
      <Capabilities capabilities={s.capabilities} locale="pl" />
      <Deliverables deliverables={s.deliverables} />
      <ScopeSelector scopeSelector={s.scopeSelector} locale="pl" />
      <ServicesPricing pricing={s.pricing} locale="pl" />
      <ServicesFaq faq={s.faq} />
      <ServicesFinalCta finalCta={s.finalCta} locale="pl" />
    </>
  );
}
