"use client";

import { useEffect, useState, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NextThemesProvider {...props} attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </NextThemesProvider>
    );
  }

  return (
    <NextThemesProvider {...props} attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemesProvider>
  );
}

export function useThemeContext() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  return {
    theme: resolvedTheme || theme || "dark",
    setTheme,
    mounted: true,
    resolvedTheme,
  };
}