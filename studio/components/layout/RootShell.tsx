import type { ReactNode } from "react";
import "@/app/globals.css";
import { instrumentSans, instrumentSerif } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { htmlLang, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

/**
 * Shared root layout for both language route groups. Each group's
 * layout calls this with its locale so <html lang> and the dictionary
 * are correct, while all markup lives in one place (no duplication).
 */
export function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const dict = getDictionary(locale);

  return (
    <html
      lang={htmlLang[locale]}
      className={cn(instrumentSans.variable, instrumentSerif.variable)}
    >
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <MotionProvider>
          <Navbar locale={locale} nav={dict.nav} megaMenu={dict.navMegaMenu} />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer locale={locale} footer={dict.footer} nav={dict.nav} />
        </MotionProvider>
      </body>
    </html>
  );
}
