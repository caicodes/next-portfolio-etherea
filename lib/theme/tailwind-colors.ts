/**
 * Tailwind Color Palette
 *
 * Predefined colors for easy semantic token mapping
 */

export interface ColorShade {
  name: string;
  value: string;
}

export interface ColorFamily {
  name: string;
  shades: ColorShade[];
}

export const tailwindColorPalette: ColorFamily[] = [
  {
    name: "Slate",
    shades: [
      { name: "50", value: "#f8fafc" },
      { name: "100", value: "#f1f5f9" },
      { name: "200", value: "#e2e8f0" },
      { name: "300", value: "#cbd5e1" },
      { name: "400", value: "#94a3b8" },
      { name: "500", value: "#64748b" },
      { name: "600", value: "#475569" },
      { name: "700", value: "#334155" },
      { name: "800", value: "#1e293b" },
      { name: "900", value: "#0f172a" },
      { name: "950", value: "#020617" },
    ],
  },
  {
    name: "Zinc",
    shades: [
      { name: "50", value: "#fafafa" },
      { name: "100", value: "#f4f4f5" },
      { name: "200", value: "#e4e4e7" },
      { name: "300", value: "#d4d4d8" },
      { name: "400", value: "#a1a1aa" },
      { name: "500", value: "#71717a" },
      { name: "600", value: "#52525b" },
      { name: "700", value: "#3f3f46" },
      { name: "800", value: "#27272a" },
      { name: "900", value: "#18181b" },
      { name: "950", value: "#09090b" },
    ],
  },
  {
    name: "Blue",
    shades: [
      { name: "50", value: "#eff6ff" },
      { name: "100", value: "#dbeafe" },
      { name: "200", value: "#bfdbfe" },
      { name: "300", value: "#93c5fd" },
      { name: "400", value: "#60a5fa" },
      { name: "500", value: "#3b82f6" },
      { name: "600", value: "#2563eb" },
      { name: "700", value: "#1d4ed8" },
      { name: "800", value: "#1e40af" },
      { name: "900", value: "#1e3a8a" },
      { name: "950", value: "#172554" },
    ],
  },
  {
    name: "Green",
    shades: [
      { name: "50", value: "#f0fdf4" },
      { name: "100", value: "#dcfce7" },
      { name: "200", value: "#bbf7d0" },
      { name: "300", value: "#86efac" },
      { name: "400", value: "#4ade80" },
      { name: "500", value: "#22c55e" },
      { name: "600", value: "#16a34a" },
      { name: "700", value: "#15803d" },
      { name: "800", value: "#166534" },
      { name: "900", value: "#14532d" },
      { name: "950", value: "#052e16" },
    ],
  },
  {
    name: "Red",
    shades: [
      { name: "50", value: "#fef2f2" },
      { name: "100", value: "#fee2e2" },
      { name: "200", value: "#fecaca" },
      { name: "300", value: "#fca5a5" },
      { name: "400", value: "#f87171" },
      { name: "500", value: "#ef4444" },
      { name: "600", value: "#dc2626" },
      { name: "700", value: "#b91c1c" },
      { name: "800", value: "#991b1b" },
      { name: "900", value: "#7f1d1d" },
      { name: "950", value: "#450a0a" },
    ],
  },
  {
    name: "Amber",
    shades: [
      { name: "50", value: "#fffbeb" },
      { name: "100", value: "#fef3c7" },
      { name: "200", value: "#fde68a" },
      { name: "300", value: "#fcd34d" },
      { name: "400", value: "#fbbf24" },
      { name: "500", value: "#f59e0b" },
      { name: "600", value: "#d97706" },
      { name: "700", value: "#b45309" },
      { name: "800", value: "#92400e" },
      { name: "900", value: "#78350f" },
      { name: "950", value: "#451a03" },
    ],
  },
  {
    name: "Purple",
    shades: [
      { name: "50", value: "#faf5ff" },
      { name: "100", value: "#f3e8ff" },
      { name: "200", value: "#e9d5ff" },
      { name: "300", value: "#d8b4fe" },
      { name: "400", value: "#c084fc" },
      { name: "500", value: "#a855f7" },
      { name: "600", value: "#9333ea" },
      { name: "700", value: "#7e22ce" },
      { name: "800", value: "#6b21a8" },
      { name: "900", value: "#581c87" },
      { name: "950", value: "#3b0764" },
    ],
  },
  {
    name: "Teal",
    shades: [
      { name: "50", value: "#f0fdfa" },
      { name: "100", value: "#ccfbf1" },
      { name: "200", value: "#99f6e4" },
      { name: "300", value: "#5eead4" },
      { name: "400", value: "#2dd4bf" },
      { name: "500", value: "#14b8a6" },
      { name: "600", value: "#0d9488" },
      { name: "700", value: "#0f766e" },
      { name: "800", value: "#115e59" },
      { name: "900", value: "#134e4a" },
      { name: "950", value: "#042f2e" },
    ],
  },
];
