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
        formError: "Your message could not be sent. Please try again or contact us directly at wertusdigital@gmail.com."
      }
    : {
        openMenu: "Otwórz menu",
        closeMenu: "Zamknij menu",
        formValidation: "Uzupełnij poprawnie wszystkie pola formularza.",
        formSending: "Wysyłanie wiadomości…",
        formSuccess: "Dziękuję za wiadomość! Odezwę się najszybciej, jak to możliwe.",
        formError: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na wertusdigital@gmail.com."
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
})();