"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ThemeJSON } from "@/lib/theme/defaults";
import { defaultTheme } from "@/lib/theme/defaults";

type ThemeContextValue = {
  theme: ThemeJSON;
  setTheme: (t: ThemeJSON) => void;
  updatePartial: (patch: Partial<ThemeJSON>) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default function ThemeProvider({
  children,
  initial,
}: {
  children: React.ReactNode;
  initial?: ThemeJSON;
}) {
  const [theme, setThemeState] = useState<ThemeJSON>(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem("theme.current")
          : null;
      if (raw) return JSON.parse(raw) as ThemeJSON;
    } catch {
      // ignore
    }
    return initial ?? defaultTheme;
  });

  useEffect(() => {
    // Apply semantic tokens to :root
    if (!theme || typeof window === "undefined") return;
    const root = document.documentElement;
    const semantic = theme.semantic ?? {};
    Object.entries(semantic).forEach(([k, v]) => {
      if (!v) return;
      const varName = `--${k}`;
      root.style.setProperty(varName, v);
    });

    // primitives & colors
    if (theme.primitives) {
      Object.entries(theme.primitives).forEach(([k, v]) =>
        root.style.setProperty(`--p-${k}`, v)
      );
    }
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([k, v]) =>
        root.style.setProperty(`--c-${k}`, v)
      );
    }
    // persist
    try {
      localStorage.setItem("theme.current", JSON.stringify(theme));
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (t: ThemeJSON) => {
    setThemeState(t);
  };

  const updatePartial = (patch: Partial<ThemeJSON>) => {
    setThemeState((prev) => ({ ...prev, ...patch }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updatePartial }}>
      {children}
    </ThemeContext.Provider>
  );
}
