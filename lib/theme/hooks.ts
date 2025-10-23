"use client";

import { useState, useEffect, useCallback } from "react";
import type { ThemeJSON, SemanticToken } from "./types";
import { semanticTokenToCSSVar } from "./types";
import { defaultTheme } from "./defaults";

const STORAGE_KEY = "theme.current";

/**
 * Custom hook for managing theme with localStorage persistence
 * Replaces the need for a global ThemeProvider context
 */
export function useLocalStorageTheme(initialTheme?: ThemeJSON) {
  // Always initialize with default theme to prevent hydration mismatch
  const [theme, setThemeState] = useState<ThemeJSON>(initialTheme || defaultTheme);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage after hydration (client-side only)
  useEffect(() => {
    setIsHydrated(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ThemeJSON;
        setThemeState(parsed);
      }
    } catch (error) {
      console.error("Failed to load theme from localStorage:", error);
    }
  }, []);

  // Apply theme CSS variables and persist to localStorage
  useEffect(() => {
    if (!isHydrated) return; // Don't apply until after hydration

    const root = document.documentElement;

    // Apply semantic tokens to :root
    if (theme.semantic) {
      Object.entries(theme.semantic).forEach(([key, value]) => {
        if (value) {
          const cssVar = semanticTokenToCSSVar[key as SemanticToken];
          root.style.setProperty(cssVar, value);
        }
      });
    }

    // Apply primitives
    if (theme.primitives) {
      Object.entries(theme.primitives).forEach(([key, value]) => {
        root.style.setProperty(`--p-${key}`, value);
      });
    }

    // Apply custom colors
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--c-${key}`, value);
      });
    }

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }, [theme, isHydrated]);

  const setTheme = useCallback((newTheme: ThemeJSON) => {
    setThemeState(newTheme);
  }, []);

  const updatePartial = useCallback((patch: Partial<ThemeJSON>) => {
    setThemeState((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateSemantic = useCallback(
    (key: SemanticToken, value: string) => {
      setThemeState((prev) => ({
        ...prev,
        semantic: {
          ...prev.semantic,
          [key]: value,
        },
      }));
    },
    []
  );

  const resetTheme = useCallback(() => {
    setThemeState(defaultTheme);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    theme,
    setTheme,
    updatePartial,
    updateSemantic,
    resetTheme,
  };
}

/**
 * Hook for tracking theme history (undo/redo functionality)
 */
export function useThemeHistory(maxHistory = 20) {
  const [history, setHistory] = useState<ThemeJSON[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const addToHistory = useCallback(
    (theme: ThemeJSON) => {
      setHistory((prev) => {
        // Remove any future history if we're not at the end
        const newHistory = prev.slice(0, currentIndex + 1);
        // Add new theme
        newHistory.push(theme);
        // Limit history size
        if (newHistory.length > maxHistory) {
          newHistory.shift();
          return newHistory;
        }
        setCurrentIndex(newHistory.length - 1);
        return newHistory;
      });
    },
    [currentIndex, maxHistory]
  );

  const undo = useCallback((): ThemeJSON | null => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback((): ThemeJSON | null => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    historyLength: history.length,
  };
}
