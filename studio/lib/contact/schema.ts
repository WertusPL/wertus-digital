import type { Locale } from "@/lib/i18n/config";

/**
 * Server-side contract for the contact form. The frontend validates too, but
 * this is the source of truth — the API never trusts the client. Service and
 * budget arrive as internal IDs (matching the form's option values) and are
 * mapped to human labels here, so the delivered email can't be forged from a
 * client-supplied label.
 */

export const SERVICE_IDS = ["business", "landing", "cms", "care", "other"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const BUDGET_IDS = [
  "lt-2500",
  "2500-4000",
  "4000-7000",
  "gt-7000",
  "unsure",
] as const;
export type BudgetId = (typeof BUDGET_IDS)[number];

/** Reasonable length caps — reject oversized / abusive payloads. */
export const LIMITS = { name: 100, email: 254, company: 120, message: 5000 } as const;
export const MESSAGE_MIN = 2;

const SERVICE_LABELS: Record<ServiceId, Record<Locale, string>> = {
  business: { pl: "Strona firmowa", en: "Business website" },
  landing: { pl: "Landing Page", en: "Landing page" },
  cms: { pl: "CMS / rozbudowa", en: "CMS / development" },
  care: { pl: "Opieka i rozwój", en: "Care & growth" },
  other: { pl: "Inne", en: "Other" },
};

const BUDGET_LABELS: Record<BudgetId, Record<Locale, string>> = {
  "lt-2500": { pl: "do 2 500 zł", en: "up to PLN 2,500" },
  "2500-4000": { pl: "2 500 – 4 000 zł", en: "PLN 2,500 – 4,000" },
  "4000-7000": { pl: "4 000 – 7 000 zł", en: "PLN 4,000 – 7,000" },
  "gt-7000": { pl: "powyżej 7 000 zł", en: "above PLN 7,000" },
  unsure: { pl: "jeszcze nie wiem", en: "not sure yet" },
};

export function serviceLabel(id: ServiceId, locale: Locale): string {
  return SERVICE_LABELS[id][locale];
}
export function budgetLabel(id: BudgetId, locale: Locale): string {
  return BUDGET_LABELS[id][locale];
}

export type ContactData = {
  name: string;
  email: string;
  company: string;
  service: ServiceId;
  budget: BudgetId | null;
  message: string;
  locale: Locale;
};

export type ValidationResult =
  | { ok: true; honeypot: boolean; data: ContactData }
  | { ok: false; errors: Record<string, string> };

// No whitespace allowed either side of the @, and a dot in the domain.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}
/** Collapse CR/LF so single-line fields can't inject email headers. */
function singleLine(v: string): string {
  return v.replace(/[\r\n]+/g, " ").trim();
}

export function validateContact(raw: unknown): ValidationResult {
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = singleLine(str(input.name));
  if (!name) errors.name = "required";
  else if (name.length > LIMITS.name) errors.name = "too_long";

  const email = singleLine(str(input.email));
  if (!email) errors.email = "required";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "invalid";

  const company = singleLine(str(input.company));
  if (!company) errors.company = "required";
  else if (company.length > LIMITS.company) errors.company = "too_long";

  const service = str(input.service);
  if (!service) errors.service = "required";
  else if (!(SERVICE_IDS as readonly string[]).includes(service)) errors.service = "invalid";

  const budgetRaw = str(input.budget);
  let budget: BudgetId | null = null;
  if (budgetRaw) {
    if (!(BUDGET_IDS as readonly string[]).includes(budgetRaw)) errors.budget = "invalid";
    else budget = budgetRaw as BudgetId;
  }

  const message = str(input.message);
  if (!message) errors.message = "required";
  else if (message.length < MESSAGE_MIN) errors.message = "too_short";
  else if (message.length > LIMITS.message) errors.message = "too_long";

  const locale: Locale = str(input.locale) === "en" ? "en" : "pl";
  const honeypot = str(input.company_url).length > 0;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    honeypot,
    data: { name, email, company, service: service as ServiceId, budget, message, locale },
  };
}
