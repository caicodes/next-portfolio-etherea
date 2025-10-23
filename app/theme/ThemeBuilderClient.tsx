"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ThemeJSON, SemanticToken } from "@/lib/theme/types";
import { useLocalStorageTheme } from "@/lib/theme/hooks";
import {
  exportThemeJSON,
  importThemeJSON,
  meetsWCAG_AA,
} from "@/lib/theme/utils";
import { presetThemes } from "@/lib/theme/defaults";

export default function ThemeBuilderClient() {
  const { theme, setTheme } = useLocalStorageTheme();
  const [workingTheme, setWorkingTheme] = useState<ThemeJSON>(theme);
  const [showSuccess, setShowSuccess] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Sync workingTheme when theme changes (e.g., from localStorage)
  useEffect(() => {
    setWorkingTheme(theme);
  }, [theme]);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Header fade in
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
    }

    // Stagger in color controls
    if (controlsRef.current) {
      const controls = controlsRef.current.querySelectorAll(".color-control");
      tl.fromTo(
        controls,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.6 },
        "-=0.4"
      );
    }

    // Preview section
    if (previewRef.current) {
      tl.fromTo(
        previewRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }
  }, []);

  // Semantic token keys to display
  const semanticKeys: SemanticToken[] = [
    "background",
    "surface",
    "foreground",
    "muted",
    "mutedForeground",
    "primary",
    "primaryForeground",
    "accent",
    "accentForeground",
    "success",
    "successForeground",
    "info",
    "infoForeground",
    "warning",
    "warningForeground",
    "danger",
    "dangerForeground",
    "border",
    "ring",
  ];

  // Handle semantic color change
  const handleColorChange = useCallback((key: SemanticToken, value: string) => {
    setWorkingTheme((prev) => ({
      ...prev,
      semantic: {
        ...prev.semantic,
        [key]: value,
      },
    }));
  }, []);

  // Apply theme
  const applyTheme = useCallback(() => {
    setTheme(workingTheme);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    // Success animation
    gsap.fromTo(
      ".success-banner",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  }, [workingTheme, setTheme]);

  // Load preset
  const handleLoadPreset = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedIndex = parseInt(event.target.value);
      if (selectedIndex >= 0 && selectedIndex < presetThemes.length) {
        const selectedTheme = presetThemes[selectedIndex];
        setWorkingTheme(selectedTheme);
        setTheme(selectedTheme);

        // Animate preset change
        if (controlsRef.current) {
          gsap.fromTo(
            controlsRef.current,
            { opacity: 0.3, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
          );
        }
      }
    },
    [setTheme]
  );

  // Export theme
  const handleExport = useCallback(() => {
    exportThemeJSON(workingTheme);
  }, [workingTheme]);

  // Import theme
  const handleImport = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const imported = await importThemeJSON(file);
        setWorkingTheme(imported);
        setTheme(imported);
      } catch (error) {
        console.error("Failed to import theme:", error);
        alert("Failed to import theme. Please check the file format.");
      }
    },
    [setTheme]
  );

  // Format label for display
  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Get color value or default
  const getColorValue = (key: SemanticToken): string => {
    return workingTheme.semantic?.[key] || "#000000";
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950"
    >
      {/* Success Banner */}
      {showSuccess && (
        <div className="success-banner fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
          Theme applied successfully!
        </div>
      )}

      {/* Header */}
      <div
        ref={headerRef}
        className="pt-48 pb-12 bg-linear-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950"
      >
        <div className="container mx-auto max-w-7xl px-12">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Theme Builder
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Customize your color scheme with precision. Build, preview, and
            export beautiful themes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Section (Left - 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Theme Name & Actions */}
            <div className="p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Theme Name
                  </label>
                  <input
                    type="text"
                    value={workingTheme.name}
                    onChange={(e) =>
                      setWorkingTheme({ ...workingTheme, name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="My Custom Theme"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={applyTheme}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Apply Theme
                  </button>
                  <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Export JSON
                  </button>
                  <label className="cursor-pointer">
                    <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      Import JSON
                    </div>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Load Preset Theme
                  </label>
                  <select
                    onChange={handleLoadPreset}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose a preset theme...
                    </option>
                    {presetThemes.map((preset, index) => (
                      <option key={index} value={index}>
                        {preset.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Color Controls */}
            <div className="p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                Semantic Colors
              </h2>
              <div
                ref={controlsRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {semanticKeys.map((key) => {
                  const colorValue = getColorValue(key);
                  const label = formatLabel(key);

                  return (
                    <div key={key} className="color-control">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        {label}
                      </label>
                      <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                        <input
                          type="color"
                          value={colorValue}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-12 h-12 rounded cursor-pointer border-2 border-zinc-300 dark:border-zinc-600"
                        />
                        <input
                          type="text"
                          value={colorValue}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="flex-1 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 rounded text-zinc-900 dark:text-zinc-50 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Preview Section (Right - 1 column) */}
          <div className="lg:col-span-1">
            <div ref={previewRef} className="sticky top-24">
              <div className="p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                  Live Preview
                </h2>

                <div
                  className="space-y-4 p-6 rounded-lg"
                  style={{
                    backgroundColor: getColorValue("background"),
                    color: getColorValue("foreground"),
                    borderColor: getColorValue("border"),
                    borderWidth: "1px",
                  }}
                >
                  {/* Surface card */}
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: getColorValue("surface"),
                      borderColor: getColorValue("border"),
                      borderWidth: "1px",
                    }}
                  >
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: getColorValue("foreground") }}
                    >
                      Preview Card
                    </h3>
                    <p
                      className="text-sm mb-3"
                      style={{ color: getColorValue("muted") }}
                    >
                      This is how your theme will look in practice.
                    </p>

                    {/* Buttons */}
                    <div className="space-y-2">
                      <button
                        className="w-full px-4 py-2 rounded font-medium transition-transform hover:scale-105"
                        style={{
                          backgroundColor: getColorValue("primary"),
                          color: getColorValue("primaryForeground"),
                        }}
                      >
                        Primary Button
                      </button>
                      <button
                        className="w-full px-4 py-2 rounded font-medium transition-transform hover:scale-105"
                        style={{
                          backgroundColor: getColorValue("accent"),
                          color: getColorValue("accentForeground"),
                        }}
                      >
                        Accent Button
                      </button>
                    </div>
                  </div>

                  {/* Status badges */}
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: getColorValue("success"),
                        color: getColorValue("successForeground"),
                      }}
                    >
                      Success
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: getColorValue("info"),
                        color: getColorValue("infoForeground"),
                      }}
                    >
                      Info
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: getColorValue("warning"),
                        color: getColorValue("warningForeground"),
                      }}
                    >
                      Warning
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: getColorValue("danger"),
                        color: getColorValue("dangerForeground"),
                      }}
                    >
                      Danger
                    </span>
                  </div>

                  {/* Border example */}
                  <div
                    className="p-3 rounded"
                    style={{
                      borderColor: getColorValue("border"),
                      borderWidth: "2px",
                      borderStyle: "solid",
                    }}
                  >
                    <p
                      className="text-sm"
                      style={{ color: getColorValue("foreground") }}
                    >
                      Border color example
                    </p>
                  </div>

                  {/* Ring/focus example */}
                  <input
                    type="text"
                    placeholder="Focus ring example"
                    className="w-full px-3 py-2 rounded outline-none transition-all"
                    style={{
                      backgroundColor: getColorValue("surface"),
                      color: getColorValue("foreground"),
                      borderColor: getColorValue("border"),
                      borderWidth: "1px",
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = `0 0 0 3px ${getColorValue(
                        "ring"
                      )}40`;
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Accessibility Info */}
                <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    Accessibility Check
                  </h3>
                  <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          meetsWCAG_AA(
                            getColorValue("foreground"),
                            getColorValue("background")
                          )
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {meetsWCAG_AA(
                          getColorValue("foreground"),
                          getColorValue("background")
                        )
                          ? "✓"
                          : "✗"}
                      </span>
                      <span>Foreground / Background (WCAG AA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          meetsWCAG_AA(
                            getColorValue("primaryForeground"),
                            getColorValue("primary")
                          )
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {meetsWCAG_AA(
                          getColorValue("primaryForeground"),
                          getColorValue("primary")
                        )
                          ? "✓"
                          : "✗"}
                      </span>
                      <span>Primary Button Contrast</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
