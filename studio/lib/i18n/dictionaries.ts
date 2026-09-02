import { pl } from "@/dictionaries/pl";
import { en } from "@/dictionaries/en";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { pl, en };

/**
 * Dictionaries are plain, statically-imported objects (small, fully
 * serialisable) so they can be read in Server Components and passed
 * straight to Client Components as props without a bundle-size cost.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
