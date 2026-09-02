import type { Dictionary } from "./types";

// Natural British English — written for the language, not translated word-for-word.
export const en: Dictionary = {
  nav: {
    services: "Services",
    work: "Work",
    studio: "Studio",
    contact: "Contact",
    cta: "Start a project",
    languageLabel: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary navigation",
    skipToContent: "Skip to content",
  },
  navMegaMenu: {
    label: "Services",
    panelLabel: "Services menu",
    allServices: "Explore all services",
    detailsCta: "See details",
    items: [
      {
        key: "websites",
        index: "01",
        title: "Websites",
        subtitle: "Design and development for complete business websites.",
        previewTitle: "Websites",
        previewText:
          "We design and build business websites — from structure and UI through to development and launch.",
        microLabels: ["UX", "UI", "RESPONSIVE", "DEVELOPMENT"],
      },
      {
        key: "landing",
        index: "02",
        title: "Landing Pages",
        subtitle: "Focused websites built around one clear goal.",
        previewTitle: "Landing Pages",
        previewText:
          "A single, focused page that guides visitors from arrival to one specific action.",
        microLabels: ["ONE PAGE", "FOCUSED", "CTA"],
      },
      {
        key: "cms",
        index: "03",
        title: "CMS",
        subtitle: "Content you can update without touching the code.",
        previewTitle: "CMS",
        previewText:
          "Convenient editing of selected content with a live preview — no code required.",
        microLabels: ["EDITABLE", "STRUCTURED", "PUBLISH"],
      },
      {
        key: "care",
        index: "04",
        title: "Care & Growth",
        subtitle: "Ongoing support, updates and development after launch.",
        previewTitle: "Care & Growth",
        previewText:
          "Updates, optimisation and continued development once the website is live.",
        microLabels: ["MAINTAIN", "UPDATE", "IMPROVE"],
      },
    ],
  },
  hero: {
    eyebrow: "WEB DESIGN & DEVELOPMENT · BIAŁYSTOK / POLAND",
    headline: [
      [{ text: "Websites for businesses" }],
      [{ text: "that want to look like" }],
      [{ text: "leaders", accent: true }, { text: " in their industry." }],
    ],
    description:
      "We design and build modern websites that strengthen brands, build trust and help businesses win new customers.",
    primaryCta: "Start a project",
    secondaryCta: "View our work",
    capabilitiesLabel: "Capabilities",
    capabilities: ["Web Design", "Development", "SEO", "CMS"],
  },
  featured: {
    kicker: "CONCEPT PROJECT / 2026",
    conceptBadge: "CONCEPT PROJECT",
    discipline: "Architecture / Web Design",
    projectName: "Meridian",
    previewNav: ["Studio", "Projects", "Contact"],
    previewTagline: "Form that follows intention.",
    previewCta: "View project",
    caption:
      "Illustrative concept mock-up of a website design — a demonstration of style, not a real client.",
  },
  studio: {
    kicker: "STUDIO",
    headline: ["Design, technology", "and strategy in one place."],
    description:
      "Wertus Digital creates websites that combine thoughtful design, solid development and a clear business purpose.",
    pillars: [
      {
        eyebrow: "DESIGN",
        headline: "A considered visual direction",
        description:
          "We design around the character of each brand instead of forcing businesses into ready-made templates.",
      },
      {
        eyebrow: "DEVELOPMENT",
        headline: "Solid, modern development",
        description:
          "We build fast, responsive and maintainable websites using modern web technologies.",
      },
      {
        eyebrow: "GROWTH",
        headline: "Built to support the business",
        description:
          "We design around clarity, trust and the actions visitors should ultimately take.",
      },
    ],
  },
  work: {
    kicker: "SELECTED WORK",
    headline: ["Selected work,", "showing how we think."],
    description:
      "Design is best judged in practice. Explore selected concepts and projects created by Wertus Digital.",
    viewAll: "View all work",
    counter: "PROJECT",
    scope: "WEB DESIGN / DEVELOPMENT",
    conceptTag: "CONCEPT PROJECT",
    conceptShort: "Concept",
    cta: "View project",
    industries: {
      "lex-finanse": "Financial advisory",
      "miso-sushi": "Restaurant",
      "monaco-performance": "Automotive",
    },
  },
  services: {
    kicker: "SERVICES",
    headline: [
      "Services that help",
      "businesses look and perform better online.",
    ],
    description:
      "From the first concept to the ongoing development of a live website, we shape the scope around what the business actually needs.",
    cta: "Learn more",
    items: [
      {
        id: "web-design",
        index: "01",
        name: "WEB DESIGN",
        title: "Designed around the brand",
        description:
          "We create tailored visual directions and interfaces that strengthen the brand and guide users towards the right action.",
        benefits: [
          "Bespoke design",
          "UX and content hierarchy",
          "Responsive design",
          "Brand consistency",
        ],
      },
      {
        id: "development",
        index: "02",
        name: "DEVELOPMENT",
        title: "Modern, reliable development",
        description:
          "We build fast, responsive and maintainable websites using modern web technologies.",
        benefits: [
          "Next.js / React",
          "Performance",
          "SEO-ready",
          "Scalable structure",
        ],
      },
      {
        id: "cms",
        index: "03",
        name: "CMS",
        title: "Content under your control",
        description:
          "We integrate practical content management systems that let you update selected parts of the website without touching the code.",
        benefits: [
          "Sanity CMS",
          "Simple content editing",
          "Structured content",
          "Easy future expansion",
        ],
      },
      {
        id: "care",
        index: "04",
        name: "CARE & GROWTH",
        title: "Built to evolve with the business",
        description:
          "After launch, we can continue improving the website, keeping it up to date and supporting new business needs.",
        benefits: [
          "Updates",
          "Small improvements",
          "Optimisation",
          "Ongoing support",
        ],
      },
    ],
  },
  process: {
    label: "PROCESS",
    heading: ["From the first conversation", "to a finished website."],
    description:
      "A clear process that takes the project from initial direction through design and development to launch.",
    steps: [
      {
        id: "discovery",
        title: "Understanding the project",
        description:
          "We start by learning about your business, goals, audience and the problems the new website needs to solve.",
      },
      {
        id: "direction",
        title: "Structure and direction",
        description:
          "We define the information architecture and visual direction before moving into the full interface design.",
      },
      {
        id: "design",
        title: "Interface design",
        description:
          "We design the UI and UX, refining hierarchy, typography, responsiveness and the interactions that matter.",
      },
      {
        id: "development",
        title: "Development and optimisation",
        description:
          "We turn the design into a fast, responsive and maintainable website with solid technical foundations.",
      },
      {
        id: "launch",
        title: "Launch and handover",
        description:
          "We test the final website, deploy it and make sure everything is ready for day-to-day use.",
      },
    ],
  },
  pricing: {
    label: "PRICING",
    heading: "What does a good website cost?",
    statement: "It depends on what it needs to achieve.",
    description:
      "The scope can vary significantly — from a focused landing page to a larger website with a CMS and additional functionality. That is why we provide starting prices and prepare an exact quote once we understand the project.",
    microcopy: "The initial conversation and quote are free of charge.",
    cta: "Request a quote",
    secondaryCta: "View services",
    factors:
      "Pricing is influenced by scope, number of pages, CMS requirements, languages, integrations and custom functionality.",
    tiers: [
      {
        id: "landing",
        name: "Landing page",
        price: "from PLN 1,200",
        description:
          "A focused single-page website built around a specific service, campaign or offer.",
      },
      {
        id: "business",
        name: "Business website",
        price: "from PLN 2,500",
        description:
          "A complete website for businesses that want to present their brand and services professionally.",
      },
      {
        id: "advanced",
        name: "Advanced website",
        price: "from PLN 4,000",
        description:
          "A larger website with a broader structure, CMS, integrations or custom functionality.",
      },
      {
        id: "care",
        name: "Care & growth",
        price: "from PLN 249 / month",
        description:
          "Updates, small improvements, optimisation and continued development after launch.",
      },
    ],
  },
  faq: {
    label: "FAQ",
    heading: "Frequently asked questions.",
    description:
      "A few things clients usually want to know before starting a project.",
    items: [
      {
        id: "timeline",
        question: "How long does a website take to build?",
        answer:
          "It depends on the scope. A focused landing page can be completed more quickly, while a larger website with a CMS and additional functionality will take longer. We agree the timeline before work begins.",
      },
      {
        id: "editing",
        question: "Will I be able to edit the content myself?",
        answer:
          "Yes. When a project uses a CMS, we configure it so that selected content can be updated easily without touching the code.",
      },
      {
        id: "hosting",
        question: "Can you help with hosting and the domain?",
        answer:
          "Yes. We can help choose suitable hosting, configure the domain and deploy the website to the final environment.",
      },
      {
        id: "changes",
        question: "What if I need changes after launch?",
        answer:
          "We can continue to maintain and develop the website after launch, including updates, small changes and ongoing improvements.",
      },
      {
        id: "languages",
        question: "Do you build multilingual websites?",
        answer:
          "Yes. We can create multilingual websites with a clear language structure, proper routing and solid SEO foundations for each version.",
      },
      {
        id: "payment",
        question: "How does payment work?",
        answer:
          "Payment terms are agreed before the project starts and included in the agreed scope of work. Larger projects can be split into stages where appropriate.",
      },
    ],
  },
  contactCta: {
    label: "CONTACT",
    heading: ["Have a project?", "Let's talk."],
    description:
      "A no-obligation conversation is a good first step to define the scope, direction and possibilities of the project.",
    primaryCta: "Start a project",
    secondary: "Or send us an email",
  },
  contactPage: {
    meta: {
      title: "Contact — Wertus Digital",
      description:
        "Tell us about your project. We'll review the scope and prepare a clear proposal for your new website.",
    },
    hero: {
      label: "CONTACT / START A PROJECT",
      headingLead: "Tell us about your ",
      headingAccent: "project.",
      description:
        "Tell us what you need and we'll come back with a clear response and the next steps.",
      microcopy: "The initial conversation and quote are free of charge.",
      panelLabel: "CONTACT DETAILS",
      statusLabel: "STATUS",
      status: "Currently taking on new projects",
    },
    details: {
      emailLabel: "Email",
      phoneLabel: "Phone",
      locationLabel: "Location",
      location: "Białystok / Poland",
    },
    form: {
      label: "THE BRIEF",
      heading: "Send us a message",
      optionalTag: "(optional)",
      requiredHint: "Fields marked with an asterisk (*) are required.",
      fields: {
        name: "Name",
        email: "Email",
        company: "Company",
        service: "What do you need?",
        budget: "Budget",
        message: "Tell us about the project",
      },
      messagePlaceholder:
        "What does your business do, what do you need and what would you like the website to achieve?",
      budgetPlaceholder: "Select a range",
      guide: {
        label: "BEFORE YOU SEND",
        intro: "Helpful details:",
        items: [
          "scope",
          "project goal",
          "approximate budget",
          "timeline, if relevant",
          "CMS requirements",
          "languages",
        ],
      },
      serviceOptions: [
        { value: "business", label: "Business website" },
        { value: "landing", label: "Landing page" },
        { value: "cms", label: "CMS / development" },
        { value: "care", label: "Care & growth" },
        { value: "other", label: "Other" },
      ],
      budgetOptions: [
        { value: "lt-2500", label: "up to PLN 2,500" },
        { value: "2500-4000", label: "PLN 2,500 – 4,000" },
        { value: "4000-7000", label: "PLN 4,000 – 7,000" },
        { value: "gt-7000", label: "above PLN 7,000" },
        { value: "unsure", label: "not sure yet" },
      ],
      privacy: {
        pre: "By submitting the form, you agree to be contacted regarding your enquiry. Details are available in the ",
        linkLabel: "Privacy Policy",
        post: ".",
      },
      submit: "Send enquiry",
      submitting: "Sending…",
      success: {
        heading: "Thank you. Your message has been sent.",
        body: "We'll get back to you as soon as possible.",
      },
      errorSend: {
        pre: "We couldn't send your message. Please try again or email us at ",
        post: ".",
      },
      errorRate:
        "Too many attempts in a short time. Please wait a moment and try again.",
      errors: {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        emailInvalid: "Please enter a valid email address.",
        company: "Please enter your company name.",
        service: "Please choose what you need.",
        message: "Please tell us a little about the project.",
      },
    },
    nextSteps: {
      label: "HOW IT WORKS",
      heading: "What happens next?",
      steps: [
        {
          index: "01",
          title: "We review your enquiry",
          description:
            "We look through the project details and the information you've provided.",
        },
        {
          index: "02",
          title: "We come back to you",
          description:
            "If needed, we ask a few questions and clarify the scope.",
        },
        {
          index: "03",
          title: "We prepare a quote",
          description:
            "Once we understand the project, we outline the proposed scope and cost.",
        },
      ],
    },
    closing: {
      label: "DIRECT CONTACT",
      heading: "Prefer to reach out directly?",
      lead: "Get in touch by email or phone —",
    },
  },
  servicesPage: {
    meta: {
      title: "Services — Web Design & Development | Wertus Digital",
      description:
        "Web design and development for businesses — from focused landing pages to larger websites with CMS and ongoing support.",
    },
    hero: {
      label: "SERVICES / WEB DESIGN & DEVELOPMENT",
      headingLine1: "A website built",
      headingLine2Lead: "around ",
      headingAccent: "your business.",
      description:
        "We design and build websites around the brand, project scope and the purpose the website needs to serve.",
      secondary:
        "From focused landing pages to larger websites with a CMS and ongoing support after launch.",
      primaryCta: "Request a quote",
      secondaryCta: "Explore the scope",
      visualTitle: "FROM STRUCTURE TO LAUNCH",
      visualSteps: [
        { label: "STRUCTURE", caption: "Architecture and goals" },
        { label: "WIREFRAME", caption: "Layout and hierarchy" },
        { label: "UI", caption: "Visual direction and interface" },
        { label: "DEVELOPMENT", caption: "Code, responsiveness, CMS" },
        { label: "LIVE", caption: "Testing and launch" },
      ],
    },
    projectTypes: {
      label: "WHAT WE BUILD",
      heading: ["Three levels of scope.", "One standard of execution."],
      description:
        "These aren't artificial packages — they're three kinds of project. We shape the scope around what the website needs to do, not the other way round.",
      bestForLabel: "Best for",
      includesLabel: "Includes",
      previewLabels: { pages: "Pages", cms: "CMS", scope: "Character" },
      priceLabel: "Starting price",
      items: [
        {
          id: "landing",
          index: "01",
          name: "LANDING PAGE",
          headline: "A focused page. One clear goal.",
          description:
            "A carefully designed one-page website for a service, campaign, product or offer, built to communicate value clearly and guide visitors towards action.",
          bestFor:
            "A good fit when your communication needs to focus on one specific offer.",
          includes: [
            "Bespoke layout",
            "Responsive design",
            "Contact form / CTA",
            "Technical SEO foundations",
            "Speed optimisation",
            "Deployment",
          ],
          price: "from PLN 1,200",
          pages: "Single page",
          cms: "Usually not needed",
          scope: "One offer, one clear goal",
        },
        {
          id: "business",
          index: "02",
          name: "BUSINESS WEBSITE",
          headline: "A complete online presence for your business.",
          description:
            "A multi-page website for businesses that need to present their brand, services and way of working clearly while making it easy for potential clients to get in touch.",
          bestFor:
            "The most common choice for businesses building a professional, credible presence online.",
          includes: [
            "Information architecture",
            "Several pages",
            "Web design and development",
            "Responsive design",
            "Forms",
            "Technical SEO and performance",
            "CMS depending on scope",
          ],
          price: "from PLN 2,500",
          pages: "Several pages",
          cms: "Optional",
          scope: "Brand, services, contact",
        },
        {
          id: "advanced",
          index: "03",
          name: "ADVANCED WEBSITE",
          headline: "More content, functionality and room to grow.",
          description:
            "A larger website for projects that require a broader structure, CMS, multiple languages, integrations or custom functionality.",
          bestFor:
            "For businesses whose website needs to be more than a simple presentation of their offer.",
          includes: [
            "Broader structure",
            "CMS",
            "Multiple languages",
            "Custom components",
            "Integrations",
            "More content",
            "Ongoing development",
          ],
          price: "from PLN 4,000",
          pages: "Many pages",
          cms: "Included",
          scope: "Structure, features, growth",
        },
      ],
    },
    capabilities: {
      label: "SCOPE",
      heading: ["What goes into", "a well-built website?"],
      description:
        "Every project rests on the same four pillars. We tailor the scope of each one to the specific project.",
      scopeLabel: "Scope",
      items: [
        {
          id: "web-design",
          index: "01",
          name: "WEB DESIGN",
          headline: "Designed around the brand",
          description:
            "We start with structure and visual direction, designing the interface, content hierarchy, typography and how the website behaves across devices.",
          scope: [
            "Structure",
            "UX",
            "UI",
            "Typography",
            "Responsive design",
            "Components",
            "CTA and content hierarchy",
          ],
        },
        {
          id: "development",
          index: "02",
          name: "DEVELOPMENT",
          headline: "The design turned into a working product",
          description:
            "We turn the design into code, taking care of speed, responsiveness, stability and the ability to develop the website further.",
          note: "We match the technology to the project; the current Wertus stack uses Next.js, React and TypeScript, among others.",
          scope: [
            "Responsiveness",
            "Performance",
            "Semantic HTML",
            "Accessibility foundations",
            "Technical SEO",
          ],
        },
        {
          id: "cms",
          index: "03",
          name: "CMS",
          headline: "Content under your control",
          description:
            "Where a project calls for it, we integrate a CMS that lets you update selected content conveniently without touching the code.",
          note: "A CMS isn't a default part of every project — we include it where it genuinely helps. Wertus currently uses Sanity, among others.",
          scope: [
            "Content editing",
            "Content structure",
            "Media",
            "Selected sections",
            "Permissions per project",
          ],
        },
        {
          id: "care",
          index: "04",
          name: "CARE & GROWTH",
          headline: "A website doesn't have to end at launch",
          description:
            "After going live, we can continue to look after the website, keep it up to date, make small changes and develop it alongside the needs of the business.",
          scope: [
            "Updates",
            "Small changes",
            "Optimisation",
            "Development",
            "Technical support",
          ],
          price: "from PLN 249 / month",
        },
      ],
    },
    deliverables: {
      label: "WHAT YOU GET",
      heading: ["A project from start", "to launch."],
      note: "The exact scope depends on the project — not every element is needed on the simplest landing page.",
      pipeline: ["Brief", "Structure", "Design", "Code", "Testing", "Launch"],
      items: [
        { index: "01", title: "Needs analysis" },
        { index: "02", title: "Site structure" },
        { index: "03", title: "Visual direction" },
        { index: "04", title: "UI/UX design" },
        { index: "05", title: "Responsive development" },
        { index: "06", title: "Forms and CTAs" },
        { index: "07", title: "Technical SEO foundations" },
        { index: "08", title: "Testing" },
        { index: "09", title: "Deployment" },
        { index: "10", title: "Website handover" },
      ],
    },
    scopeSelector: {
      label: "HOW WE SET THE SCOPE",
      heading: ["Not every business", "needs the same thing."],
      description:
        "We set the scope around the goal of the website, the amount of content and the features that are genuinely needed. Pick a goal and we'll suggest the closest scope.",
      goalLabel: "Goal",
      options: [
        {
          id: "one-offer",
          label: "One specific offer",
          result: "Landing page",
          price: "from PLN 1,200",
        },
        {
          id: "full-company",
          label: "A full company presence",
          result: "Business website",
          price: "from PLN 2,500",
        },
        {
          id: "larger",
          label: "A larger site / more features",
          result: "Advanced website",
          price: "from PLN 4,000",
        },
      ],
      resultLead: "Closest scope",
      cta: "Discuss the project",
      disclaimer:
        "This isn't an automatic quote — just a hint on where to start. We agree the exact scope after a conversation.",
    },
    pricing: {
      label: "STARTING PRICES",
      heading: ["A starting point", "for your quote."],
      note: "Every project is quoted individually once we understand the scope.",
      cta: "Request a detailed quote",
      rows: [
        { name: "Landing page", price: "from PLN 1,200" },
        { name: "Business website", price: "from PLN 2,500" },
        { name: "Advanced website", price: "from PLN 4,000" },
        { name: "Care & growth", price: "from PLN 249 / month" },
      ],
      factorsLabel: "What affects the price",
      factors: [
        "Number of pages",
        "CMS",
        "Languages",
        "Integrations",
        "Features",
        "Amount of content",
      ],
      factorsNote:
        "Price depends mainly on scope, not on a chosen “package”.",
    },
    faq: {
      label: "SERVICES FAQ",
      heading: "Before you ask for a quote.",
      items: [
        {
          id: "individual",
          question: "Is every website designed individually?",
          answer:
            "Yes. The visual direction and structure are tailored to the specific business and project scope. We don't sell a single ready-made mock-up changed only through colours and text.",
        },
        {
          id: "cms-included",
          question: "Is a CMS included with every website?",
          answer:
            "It isn't always needed. If you want to update the content yourself, we can include a CMS in the project scope.",
        },
        {
          id: "extra-features",
          question: "Can I order additional features?",
          answer:
            "Yes. Integrations and custom features are quoted based on the specific scope.",
        },
        {
          id: "english-version",
          question: "Can you build an English version of the site?",
          answer:
            "Yes. We can build a multilingual website with the right routing and SEO structure.",
        },
        {
          id: "no-obligation",
          question: "Can I discuss the project first with no obligation?",
          answer:
            "Yes. The initial conversation and preparing a quote are free of charge.",
        },
      ],
    },
    finalCta: {
      label: "START A PROJECT",
      heading: ["Already have an idea", "for your website?"],
      description:
        "Tell us about it and we'll help define the right scope.",
      primaryCta: "Start a project",
      secondary: "Or email us at",
    },
  },
  workPage: {
    meta: {
      title: "Work | Wertus Digital",
      description:
        "Selected websites designed and built by Wertus Digital.",
    },
    hero: {
      label: "SELECTED WORK",
      headingLead: "Digital work built around real ",
      headingAccent: "businesses.",
      description:
        "We design and build websites that pair a considered visual layer with a clear structure, responsive behaviour and solid technical execution.",
      countLabel: "01 PROJECT",
      yearLabel: "2026",
    },
    caseStudy: {
      label: "CASE STUDY",
      name: "LECH-BUD",
      subtitle: "Website for a construction company",
      description:
        "A complete website for Lech-Bud, a local construction company. The project covers the homepage, a services offer, a filterable project gallery, an about section and an extended contact form. Everything was designed with a focus on a clear offer and comfortable use on both desktop and mobile devices.",
      metaLabel: "ABOUT THE PROJECT",
      scopeLabel: "SCOPE",
      scope: [
        "Web Design",
        "Development",
        "Responsive",
        "Contact Form",
        "SEO",
      ],
      sectorLabel: "SECTOR",
      sector: "Construction",
      mainCaption: "HOMEPAGE",
      mainAlt:
        "Lech-Bud homepage — hero section headlining construction and finishing services over a photo of a detached house.",
      galleryLabel: "OVERVIEW",
      shots: {
        worksDesktopLabel: "WORK — DESKTOP",
        worksDesktopAlt:
          "Lech-Bud projects page on desktop — a photo gallery filterable by type of work.",
        homeMobileLabel: "HOMEPAGE — MOBILE",
        homeMobileAlt:
          "Lech-Bud homepage on mobile — hero and services section adapted to a phone screen.",
        contactDesktopLabel: "CONTACT — DESKTOP",
        contactDesktopAlt:
          "Lech-Bud contact page on desktop — contact details next to an enquiry form.",
        worksMobileLabel: "WORK — MOBILE",
        worksMobileAlt:
          "Lech-Bud projects page on mobile — filterable gallery laid out for a phone.",
      },
      solutionLabel: "WHAT WE DELIVERED",
      solution: [
        {
          area: "Design",
          text: "A clear information hierarchy and an identity tailored to the construction sector.",
        },
        {
          area: "Development",
          text: "A responsive build of a multi-page site, complete with a contact form and a project gallery.",
        },
        {
          area: "Mobile",
          text: "An interface adapted to phones without cutting back on the functionality of the desktop version.",
        },
      ],
      liveCta: "View live website",
      liveExternalHint: "opens in a new tab",
    },
    more: {
      heading: "More projects coming soon.",
      description:
        "The Wertus Digital portfolio will grow as new projects go live.",
    },
    finalCta: {
      label: "CONTACT",
      heading: ["Have a project", "in mind?"],
      description: "Let's talk about your website and the scope it might need.",
      primaryCta: "Start a project",
      secondary: "Or email us at",
    },
  },
  studioPage: {
    meta: {
      title: "About the studio | Wertus Digital",
      description:
        "Meet Wertus Digital — an independent web studio based in Białystok, designing and building modern websites for businesses.",
    },
    hero: {
      label: "ABOUT THE STUDIO",
      headingLine1: "A small studio.",
      headingLine2Lead: "A sharp eye for ",
      headingAccent: "detail.",
      lead: "Wertus Digital is an independent web studio based in Białystok. We design and build websites for companies that need more than an off-the-shelf template.",
      leadSecondary:
        "We bring design, development and technical delivery together in one process — no unnecessary middlemen, no over-complicated collaboration.",
      metaLabel: "STUDIO",
      metaItems: [
        { label: "Model", value: "Independent web studio" },
        { label: "Location", value: "Białystok / Poland" },
        { label: "Reach", value: "Clients across Poland" },
        { label: "Working style", value: "Remote, direct" },
      ],
    },
    approach: {
      index: "01",
      label: "APPROACH",
      heading: ["Websites as tools,", "not just pretty screens."],
      lead: "We don't build websites just to look good above the fold. We design them as tools for real businesses — clear, fast, responsive and easy to grow.",
      body: "Every project starts with understanding the business, its offer and its audience. Design and development come after that.",
      pointsLabel: "IN SHORT",
      points: [
        "Understand the business first, then design.",
        "Clarity and hierarchy over decoration.",
        "Built to grow, not just to launch.",
      ],
    },
    difference: {
      index: "02",
      label: "WHAT SETS US APART",
      heading: ["Direct, focused,", "and never templated."],
      items: [
        {
          index: "01",
          title: "Direct collaboration",
          description:
            "You work directly with the people responsible for design and delivery — without extra layers of middlemen.",
        },
        {
          index: "02",
          title: "Built around your business",
          description:
            "We don't assemble sites from ready-made templates. Layout, structure and features follow the character of the business and its goals.",
        },
        {
          index: "03",
          title: "Design and engineering together",
          description:
            "We treat design and development as one process. The result isn't only well-designed, but also fast, responsive and ready to grow.",
        },
      ],
    },
    process: {
      index: "03",
      label: "HOW WE WORK",
      heading: ["Four stages,", "one clear process."],
      description:
        "From the first conversation to ongoing development — no needless formalities, no vague steps.",
      steps: [
        {
          index: "01",
          title: "We learn the business",
          description:
            "We talk about the company, its offer, its audience and the goal of the site. We agree on the scope and the features you need.",
        },
        {
          index: "02",
          title: "We design",
          description:
            "We build the structure and visual direction so the message stays clear and the design fits the brand.",
        },
        {
          index: "03",
          title: "We build",
          description:
            "We turn the design into a responsive, fast and technically polished website.",
        },
        {
          index: "04",
          title: "We grow it",
          description:
            "After launch we can keep developing the site, adding new features and content, and providing technical care.",
        },
      ],
    },
    capabilities: {
      index: "04",
      label: "CAPABILITIES",
      heading: ["What we", "work on."],
      items: [
        "Web Design",
        "Development",
        "Business websites",
        "Landing pages",
        "E-commerce",
        "CMS",
        "Redesign",
        "Care & growth",
      ],
    },
    tech: {
      index: "05",
      label: "TECHNOLOGY",
      heading: ["Technology chosen", "for the project."],
      body: "We work with a modern stack, but technology is never the point in itself. We pick tools that keep a site fast, stable and ready to grow.",
      stackLabel: "STACK",
      stack: ["Next.js", "React", "TypeScript", "Sanity", "Vercel"],
    },
    location: {
      label: "WORKING TOGETHER",
      place: "Białystok / Poland",
      body: "We work with businesses across Poland through a straightforward remote process.",
    },
    finalCta: {
      label: "CONTACT",
      heading: ["Let's talk", "about your project."],
      description:
        "Tell us what you need. We'll come back with a proposed scope and next steps.",
      primaryCta: "Start a project",
      secondary: "Or email us at",
    },
  },
  footer: {
    studioDescription:
      "We design websites that bring together design, technology and a clear business purpose.",
    menuLabel: "MENU",
    servicesLabel: "SERVICES",
    contactLabel: "CONTACT",
    socialLabel: "SOCIAL",
    services: ["Web Design", "Development", "CMS", "Care & Growth"],
    location: "Białystok / Poland",
    privacy: "Privacy Policy",
    cookies: "Cookies",
    copyright: "All rights reserved.",
  },
  meta: {
    title: "Wertus Digital — web design & development studio",
    description:
      "A boutique digital studio based in Białystok, Poland. We design and build modern websites that build trust and help businesses win new customers.",
  },
};
