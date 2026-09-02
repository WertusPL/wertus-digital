/**
 * Real, verified Wertus Digital contact data — single source of truth.
 *
 * These values are carried over from the live company site; do NOT invent or
 * alter them. Anything not confirmed is intentionally left out rather than
 * faked (e.g. LinkedIn/Facebook profiles don't exist yet, so they're absent).
 *
 * `email` is the single source of truth for the public contact address used
 * across the UI (footer, contact page, CTAs) and as the mailer's default
 * recipient. It is currently the active Gmail address; kontakt@wertusdigital.pl
 * is inactive and must not be shown to users until it is re-enabled.
 */
export const SITE = {
  email: "wertusdigital@gmail.com",
  phone: "+48 516 950 801",
  // Dial-ready form of `phone` (no spaces) for tel: links.
  phoneTel: "+48516950801",
  // Live Instagram profile used on the current site. If the handle ever
  // changes, update it here. No other social profiles are confirmed yet.
  instagram: "https://www.instagram.com/wertusdigital/",
} as const;
