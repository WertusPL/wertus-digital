/* ============================================================
   Wertus Digital — CENTRALNE ŹRÓDŁO CEN
   ------------------------------------------------------------
   To JEDYNE miejsce, w którym aktualizujesz kwoty i usługi
   dodatkowe. Wartości trafiają automatycznie na stronę główną
   (skrócony cennik) oraz na podstronę /oferta (i jej wersję EN).

   JAK ZMIENIĆ CENĘ
   • Edytuj wartość w  prices  (osobno pl / en) — zmieni się
     wszędzie tam, gdzie w HTML jest  data-price="klucz".

   JAK DODAĆ USŁUGĘ DODATKOWĄ
   • Dopisz obiekt do  additionalServices  (pl + en).
     Tabela usług dodatkowych zbuduje się sama w kontenerze
     [data-additional-services].

   Skrypt sam wykrywa język strony po  <html lang="…">.
   ============================================================ */

window.WERTUS_PRICING = {
  /* Ceny główne — SAMA KWOTA (bez „od” i „/mies.”, które zostają w HTML).
     Wyświetlane przez data-price="klucz". */
  prices: {
    landing:      { pl: "1200 zł", en: "1200 PLN" },
    firmowa:      { pl: "2500 zł", en: "2500 PLN" },
    rozbudowana:  { pl: "4000 zł", en: "4000 PLN" },
    opieka:       { pl: "249 zł",  en: "249 PLN" },
    modernizacja: { pl: "1800 zł", en: "1800 PLN" },
    audyt:        { pl: "199 zł",  en: "199 PLN" }
  },

  /* Usługi dodatkowe — budują tabelę w [data-additional-services] */
  additionalServices: [
    { pl: { name: "Dodatkowa podstrona",                    price: "od 300 zł" },
      en: { name: "Additional page",                        price: "from 300 PLN" } },
    { pl: { name: "Dodatkowa runda poprawek",               price: "od 250 zł" },
      en: { name: "Additional revision round",              price: "from 250 PLN" } },
    { pl: { name: "Wersja angielska strony",                price: "od 700 zł lub +25% wartości projektu" },
      en: { name: "English version of the site",            price: "from 700 PLN or +25% of the project value" } },
    { pl: { name: "Dodatkowa wersja językowa",              price: "od 700 zł" },
      en: { name: "Additional language version",            price: "from 700 PLN" } },
    { pl: { name: "Rozbudowany formularz",                  price: "od 250 zł" },
      en: { name: "Advanced form",                          price: "from 250 PLN" } },
    { pl: { name: "Integracja rezerwacji lub kalendarza",   price: "od 500 zł" },
      en: { name: "Booking or calendar integration",        price: "from 500 PLN" } },
    { pl: { name: "Galeria lub rozbudowane portfolio",      price: "od 400 zł" },
      en: { name: "Gallery or extended portfolio",          price: "from 400 PLN" } },
    { pl: { name: "Prace poza ustalonym zakresem",          price: "150 zł/godz." },
      en: { name: "Work outside the agreed scope",          price: "150 PLN/h" } },
    { pl: { name: "Pilna realizacja poza kolejnością",      price: "+30% wartości projektu" },
      en: { name: "Priority delivery outside the queue",    price: "+30% of the project value" } }
  ]
};

/* ---------- Renderowanie (działa też bez frameworków) ---------- */
(function () {
  "use strict";

  var data = window.WERTUS_PRICING;
  if (!data) return;

  var lang = document.documentElement.lang === "en" ? "en" : "pl";

  /* 1. Wstaw ceny główne w miejsca oznaczone data-price */
  var priceNodes = document.querySelectorAll("[data-price]");
  priceNodes.forEach(function (node) {
    var key = node.getAttribute("data-price");
    var value = data.prices[key];
    if (value && value[lang]) {
      node.textContent = value[lang];
    }
  });

  /* 2. Zbuduj tabelę usług dodatkowych */
  var containers = document.querySelectorAll("[data-additional-services]");
  if (!containers.length) return;

  containers.forEach(function (container) {
    var list = document.createElement("ul");
    list.className = "addon-grid";

    data.additionalServices.forEach(function (service) {
      var item = service[lang] || service.pl;

      var li = document.createElement("li");
      li.className = "addon-item";

      var name = document.createElement("span");
      name.className = "addon-name";
      name.textContent = item.name;

      var price = document.createElement("span");
      price.className = "addon-price";
      price.textContent = item.price;

      li.appendChild(name);
      li.appendChild(price);
      list.appendChild(li);
    });

    container.innerHTML = "";
    container.appendChild(list);
  });
})();
