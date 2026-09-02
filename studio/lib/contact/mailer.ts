import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";
import type { BuiltEmail } from "./email";

/**
 * SMTP transport for the contact form. Server-side only — this module is
 * imported exclusively by the API route handler, so nodemailer (and the
 * credentials it reads from the environment) never reach the client bundle.
 *
 * Configuration comes entirely from environment variables (see .env.example).
 * Nothing here is hard-coded except the sender display name and the default
 * recipient, which falls back to the public studio address.
 */

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  from: string;
};

/**
 * Reads and validates SMTP config from the environment. Returns null when any
 * required variable is missing/invalid, so the caller can refuse to send
 * without leaking which value is absent.
 */
export function getMailConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;

  if (!host || !portRaw || !user || !pass) return null;

  const port = Number(portRaw);
  if (!Number.isFinite(port) || port <= 0) return null;

  // Explicit SMTP_SECURE wins; otherwise infer from the port (465 = implicit TLS).
  const secureEnv = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure =
    secureEnv === "true" ? true : secureEnv === "false" ? false : port === 465;

  const to = process.env.CONTACT_TO_EMAIL?.trim() || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || user;

  return { host, port, secure, user, pass, to, from };
}

// Reuse the transport across invocations (Fluid Compute keeps instances warm).
let cached: nodemailer.Transporter | null = null;
let cachedKey = "";

function getTransport(cfg: MailConfig): nodemailer.Transporter {
  const key = `${cfg.host}:${cfg.port}:${cfg.secure}:${cfg.user}`;
  if (cached && cachedKey === key) return cached;
  cached = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
  cachedKey = key;
  return cached;
}

export async function sendContactEmail(cfg: MailConfig, email: BuiltEmail): Promise<void> {
  const transporter = getTransport(cfg);
  // From must be an address the SMTP account is authorised to send as (SPF/DKIM);
  // Reply-To carries the visitor's address so "Reply" answers them directly.
  await transporter.sendMail({
    from: { name: "Wertus Digital Website", address: cfg.from },
    to: cfg.to,
    replyTo: email.replyTo,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}
