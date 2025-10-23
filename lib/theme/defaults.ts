// Tailwind v4-inspired theme defaults and semantic mapping to CSS variables
export const primitives = {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
} as const;

// A small subset of Tailwind default colors (extended) for picker presets
export const tailwindColors = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
} as const;

// Semantic tokens mapping to CSS variables; these will be set on :root
export const semanticTokens = {
  background: "--color-background",
  surface: "--color-surface",
  foreground: "--color-foreground",
  muted: "--color-muted",
  primary: "--color-primary",
  primaryForeground: "--color-primary-foreground",
  accent: "--color-accent",
  success: "--color-success",
  info: "--color-info",
  danger: "--color-danger",
  border: "--color-border",
  ring: "--color-ring",
} as const;

export type ThemeJSON = {
  name: string;
  primitives?: Record<string, string>;
  colors?: Record<string, string>;
  semantic?: Partial<Record<keyof typeof semanticTokens, string>>;
};

export const defaultTheme: ThemeJSON = {
  name: "default",
  primitives: {
    white: primitives.white,
    black: primitives.black,
  },
  colors: {
    primary: tailwindColors.blue[500],
    accent: tailwindColors.emerald[400],
    muted: tailwindColors.zinc[400],
    border: tailwindColors.slate[200],
  },
  semantic: {
    background: "#0f172a",
    surface: "#0b1220",
    foreground: "#e6eef8",
    muted: tailwindColors.zinc[500],
    primary: tailwindColors.blue[500],
    primaryForeground: "#ffffff",
    accent: tailwindColors.emerald[400],
    success: "#10b981",
    info: "#3b82f6",
    danger: "#ef4444",
    border: tailwindColors.slate[200],
    ring: tailwindColors.blue[300],
  },
};

export const solarizedTheme: ThemeJSON = {
  name: "solarized",
  primitives: { white: "#fdf6e3", black: "#073642" },
  colors: {
    primary: "#268bd2",
    accent: "#2aa198",
    muted: "#93a1a1",
    border: "#eee8d5",
  },
  semantic: {
    background: "#002b36",
    surface: "#073642",
    foreground: "#839496",
    muted: "#93a1a1",
    primary: "#268bd2",
    primaryForeground: "#fdf6e3",
    accent: "#2aa198",
    success: "#859900",
    info: "#268bd2",
    danger: "#dc322f",
    border: "#073642",
    ring: "#2aa198",
  },
};
