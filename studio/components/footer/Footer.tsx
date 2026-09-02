import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { SITE } from "@/lib/site";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";

export function Footer({
  locale,
  footer,
  nav,
}: {
  locale: Locale;
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
}) {
  const home = routes.home[locale];
  const servicesHref = routes.services[locale];
  const legal = { privacy: routes.privacy[locale], cookies: routes.cookies[locale] };
  const year = new Date().getFullYear();

  // These are all real pages now, so they may prefetch (Next dedupes by href).
  const menu = [
    { label: nav.services, href: routes.services[locale], exists: true },
    { label: nav.work, href: routes.work[locale], exists: true },
    { label: nav.studio, href: routes.studio[locale], exists: true },
    { label: nav.contact, href: routes.contact[locale], exists: true },
  ];

  return (
    <footer className="relative border-t border-[var(--border-dark)] bg-surface text-canvas">
      <div className="wd-container py-[64px] lg:py-[88px]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
          {/* Brand + description + language */}
          <div className="col-span-2 md:col-span-4 md:pr-8">
            <Link href={home} aria-label="Wertus Digital" className="inline-flex">
              <Image
                src="/brand/wertus-digital-light.png"
                alt="Wertus Digital"
                width={710}
                height={140}
                sizes="180px"
                className="h-auto w-[168px]"
              />
            </Link>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-white/60">
              {footer.studioDescription}
            </p>
            <div className="mt-7">
              <LanguageSwitcher current={locale} groupLabel={nav.languageLabel} />
            </div>
          </div>

          {/* Menu */}
          <nav
            aria-label={footer.menuLabel}
            className="col-span-1 md:col-span-2"
          >
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
              {footer.menuLabel}
            </h2>
            <ul className="mt-5 space-y-3">
              {menu.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href} prefetch={item.exists ? undefined : false}>
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
              {footer.servicesLabel}
            </h2>
            <ul className="mt-5 space-y-3">
              {footer.services.map((label) => (
                <li key={label}>
                  {/* Services page exists now → allow prefetch (Next dedupes by href). */}
                  <FooterLink href={servicesHref} prefetch>
                    {label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + social */}
          <div className="col-span-2 md:col-span-3">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
              {footer.contactLabel}
            </h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-white/75 transition-colors duration-200 hover:text-accent"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="text-white/75 transition-colors duration-200 hover:text-accent"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="text-white/55">{footer.location}</li>
            </ul>

            <h2 className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
              {footer.socialLabel}
            </h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 transition-colors duration-200 hover:text-accent"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--border-dark)] pt-7 text-[14px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Wertus Digital. {footer.copyright}
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href={legal.privacy}
                prefetch={false}
                className="transition-colors duration-200 hover:text-canvas"
              >
                {footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={legal.cookies}
                prefetch={false}
                className="transition-colors duration-200 hover:text-canvas"
              >
                {footer.cookies}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  prefetch = false,
}: {
  href: string;
  children: React.ReactNode;
  prefetch?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="text-[15px] text-white/75 transition-colors duration-200 hover:text-accent"
    >
      {children}
    </Link>
  );
}
