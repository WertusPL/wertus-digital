import { LegalDocument } from "@/components/legal/LegalDocument";
import { cookies } from "@/lib/legal/cookies";
import { buildMetadata } from "@/lib/i18n/metadata";

const doc = cookies.en;

export const metadata = buildMetadata("en", "cookies", doc.meta);

export default function CookiesPageEn() {
  return <LegalDocument doc={doc} />;
}
