import { budgetLabel, serviceLabel, type ContactData } from "./schema";

/**
 * Builds the enquiry email (subject + plain text + simple, escaped HTML).
 * All user-provided values are HTML-escaped — the visitor cannot inject markup
 * or scripts into the message we receive. The plain-text part is the source of
 * truth; the HTML is a light, mail-client-friendly mirror.
 */

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

const T = {
  pl: {
    title: "Nowe zapytanie — Wertus Digital",
    name: "Imię i nazwisko",
    email: "E-mail",
    company: "Firma",
    service: "Usługa",
    budget: "Budżet",
    message: "Wiadomość",
    locale: "Wersja strony",
    date: "Data",
    none: "—",
    subject: (who: string) => `Nowe zapytanie ze strony — ${who}`,
  },
  en: {
    title: "New enquiry — Wertus Digital",
    name: "Name",
    email: "Email",
    company: "Company",
    service: "Service",
    budget: "Budget",
    message: "Message",
    locale: "Website version",
    date: "Date",
    none: "—",
    subject: (who: string) => `New website enquiry — ${who}`,
  },
} as const;

export type BuiltEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
};

export function buildContactEmail(data: ContactData): BuiltEmail {
  const t = T[data.locale];
  const svc = serviceLabel(data.service, data.locale);
  const bud = data.budget ? budgetLabel(data.budget, data.locale) : t.none;
  const dateStr = new Intl.DateTimeFormat(data.locale === "en" ? "en-GB" : "pl-PL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  }).format(new Date());

  // Subject uses company when present, otherwise the person's name.
  const who = data.company || data.name;
  const subject = t.subject(who);

  const rows: Array<[string, string]> = [
    [t.name, data.name],
    [t.email, data.email],
    [t.company, data.company],
    [t.service, svc],
    [t.budget, bud],
  ];

  const text =
    `${t.title}\n\n` +
    rows.map(([k, v]) => `${k}:\n${v}`).join("\n\n") +
    `\n\n${t.message}:\n${data.message}\n\n` +
    `${t.locale}: ${data.locale.toUpperCase()}\n` +
    `${t.date}: ${dateStr}\n`;

  const label =
    "padding:4px 16px 4px 0;color:#6f7278;font:500 12px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;vertical-align:top;white-space:nowrap";
  const value = "padding:4px 0;color:#101114;font:400 15px/1.5 Arial,sans-serif";
  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="${label}">${escapeHtml(k)}</td><td style="${value}">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const html =
    `<div style="max-width:600px;margin:0 auto;padding:24px;background:#f5f4f0;font-family:Arial,sans-serif;color:#101114">` +
    `<h1 style="margin:0 0 20px;font-size:18px;font-weight:600;color:#101114">${escapeHtml(t.title)}</h1>` +
    `<table style="border-collapse:collapse;width:100%">${htmlRows}</table>` +
    `<div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(16,17,20,.14)">` +
    `<div style="color:#6f7278;font:500 12px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em">${escapeHtml(t.message)}</div>` +
    `<div style="margin-top:6px;color:#101114;font:400 15px/1.6 Arial,sans-serif;white-space:pre-wrap">${escapeHtml(data.message)}</div>` +
    `</div>` +
    `<div style="margin-top:16px;color:#6f7278;font:400 12px/1.5 Arial,sans-serif">` +
    `${escapeHtml(t.locale)}: ${data.locale.toUpperCase()} &middot; ${escapeHtml(t.date)}: ${escapeHtml(dateStr)}</div>` +
    `</div>`;

  return { subject, text, html, replyTo: data.email };
}
