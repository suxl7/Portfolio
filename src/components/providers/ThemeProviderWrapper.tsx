"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/ThemeContext";

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
