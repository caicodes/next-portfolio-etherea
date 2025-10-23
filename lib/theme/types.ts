// Enhanced TypeScript types for theme system

export type SemanticToken =
  | "background"
  | "surface"
  | "foreground"
  | "muted"
  | "mutedForeground"
  | "primary"
  | "primaryForeground"
  | "accent"
  | "accentForeground"
  | "success"
  | "successForeground"
  | "info"
  | "infoForeground"
  | "warning"
  | "warningForeground"
  | "danger"
  | "dangerForeground"
  | "border"
  | "ring";

export type SemanticColors = Record<SemanticToken, string>;

export interface ThemeMetadata {
  author?: string;
  description?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ThemeJSON {
  name: string;
  version: string;
  primitives?: Record<string, string>;
  colors?: Record<string, string>;
  semantic: Partial<SemanticColors>;
  metadata?: ThemeMetadata;
}

// Tailwind color scales
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

export type TailwindColorName = "slate" | "zinc" | "blue" | "emerald" | "red" | "amber" | "green" | "purple";

export type TailwindColors = Record<TailwindColorName, ColorScale>;

// CSS variable mapping
export const semanticTokenToCSSVar: Record<SemanticToken, string> = {
  background: "--color-background",
  surface: "--color-surface",
  foreground: "--color-foreground",
  muted: "--color-muted",
  mutedForeground: "--color-muted-foreground",
  primary: "--color-primary",
  primaryForeground: "--color-primary-foreground",
  accent: "--color-accent",
  accentForeground: "--color-accent-foreground",
  success: "--color-success",
  successForeground: "--color-success-foreground",
  info: "--color-info",
  infoForeground: "--color-info-foreground",
  warning: "--color-warning",
  warningForeground: "--color-warning-foreground",
  danger: "--color-danger",
  dangerForeground: "--color-danger-foreground",
  border: "--color-border",
  ring: "--color-ring",
};
