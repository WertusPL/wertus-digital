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
        formError: "Your message could not be sent. Please try again or contact us directly at kontakt@wertusdigital.pl.",
        galleryLabel: "Project gallery"
      }
    : {
        openMenu: "Otwórz menu",
        closeMenu: "Zamknij menu",
        formValidation: "Uzupełnij poprawnie wszystkie pola formularza.",
        formSending: "Wysyłanie wiadomości…",
        formSuccess: "Dziękujemy za wiadomość! Odezwiemy się najszybciej, jak to możliwe.",
        formError: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na kontakt@wertusdigital.pl.",
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

  /* ---------- 5b. Oś procesu — rysowanie linii przy wejściu w viewport ---------- */
  const timelines = document.querySelectorAll("[data-timeline]");

  if ("IntersectionObserver" in window && timelines.length) {
    const timelineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    timelines.forEach(function (el) {
      timelineObserver.observe(el);
    });
  } else {
    timelines.forEach(function (el) {
      el.classList.add("is-visible");
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
     Dane galerii budują się automatycznie z centralnego pliku
     portfolio-data.js (window.WERTUS_PORTFOLIO). Aby dodać / zmienić
     zdjęcia projektu, edytuj wyłącznie tamten plik — patrz PORTFOLIO-GUIDE.md.
     Galeria nie zmienia adresu URL — działa wyłącznie na stanie JS. */
  const PORTFOLIO_DATA = Array.isArray(window.WERTUS_PORTFOLIO)
    ? window.WERTUS_PORTFOLIO
    : [];

  const PORTFOLIO_GALLERIES = {};
  PORTFOLIO_DATA.forEach(function (project) {
    if (!project.gallery || !project.gallery.length) return;
    PORTFOLIO_GALLERIES[project.slug] = {
      title: project.title,
      path: project.galleryPath || "",
      images: project.gallery
    };
  });

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

    function resetZoom() {
      lightbox.classList.remove("zoomed");
    }

    function renderImage() {
      const image = activeGallery.images[activeIndex];

      resetZoom();
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

    function openLightbox(galleryKey, trigger, startIndex) {
      const gallery = PORTFOLIO_GALLERIES[galleryKey];

      if (!gallery) return;

      activeGallery = gallery;
      activeIndex = Math.min(Math.max(parseInt(startIndex, 10) || 0, 0), gallery.images.length - 1);
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
      resetZoom();
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

    document.querySelectorAll("[data-gallery]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openLightbox(
          trigger.getAttribute("data-gallery"),
          trigger,
          trigger.getAttribute("data-index")
        );
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

    // Zoom na małych ekranach — dotknięcie zdjęcia przybliża / oddala
    const zoomQuery = window.matchMedia("(max-width: 768px)");

    lightboxImage.addEventListener("click", function () {
      if (zoomQuery.matches) {
        lightbox.classList.toggle("zoomed");
      }
    });

    // Swipe na urządzeniach dotykowych (wyłączony podczas zoomu,
    // bo przesuwanie palcem służy wtedy do przewijania zdjęcia)
    lightbox.addEventListener("touchstart", function (event) {
      if (event.touches.length === 1) {
        touchStartX = event.touches[0].clientX;
      }
    }, { passive: true });

    lightbox.addEventListener("touchend", function (event) {
      if (touchStartX === null) return;
      if (lightbox.classList.contains("zoomed")) {
        touchStartX = null;
        return;
      }

      const deltaX = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;

      if (Math.abs(deltaX) > 45) {
        showImage(deltaX < 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  /* ---------- 8. Renderowanie listy realizacji ----------
     Buduje editorialną listę opublikowanych projektów w kontenerze
     [data-portfolio-grid]. Gdy nie ma żadnego opublikowanego projektu,
     kontener zostaje pusty (ukryty), a widoczna pozostaje statyczna sekcja
     "portfolio w aktualizacji" — dzięki temu strona działa też bez JS. */
  function statusLabel(project) {
    return project.projectType === "client"
      ? "Realizacja dla klienta"
      : "Projekt koncepcyjny";
  }

  function buildProjectCard(project, isFeature) {
    const article = document.createElement("article");
    article.className = "project-card reveal" + (isFeature ? " project-card-feature" : "");

    if (project.coverImage) {
      const media = document.createElement("div");
      media.className = "project-media";
      const img = document.createElement("img");
      img.src = project.coverImage;
      img.alt = project.coverAlt || (project.title + " — projekt strony internetowej");
      img.loading = "lazy";
      img.decoding = "async";
      media.appendChild(img);
      article.appendChild(media);
    }

    const body = document.createElement("div");
    body.className = "project-body";

    const type = document.createElement("p");
    type.className = "project-type";
    type.textContent = project.category;

    const title = document.createElement("h3");
    title.className = "project-title";
    title.textContent = project.title;

    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.textContent = project.shortDescription;

    const foot = document.createElement("div");
    foot.className = "project-foot";

    const status = document.createElement("span");
    status.className =
      "project-concept" + (project.projectType === "client" ? " project-concept--client" : "");
    status.textContent = statusLabel(project);

    const link = document.createElement("a");
    link.className = "text-link stretched-link";
    link.href = "/realizacje/" + project.slug;
    link.setAttribute("aria-label", "Zobacz projekt " + project.title);
    link.textContent = "Zobacz projekt";

    foot.appendChild(status);
    foot.appendChild(link);

    body.appendChild(type);
    body.appendChild(title);
    body.appendChild(desc);

    if (project.liveUrl) {
      const live = document.createElement("a");
      live.className = "project-live-link";
      live.href = project.liveUrl;
      live.target = "_blank";
      live.rel = "noopener";
      live.textContent = "Zobacz działającą stronę";
      body.appendChild(live);
    }

    body.appendChild(foot);
    article.appendChild(body);
    return article;
  }

  function renderPortfolio() {
    const grids = document.querySelectorAll("[data-portfolio-grid]");
    if (!grids.length) return;

    const published = PORTFOLIO_DATA.filter(function (p) {
      return p.isPublished === true;
    });
    if (!published.length) return;

    const featured = published.filter(function (p) { return p.featured; });
    const rest = published.filter(function (p) { return !p.featured; });

    grids.forEach(function (grid) {
      const editorial = document.createElement("div");
      editorial.className = "portfolio-editorial";

      const queue = rest.slice();
      // Pierwszy wyróżniony projekt — duża prezentacja
      if (featured.length) {
        editorial.appendChild(buildProjectCard(featured[0], true));
        // Ewentualne kolejne wyróżnione trafiają do dalszej kolejki
        featured.slice(1).forEach(function (p) { queue.unshift(p); });
      }

      for (let i = 0; i < queue.length; i += 2) {
        const pair = queue.slice(i, i + 2);
        // Pojedynczy projekt na końcu — pełna szerokość (duża prezentacja)
        if (pair.length === 1) {
          editorial.appendChild(buildProjectCard(pair[0], true));
        } else {
          const row = document.createElement("div");
          row.className = "portfolio-row";
          pair.forEach(function (p) { row.appendChild(buildProjectCard(p, false)); });
          editorial.appendChild(row);
        }
      }

      grid.innerHTML = "";
      grid.appendChild(editorial);
      grid.hidden = false;

      const emptyId = grid.getAttribute("data-portfolio-empty");
      if (emptyId) {
        const emptyEl = document.getElementById(emptyId);
        if (emptyEl) emptyEl.hidden = true;
      }
    });

    // Delikatne pojawienie się nowo dodanych kart
    const newReveals = document.querySelectorAll("[data-portfolio-grid] .reveal");
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      newReveals.forEach(function (el) { obs.observe(el); });
    } else {
      newReveals.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  renderPortfolio();
})();