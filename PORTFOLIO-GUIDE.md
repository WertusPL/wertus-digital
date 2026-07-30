# Portfolio Wertus Digital — instrukcja dodawania realizacji

Krótki, praktyczny przewodnik. Całe portfolio opiera się na jednym pliku
z danymi, więc w większości przypadków wystarczy edytować **`portfolio-data.js`**.

---

## 1. Gdzie są dane projektów

Wszystkie realizacje opisujemy w jednym pliku:

```
portfolio-data.js   →   tablica window.WERTUS_PORTFOLIO
```

Na jego podstawie budują się automatycznie:

- sekcja realizacji na stronie głównej (`index.html`),
- lista realizacji na `/realizacje` (`realizacje.html`),
- galerie zdjęć w lightboxie (`script.js`).

Dopóki żaden projekt nie ma `isPublished: true`, na stronie głównej i na
`/realizacje` wyświetla się elegancka sekcja „portfolio w aktualizacji”
(statyczny HTML — działa też bez JavaScriptu). Gdy pojawi się choć jeden
opublikowany projekt, sekcja informacyjna znika, a w jej miejsce wchodzi
lista realizacji.

---

## 2. Gdzie dodać obrazy

Zrzuty projektu wgrywamy do:

```
assets/portfolio/<slug-projektu>/
```

Przykład: `assets/portfolio/lex-finanse/lex-01.png`

Zalecenia:
- format `.png` lub `.webp`, szerokość ok. 1600–1900 px,
- pierwszy plik to zdjęcie główne (okładka),
- nie rozciągamy zrzutów — zachowujemy naturalne proporcje.

---

## 3. Jak dodać nowy projekt

W `portfolio-data.js` dopisz nowy obiekt do tablicy `window.WERTUS_PORTFOLIO`:

```js
{
  title: "Nazwa Projektu",
  slug: "nazwa-projektu",
  category: "Branża",
  projectType: "concept",            // "concept" lub "client"
  shortDescription: "Jedno–dwa zdania na kartę na liście.",
  fullDescription: "Dłuższy opis na stronę case study.",
  services: ["Projekt UX/UI", "Wdrożenie", "SEO"],
  year: "2026",
  coverImage: "/assets/portfolio/nazwa-projektu/screen-01.png",
  coverAlt: "Projekt strony Nazwa Projektu — strona główna",
  galleryPath: "/assets/portfolio/nazwa-projektu/",
  gallery: [
    { file: "screen-01.png", alt: { pl: "…", en: "…" } },
    { file: "screen-02.png", alt: { pl: "…", en: "…" } }
  ],
  liveUrl: "",
  testimonial: null,
  featured: false,
  isPublished: false,                // ustaw true, gdy projekt ma być widoczny
  seoTitle: "Nazwa Projektu — … | Wertus Digital",
  seoDescription: "Krótki opis pod SEO."
}
```

Do tego utwórz podstronę case study (patrz punkt 13) pod adresem
`/realizacje/<slug>` oraz dodaj URL do `sitemap.xml` **dopiero po publikacji**.

---

## 4. Jak ustawić slug

`slug` to część adresu po `/realizacje/`. Zasady:

- małe litery, bez polskich znaków, spacje zamień na `-`,
- musi być zgodny z nazwą katalogu w `assets/portfolio/`,
- musi być zgodny z nazwą pliku podstrony w `realizacje/<slug>.html`.

Przykład: `Lex Finanse` → slug `lex-finanse` → `/realizacje/lex-finanse`.

---

## 5. Jak oznaczyć projekt koncepcyjny

```js
projectType: "concept"
```

Na liście wyświetli się etykieta **„Projekt koncepcyjny”**.
Dla projektów koncepcyjnych nie podajemy wyników sprzedaży, konwersji ani
pozycji w Google — opisujemy jedynie proces i decyzje projektowe.

---

## 6. Jak oznaczyć realizację dla klienta

```js
projectType: "client"
```

Na liście wyświetli się etykieta **„Realizacja dla klienta”**.
Dla takiej realizacji zwykle uzupełniamy `liveUrl` oraz — jeśli istnieje —
prawdziwą opinię klienta (`testimonial`).

---

## 7. Jak dodać galerię

W obiekcie projektu uzupełnij `galleryPath` i tablicę `gallery`:

```js
galleryPath: "/assets/portfolio/nazwa-projektu/",
gallery: [
  { file: "screen-01.png", alt: { pl: "Opis PL", en: "Opis EN" } },
  { file: "screen-02.png", alt: { pl: "Opis PL", en: "Opis EN" } }
]
```

Na podstronie case study zdjęcia dodajemy jako przyciski galerii — otwierają
lightbox (ESC, strzałki, swipe, klik poza zdjęciem zamyka; adres URL się nie
zmienia). Wzór znajdziesz w `realizacje/_szablon-case-study.html`.

---

## 8. Jak dodać link do działającej strony

```js
liveUrl: "https://adres-klienta.pl"
```

Link pojawi się na karcie realizacji jako „Zobacz działającą stronę”
(otwiera się w nowej karcie). Puste `""` = brak linku.

---

## 9. Jak dodać opinię klienta

Opinię dodajemy **wyłącznie prawdziwą**:

```js
testimonial: {
  text: "Treść opinii klienta.",
  author: "Imię Nazwisko, Firma"
}
```

Jeśli opinii nie ma, zostaw `testimonial: null` — sekcja opinii się nie pojawi.
Nie tworzymy fikcyjnych opinii.

---

## 10. Jak wyróżnić projekt

```js
featured: true
```

Wyróżniony projekt wyświetla się na górze listy jako duża prezentacja
(zdjęcie + opis na całą szerokość). Zwykorzystaj to dla najlepszej realizacji.

---

## 11. Jak opublikować projekt

Zmień jedną wartość:

```js
isPublished: true
```

Projekt pojawi się automatycznie na stronie głównej i na `/realizacje`.
Po publikacji pamiętaj, aby:

1. utworzyć podstronę `realizacje/<slug>.html`,
2. usunąć z niej `<meta name="robots" content="noindex, nofollow">`,
3. dodać URL `/realizacje/<slug>` do `sitemap.xml`.

---

## 12. Jak ponownie opublikować Miso Sushi, Lex Finanse i Monaco Performance

Te trzy projekty są obecnie ukryte (`isPublished: false`) i odindeksowane.
Aby przywrócić dany projekt:

1. W `portfolio-data.js` ustaw dla niego `isPublished: true`
   (opcjonalnie `featured: true`, jeśli ma być wyróżniony).
2. W pliku `realizacje/<slug>.html` **usuń** wiersz:
   `<meta name="robots" content="noindex, nofollow">`.
3. Dodaj URL projektu z powrotem do `sitemap.xml`, np.:
   ```xml
   <url>
     <loc>https://www.wertusdigital.pl/realizacje/lex-finanse</loc>
     <lastmod>RRRR-MM-DD</lastmod>
     <priority>0.7</priority>
   </url>
   ```
4. Zapisz zmiany i wdróż (push na gałąź / deploy na Vercel).

Nie trzeba nic usuwać — dane, grafiki i podstrony tych projektów pozostają
w repozytorium przez cały czas.

---

## Nowa podstrona case study

Skopiuj gotowy szablon:

```
realizacje/_szablon-case-study.html   →   realizacje/<slug>.html
```

Uzupełnij treści (nazwa, branża, typ, rok, cel, problem, zakres, struktura,
decyzje UX/UI, widok desktop/mobile, galeria, link, opinia, CTA, następna
realizacja) i — przy publikacji — usuń z nagłówka meta `robots noindex`.
