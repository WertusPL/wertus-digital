"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { navKeys, routes } from "@/lib/i18n/routes";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/dictionaries/types";
import { cn } from "@/lib/utils";
import { serviceAnchorId } from "@/components/services-page/anchors";
import { AnimatedGroup } from "@/components/motion/AnimatedGroup";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { CtaButton } from "@/components/ui/CtaButton";

const EASE = [0.22, 1, 0.36, 1] as const;

// Staggered menu items — transform+opacity, so <MotionConfig reducedMotion="user">
// collapses them to a plain fade for reduced-motion users.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};
const navGroupVariants = {
  container: {
    hidden: {},
    visible: { transition: { delayChildren: 0.1, staggerChildren: 0.05 } },
  },
  item: itemVariants,
};
const footerGroupVariants = {
  container: {
    hidden: {},
    visible: { transition: { delayChildren: 0.3, staggerChildren: 0.06 } },
  },
  item: itemVariants,
};

type Nav = Dictionary["nav"];
type MegaMenu = Dictionary["navMegaMenu"];

export function MobileMenu({
  locale,
  nav,
  megaMenu,
}: {
  locale: Locale;
  nav: Nav;
  megaMenu: MegaMenu;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 70);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={nav.openMenu}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center"
      >
        <span className="relative block h-[9px] w-6" aria-hidden="true">
          <span className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-ink" />
          <span className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-ink" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={nav.primaryNav}
            ref={panelRef}
            className="fixed inset-0 z-[60] flex flex-col bg-canvas lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <div
              className="wd-container flex items-center justify-between"
              style={{ height: "var(--nav-height)" }}
            >
              <Logo href={routes.home[locale]} onClick={close} />
              <button
                type="button"
                onClick={close}
                aria-label={nav.closeMenu}
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center"
              >
                <span className="relative block h-6 w-6" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rotate-45 rounded-full bg-ink" />
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 -rotate-45 rounded-full bg-ink" />
                </span>
              </button>
            </div>

            <AnimatedGroup
              as="nav"
              itemAs="div"
              aria-label={nav.primaryNav}
              variants={navGroupVariants}
              className="wd-container flex flex-1 flex-col justify-center gap-1 py-8"
            >
              {navKeys.map((key) =>
                key === "services" ? (
                  <ServicesAccordion
                    key={key}
                    locale={locale}
                    label={nav.services}
                    megaMenu={megaMenu}
                    onNavigate={close}
                  />
                ) : (
                  <Link
                    key={key}
                    href={routes[key][locale]}
                    onClick={close}
                    className="block py-2 text-[clamp(1.75rem,7vw,2.25rem)] font-medium tracking-[-0.02em] text-ink"
                  >
                    {nav[key]}
                  </Link>
                ),
              )}
            </AnimatedGroup>

            <AnimatedGroup
              as="div"
              itemAs="div"
              variants={footerGroupVariants}
              className="wd-container flex items-center justify-between gap-6 border-t border-[var(--border-light)] py-6"
            >
              <LanguageSwitcher current={locale} groupLabel={nav.languageLabel} size="lg" />
              <CtaButton href={routes.contact[locale]} label={nav.cta} />
            </AnimatedGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Mobile services item — a tappable accordion (no hover, no previews). Expands
 * to the four service anchors plus the full offer link. Targets are ≥44px.
 */
function ServicesAccordion({
  locale,
  label,
  megaMenu,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  megaMenu: MegaMenu;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const servicesHref = routes.services[locale];

  return (
    <div className="border-b border-[var(--border-light)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between py-2 text-left text-[clamp(1.75rem,7vw,2.25rem)] font-medium tracking-[-0.02em] text-ink"
      >
        {label}
        {/* +/− morph */}
        <span aria-hidden="true" className="relative block h-5 w-5 shrink-0">
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-ink" />
          <span
            className={cn(
              "absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-ink transition-transform duration-300 ease-out",
              open ? "rotate-90" : "rotate-0",
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="pb-3 pl-1">
              {megaMenu.items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`${servicesHref}#${serviceAnchorId(item.key, locale)}`}
                    onClick={onNavigate}
                    className="flex min-h-[44px] items-center text-[1.05rem] text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={servicesHref}
                  onClick={onNavigate}
                  className="flex min-h-[44px] items-center gap-2 text-[1.05rem] font-medium text-ink"
                >
                  {megaMenu.allServices}
                  <span aria-hidden="true" className="text-accent">
                    ↗
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
