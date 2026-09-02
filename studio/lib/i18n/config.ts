export const locales = ["pl", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

/** BCP-47 tags used for <html lang> and OpenGraph. */
export const htmlLang: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en-GB",
};

export const ogLocale: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_GB",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
