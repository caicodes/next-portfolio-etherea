// Pure utility functions for theme operations
import type { ThemeJSON } from "./types";

/**
 * Export theme as JSON file download
 */
export function exportThemeJSON(theme: ThemeJSON): void {
  const blob = new Blob([JSON.stringify(theme, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${theme.name || "theme"}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import theme from JSON file
 */
export function importThemeJSON(file: File): Promise<ThemeJSON> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        // Basic validation
        if (!json.name || !json.semantic) {
          throw new Error("Invalid theme JSON structure");
        }
        resolve(json as ThemeJSON);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

/**
 * Load theme from public presets
 */
export async function loadPresetTheme(path: string): Promise<ThemeJSON | null> {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Failed to fetch preset");
    const json = await res.json();
    return json as ThemeJSON;
  } catch (error) {
    console.error("Error loading preset:", error);
    return null;
  }
}

/**
 * Encode theme to URL-safe base64 string
 */
export function encodeThemeToURL(theme: ThemeJSON): string {
  try {
    const json = JSON.stringify(theme);
    return btoa(json);
  } catch {
    return "";
  }
}

/**
 * Decode theme from URL-safe base64 string
 */
export function decodeThemeFromURL(encoded: string): ThemeJSON | null {
  try {
    const json = atob(encoded);
    return JSON.parse(json) as ThemeJSON;
  } catch {
    return null;
  }
}

/**
 * Generate a shareable URL for a theme
 */
export function generateShareURL(theme: ThemeJSON, baseURL?: string): string {
  const encoded = encodeThemeToURL(theme);
  const base = baseURL || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/theme?share=${encoded}`;
}

/**
 * Validate hex color format
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Convert hex to RGB
 */
export function hexToRGB(hex: string): { r: number; g: number; b: number } | null {
  if (!isValidHexColor(hex)) return null;

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Calculate relative luminance for contrast checking
 */
export function getLuminance(hex: string): number | null {
  const rgb = hexToRGB(hex);
  if (!rgb) return null;

  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(hex1: string, hex2: string): number | null {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);

  if (lum1 === null || lum2 === null) return null;

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG AA standard (4.5:1)
 */
export function meetsWCAG_AA(foreground: string, background: string): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio !== null && ratio >= 4.5;
}

/**
 * Check if color combination meets WCAG AAA standard (7:1)
 */
export function meetsWCAG_AAA(foreground: string, background: string): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio !== null && ratio >= 7;
}

/**
 * Generate complementary color (180° on color wheel)
 */
export function getComplementaryColor(hex: string): string | null {
  const rgb = hexToRGB(hex);
  if (!rgb) return null;

  // Convert to HSL
  const { r, g, b } = rgb;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  const l = (max + min) / 2;
  const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

  if (max !== min) {
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / (max - min) + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / (max - min) + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / (max - min) + 4) / 6;
        break;
    }
  }

  // Add 180° (0.5 in normalized form)
  h = (h + 0.5) % 1;

  // Convert back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const rNew = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const gNew = Math.round(hue2rgb(p, q, h) * 255);
  const bNew = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return rgbToHex(rNew, gNew, bNew);
}
