import { Instrument_Sans, Instrument_Serif } from "next/font/google";

/**
 * Instrument Sans — primary typeface (UI, body, display).
 * latin-ext covers Polish diacritics (ł ą ę ż ź ć ń ó ś).
 */
export const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/**
 * Instrument Serif — reserved for a single accented word in the hero.
 * Single weight (400); italic is the only style we use.
 */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});
