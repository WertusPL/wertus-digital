import { WorkHero } from "@/components/work-page/WorkHero";
import { CaseStudy } from "@/components/work-page/CaseStudy";
import { MoreWork } from "@/components/work-page/MoreWork";
import { ServicesFinalCta } from "@/components/services-page/ServicesFinalCta";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";
import { LECHBUD } from "@/lib/work";

const dict = getDictionary("en");

export const metadata = buildMetadata("en", "work", dict.workPage.meta);

export default function WorkPageEn() {
  const w = dict.workPage;
  return (
    <>
      <WorkHero hero={w.hero} />
      <CaseStudy copy={w.caseStudy} data={LECHBUD} />
      <MoreWork more={w.more} />
      <ServicesFinalCta finalCta={w.finalCta} locale="en" />
    </>
  );
}
