"use client";
import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";
import type { ThemeJSON } from "@/lib/theme/defaults";
import { defaultTheme } from "@/lib/theme/defaults";

// Using simple inputs to avoid heavy styling; the project uses PrimeReact in unstyled mode,
// but to keep this file dependency-free at first we use native inputs. You can swap to
// PrimeReact components later (ColorPicker, Button, Dropdown, etc.).

export default function ThemeBuilder() {
  const { theme, setTheme } = useTheme();
  const [working, setWorking] = useState<ThemeJSON>(
    () => theme ?? defaultTheme
  );

  const semanticKeys = [
    "background",
    "surface",
    "foreground",
    "muted",
    "primary",
    "primaryForeground",
    "accent",
    "success",
    "info",
    "danger",
    "border",
    "ring",
  ] as const;

  type SemanticKey = (typeof semanticKeys)[number];

  const setSemantic = (key: SemanticKey, value: string) => {
    setWorking((w) => ({
      ...w,
      semantic: { ...(w.semantic ?? {}), [key]: value },
    }));
  };

  const save = () => {
    setTheme(working);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(working, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${working.name || "theme"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadPreset = async (path: string) => {
    try {
      const res = await fetch(path);
      const json = await res.json();
      setTheme(json as ThemeJSON);
      setWorking(json as ThemeJSON);
    } catch {
      // ignore
    }
  };

  const resetToDefault = () => setWorking(defaultTheme);

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <input
          className="border px-2 py-1 flex-1"
          value={working.name}
          onChange={(e) => setWorking({ ...working, name: e.target.value })}
        />
        <button className="btn" onClick={save}>
          Save
        </button>
        <button className="btn" onClick={exportJSON}>
          Export
        </button>
        <button className="btn" onClick={resetToDefault}>
          Reset
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Semantic tokens</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(working.semantic ?? {}).length === 0 && (
            <p className="col-span-2 text-sm text-muted-foreground">
              No semantic tokens yet — edit to add.
            </p>
          )}
          {semanticKeys.map((k) => {
            const val =
              (working.semantic &&
                (working.semantic as Record<string, string>)[k]) ??
              "";
            return (
              <div key={k} className="flex items-center gap-2">
                <label className="w-40 text-sm">{k}</label>
                <input
                  type="color"
                  value={val || "#000000"}
                  onChange={(e) => setSemantic(k, e.target.value)}
                  className="w-12 h-8"
                />
                <input
                  className="border px-2 py-1 flex-1"
                  value={val}
                  onChange={(e) => setSemantic(k, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Presets</h3>
        <div className="flex gap-2">
          <button
            className="btn"
            onClick={() => loadPreset("/themes/default.json")}
          >
            Load Default
          </button>
          <button
            className="btn"
            onClick={() => loadPreset("/themes/solarized.json")}
          >
            Load Solarized
          </button>
        </div>
      </div>
    </div>
  );
}
