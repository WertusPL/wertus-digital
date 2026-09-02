import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacy } from "@/lib/legal/privacy";
import { buildMetadata } from "@/lib/i18n/metadata";

const doc = privacy.en;

export const metadata = buildMetadata("en", "privacy", doc.meta);

export default function PrivacyPageEn() {
  return <LegalDocument doc={doc} />;
}
