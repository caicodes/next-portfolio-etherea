"use client";

import { tailwindColorPalette } from "@/lib/theme/tailwind-colors";

interface ColorTilePickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
}

export default function ColorTilePicker({
  value,
  onChange,
  label,
}: ColorTilePickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded border-2 border-zinc-300 dark:border-zinc-600"
            style={{ backgroundColor: value }}
          />
          <code className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
            {value}
          </code>
        </div>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {tailwindColorPalette.map((family) => (
          <div key={family.name}>
            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
              {family.name}
            </h4>
            <div className="grid grid-cols-11 gap-1">
              {family.shades.map((shade) => (
                <button
                  key={`${family.name}-${shade.name}`}
                  type="button"
                  onClick={() => onChange(shade.value)}
                  className={`
                    w-8 h-8 rounded cursor-pointer transition-all hover:scale-110
                    ${
                      value === shade.value
                        ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 scale-110"
                        : "hover:ring-2 hover:ring-zinc-400 dark:hover:ring-zinc-600"
                    }
                  `}
                  style={{ backgroundColor: shade.value }}
                  title={`${family.name} ${shade.name} - ${shade.value}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
