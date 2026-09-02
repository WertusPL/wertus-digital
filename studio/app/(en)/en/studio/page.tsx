import { StudioHero } from "@/components/studio-page/StudioHero";
import { StudioApproach } from "@/components/studio-page/StudioApproach";
import { StudioDifference } from "@/components/studio-page/StudioDifference";
import { StudioProcess } from "@/components/studio-page/StudioProcess";
import { StudioCapabilities } from "@/components/studio-page/StudioCapabilities";
import { StudioTech } from "@/components/studio-page/StudioTech";
import { StudioLocation } from "@/components/studio-page/StudioLocation";
import { ServicesFinalCta } from "@/components/services-page/ServicesFinalCta";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";

const dict = getDictionary("en");

export const metadata = buildMetadata("en", "studio", dict.studioPage.meta);

export default function StudioPageEn() {
  const s = dict.studioPage;
  return (
    <>
      <StudioHero hero={s.hero} />
      <StudioApproach approach={s.approach} />
      <StudioDifference difference={s.difference} />
      <StudioProcess process={s.process} />
      <StudioCapabilities capabilities={s.capabilities} />
      <StudioTech tech={s.tech} />
      <StudioLocation location={s.location} />
      <ServicesFinalCta finalCta={s.finalCta} locale="en" />
    </>
  );
}
