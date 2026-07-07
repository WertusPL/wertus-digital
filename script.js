/* ============================================================
   Wertus Digital — script.js
   Czysty JavaScript, bez bibliotek zewnętrznych.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1. Sticky header — cień po przewinięciu ---------- */
  const header = document.querySelector(".site-header");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Menu mobilne (hamburger) ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  function closeMenu() {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Otwórz menu");
  }

  navToggle.addEventListener("click", function () {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Zamknij menu" : "Otwórz menu");
  });

  // Zamknij menu po kliknięciu linku lub przycisku CTA
  siteNav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  // Zamknij menu klawiszem Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && siteNav.classList.contains("open")) {
      closeMenu();
      navToggle.focus();
    }
  });

  // Zamknij menu po kliknięciu poza nim
  document.addEventListener("click", function (event) {
    if (
      siteNav.classList.contains("open") &&
      !siteNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  /* ---------- 3. FAQ — accordion ---------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      // Zamknij pozostałe — otwarte może być tylko jedno pytanie
      faqItems.forEach(function (other) {
        if (other !== item && other.classList.contains("open")) {
          other.classList.remove("open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      item.classList.toggle("open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
    });
  });

  /* ---------- 4. Animacje sekcji przy scrollu ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Starsze przeglądarki — pokaż wszystko od razu
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- 5. Formularz kontaktowy (frontend) ----------
     UWAGA: formularz nie wysyła jeszcze wiadomości.
     Aby realnie wysyłał e-maile, podepnij backend, np.:
     - Formspree: w index.html ustaw action="https://formspree.io/f/TWOJ_ID"
       i method="post", a poniższy kod zamień na zwykłą wysyłkę formularza,
     - Netlify Forms: dodaj data-netlify="true" (hosting na Netlify),
     - własny backend / PHP wysyłający e-mail.
  ------------------------------------------------------------ */
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fields = [
      form.querySelector("#form-name"),
      form.querySelector("#form-email"),
      form.querySelector("#form-message")
    ];

    let valid = true;

    fields.forEach(function (field) {
      const isEmail = field.type === "email";
      const value = field.value.trim();
      const fieldValid = isEmail
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        : value.length > 0;

      field.classList.toggle("field-error", !fieldValid);
      if (!fieldValid) valid = false;
    });

    if (!valid) {
      formStatus.textContent = "Uzupełnij poprawnie wszystkie pola formularza.";
      formStatus.className = "form-status error";
      return;
    }

    // Tu docelowo nastąpi realna wysyłka (backend / Formspree / Netlify Forms)
    form.reset();
    formStatus.textContent = "Dziękuję za wiadomość! Odezwę się najszybciej, jak to możliwe.";
    formStatus.className = "form-status success";
  });

  // Usuwaj oznaczenie błędu podczas poprawiania pola
  form.addEventListener("input", function (event) {
    if (event.target.classList.contains("field-error")) {
      event.target.classList.remove("field-error");
    }
  });
})();
