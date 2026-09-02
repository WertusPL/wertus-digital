import type { Locale } from "@/lib/i18n/config";
import type { LegalDoc } from "./types";

/**
 * Privacy policy content — written from the actual code audit.
 * Data collected: only what the visitor sends via the contact form
 * (name, email, company, service, optional budget, message) or by direct
 * e-mail/phone. Processors actually used: Vercel (hosting) and the e-mail
 * provider that carries the correspondence. No analytics, no cookies,
 * no tracking, no profiling. Administrator is a natural person operating
 * under the Wertus Digital brand — no NIP/REGON/KRS/DPO invented.
 */

const pl: LegalDoc = {
  meta: {
    title: "Polityka prywatności | Wertus Digital",
    description:
      "Jak Wertus Digital przetwarza dane osobowe przekazane przez formularz kontaktowy oraz w korespondencji. Bez analityki, cookies marketingowych i profilowania.",
  },
  eyebrow: "DOKUMENTY",
  title: "Polityka prywatności",
  updatedLabel: "Ostatnia aktualizacja",
  updated: "2 września 2026",
  intro: [
    "Ta polityka wyjaśnia, jakie dane osobowe zbieramy za pośrednictwem strony Wertus Digital, w jakim celu i na jakiej podstawie je przetwarzamy oraz jakie prawa Ci przysługują. Staramy się opisać to prostym i konkretnym językiem.",
    "Strona ma charakter informacyjny. Nie prowadzimy kont użytkowników, rejestracji, newslettera ani marketingu e-mailowego.",
  ],
  contactPanel: {
    label: "ADMINISTRATOR DANYCH",
    rows: [
      { label: "Administrator", value: "Kacper Niedzielko, działający pod marką Wertus Digital" },
      { label: "Lokalizacja", value: "Białystok, Polska" },
      {
        label: "E-mail",
        value: "wertusdigital@gmail.com",
        href: "mailto:wertusdigital@gmail.com",
      },
      { label: "Telefon", value: "+48 516 950 801", href: "tel:+48516950801" },
    ],
  },
  sections: [
    {
      id: "administrator",
      heading: "Administrator i kontakt",
      blocks: [
        {
          type: "p",
          text: "Administratorem Twoich danych osobowych jest Kacper Niedzielko, działający pod marką Wertus Digital, z Białegostoku. We wszystkich sprawach dotyczących danych osobowych możesz skontaktować się z nami pod adresem e-mail wertusdigital@gmail.com lub telefonicznie: +48 516 950 801.",
        },
        {
          type: "p",
          text: "Nie wyznaczyliśmy inspektora ochrony danych — w sprawach prywatności kontaktuj się bezpośrednio z administratorem.",
        },
      ],
    },
    {
      id: "dane",
      heading: "Jakie dane zbieramy",
      blocks: [
        {
          type: "p",
          text: "Zbieramy wyłącznie te dane, które sam(a) nam przekazujesz — korzystając z formularza kontaktowego lub kontaktując się z nami bezpośrednio. Za pomocą formularza możesz przekazać:",
        },
        {
          type: "ul",
          items: [
            "imię i nazwisko,",
            "adres e-mail,",
            "nazwę firmy,",
            "wybrany rodzaj usługi oraz — opcjonalnie — orientacyjny budżet,",
            "treść wiadomości i wszelkie dodatkowe informacje, które sam(a) w niej zawrzesz (np. numer telefonu, jeśli go podasz).",
          ],
        },
        {
          type: "p",
          text: "Nie prosimy o dane szczególnych kategorii i nie zbieramy danych, które nie są potrzebne do odpowiedzi na Twoje zapytanie.",
        },
      ],
    },
    {
      id: "cele",
      heading: "Cele i podstawy przetwarzania",
      blocks: [
        {
          type: "p",
          text: "Dane z formularza i korespondencji przetwarzamy w następujących celach:",
        },
        {
          type: "ul",
          items: [
            "udzielenia odpowiedzi na Twoje zapytanie i prowadzenia korespondencji — na podstawie naszego prawnie uzasadnionego interesu, jakim jest obsługa kontaktu (art. 6 ust. 1 lit. f RODO);",
            "podjęcia działań zmierzających do ewentualnego zawarcia i wykonania umowy, jeśli Twoje zapytanie tego dotyczy — na podstawie art. 6 ust. 1 lit. b RODO;",
            "ustalenia, dochodzenia lub obrony ewentualnych roszczeń — na podstawie naszego prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO).",
          ],
        },
      ],
    },
    {
      id: "formularz",
      heading: "Formularz kontaktowy",
      blocks: [
        {
          type: "p",
          text: "Formularz służy wyłącznie do przesłania zapytania i skontaktowania się z Tobą w sprawie potencjalnej współpracy. Wysłane dane docierają do nas w formie wiadomości e-mail.",
        },
        {
          type: "p",
          text: "Formularz zawiera pola: imię i nazwisko, e-mail, firma, rodzaj usługi, budżet (opcjonalnie) oraz treść wiadomości. Nie stosujemy obowiązkowej zgody marketingowej ani zapisu do newslettera, ponieważ takich działań nie prowadzimy.",
        },
        {
          type: "p",
          text: "Stosujemy proste, techniczne zabezpieczenie przeciwko spamowi (tzw. honeypot). Nie służy ono do śledzenia ani profilowania.",
        },
      ],
    },
    {
      id: "korespondencja",
      heading: "Kontakt e-mailowy i telefoniczny",
      blocks: [
        {
          type: "p",
          text: "Jeśli skontaktujesz się z nami bezpośrednio — e-mailem lub telefonicznie — będziemy przetwarzać dane, które nam przekażesz (np. adres e-mail, numer telefonu, treść wiadomości), w celu obsługi kontaktu i udzielenia odpowiedzi.",
        },
      ],
    },
    {
      id: "logi",
      heading: "Dane techniczne i logi",
      blocks: [
        {
          type: "p",
          text: "Sama strona nie korzysta z narzędzi analitycznych ani reklamowych i nie zapisuje w Twojej przeglądarce plików cookies (zob. Polityka cookies).",
        },
        {
          type: "p",
          text: "Strona jest jednak udostępniana za pośrednictwem zewnętrznego dostawcy hostingu. Jak w przypadku większości usług internetowych, infrastruktura dostawcy może rejestrować w logach serwera standardowe dane techniczne (np. adres IP, informacje o przeglądarce, datę i godzinę żądania) — w celu dostarczania strony oraz zapewnienia jej bezpieczeństwa i stabilności. Nie wykorzystujemy tych danych do identyfikacji użytkowników ani do marketingu.",
        },
      ],
    },
    {
      id: "odbiorcy",
      heading: "Komu powierzamy dane",
      blocks: [
        {
          type: "p",
          text: "Korzystamy z zaufanych dostawców, którzy przetwarzają dane wyłącznie w naszym imieniu i w zakresie niezbędnym do świadczenia usług:",
        },
        {
          type: "ul",
          items: [
            "Vercel Inc. — dostawca hostingu, na którego infrastrukturze działa strona;",
            "dostawcy poczty elektronicznej (obecnie Google — usługa Gmail), za pośrednictwem których wysyłane, odbierane i przechowywane są wiadomości z formularza oraz korespondencja.",
          ],
        },
        {
          type: "p",
          text: "Nie sprzedajemy Twoich danych i nie udostępniamy ich w celach marketingowych.",
        },
      ],
    },
    {
      id: "eog",
      heading: "Przekazywanie danych poza EOG",
      blocks: [
        {
          type: "p",
          text: "Niektórzy z powyższych dostawców (Vercel, Google) mają siedzibę w Stanach Zjednoczonych, co może wiązać się z przekazywaniem danych poza Europejski Obszar Gospodarczy. Odbywa się to w oparciu o przewidziane w RODO mechanizmy zapewniające odpowiedni poziom ochrony — w szczególności standardowe klauzule umowne oraz ramy ochrony prywatności danych UE–USA (EU–US Data Privacy Framework).",
        },
      ],
    },
    {
      id: "retencja",
      heading: "Jak długo przechowujemy dane",
      blocks: [
        {
          type: "p",
          text: "Dane związane ze zwykłym zapytaniem przechowujemy przez czas niezbędny do obsługi kontaktu, a następnie maksymalnie przez 12 miesięcy od zakończenia korespondencji. Dłużej przechowujemy dane wyłącznie wtedy, gdy:",
        },
        {
          type: "ul",
          items: [
            "dojdzie do nawiązania współpracy — wówczas przez czas jej trwania i okres wymagany po jej zakończeniu;",
            "będzie to konieczne do ustalenia, dochodzenia lub obrony roszczeń;",
            "obowiązek dłuższego przechowywania wynika z przepisów prawa.",
          ],
        },
      ],
    },
    {
      id: "prawa",
      heading: "Twoje prawa",
      blocks: [
        { type: "p", text: "W związku z przetwarzaniem danych przysługują Ci prawa:" },
        {
          type: "ul",
          items: [
            "dostępu do danych oraz uzyskania ich kopii,",
            "sprostowania (poprawienia) danych,",
            "usunięcia danych,",
            "ograniczenia przetwarzania,",
            "wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,",
            "przenoszenia danych — w zakresie, w jakim ma to zastosowanie.",
          ],
        },
        {
          type: "p",
          text: "Aby skorzystać z tych praw, napisz do nas na adres wertusdigital@gmail.com.",
        },
      ],
    },
    {
      id: "skarga",
      heading: "Skarga do organu nadzorczego",
      blocks: [
        {
          type: "p",
          text: "Jeśli uważasz, że przetwarzamy Twoje dane niezgodnie z prawem, masz prawo wnieść skargę do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych ({link}).",
          link: { label: "uodo.gov.pl", href: "https://uodo.gov.pl", external: true },
        },
      ],
    },
    {
      id: "dobrowolnosc",
      heading: "Dobrowolność podania danych",
      blocks: [
        {
          type: "p",
          text: "Podanie danych jest dobrowolne, ale niezbędne do udzielenia odpowiedzi na zapytanie. Bez podania danych kontaktowych nie będziemy w stanie się z Tobą skontaktować.",
        },
      ],
    },
    {
      id: "profilowanie",
      heading: "Brak profilowania i decyzji automatycznych",
      blocks: [
        {
          type: "p",
          text: "Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym profilowaniu. Nie tworzymy profili użytkowników ani nie prowadzimy śledzenia w celach reklamowych.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "Pliki cookies",
      blocks: [
        {
          type: "p",
          text: "Nasza strona obecnie nie zapisuje w Twojej przeglądarce plików cookies analitycznych ani marketingowych. Szczegóły znajdziesz w {link}.",
          link: { label: "Polityce cookies", href: "/polityka-cookies" },
        },
      ],
    },
    {
      id: "zmiany",
      heading: "Zmiany polityki",
      blocks: [
        {
          type: "p",
          text: "Politykę możemy aktualizować, np. gdy zmienią się wykorzystywane narzędzia lub przepisy. Aktualna wersja jest zawsze dostępna na tej stronie, a datę ostatniej aktualizacji podajemy na jej górze.",
        },
      ],
    },
  ],
};

const en: LegalDoc = {
  meta: {
    title: "Privacy Policy | Wertus Digital",
    description:
      "How Wertus Digital processes personal data submitted through the contact form and in correspondence. No analytics, marketing cookies or profiling.",
  },
  eyebrow: "LEGAL",
  title: "Privacy Policy",
  updatedLabel: "Last updated",
  updated: "2 September 2026",
  intro: [
    "This policy explains what personal data we collect through the Wertus Digital website, why and on what basis we process it, and what rights you have. We try to keep it plain and specific.",
    "The website is informational. We do not run user accounts, registration, a newsletter or e-mail marketing.",
  ],
  contactPanel: {
    label: "DATA CONTROLLER",
    rows: [
      { label: "Controller", value: "Kacper Niedzielko, operating under the Wertus Digital brand" },
      { label: "Location", value: "Białystok, Poland" },
      {
        label: "E-mail",
        value: "wertusdigital@gmail.com",
        href: "mailto:wertusdigital@gmail.com",
      },
      { label: "Phone", value: "+48 516 950 801", href: "tel:+48516950801" },
    ],
  },
  sections: [
    {
      id: "controller",
      heading: "Controller and contact",
      blocks: [
        {
          type: "p",
          text: "The controller of your personal data is Kacper Niedzielko, operating under the Wertus Digital brand, based in Białystok, Poland. For any data-protection matter you can reach us at wertusdigital@gmail.com or by phone: +48 516 950 801.",
        },
        {
          type: "p",
          text: "We have not appointed a Data Protection Officer — for privacy matters, please contact the controller directly.",
        },
      ],
    },
    {
      id: "data",
      heading: "What data we collect",
      blocks: [
        {
          type: "p",
          text: "We only collect data you provide yourself — through the contact form or by contacting us directly. Via the form you may provide:",
        },
        {
          type: "ul",
          items: [
            "your name,",
            "e-mail address,",
            "company name,",
            "the selected type of service and — optionally — an approximate budget,",
            "the message content and anything else you choose to include (e.g. a phone number, if you add one).",
          ],
        },
        {
          type: "p",
          text: "We do not ask for special-category data and do not collect anything that isn't needed to answer your enquiry.",
        },
      ],
    },
    {
      id: "purposes",
      heading: "Purposes and legal bases",
      blocks: [
        {
          type: "p",
          text: "We process the form and correspondence data for the following purposes:",
        },
        {
          type: "ul",
          items: [
            "to answer your enquiry and carry on the correspondence — based on our legitimate interest in handling contact (Art. 6(1)(f) GDPR);",
            "to take steps towards concluding and performing a contract, where your enquiry concerns that — based on Art. 6(1)(b) GDPR;",
            "to establish, exercise or defend possible claims — based on our legitimate interest (Art. 6(1)(f) GDPR).",
          ],
        },
      ],
    },
    {
      id: "form",
      heading: "Contact form",
      blocks: [
        {
          type: "p",
          text: "The form is used solely to send an enquiry and to contact you about potential collaboration. Submitted data reaches us as an e-mail message.",
        },
        {
          type: "p",
          text: "The form contains: name, e-mail, company, type of service, budget (optional) and the message. There is no mandatory marketing consent and no newsletter sign-up, because we don't run those.",
        },
        {
          type: "p",
          text: "We use a simple technical anti-spam measure (a honeypot field). It is not used for tracking or profiling.",
        },
      ],
    },
    {
      id: "correspondence",
      heading: "E-mail and phone contact",
      blocks: [
        {
          type: "p",
          text: "If you contact us directly — by e-mail or phone — we process the data you provide (e.g. e-mail address, phone number, message content) to handle the contact and reply.",
        },
      ],
    },
    {
      id: "logs",
      heading: "Technical data and logs",
      blocks: [
        {
          type: "p",
          text: "The website itself uses no analytics or advertising tools and sets no cookies in your browser (see the Cookie Policy).",
        },
        {
          type: "p",
          text: "The site is, however, served through an external hosting provider. As with most internet services, the provider's infrastructure may record standard technical data in server logs (e.g. IP address, browser information, date and time of the request) to deliver the site and keep it secure and stable. We do not use this data to identify users or for marketing.",
        },
      ],
    },
    {
      id: "recipients",
      heading: "Who we share data with",
      blocks: [
        {
          type: "p",
          text: "We use trusted providers that process data only on our behalf and only as needed to deliver their services:",
        },
        {
          type: "ul",
          items: [
            "Vercel Inc. — the hosting provider whose infrastructure runs the site;",
            "e-mail providers (currently Google — Gmail), through which form messages and correspondence are sent, received and stored.",
          ],
        },
        {
          type: "p",
          text: "We do not sell your data and do not share it for marketing purposes.",
        },
      ],
    },
    {
      id: "eea",
      heading: "Transfers outside the EEA",
      blocks: [
        {
          type: "p",
          text: "Some of the above providers (Vercel, Google) are based in the United States, which may involve transferring data outside the European Economic Area. This is done using the safeguards provided for by the GDPR — in particular Standard Contractual Clauses and the EU–US Data Privacy Framework.",
        },
      ],
    },
    {
      id: "retention",
      heading: "How long we keep data",
      blocks: [
        {
          type: "p",
          text: "Data related to an ordinary enquiry is kept for as long as needed to handle the contact, and then for a maximum of 12 months from the end of the correspondence. We keep data longer only where:",
        },
        {
          type: "ul",
          items: [
            "a collaboration begins — then for its duration and the period required afterwards;",
            "it is necessary to establish, exercise or defend claims;",
            "a longer retention period is required by law.",
          ],
        },
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      blocks: [
        { type: "p", text: "In connection with the processing you have the right to:" },
        {
          type: "ul",
          items: [
            "access your data and obtain a copy,",
            "rectify (correct) your data,",
            "erase your data,",
            "restrict processing,",
            "object to processing based on legitimate interest,",
            "data portability — to the extent it applies.",
          ],
        },
        {
          type: "p",
          text: "To exercise these rights, write to us at wertusdigital@gmail.com.",
        },
      ],
    },
    {
      id: "complaint",
      heading: "Right to lodge a complaint",
      blocks: [
        {
          type: "p",
          text: "If you believe we process your data unlawfully, you have the right to lodge a complaint with the supervisory authority — in Poland, the President of the Personal Data Protection Office ({link}).",
          link: { label: "uodo.gov.pl", href: "https://uodo.gov.pl", external: true },
        },
      ],
    },
    {
      id: "voluntary",
      heading: "Providing data is voluntary",
      blocks: [
        {
          type: "p",
          text: "Providing your data is voluntary but necessary to answer your enquiry. Without contact details we won't be able to get back to you.",
        },
      ],
    },
    {
      id: "profiling",
      heading: "No profiling or automated decisions",
      blocks: [
        {
          type: "p",
          text: "We do not make decisions about you based solely on automated processing, including profiling. We do not build user profiles or track people for advertising.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "Cookies",
      blocks: [
        {
          type: "p",
          text: "Our website currently sets no analytics or marketing cookies in your browser. You'll find details in the {link}.",
          link: { label: "Cookie Policy", href: "/en/cookies" },
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We may update this policy, e.g. when the tools we use or the law change. The current version is always available on this page, with the date of the last update shown at the top.",
        },
      ],
    },
  ],
};

export const privacy: Record<Locale, LegalDoc> = { pl, en };
