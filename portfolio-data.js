/* ============================================================
   Wertus Digital — CENTRALNE ŹRÓDŁO DANYCH PORTFOLIO
   ------------------------------------------------------------
   To jedyne miejsce, w którym opisujemy realizacje.
   Na jego podstawie budują się:
     • sekcja realizacji na stronie głównej (index.html),
     • lista realizacji na /realizacje,
     • galerie w lightboxie (script.js).

   JAK TO DZIAŁA
   • Projekt z  isPublished: false  NIE pojawia się nigdzie publicznie.
   • Projekt z  isPublished: true   pojawia się automatycznie na liście.
   • Gdy nie ma żadnego opublikowanego projektu, na stronie głównej i na
     /realizacje wyświetla się profesjonalna sekcja "portfolio w aktualizacji"
     (statyczny HTML — działa też bez JavaScriptu).

   Pełna instrukcja dodawania projektów: PORTFOLIO-GUIDE.md

   STRUKTURA POJEDYNCZEGO WPISU
   {
     title, slug, category,
     projectType: "concept" | "client",
     shortDescription, fullDescription,
     services: [],
     year,
     coverImage, coverAlt,
     gallery: [ { file, alt: { pl, en } } ],   // pliki z katalogu path
     galleryPath,                               // katalog ze zrzutami
     liveUrl,                                    // "" jeśli brak
     testimonial: null | { text, author },      // TYLKO prawdziwa opinia
     featured,                                   // duża prezentacja na liście
     isPublished,                                // true = widoczny publicznie
     seoTitle, seoDescription
   }
   ============================================================ */

window.WERTUS_PORTFOLIO = [
  {
    title: "Lex Finanse",
    slug: "lex-finanse",
    category: "Doradztwo finansowe",
    projectType: "concept",
    shortDescription:
      "Uporządkowany serwis, który poważnie i przejrzyście przedstawia ofertę finansową i prowadzi klienta prosto do kontaktu.",
    fullDescription:
      "Koncepcyjny projekt strony dla marki z branży finansowej. Założeniem było stworzenie serwisu, który wygląda poważnie i wzbudza zaufanie, a jednocześnie pozostaje czytelny dla klienta nieznającego finansowej terminologii.",
    services: [
      "Projekt UX/UI",
      "Strona responsywna",
      "Prezentacja usług",
      "Formularz kontaktowy",
      "Sekcja FAQ",
      "Optymalizacja podstaw technicznych"
    ],
    year: "2026",
    coverImage: "/assets/portfolio/lex-finanse/lex-01.png",
    coverAlt: "Projekt strony internetowej Lex Finanse — strona główna",
    galleryPath: "/assets/portfolio/lex-finanse/",
    gallery: [
      { file: "lex-01.png", alt: { pl: "Projekt strony internetowej Lex Finanse – strona główna", en: "Lex Finanse website design – homepage" } },
      { file: "lex-02.png", alt: { pl: "Projekt strony Lex Finanse – sekcja usług", en: "Lex Finanse website design – services section" } },
      { file: "lex-03.png", alt: { pl: "Projekt strony Lex Finanse – sekcja Dlaczego my", en: "Lex Finanse website design – Why us section" } },
      { file: "lex-04.png", alt: { pl: "Projekt strony Lex Finanse – opinie klientów", en: "Lex Finanse website design – client testimonials" } },
      { file: "lex-05.png", alt: { pl: "Projekt strony Lex Finanse – sekcja FAQ", en: "Lex Finanse website design – FAQ section" } },
      { file: "lex-06.png", alt: { pl: "Projekt strony Lex Finanse – sekcja kontaktu", en: "Lex Finanse website design – contact section" } }
    ],
    liveUrl: "",
    testimonial: null,
    featured: true,
    isPublished: false,
    seoTitle: "Lex Finanse — projekt strony dla branży finansowej | Wertus Digital",
    seoDescription:
      "Case study Lex Finanse — koncepcyjny projekt strony internetowej dla marki z branży finansowej. Prezentacja usług, sekcja FAQ i prosta droga do kontaktu."
  },
  {
    title: "Miso Sushi",
    slug: "miso-sushi",
    category: "Restauracja",
    projectType: "concept",
    shortDescription:
      "Apetyczna prezentacja menu i klimatu lokalu z prostą drogą do rezerwacji.",
    fullDescription:
      "Koncepcyjny projekt strony restauracji skupiony na prezentacji menu, zdjęciach potraw i klimacie lokalu, z czytelnym kontaktem i rezerwacją.",
    services: [
      "Projekt UX/UI",
      "Strona responsywna",
      "Prezentacja menu",
      "Galeria zdjęć",
      "Sekcja rezerwacji"
    ],
    year: "2026",
    coverImage: "/assets/portfolio/miso-sushi/miso-01.png",
    coverAlt: "Projekt strony internetowej Miso Sushi — strona główna restauracji",
    galleryPath: "/assets/portfolio/miso-sushi/",
    gallery: [
      { file: "miso-01.png", alt: { pl: "Projekt strony internetowej Miso Sushi – strona główna", en: "Miso Sushi website design – homepage" } },
      { file: "miso-02.png", alt: { pl: "Projekt strony internetowej Miso Sushi – sekcja menu restauracji", en: "Miso Sushi website design – restaurant menu section" } },
      { file: "miso-03.png", alt: { pl: "Projekt strony internetowej Miso Sushi – sekcja o restauracji i galeria", en: "Miso Sushi website design – about section and photo gallery" } },
      { file: "miso-04.png", alt: { pl: "Projekt strony internetowej Miso Sushi – opinie gości i sekcja rezerwacji", en: "Miso Sushi website design – guest reviews and booking section" } }
    ],
    liveUrl: "",
    testimonial: null,
    featured: false,
    isPublished: false,
    seoTitle: "Miso Sushi — projekt strony restauracji | Wertus Digital",
    seoDescription:
      "Case study Miso Sushi — koncepcyjny projekt strony internetowej dla restauracji. Prezentacja menu, galeria potraw i prosta droga do rezerwacji."
  },
  {
    title: "Monaco Performance",
    slug: "monaco-performance",
    category: "Motoryzacja / performance",
    projectType: "concept",
    shortDescription:
      "Dynamiczny kierunek graficzny dla studia tuningu i osiągów samochodów.",
    fullDescription:
      "Koncepcyjny kierunek graficzny dla studia zajmującego się tuningiem i osiągami — mocny kontrast i wyraźne wezwania do kontaktu.",
    services: [
      "Kierunek graficzny",
      "Projekt UX/UI",
      "Strona responsywna",
      "Sekcje ofertowe"
    ],
    year: "2026",
    coverImage: "",
    coverAlt: "Projekt strony internetowej Monaco Performance",
    galleryPath: "",
    gallery: [],
    liveUrl: "",
    testimonial: null,
    featured: false,
    isPublished: false,
    seoTitle: "Monaco Performance — projekt strony dla branży motoryzacyjnej | Wertus Digital",
    seoDescription:
      "Case study Monaco Performance — koncepcyjny projekt strony internetowej dla studia tuningu i osiągów samochodów."
  }
];

/* Pomocnicze funkcje — używane przez script.js.
   Trzymane tutaj, żeby cała logika portfolio była w jednym pliku. */
window.WERTUS_PORTFOLIO_HELPERS = {
  published: function () {
    return window.WERTUS_PORTFOLIO.filter(function (p) {
      return p.isPublished === true;
    });
  },
  bySlug: function (slug) {
    return window.WERTUS_PORTFOLIO.find(function (p) {
      return p.slug === slug;
    }) || null;
  }
};
