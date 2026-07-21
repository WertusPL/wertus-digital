/* ============================================================
   Wertus Digital — script.js
   Czysty JavaScript, bez bibliotek zewnętrznych.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Teksty interfejsu zależne od języka strony ---------- */
  const isEnglish = document.documentElement.lang === "en";

  const t = isEnglish
    ? {
        openMenu: "Open menu",
        closeMenu: "Close menu",
        formValidation: "Please fill in all form fields correctly.",
        formSending: "Sending…",
        formSuccess: "Thank you for your message! We will get back to you as soon as possible.",
        formError: "Your message could not be sent. Please try again or contact us directly at wertusdigital@gmail.com.",
        galleryLabel: "Project gallery"
      }
    : {
        openMenu: "Otwórz menu",
        closeMenu: "Zamknij menu",
        formValidation: "Uzupełnij poprawnie wszystkie pola formularza.",
        formSending: "Wysyłanie wiadomości…",
        formSuccess: "Dziękujemy za wiadomość! Odezwiemy się najszybciej, jak to możliwe.",
        formError: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na wertusdigital@gmail.com.",
        galleryLabel: "Galeria projektu"
      };

  /* ---------- 1. Sticky header — cień po przewinięciu ---------- */
  const header = document.querySelector(".site-header");

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Menu mobilne (hamburger) ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  function closeMenu() {
    if (!siteNav || !navToggle) return;

    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", t.openMenu);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? t.closeMenu : t.openMenu);
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && siteNav.classList.contains("open")) {
        closeMenu();
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (
        siteNav.classList.contains("open") &&
        !siteNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ---------- 3. Płynne przewijanie bez zostawiania # w adresie ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Usuwa #start, #oferta, #kontakt itd. z paska adresu
      history.replaceState(null, "", window.location.pathname);
    });
  });

  /* ---------- 4. FAQ — accordion ---------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      faqItems.forEach(function (other) {
        if (other !== item && other.classList.contains("open")) {
          other.classList.remove("open");

          const otherQuestion = other.querySelector(".faq-question");
          const otherAnswer = other.querySelector(".faq-answer");

          if (otherQuestion) {
            otherQuestion.setAttribute("aria-expanded", "false");
          }

          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        }
      });

      item.classList.toggle("open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
    });
  });

  /* ---------- 5. Animacje sekcji przy scrollu ---------- */
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
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- 6. Formularz kontaktowy (Formspree) ---------- */
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (form && formStatus) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const fields = [
        form.querySelector("#form-name"),
        form.querySelector("#form-email"),
        form.querySelector("#form-message")
      ].filter(Boolean);

      let valid = true;

      fields.forEach(function (field) {
        const isEmail = field.type === "email";
        const value = field.value.trim();

        const fieldValid = isEmail
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          : value.length > 0;

        field.classList.toggle("field-error", !fieldValid);

        if (!fieldValid) {
          valid = false;
        }
      });

      if (!valid) {
        formStatus.textContent = t.formValidation;
        formStatus.className = "form-status error";
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');

      if (submitButton) {
        submitButton.disabled = true;
      }

      formStatus.textContent = t.formSending;
      formStatus.className = "form-status";

      fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            formStatus.textContent = t.formSuccess;
            formStatus.className = "form-status success";
          } else {
            formStatus.textContent = t.formError;
            formStatus.className = "form-status error";
          }
        })
        .catch(function () {
          formStatus.textContent = t.formError;
          formStatus.className = "form-status error";
        })
        .finally(function () {
          if (submitButton) {
            submitButton.disabled = false;
          }
        });
    });

    form.addEventListener("input", function (event) {
      if (event.target.classList.contains("field-error")) {
        event.target.classList.remove("field-error");
      }
    });
  }

  /* ---------- 7. Galeria realizacji (lightbox) ----------
     Konfiguracja obrazów portfolio. Aby dodać nową realizację:
     1. Wgraj screenshoty do assets/portfolio/<nazwa-projektu>/
     2. Dodaj wpis poniżej (klucz = nazwa folderu) z listą plików i opisami alt
     3. W index.html i en.html dodaj kartę .work-card-link z przyciskiem
        <button class="work-card-trigger" data-gallery="<nazwa-projektu>">
        (gotowy szablon karty znajduje się w komentarzu w sekcji portfolio)
     Galeria nie zmienia adresu URL — działa wyłącznie na stanie JS.

     Prawdziwe realizacje (case studies): każdy wpis może dodatkowo zawierać
     pola opisujące projekt dla klienta — na razie nieużywane w UI, ale
     przygotowane pod przyszłą rozbudowę portfolio:
       caseStudy: {
         client:  "Nazwa firmy",
         industry:{ pl: "Branża", en: "Industry" },
         problem: { pl: "Krótki opis problemu klienta", en: "..." },
         scope:   { pl: "Zakres realizacji", en: "..." },
         result:  { pl: "Efekt wdrożenia", en: "..." },
         testimonial: { text: "Prawdziwa opinia klienta", author: "Imię, firma" },
         url:     "https://adres-strony-klienta.pl"
       }
     Uzupełniaj wyłącznie prawdziwymi danymi. */
  const PORTFOLIO_GALLERIES = {
    "miso-sushi": {
      title: "Miso Sushi",
      path: "assets/portfolio/miso-sushi/",
      images: [
        { file: "miso-01.png", alt: { pl: "Projekt strony internetowej Miso Sushi – strona główna", en: "Miso Sushi website design – homepage" } },
        { file: "miso-02.png", alt: { pl: "Projekt strony internetowej Miso Sushi – sekcja menu restauracji", en: "Miso Sushi website design – restaurant menu section" } },
        { file: "miso-03.png", alt: { pl: "Projekt strony internetowej Miso Sushi – sekcja o restauracji i galeria", en: "Miso Sushi website design – about section and photo gallery" } },
        { file: "miso-04.png", alt: { pl: "Projekt strony internetowej Miso Sushi – opinie gości i sekcja rezerwacji", en: "Miso Sushi website design – guest reviews and booking section" } }
      ]
    },
    "lex-finanse": {
      title: "Lex Finanse",
      path: "assets/portfolio/lex-finanse/",
      images: [
        { file: "lex-01.png", alt: { pl: "Projekt strony internetowej Lex Finanse – strona główna", en: "Lex Finanse website design – homepage" } },
        { file: "lex-02.png", alt: { pl: "Projekt strony Lex Finanse – sekcja usług", en: "Lex Finanse website design – services section" } },
        { file: "lex-03.png", alt: { pl: "Projekt strony Lex Finanse – sekcja Dlaczego my", en: "Lex Finanse website design – Why us section" } },
        { file: "lex-04.png", alt: { pl: "Projekt strony Lex Finanse – opinie klientów", en: "Lex Finanse website design – client testimonials" } },
        { file: "lex-05.png", alt: { pl: "Projekt strony Lex Finanse – sekcja FAQ", en: "Lex Finanse website design – FAQ section" } },
        { file: "lex-06.png", alt: { pl: "Projekt strony Lex Finanse – sekcja kontaktu", en: "Lex Finanse website design – contact section" } }
      ]
    }
  };

  const lightbox = document.getElementById("lightbox");

  if (lightbox) {
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    let activeGallery = null;
    let activeIndex = 0;
    let lastFocusedElement = null;
    let touchStartX = null;

    function imageSrc(gallery, index) {
      return gallery.path + gallery.images[index].file;
    }

    function preloadImage(gallery, index) {
      if (index < 0 || index >= gallery.images.length) return;
      const img = new Image();
      img.src = imageSrc(gallery, index);
    }

    function renderImage() {
      const image = activeGallery.images[activeIndex];

      lightboxImage.src = imageSrc(activeGallery, activeIndex);
      lightboxImage.alt = isEnglish ? image.alt.en : image.alt.pl;
      lightboxCounter.textContent = (activeIndex + 1) + " / " + activeGallery.images.length;

      // Sąsiednie zdjęcia ładują się w tle — szybkie przełączanie strzałkami
      preloadImage(activeGallery, activeIndex + 1);
      preloadImage(activeGallery, activeIndex - 1);
    }

    /* Blokada scrolla bez "skakania" layoutu — rekompensata szerokości
       paska przewijania na body i przyklejonym headerze */
    function lockScroll() {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + "px";
        if (header) header.style.paddingRight = scrollbarWidth + "px";
      }
    }

    function unlockScroll() {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (header) header.style.paddingRight = "";
    }

    function openLightbox(galleryKey, trigger) {
      const gallery = PORTFOLIO_GALLERIES[galleryKey];

      if (!gallery) return;

      activeGallery = gallery;
      activeIndex = 0;
      lastFocusedElement = trigger || document.activeElement;

      lightbox.setAttribute("aria-label", t.galleryLabel + " " + gallery.title);
      lightboxTitle.textContent = gallery.title;
      renderImage();

      lightbox.hidden = false;
      lockScroll();
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      activeGallery = null;
      unlockScroll();

      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    }

    function showImage(step) {
      if (!activeGallery) return;

      const count = activeGallery.images.length;
      activeIndex = (activeIndex + step + count) % count;
      renderImage();
    }

    document.querySelectorAll(".work-card-trigger[data-gallery]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openLightbox(trigger.getAttribute("data-gallery"), trigger);
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    prevButton.addEventListener("click", function () { showImage(-1); });
    nextButton.addEventListener("click", function () { showImage(1); });

    // Kliknięcie poza zdjęciem (tło lub pusta część sceny) zamyka galerię
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target.classList.contains("lightbox-stage")) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;

      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        showImage(1);
      } else if (event.key === "ArrowLeft") {
        showImage(-1);
      } else if (event.key === "Tab") {
        // Prosty focus trap — fokus krąży po przyciskach galerii
        const focusable = [closeButton, prevButton, nextButton];
        const currentIndex = focusable.indexOf(document.activeElement);
        let nextIndex;

        if (event.shiftKey) {
          nextIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
        } else {
          nextIndex = currentIndex === -1 || currentIndex === focusable.length - 1 ? 0 : currentIndex + 1;
        }

        event.preventDefault();
        focusable[nextIndex].focus();
      }
    });

    // Swipe na urządzeniach dotykowych
    lightbox.addEventListener("touchstart", function (event) {
      if (event.touches.length === 1) {
        touchStartX = event.touches[0].clientX;
      }
    }, { passive: true });

    lightbox.addEventListener("touchend", function (event) {
      if (touchStartX === null) return;

      const deltaX = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;

      if (Math.abs(deltaX) > 45) {
        showImage(deltaX < 0 ? 1 : -1);
      }
    }, { passive: true });
  }
})();