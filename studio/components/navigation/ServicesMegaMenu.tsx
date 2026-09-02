"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";
import { serviceAnchorId, type ServiceAnchorKey } from "@/components/services-page/anchors";
import { ServicesMegaMenuPreview } from "./ServicesMegaMenuPreview";

const EASE = [0.22, 1, 0.36, 1] as const;

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};
const listItem = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
};

type MegaMenu = Dictionary["navMegaMenu"];

/**
 * Desktop mega menu for the "Oferta / Services" nav item. Opens on hover and on
 * keyboard focus (plus click navigates to the full offer). The trigger fills the
 * navbar height so there is no dead gap between it and the panel; a short grace
 * timer on pointer-leave is a backstop, not the primary mechanism. Closes on
 * Escape (returns focus to the trigger), outside click, focus leaving the area,
 * link click and route change. Rendered only in the desktop nav (lg+).
 */
export function ServicesMegaMenu({
  locale,
  label,
  megaMenu,
  isActive,
}: {
  locale: Locale;
  label: string; // the nav item label ("Oferta" / "Services")
  megaMenu: MegaMenu;
  isActive: boolean;
}) {
  const panelId = useId();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<number | null>(null);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const servicesHref = routes.services[locale];
  const items = megaMenu.items;
  const activeItem = items[activeIndex];
  const hrefFor = (key: ServiceAnchorKey) =>
    `${servicesHref}#${serviceAnchorId(key, locale)}`;

  const clearTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearTimer();
    setOpen(true);
  }, [clearTimer]);

  const closeNow = useCallback(() => {
    clearTimer();
    setOpen(false);
    setActiveIndex(0);
  }, [clearTimer]);

  const scheduleClose = useCallback(() => {
    clearTimer();
    // Small grace so a stray pixel between trigger and panel doesn't slam it shut.
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  }, [clearTimer]);

  // Close on route change (e.g. clicking an anchor from another page).
  useEffect(() => {
    closeNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Outside click — listener only while open, cleaned up on close/unmount.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => clearTimer, [clearTimer]);

  return (
    <div
      ref={rootRef}
      className="relative flex h-[var(--nav-height)] items-center"
      onPointerEnter={openMenu}
      onPointerLeave={scheduleClose}
      onFocus={openMenu}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          closeNow();
          triggerRef.current?.focus();
        }
      }}
    >
      <Link
        ref={triggerRef}
        href={servicesHref}
        aria-current={isActive ? "page" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={closeNow}
        className={cn(
          "group relative inline-flex items-center gap-1 text-[14px] transition-colors duration-200",
          isActive || open ? "text-ink" : "text-muted hover:text-ink",
        )}
      >
        {label}
        <span
          aria-hidden="true"
          className={cn(
            "mt-px text-[9px] text-muted transition-transform duration-200 ease-out",
            open && "rotate-180 text-ink",
          )}
        >
          ▾
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-1.5 left-0 h-px w-full bg-ink transition-transform duration-300 ease-out",
            isActive || open
              ? "scale-x-100"
              : "origin-left scale-x-0 group-hover:scale-x-100",
          )}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            aria-label={megaMenu.panelLabel}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="fixed inset-x-0 top-[var(--nav-height)] z-40"
          >
            <div className="wd-container">
              <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,44%)_minmax(0,56%)] overflow-hidden rounded-xl border border-[var(--border-light)] bg-canvas shadow-[0_24px_60px_-30px_rgba(16,17,20,0.45)]">
                {/* Left — service list */}
                <div className="flex flex-col p-7 lg:p-8">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                    {megaMenu.label}
                  </span>

                  <motion.ul
                    variants={listContainer}
                    initial="hidden"
                    animate="visible"
                    className="mt-5 flex flex-col"
                  >
                    {items.map((item, i) => {
                      const itemActive = i === activeIndex;
                      return (
                        <motion.li key={item.key} variants={listItem}>
                          <Link
                            href={hrefFor(item.key)}
                            onMouseEnter={() => setActiveIndex(i)}
                            onFocus={() => setActiveIndex(i)}
                            onClick={closeNow}
                            className={cn(
                              "group grid grid-cols-[auto_1fr] gap-x-4 border-l-2 py-3 pl-4 pr-2 transition-colors duration-200",
                              itemActive
                                ? "border-accent bg-[color-mix(in_srgb,var(--color-accent)_5%,transparent)]"
                                : "border-transparent hover:bg-[color-mix(in_srgb,var(--color-ink)_3%,transparent)]",
                            )}
                          >
                            <span
                              className={cn(
                                "text-[12px] font-medium tabular-nums tracking-[0.1em] transition-colors duration-200",
                                itemActive ? "text-accent" : "text-muted",
                              )}
                            >
                              {item.index}
                            </span>
                            <span className="min-w-0">
                              <span
                                className={cn(
                                  "block text-[15px] font-medium leading-tight transition-colors duration-200",
                                  itemActive ? "text-ink" : "text-ink/85",
                                )}
                              >
                                {item.title}
                              </span>
                              <span className="mt-1 block text-[13px] leading-[1.4] text-muted">
                                {item.subtitle}
                              </span>
                            </span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>

                  {/* Full-width separator ties the link to the list above. */}
                  <div className="mt-6 border-t border-[var(--border-light)] pt-5">
                    <Link
                      href={servicesHref}
                      onClick={closeNow}
                      className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink"
                    >
                      {megaMenu.allServices}
                      <span
                        aria-hidden="true"
                        className="text-accent transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right — dynamic preview */}
                <div className="border-l border-[var(--border-light)] bg-[color-mix(in_srgb,var(--color-ink)_2.5%,transparent)] p-5 lg:p-6">
                  <div className="h-[300px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeItem.key}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="h-full"
                      >
                        <ServicesMegaMenuPreview
                          item={activeItem}
                          href={hrefFor(activeItem.key)}
                          detailsCta={megaMenu.detailsCta}
                          onNavigate={closeNow}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
