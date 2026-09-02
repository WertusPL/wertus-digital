import { LegalDocument } from "@/components/legal/LegalDocument";
import { cookies } from "@/lib/legal/cookies";
import { buildMetadata } from "@/lib/i18n/metadata";

const doc = cookies.pl;

export const metadata = buildMetadata("pl", "cookies", doc.meta);

export default function CookiesPagePl() {
  return <LegalDocument doc={doc} />;
}
