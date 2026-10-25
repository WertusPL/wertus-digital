import type { Dictionary } from "./types";

export const pl: Dictionary = {
  nav: {
    services: "Oferta",
    work: "Realizacje",
    studio: "O studiu",
    contact: "Kontakt",
    cta: "Rozpocznij projekt",
    languageLabel: "Wybór języka",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    primaryNav: "Nawigacja główna",
    skipToContent: "Przejdź do treści",
  },
  navMegaMenu: {
    label: "Usługi",
    panelLabel: "Menu usług",
    allServices: "Zobacz pełną ofertę",
    detailsCta: "Poznaj szczegóły",
    items: [
      {
        key: "websites",
        index: "01",
        title: "Strony internetowe",
        subtitle: "Projekt i wdrożenie kompleksowych stron firmowych.",
        previewTitle: "Strony internetowe",
        previewText:
          "Projektujemy i wdrażamy strony firmowe — od struktury i UI po development i uruchomienie.",
        microLabels: ["UX", "UI", "RESPONSIVE", "DEVELOPMENT"],
      },
      {
        key: "landing",
        index: "02",
        title: "Landing Page",
        subtitle: "Skupiona komunikacja wokół jednego celu.",
        previewTitle: "Landing Page",
        previewText:
          "Jedna dopracowana strona prowadząca użytkownika od wejścia do konkretnego działania.",
        microLabels: ["ONE PAGE", "FOCUSED", "CTA"],
      },
      {
        key: "cms",
        index: "03",
        title: "CMS",
        subtitle: "Treści, które możesz aktualizować bez edycji kodu.",
        previewTitle: "CMS",
        previewText:
          "Wygodna edycja wybranych treści z podglądem — bez ingerowania w kod strony.",
        microLabels: ["EDITABLE", "STRUCTURED", "PUBLISH"],
      },
      {
        key: "care",
        index: "04",
        title: "Opieka i rozwój",
        subtitle: "Wsparcie, aktualizacje i dalszy rozwój po wdrożeniu.",
        previewTitle: "Opieka i rozwój",
        previewText:
          "Aktualizacje, optymalizacja i dalszy rozwój strony już po jej uruchomieniu.",
        microLabels: ["MAINTAIN", "UPDATE", "IMPROVE"],
      },
    ],
  },
  hero: {
    headline: [
      [{ text: "Strona, po której klient" }],
      [{ text: "od razu wie, że trafił" }],
      [{ text: "do " }, { text: "właściwej", accent: true }, { text: " firmy." }],
    ],
    description:
      "Projektujemy i wdrażamy strony internetowe dla firm — takie, które jasno prezentują ofertę, budują zaufanie i ułatwiają klientom kontakt.",
    primaryCta: "Rozpocznij projekt",
    secondaryCta: "Zobacz realizacje",
    factsLabel: "W skrócie",
    facts: [
      { label: "Zakres", value: "Projekt, wdrożenie, SEO i CMS" },
      { label: "Studio", value: "Białystok, Polska" },
      { label: "Pierwszy krok", value: "Bezpłatna rozmowa i wycena" },
      { label: "Realizacja", value: "Lech-Bud, branża budowlana" },
    ],
  },
  studio: {
    kicker: "STUDIO",
    headline: ["Design, technologia", "i strategia w jednym miejscu."],
    description:
      "Wertus Digital to studio z Białegostoku, które zajmuje się projektowaniem i tworzeniem stron internetowych — łącząc dopracowany design, solidne wdrożenie i konkretny cel biznesowy.",
    aboutCta: "Poznaj studio",
    pillars: [
      {
        eyebrow: "DESIGN",
        headline: "Dopracowany kierunek wizualny",
        description:
          "Projektujemy strony dopasowane do charakteru marki, zamiast dopasowywać markę do gotowego szablonu.",
      },
      {
        eyebrow: "DEVELOPMENT",
        headline: "Solidne i nowoczesne wdrożenie",
        description:
          "Tworzymy szybkie, responsywne i łatwe w dalszym rozwoju strony oparte na nowoczesnych technologiach.",
      },
      {
        eyebrow: "GROWTH",
        headline: "Strona, która wspiera biznes",
        description:
          "Projektujemy z myślą o czytelności, zaufaniu i działaniach, które użytkownik ma wykonać.",
      },
    ],
  },
  work: {
    kicker: "REALIZACJE",
    headline: ["Strony zaprojektowane", "i wdrożone przez nas."],
    description:
      "Od struktury i projektu graficznego po wdrożenie — zobacz, jak wygląda to w praktyce.",
    sectorLabel: "Branża",
    scopeLabel: "Zakres",
    cta: "Zobacz case study",
    projects: {
      lechbud: {
        sector: "Budownictwo",
        summary:
          "Wielostronicowa strona dla firmy budowlanej z Białegostoku: oferta usług, galeria realizacji z filtrowaniem i formularz zapytania.",
        scope: ["Projekt graficzny", "Wdrożenie", "Wersja mobilna", "Formularz kontaktowy", "SEO"],
      },
      // Not published yet — requires the client's consent (see projects.ts).
      "pracownia-s": {
        sector: "Florystyka",
        summary:
          "Strona pracowni florystycznej z Białegostoku: oferta ślubna i okolicznościowa, realizacje i formularz kontaktowy.",
        scope: [
          "Projekt graficzny",
          "Wdrożenie",
          "CMS Sanity",
          "Formularz kontaktowy z Turnstile",
          "SEO i opieka",
          "Konfiguracja domeny i Cloudflare Pages",
        ],
      },
    },
  },
  services: {
    kicker: "USŁUGI",
    headline: [
      "Usługi, które pomagają",
      "firmom wyglądać i działać lepiej online.",
    ],
    description:
      "Od pierwszej koncepcji po rozwój gotowej strony — dobieramy zakres do realnych potrzeb firmy.",
    cta: "Dowiedz się więcej",
    items: [
      {
        id: "web-design",
        index: "01",
        name: "PROJEKT GRAFICZNY",
        title: "Wygląd, który pasuje do Twojej firmy",
        description:
          "Projektujemy stronę od podstaw pod Twoją branżę i klientów — tak, żeby od razu było jasne, co oferujesz i jak się z Tobą skontaktować.",
        benefits: [
          "Projekt od podstaw, bez szablonu",
          "Czytelna oferta",
          "Wygodna wersja na telefon",
          "Spójność z marką",
        ],
      },
      {
        id: "development",
        index: "02",
        name: "WDROŻENIE",
        title: "Strona, która działa szybko i bez problemów",
        description:
          "Zamieniamy projekt w szybką, stabilną stronę, która dobrze działa na każdym urządzeniu i jest przygotowana pod wyszukiwarki.",
        benefits: [
          "Szybkie ładowanie",
          "Działa na każdym urządzeniu",
          "Przygotowana pod Google",
          "Łatwa do rozbudowy",
        ],
      },
      {
        id: "cms",
        index: "03",
        name: "EDYCJA TREŚCI (CMS)",
        title: "Sam zmieniasz treści, bez programisty",
        description:
          "Teksty, zdjęcia i realizacje aktualizujesz w prostym panelu — bez znajomości kodu i bez czekania na zmiany.",
        benefits: [
          "Prosty panel edycji",
          "Zmiany bez programisty",
          "Rozbudowa bez przebudowy strony",
          "Uporządkowane treści",
        ],
      },
      {
        id: "care",
        index: "04",
        name: "OPIEKA I ROZWÓJ",
        title: "Strona, która rozwija się razem z firmą",
        description:
          "Po starcie dbamy o aktualizacje i drobne zmiany, a stronę rozwijamy, gdy pojawiają się nowe potrzeby firmy.",
        benefits: [
          "Aktualizacje",
          "Drobne zmiany na bieżąco",
          "Optymalizacja",
          "Stałe wsparcie",
        ],
      },
    ],
  },
  process: {
    label: "PROCES",
    heading: ["Od pierwszej rozmowy", "do gotowej strony."],
    description:
      "Pięć jasnych etapów — na każdym wiesz, co dzieje się z projektem i co będzie dalej.",
    steps: [
      {
        id: "discovery",
        title: "Rozmowa",
        description:
          "Poznajemy Twoją firmę, klientów i cel strony. Wstępna rozmowa i wycena są bezpłatne.",
      },
      {
        id: "direction",
        title: "Struktura",
        description:
          "Ustalamy, jakie podstrony i treści są potrzebne oraz jak poprowadzić klienta do kontaktu.",
      },
      {
        id: "design",
        title: "Projekt",
        description:
          "Projektujemy wygląd strony na komputer i telefon, dopracowując każdy kluczowy ekran.",
      },
      {
        id: "development",
        title: "Wdrożenie",
        description:
          "Budujemy szybką, stabilną stronę przygotowaną pod wyszukiwarki.",
      },
      {
        id: "launch",
        title: "Start",
        description:
          "Testujemy, uruchamiamy stronę i pokazujemy, jak z niej korzystać na co dzień.",
      },
    ],
  },
  pricing: {
    label: "WYCENA",
    heading: "Ile kosztuje dobra strona?",
    statement: "To zależy od tego, czego ma dokonać.",
    description:
      "Zakres strony może być bardzo różny — od prostego landing page po rozbudowany serwis z CMS i dodatkowymi funkcjami. Dlatego podajemy ceny startowe, a dokładną wycenę przygotowujemy po poznaniu projektu.",
    microcopy: "Wstępna rozmowa i wycena są bezpłatne.",
    cta: "Poproś o wycenę",
    secondaryCta: "Zobacz pełną ofertę",
    factors:
      "Na wycenę wpływają m.in. zakres, liczba podstron, CMS, wersje językowe, integracje i funkcje niestandardowe.",
    tiers: [
      {
        id: "landing",
        name: "Landing page",
        price: "od 1200 zł",
        description:
          "Jedna dopracowana strona skupiona na konkretnej usłudze, kampanii lub ofercie.",
      },
      {
        id: "business",
        name: "Strona firmowa",
        price: "od 2500 zł",
        description:
          "Kompletna strona dla firmy, która chce profesjonalnie prezentować swoją markę i ofertę.",
      },
      {
        id: "advanced",
        name: "Rozbudowana strona",
        price: "od 4000 zł",
        description:
          "Większy serwis z bardziej rozbudowaną strukturą, CMS, integracjami lub niestandardowymi funkcjami.",
      },
      {
        id: "care",
        name: "Opieka i rozwój",
        price: "od 249 zł / mies.",
        description:
          "Aktualizacje, drobne zmiany, optymalizacja i dalszy rozwój strony po wdrożeniu.",
      },
    ],
  },
  faq: {
    label: "FAQ",
    heading: "Najczęstsze pytania.",
    description:
      "Krótko odpowiadamy na rzeczy, które zwykle warto wiedzieć przed rozpoczęciem projektu.",
    items: [
      {
        id: "timeline",
        question: "Ile trwa wykonanie strony?",
        answer:
          "To zależy od zakresu projektu. Prostszy landing page może być gotowy szybciej, a bardziej rozbudowana strona z CMS i dodatkowymi funkcjami wymaga więcej czasu. Dokładny harmonogram ustalamy przed rozpoczęciem prac.",
      },
      {
        id: "editing",
        question: "Czy będę mógł samodzielnie edytować treści?",
        answer:
          "Tak. Jeśli projekt wykorzystuje CMS, konfigurujemy go tak, aby można było wygodnie edytować wybrane treści bez znajomości kodu.",
      },
      {
        id: "hosting",
        question: "Czy pomagacie z domeną i hostingiem?",
        answer:
          "Tak. Możemy pomóc w wyborze odpowiedniego hostingu i konfiguracji domeny, a także przeprowadzić wdrożenie strony na docelowym środowisku.",
      },
      {
        id: "changes",
        question: "Co jeśli będę potrzebować zmian po wdrożeniu?",
        answer:
          "Po uruchomieniu strony możemy dalej ją rozwijać, aktualizować i wprowadzać drobne zmiany w ramach usługi opieki i rozwoju.",
      },
      {
        id: "languages",
        question: "Czy tworzycie strony w kilku językach?",
        answer:
          "Tak. Możemy przygotować wielojęzyczną wersję strony i zadbać o poprawną strukturę językową, routing oraz podstawy SEO dla poszczególnych wersji.",
      },
      {
        id: "payment",
        question: "Jak wygląda płatność za projekt?",
        answer:
          "Warunki płatności ustalamy przed rozpoczęciem projektu i zapisujemy je w uzgodnionym zakresie współpracy. Przy większych projektach płatność może być podzielona na etapy.",
      },
    ],
  },
  contactCta: {
    label: "KONTAKT",
    heading: ["Masz projekt?", "Porozmawiajmy."],
    description:
      "Niezobowiązująca rozmowa to dobry pierwszy krok, żeby określić zakres, kierunek i możliwości projektu.",
    primaryCta: "Rozpocznij projekt",
    secondary: "Lub napisz do nas",
  },
  contactPage: {
    meta: {
      title: "Kontakt i bezpłatna wycena strony | Wertus Digital",
      description:
        "Opisz swój projekt, a przygotujemy bezpłatną wycenę strony internetowej. Napisz przez formularz, wyślij e-mail lub zadzwoń — studio z Białegostoku, współpraca w całej Polsce.",
    },
    hero: {
      label: "KONTAKT / START PROJEKTU",
      headingLead: "Opowiedz nam o swoim ",
      headingAccent: "projekcie.",
      description:
        "Napisz, czego potrzebujesz, a wrócimy z konkretną odpowiedzią i propozycją dalszych kroków.",
      microcopy: "Wstępna rozmowa i wycena są bezpłatne.",
      panelLabel: "DANE KONTAKTOWE",
      statusLabel: "STATUS",
      status: "Przyjmujemy nowe projekty",
    },
    details: {
      emailLabel: "E-mail",
      phoneLabel: "Telefon",
      locationLabel: "Lokalizacja",
      location: "Białystok / Polska",
    },
    form: {
      label: "FORMULARZ",
      heading: "Napisz do nas",
      optionalTag: "(opcjonalnie)",
      requiredHint: "Pola oznaczone gwiazdką (*) są wymagane.",
      fields: {
        name: "Imię i nazwisko",
        email: "E-mail",
        company: "Firma",
        service: "Czego potrzebujesz?",
        budget: "Budżet",
        message: "Opowiedz krótko o projekcie",
      },
      messagePlaceholder:
        "Czym zajmuje się firma, czego potrzebujesz i jaki efekt chcesz osiągnąć?",
      budgetPlaceholder: "Wybierz przedział",
      guide: {
        label: "PRZED WYSŁANIEM",
        intro: "Warto podać:",
        items: [
          "zakres strony",
          "cel projektu",
          "orientacyjny budżet",
          "termin, jeśli jest istotny",
          "czy potrzebny jest CMS",
          "czy strona ma być wielojęzyczna",
        ],
      },
      serviceOptions: [
        { value: "business", label: "Strona firmowa" },
        { value: "landing", label: "Landing Page" },
        { value: "cms", label: "CMS / rozbudowa" },
        { value: "care", label: "Opieka i rozwój" },
        { value: "other", label: "Inne" },
      ],
      budgetOptions: [
        { value: "lt-2500", label: "do 2 500 zł" },
        { value: "2500-4000", label: "2 500 – 4 000 zł" },
        { value: "4000-7000", label: "4 000 – 7 000 zł" },
        { value: "gt-7000", label: "powyżej 7 000 zł" },
        { value: "unsure", label: "jeszcze nie wiem" },
      ],
      privacy: {
        pre: "Wysyłając formularz, zgadzasz się na kontakt w sprawie swojego zapytania. Szczegóły znajdziesz w ",
        linkLabel: "Polityce prywatności",
        post: ".",
      },
      submit: "Wyślij zapytanie",
      submitting: "Wysyłanie…",
      success: {
        heading: "Dziękujemy. Wiadomość została wysłana.",
        body: "Odezwiemy się tak szybko, jak to możliwe.",
      },
      errorSend: {
        pre: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na ",
        post: ".",
      },
      errorRate:
        "Zbyt wiele prób wysłania w krótkim czasie. Odczekaj chwilę i spróbuj ponownie.",
      errors: {
        name: "Podaj imię i nazwisko.",
        email: "Podaj adres e-mail.",
        emailInvalid: "Podaj poprawny adres e-mail.",
        company: "Podaj nazwę firmy.",
        service: "Wybierz, czego potrzebujesz.",
        message: "Napisz kilka słów o projekcie.",
      },
    },
    nextSteps: {
      label: "JAK TO DZIAŁA",
      heading: "Co dzieje się dalej?",
      steps: [
        {
          index: "01",
          title: "Czytamy wiadomość",
          description:
            "Zapoznajemy się z projektem i przesłanymi informacjami.",
        },
        {
          index: "02",
          title: "Wracamy z odpowiedzią",
          description:
            "Dopytujemy o szczegóły, jeśli są potrzebne, i ustalamy zakres.",
        },
        {
          index: "03",
          title: "Przygotowujemy wycenę",
          description:
            "Po poznaniu projektu przedstawiamy proponowany zakres i koszt realizacji.",
        },
      ],
    },
    closing: {
      label: "KONTAKT BEZPOŚREDNI",
      heading: "Wolisz napisać bezpośrednio?",
      lead: "Odezwij się do nas na e-mail lub telefon —",
    },
  },
  servicesPage: {
    meta: {
      title: "Projektowanie stron internetowych dla firm | Wertus Digital",
      description:
        "Landing page od 1200 zł, strona firmowa od 2500 zł, rozbudowana strona od 4000 zł. Indywidualny projekt, wdrożenie i techniczne SEO, CMS zależnie od zakresu. Bezpłatna wycena.",
    },
    hero: {
      label: "OFERTA / PROJEKTOWANIE STRON INTERNETOWYCH",
      headingLine1: "Strona dopasowana",
      headingLine2Lead: "do ",
      headingAccent: "Twojego biznesu.",
      description:
        "Projektujemy i wdrażamy strony internetowe dla firm, dopasowane do marki, zakresu i celu, jaki strona ma realizować.",
      secondary:
        "Od prostego landing page po rozbudowany serwis z CMS i dalszym wsparciem po wdrożeniu.",
      primaryCta: "Poproś o wycenę",
      secondaryCta: "Zobacz zakres",
      visualTitle: "OD STRUKTURY DO STARTU",
      visualSteps: [
        { label: "STRUCTURE", caption: "Architektura i cele strony" },
        { label: "WIREFRAME", caption: "Układ treści i hierarchia" },
        { label: "UI", caption: "Kierunek wizualny i interfejs" },
        { label: "DEVELOPMENT", caption: "Kod, responsywność, CMS" },
        { label: "LIVE", caption: "Testy i uruchomienie" },
      ],
    },
    projectTypes: {
      label: "CO TWORZYMY",
      heading: ["Trzy zakresy.", "Jeden standard wykonania."],
      description:
        "To nie są sztuczne pakiety, tylko trzy rodzaje projektu. Zakres dobieramy do tego, co strona ma realizować — nie odwrotnie.",
      caseStudyCta: "Zobacz realizację Lech-Bud",
      bestForLabel: "Dla kogo",
      includesLabel: "W zakresie",
      previewLabels: { pages: "Podstrony", cms: "CMS", scope: "Charakter" },
      priceLabel: "Cena startowa",
      items: [
        {
          id: "landing",
          index: "01",
          name: "LANDING PAGE",
          headline: "Jedna strona. Jeden konkretny cel.",
          description:
            "Dopracowana strona typu one-page dla usługi, kampanii, produktu lub oferty, której zadaniem jest jasno przedstawić wartość i poprowadzić użytkownika do działania.",
          bestFor:
            "Dobra opcja, gdy potrzebujesz skupić komunikację wokół jednej konkretnej oferty.",
          includes: [
            "Indywidualny layout",
            "Responsive design",
            "Formularz kontaktowy / CTA",
            "Podstawy technicznego SEO",
            "Optymalizacja szybkości",
            "Wdrożenie",
          ],
          price: "od 1200 zł",
          pages: "Jedna strona",
          cms: "Zwykle niepotrzebny",
          scope: "Jedna oferta, jasny cel",
        },
        {
          id: "business",
          index: "02",
          name: "STRONA FIRMOWA",
          headline: "Pełna obecność firmy w sieci.",
          description:
            "Wielopodstronowa strona dla firmy, która potrzebuje profesjonalnie przedstawić markę, ofertę, sposób działania i ułatwić potencjalnym klientom kontakt.",
          bestFor:
            "Najczęstszy wybór dla firm, które chcą zbudować profesjonalny i wiarygodny wizerunek online.",
          includes: [
            "Architektura informacji",
            "Kilka podstron",
            "Web Design i Development",
            "Responsive design",
            "Formularze",
            "Techniczne SEO i performance",
            "CMS zależnie od zakresu",
          ],
          price: "od 2500 zł",
          pages: "Kilka podstron",
          cms: "Opcjonalny",
          scope: "Marka, oferta, kontakt",
        },
        {
          id: "advanced",
          index: "03",
          name: "ROZBUDOWANA STRONA",
          headline: "Więcej treści, funkcji i możliwości rozwoju.",
          description:
            "Większy serwis dla projektu wymagającego bardziej rozbudowanej struktury, CMS, wersji językowych, integracji lub indywidualnych funkcji.",
          bestFor:
            "Dla firm, których strona ma być czymś więcej niż prostą prezentacją oferty.",
          includes: [
            "Rozbudowana struktura",
            "CMS",
            "Wielojęzyczność",
            "Niestandardowe komponenty",
            "Integracje",
            "Większa liczba treści",
            "Dalsza rozbudowa",
          ],
          price: "od 4000 zł",
          pages: "Wiele podstron",
          cms: "W standardzie",
          scope: "Struktura, funkcje, rozwój",
        },
      ],
    },
    capabilities: {
      label: "ZAKRES",
      heading: ["Co składa się", "na dobrą stronę?"],
      description:
        "Każda realizacja opiera się na tych samych czterech filarach. Zakres każdego z nich dobieramy do konkretnego projektu.",
      scopeLabel: "Zakres",
      items: [
        {
          id: "web-design",
          index: "01",
          name: "WEB DESIGN",
          headline: "Projekt dopasowany do marki",
          description:
            "Zaczynamy od struktury i kierunku wizualnego. Projektujemy interfejs, hierarchię treści, typografię i zachowanie strony na różnych urządzeniach.",
          scope: [
            "Struktura",
            "UX",
            "UI",
            "Typografia",
            "Responsive design",
            "Komponenty",
            "CTA i hierarchia treści",
          ],
        },
        {
          id: "development",
          index: "02",
          name: "DEVELOPMENT",
          headline: "Projekt zamieniony w działający produkt",
          description:
            "Przenosimy projekt do kodu, dbając o szybkość, responsywność, stabilność oraz możliwość dalszego rozwoju strony.",
          note: "Dobieramy technologię do projektu; obecny stack Wertus wykorzystuje m.in. Next.js, React i TypeScript.",
          scope: [
            "Responsywność",
            "Performance",
            "Semantyczny HTML",
            "Accessibility foundations",
            "Techniczne SEO",
          ],
        },
        {
          id: "cms",
          index: "03",
          name: "CMS",
          headline: "Treści pod Twoją kontrolą",
          description:
            "Jeśli projekt tego wymaga, integrujemy CMS pozwalający wygodnie aktualizować wybrane treści bez ingerowania w kod strony.",
          note: "CMS nie jest domyślną częścią każdego projektu — dołączamy go tam, gdzie realnie się przydaje. Wertus korzysta obecnie m.in. z Sanity.",
          scope: [
            "Edycja treści",
            "Struktura danych",
            "Media",
            "Wybrane sekcje strony",
            "Uprawnienia zależne od projektu",
          ],
        },
        {
          id: "care",
          index: "04",
          name: "CARE & GROWTH",
          headline: "Strona nie musi kończyć się na wdrożeniu",
          description:
            "Po publikacji możemy dalej opiekować się stroną, aktualizować ją, wprowadzać drobne zmiany i rozwijać wraz z potrzebami firmy.",
          scope: [
            "Aktualizacje",
            "Drobne zmiany",
            "Optymalizacja",
            "Rozwój",
            "Pomoc techniczna",
          ],
          price: "od 249 zł / mies.",
        },
      ],
    },
    deliverables: {
      label: "CO OTRZYMUJESZ",
      heading: ["Projekt od początku", "do uruchomienia."],
      note: "Dokładny zakres zależy od projektu — nie każdy element jest potrzebny w najprostszym landing page.",
      pipeline: ["Brief", "Struktura", "Design", "Kod", "Testy", "Start"],
      items: [
        { index: "01", title: "Analiza potrzeb" },
        { index: "02", title: "Struktura strony" },
        { index: "03", title: "Kierunek wizualny" },
        { index: "04", title: "Projekt UI/UX" },
        { index: "05", title: "Responsive development" },
        { index: "06", title: "Formularze i CTA" },
        { index: "07", title: "Podstawy SEO technicznego" },
        { index: "08", title: "Testy" },
        { index: "09", title: "Wdrożenie" },
        { index: "10", title: "Przekazanie strony" },
      ],
    },
    scopeSelector: {
      label: "JAK DOBIERAMY ZAKRES",
      heading: ["Nie każda firma", "potrzebuje tego samego."],
      description:
        "Zakres projektu dobieramy do celu strony, ilości treści i funkcji, które rzeczywiście są potrzebne. Zaznacz cel, a podpowiemy najbliższy zakres.",
      goalLabel: "Cel",
      options: [
        {
          id: "one-offer",
          label: "Jedna konkretna oferta",
          result: "Landing Page",
          price: "od 1200 zł",
        },
        {
          id: "full-company",
          label: "Pełna prezentacja firmy",
          result: "Strona firmowa",
          price: "od 2500 zł",
        },
        {
          id: "larger",
          label: "Większy serwis / wiele funkcji",
          result: "Rozbudowana strona",
          price: "od 4000 zł",
        },
      ],
      resultLead: "Najbardziej zbliżony zakres",
      cta: "Omów projekt",
      disclaimer:
        "To nie jest automatyczna wycena — jedynie wskazówka, od czego zacząć. Dokładny zakres ustalamy po rozmowie.",
    },
    pricing: {
      label: "CENY STARTOWE",
      heading: ["Punkt wyjścia", "do wyceny."],
      note: "Każdy projekt wyceniamy indywidualnie po poznaniu zakresu.",
      cta: "Poproś o dokładną wycenę",
      rows: [
        { name: "Landing Page", price: "od 1200 zł" },
        { name: "Strona firmowa", price: "od 2500 zł" },
        { name: "Rozbudowana strona", price: "od 4000 zł" },
        { name: "Opieka i rozwój", price: "od 249 zł / mies." },
      ],
      factorsLabel: "Co wpływa na cenę",
      factors: [
        "Liczba podstron",
        "CMS",
        "Wersje językowe",
        "Integracje",
        "Funkcje",
        "Zakres treści",
      ],
      factorsNote:
        "Cena zależy przede wszystkim od zakresu, nie od wybranego „pakietu”.",
    },
    faq: {
      label: "FAQ OFERTY",
      heading: "Zanim zapytasz o wycenę.",
      items: [
        {
          id: "individual",
          question: "Czy każda strona jest projektowana indywidualnie?",
          answer:
            "Tak. Kierunek wizualny i struktura są dopasowywane do konkretnej firmy i zakresu projektu. Nie sprzedajemy jednej gotowej makiety zmienianej wyłącznie kolorami i tekstem.",
        },
        {
          id: "cms-included",
          question: "Czy CMS jest wliczony w każdą stronę?",
          answer:
            "Nie zawsze jest potrzebny. Jeśli firma chce samodzielnie aktualizować treści, możemy uwzględnić CMS w zakresie projektu.",
        },
        {
          id: "extra-features",
          question: "Czy mogę zamówić dodatkowe funkcje?",
          answer:
            "Tak. Integracje i niestandardowe funkcje wyceniamy na podstawie konkretnego zakresu.",
        },
        {
          id: "english-version",
          question: "Czy przygotujecie wersję angielską strony?",
          answer:
            "Tak. Możemy zbudować stronę wielojęzyczną z odpowiednim routingiem i strukturą SEO.",
        },
        {
          id: "no-obligation",
          question: "Czy mogę najpierw omówić projekt bez zobowiązań?",
          answer:
            "Tak. Wstępna rozmowa i przygotowanie wyceny są bezpłatne.",
        },
      ],
    },
    finalCta: {
      label: "START PROJEKTU",
      heading: ["Masz już pomysł", "na swoją stronę?"],
      description:
        "Opowiedz nam o nim, a pomożemy określić właściwy zakres.",
      primaryCta: "Rozpocznij projekt",
      secondary: "Lub napisz na",
    },
  },
  workPage: {
    meta: {
      title: "Realizacje — strony internetowe dla firm | Wertus Digital",
      description:
        "Zobacz, jak projektujemy i wdrażamy strony internetowe dla firm. Case study Lech-Bud: strona firmy budowlanej z Białegostoku z galerią realizacji i formularzem zapytania.",
    },
    hero: {
      label: "WYBRANE REALIZACJE",
      headingLead: "Strony tworzone z myślą o realnym ",
      headingAccent: "biznesie.",
      description:
        "Projektujemy i wdrażamy strony internetowe, które łączą dopracowaną warstwę wizualną z czytelną strukturą, responsywnością i solidnym wykonaniem technicznym.",
      countLabel: "01 PROJEKT",
      yearLabel: "2026",
    },
    caseStudy: {
      label: "CASE STUDY",
      name: "LECH-BUD",
      subtitle: "Strona internetowa dla firmy budowlanej",
      description:
        "Kompletna strona internetowa dla lokalnej firmy budowlanej Lech-Bud. Projekt obejmuje stronę główną, ofertę usług, galerię realizacji z filtrowaniem, sekcję o firmie oraz rozbudowany formularz kontaktowy. Całość zaprojektowaliśmy z naciskiem na czytelność oferty i wygodne korzystanie zarówno na desktopie, jak i na urządzeniach mobilnych.",
      metaLabel: "O PROJEKCIE",
      scopeLabel: "ZAKRES",
      scope: [
        "Projekt graficzny",
        "Wdrożenie",
        "Wersja mobilna",
        "Formularz kontaktowy",
        "SEO",
      ],
      sectorLabel: "BRANŻA",
      sector: "Budownictwo",
      mainCaption: "STRONA GŁÓWNA",
      mainAlt:
        "Strona główna serwisu Lech-Bud — sekcja hero z nagłówkiem o usługach budowlanych i wykończeniowych na tle domu jednorodzinnego.",
      galleryLabel: "PRZEGLĄD",
      shots: {
        worksDesktopLabel: "REALIZACJE — DESKTOP",
        worksDesktopAlt:
          "Podstrona realizacji Lech-Bud na desktopie — galeria zdjęć z filtrowaniem po rodzaju prac.",
        homeMobileLabel: "STRONA GŁÓWNA — MOBILE",
        homeMobileAlt:
          "Strona główna Lech-Bud w widoku mobilnym — hero i sekcja usług dopasowane do ekranu telefonu.",
        contactDesktopLabel: "KONTAKT — DESKTOP",
        contactDesktopAlt:
          "Podstrona kontaktu Lech-Bud na desktopie — dane kontaktowe obok formularza zapytania.",
        worksMobileLabel: "REALIZACJE — MOBILE",
        worksMobileAlt:
          "Podstrona realizacji Lech-Bud w widoku mobilnym — galeria z filtrami w układzie na telefon.",
      },
      solutionLabel: "ZAKRES WYKONANIA",
      solution: [
        {
          area: "Projekt graficzny",
          text: "Czytelna hierarchia informacji i identyfikacja dopasowana do branży budowlanej.",
        },
        {
          area: "Wdrożenie",
          text: "Responsywna implementacja wielostronicowego serwisu wraz z formularzem kontaktowym i galerią realizacji.",
        },
        {
          area: "Wersja mobilna",
          text: "Interfejs dostosowany do telefonów bez ograniczania funkcjonalności wersji desktopowej.",
        },
      ],
      liveCta: "Zobacz stronę na żywo",
      liveExternalHint: "otwiera się w nowej karcie",
    },
    more: {
      heading: "Kolejne realizacje już wkrótce.",
      description:
        "Portfolio Wertus Digital będzie rozwijane wraz z premierami kolejnych projektów.",
      servicesCta: "Zobacz ofertę i ceny startowe",
    },
    finalCta: {
      label: "KONTAKT",
      heading: ["Masz projekt", "do zrealizowania?"],
      description: "Porozmawiajmy o Twojej stronie i możliwym zakresie projektu.",
      primaryCta: "Rozpocznij projekt",
      secondary: "Lub napisz na",
    },
  },
  studioPage: {
    meta: {
      title: "O studiu — projektowanie stron w Białymstoku | Wertus Digital",
      description:
        "Wertus Digital to niezależne studio z Białegostoku. Projektujemy i wdrażamy strony internetowe dla firm z całej Polski, a zdalnie także dla klientów z zagranicy.",
    },
    hero: {
      label: "O STUDIU",
      headingLine1: "Małe studio.",
      headingLine2Lead: "Duża dbałość o ",
      headingAccent: "szczegóły.",
      lead: "Wertus Digital to niezależne studio webowe z Białegostoku. Projektujemy i wdrażamy strony internetowe dla firm, które potrzebują czegoś więcej niż gotowego szablonu.",
      leadSecondary:
        "Łączymy projektowanie, development i techniczne wdrożenie w jednym procesie — bez zbędnych pośredników i bez komplikowania współpracy.",
      metaLabel: "STUDIO",
      metaItems: [
        { label: "Model", value: "Niezależne studio webowe" },
        { label: "Lokalizacja", value: "Białystok / Polska" },
        { label: "Zasięg", value: "Polska i zdalnie za granicą" },
        { label: "Współpraca", value: "Zdalnie, bezpośrednio" },
      ],
    },
    approach: {
      index: "01",
      label: "PODEJŚCIE",
      heading: ["Strony jako narzędzia,", "nie tylko ładne ekrany."],
      lead: "Nie budujemy stron po to, żeby tylko dobrze wyglądały na pierwszym ekranie. Projektujemy je jako narzędzia dla realnych firm — czytelne, szybkie, responsywne i łatwe do rozwijania.",
      body: "Każdy projekt zaczynamy od zrozumienia biznesu, jego oferty i odbiorców. Dopiero później przechodzimy do designu i developmentu.",
      pointsLabel: "W SKRÓCIE",
      points: [
        "Najpierw zrozumienie biznesu, potem projekt.",
        "Czytelność i hierarchia ważniejsze niż ozdobniki.",
        "Strona gotowa na rozwój, nie tylko na start.",
      ],
    },
    difference: {
      index: "02",
      label: "CO NAS WYRÓŻNIA",
      heading: ["Bezpośrednio, konkretnie,", "bez gotowych szablonów."],
      items: [
        {
          index: "01",
          title: "Bezpośrednia współpraca",
          description:
            "Pracujesz bezpośrednio z osobami odpowiedzialnymi za projekt i wdrożenie — bez dodatkowych warstw pośredników.",
        },
        {
          index: "02",
          title: "Projekt dopasowany do firmy",
          description:
            "Nie składamy stron z gotowych szablonów. Layout, struktura i funkcjonalności wynikają z charakteru biznesu i jego celów.",
        },
        {
          index: "03",
          title: "Design i techniczne wykonanie",
          description:
            "Projektowanie i development traktujemy jako jeden proces. Dzięki temu rozwiązania są nie tylko estetyczne, ale również szybkie, responsywne i możliwe do dalszego rozwoju.",
        },
      ],
    },
    process: {
      index: "03",
      label: "JAK PRACUJEMY",
      heading: ["Cztery etapy,", "jeden przejrzysty proces."],
      description:
        "Od pierwszej rozmowy po dalszy rozwój — bez zbędnych formalności i niejasnych kroków.",
      steps: [
        {
          index: "01",
          title: "Poznajemy biznes",
          description:
            "Rozmawiamy o firmie, ofercie, odbiorcach i celu strony. Ustalamy zakres projektu oraz potrzebne funkcjonalności.",
        },
        {
          index: "02",
          title: "Projektujemy",
          description:
            "Budujemy strukturę i kierunek wizualny strony tak, aby komunikacja była czytelna, a projekt dopasowany do marki.",
        },
        {
          index: "03",
          title: "Wdrażamy",
          description:
            "Przekładamy projekt na responsywną, szybką i technicznie dopracowaną stronę internetową.",
        },
        {
          index: "04",
          title: "Rozwijamy",
          description:
            "Po wdrożeniu możemy dalej rozwijać stronę, dodawać nowe funkcje, treści i prowadzić opiekę techniczną.",
        },
      ],
    },
    capabilities: {
      index: "04",
      label: "ZAKRES",
      heading: ["Czym się", "zajmujemy."],
      items: [
        "Web Design",
        "Development",
        "Strony firmowe",
        "Landing pages",
        "E-commerce",
        "CMS",
        "Redesign",
        "Opieka i rozwój",
      ],
      servicesCta: "Zobacz ofertę",
      workCta: "Zobacz realizacje",
    },
    tech: {
      index: "05",
      label: "TECHNOLOGIA",
      heading: ["Technologia dobierana", "do projektu."],
      body: "Korzystamy z nowoczesnego stacku, ale technologia nie jest celem samym w sobie. Dobieramy rozwiązania tak, aby strona była szybka, stabilna i możliwa do dalszego rozwoju.",
      stackLabel: "STACK",
      stack: ["Next.js", "React", "TypeScript", "Sanity", "Vercel"],
    },
    location: {
      label: "WSPÓŁPRACA",
      place: "Białystok / Polska",
      body: "Pracujemy z firmami z całej Polski, a zdalnie także z klientami z zagranicy — bez zbędnych komplikacji.",
    },
    finalCta: {
      label: "KONTAKT",
      heading: ["Porozmawiajmy", "o Twoim projekcie."],
      description:
        "Opowiedz nam, czego potrzebujesz. Wrócimy z propozycją zakresu i kolejnych kroków.",
      primaryCta: "Rozpocznij projekt",
      secondary: "Lub napisz na",
    },
  },
  footer: {
    studioDescription:
      "Projektujemy strony internetowe, które łączą design, technologię i cel biznesowy.",
    menuLabel: "MENU",
    servicesLabel: "USŁUGI",
    contactLabel: "KONTAKT",
    socialLabel: "SOCIAL",
    services: ["Web Design", "Development", "CMS", "Opieka i rozwój"],
    location: "Białystok / Polska",
    privacy: "Polityka prywatności",
    cookies: "Cookies",
    copyright: "Wszelkie prawa zastrzeżone.",
  },
  meta: {
    title: "Tworzenie stron internetowych Białystok | Wertus Digital",
    description:
      "Wertus Digital to studio z Białegostoku. Projektujemy i tworzymy strony internetowe dla firm — indywidualny projekt, szybka i responsywna strona, techniczne SEO i CMS. Bezpłatna wycena.",
  },
};
