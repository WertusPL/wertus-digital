"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { navKeys, routes, routeKeyFromPath } from "@/lib/i18n/routes";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/dictionaries/types";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { CtaButton } from "@/components/ui/CtaButton";

type Nav = Dictionary["nav"];

export function Navbar({
  locale,
  nav,
  megaMenu,
}: {
  locale: Locale;
  nav: Nav;
  megaMenu: Dictionary["navMegaMenu"];
}) {
  const pathname = usePathname() || "/";
  const activeKey = routeKeyFromPath(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--border-light)] bg-canvas/85 backdrop-blur-md"
          : "border-[color-mix(in_srgb,var(--border-light)_55%,transparent)] bg-canvas/70",
      )}
    >
      <nav
        aria-label={nav.primaryNav}
        className="wd-container flex items-center justify-between"
        style={{ height: "var(--nav-height)" }}
      >
        <Logo href={routes.home[locale]} priority />

        {/* Desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {navKeys.map((key) => {
              const isActive = key === activeKey;
              // "Services" carries a desktop mega menu; the rest are plain links.
              if (key === "services") {
                return (
                  <li key={key}>
                    <ServicesMegaMenu
                      locale={locale}
                      label={nav.services}
                      megaMenu={megaMenu}
                      isActive={isActive}
                    />
                  </li>
                );
              }
              return (
                <li key={key}>
                  <Link
                    href={routes[key][locale]}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative inline-block text-[14px] transition-colors duration-200",
                      isActive ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {nav[key]}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px w-full bg-ink transition-transform duration-300 ease-out",
                        isActive
                          ? "scale-x-100"
                          : "origin-left scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <span
            aria-hidden="true"
            className="h-4 w-px bg-[var(--border-light)]"
          />

          <LanguageSwitcher current={locale} groupLabel={nav.languageLabel} />

          <CtaButton href={routes.contact[locale]} label={nav.cta} />
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <MobileMenu locale={locale} nav={nav} megaMenu={megaMenu} />
        </div>
      </nav>
    </motion.header>
  );
}
