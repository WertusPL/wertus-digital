import { ContactHero } from "@/components/contact-page/ContactHero";
import { ContactForm } from "@/components/contact-page/ContactForm";
import { NextSteps } from "@/components/contact-page/NextSteps";
import { ClosingContact } from "@/components/contact-page/ClosingContact";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";

const dict = getDictionary("pl");

export const metadata = buildMetadata("pl", "contact", dict.contactPage.meta);

export default function ContactPagePl() {
  const contact = dict.contactPage;
  return (
    <>
      <ContactHero hero={contact.hero} details={contact.details} />

      <section className="border-t border-[var(--border-light)]">
        <div className="wd-container py-[64px] lg:py-[104px]">
          <div className="max-w-[1200px] xl:max-w-[1320px]">
            <ContactForm
              form={contact.form}
              locale="pl"
              privacyHref="/polityka-prywatnosci"
            />
          </div>
        </div>
      </section>

      <NextSteps nextSteps={contact.nextSteps} />
      <ClosingContact closing={contact.closing} details={contact.details} />
    </>
  );
}
