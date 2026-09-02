import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/RootShell";

// Root layout for the Polish route group (un-prefixed URLs).
export default function PolishLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="pl">{children}</RootShell>;
}
