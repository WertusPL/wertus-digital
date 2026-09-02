import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacy } from "@/lib/legal/privacy";
import { buildMetadata } from "@/lib/i18n/metadata";

const doc = privacy.pl;

export const metadata = buildMetadata("pl", "privacy", doc.meta);

export default function PrivacyPagePl() {
  return <LegalDocument doc={doc} />;
}
