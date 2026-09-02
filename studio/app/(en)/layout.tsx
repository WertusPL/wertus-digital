import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/RootShell";

// Root layout for the English route group (URLs under /en).
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
