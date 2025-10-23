"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocalStorageTheme } from "@/lib/theme/hooks";
import type { SemanticToken } from "@/lib/theme/types";
import { meetsWCAG_AA } from "@/lib/theme/utils";
import { exportThemeJSON, importThemeJSON } from "@/lib/theme/utils";
import { presetThemes } from "@/lib/theme/defaults";
import HeaderSpacer from "@/components/HeaderSpacer";
import ColorTilePicker from "@/components/ColorTilePicker";

// PrimeReact Components
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";

export default function StyleguideClient() {
  const { theme, setTheme } = useLocalStorageTheme();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [workingTheme, setWorkingTheme] = useState(theme);
  const [selectedPreset, setSelectedPreset] = useState<any>(null);
  const [expandedColor, setExpandedColor] = useState<SemanticToken | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
    }

    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll(".sg-section");
      tl.fromTo(
        sections,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.4"
      );
    }
  }, []);

  const getColor = (token: SemanticToken): string => {
    return workingTheme.semantic?.[token] || "#000000";
  };

  const handleColorChange = (token: SemanticToken, color: string) => {
    setWorkingTheme({
      ...workingTheme,
      semantic: {
        ...workingTheme.semantic,
        [token]: color,
      },
    });
  };

  const applyTheme = () => {
    setTheme(workingTheme);
    setSidebarVisible(false);
  };

  // Preset options
  const presetOptions = presetThemes.map((preset, index) => ({
    label: preset.name,
    value: index,
  }));

  const handleLoadPreset = (e: any) => {
    const selectedIndex = e.value;
    if (selectedIndex >= 0 && selectedIndex < presetThemes.length) {
      const selectedTheme = presetThemes[selectedIndex];
      setWorkingTheme(selectedTheme);
      setTheme(selectedTheme);
      setSelectedPreset(e.value);
    }
  };

  const handleExport = () => {
    exportThemeJSON(workingTheme);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const importedTheme = await importThemeJSON(file);
        setWorkingTheme(importedTheme);
        setTheme(importedTheme);
      } catch (error) {
        console.error("Failed to import theme:", error);
      }
    }
  };

  // Semantic tokens grouped
  const semanticTokens: {
    group: string;
    tokens: { token: SemanticToken; label: string }[];
  }[] = [
    {
      group: "Base",
      tokens: [
        { token: "background", label: "Background" },
        { token: "surface", label: "Surface" },
        { token: "foreground", label: "Foreground" },
        { token: "muted", label: "Muted" },
        { token: "mutedForeground", label: "Muted Foreground" },
      ],
    },
    {
      group: "Brand",
      tokens: [
        { token: "primary", label: "Primary" },
        { token: "primaryForeground", label: "Primary Foreground" },
        { token: "accent", label: "Accent" },
        { token: "accentForeground", label: "Accent Foreground" },
      ],
    },
    {
      group: "Feedback",
      tokens: [
        { token: "success", label: "Success" },
        { token: "successForeground", label: "Success Foreground" },
        { token: "info", label: "Info" },
        { token: "infoForeground", label: "Info Foreground" },
        { token: "warning", label: "Warning" },
        { token: "warningForeground", label: "Warning Foreground" },
        { token: "danger", label: "Danger" },
        { token: "dangerForeground", label: "Danger Foreground" },
      ],
    },
    {
      group: "Utilities",
      tokens: [
        { token: "border", label: "Border" },
        { token: "ring", label: "Ring" },
      ],
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: getColor("background") }}
    >
      <HeaderSpacer />

      {/* Header with Theme Button */}
      <div
        ref={headerRef}
        className="py-12"
        style={{
          background: `linear-gradient(to bottom, ${getColor("surface")}, ${getColor("background")})`,
        }}
      >
        <div className="container mx-auto max-w-7xl px-12">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-5xl md:text-6xl font-bold mb-4"
                style={{ color: getColor("foreground") }}
              >
                Style Guide
              </h1>
              <p
                className="text-xl max-w-2xl"
                style={{ color: getColor("muted") }}
              >
                Component library and theme system for{" "}
                <strong>{theme.name}</strong>
              </p>
            </div>
            <Button
              icon="pi pi-palette"
              label="Manage Theme"
              onClick={() => setSidebarVisible(true)}
              size="large"
            />
          </div>
        </div>
      </div>

      {/* Theme Management Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="left"
        modal={false}
        style={{ width: "450px" }}
        className="p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Theme Settings</h2>

        <div className="space-y-6">
          {/* Theme Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Theme Name</label>
            <InputText
              value={workingTheme.name}
              onChange={(e) =>
                setWorkingTheme({ ...workingTheme, name: e.target.value })
              }
              className="w-full"
              placeholder="My Custom Theme"
            />
          </div>

          <Divider />

          {/* Preset Themes */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Load Preset
            </label>
            <Dropdown
              value={selectedPreset}
              onChange={handleLoadPreset}
              options={presetOptions}
              placeholder="Choose a preset theme..."
              className="w-full"
            />
          </div>

          <Divider />

          {/* Color Pickers */}
          <div className="space-y-4">
            <h3 className="font-semibold">Semantic Colors</h3>
            {semanticTokens.map(({ group, tokens }) => (
              <div key={group}>
                <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
                  {group}
                </h4>
                <div className="space-y-3">
                  {tokens.map(({ token, label }) => (
                    <div key={token}>
                      <button
                        onClick={() =>
                          setExpandedColor(
                            expandedColor === token ? null : token
                          )
                        }
                        className="w-full flex items-center justify-between p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <span className="text-sm font-medium">{label}</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: getColor(token) }}
                          />
                          <i
                            className={`pi pi-chevron-${expandedColor === token ? "up" : "down"} text-xs`}
                          />
                        </div>
                      </button>
                      {expandedColor === token && (
                        <div className="mt-2 p-3 bg-zinc-50 dark:bg-zinc-900 rounded">
                          <ColorTilePicker
                            value={getColor(token)}
                            onChange={(color) => handleColorChange(token, color)}
                            label={label}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Divider />

          {/* Actions */}
          <div className="space-y-3">
            <Button
              label="Apply Theme"
              icon="pi pi-check"
              onClick={applyTheme}
              className="w-full"
              severity="info"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                label="Export"
                icon="pi pi-download"
                onClick={handleExport}
                severity="success"
                outlined
              />
              <label className="cursor-pointer">
                <Button
                  label="Import"
                  icon="pi pi-upload"
                  severity="help"
                  outlined
                  className="w-full"
                />
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12 space-y-16">
        {/* Color Palette Section */}
        <section className="sg-section">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Color Palette
          </h2>
          {semanticTokens.map(({ group, tokens }) => (
            <div key={group} className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: getColor("muted") }}
              >
                {group}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tokens.map(({ token, label }) => {
                  const color = getColor(token);
                  return (
                    <div
                      key={token}
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: getColor("surface"),
                        borderWidth: "1px",
                        borderColor: getColor("border"),
                      }}
                    >
                      <div
                        className="w-full h-20 rounded mb-3"
                        style={{ backgroundColor: color }}
                      />
                      <p
                        className="text-sm font-medium mb-1"
                        style={{ color: getColor("foreground") }}
                      >
                        {label}
                      </p>
                      <code
                        className="text-xs font-mono"
                        style={{ color: getColor("muted") }}
                      >
                        {color}
                      </code>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Buttons Section */}
        <section className="sg-section">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Buttons
          </h2>
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <div className="flex flex-wrap gap-4 mb-6">
              <Button label="Default" />
              <Button label="Success" severity="success" />
              <Button label="Info" severity="info" />
              <Button label="Warning" severity="warning" />
              <Button label="Danger" severity="danger" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button label="Outlined" outlined />
              <Button label="Text" text />
              <Button label="With Icon" icon="pi pi-check" />
              <Button icon="pi pi-search" rounded />
            </div>
          </div>
        </section>

        {/* Form Components Section */}
        <section className="sg-section">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Form Components
          </h2>
          <div
            className="p-8 rounded-xl max-w-2xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Input Text
                </label>
                <InputText
                  placeholder="Enter text..."
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dropdown
                </label>
                <Dropdown
                  options={[
                    { label: "Option 1", value: 1 },
                    { label: "Option 2", value: 2 },
                  ]}
                  placeholder="Select an option"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="sg-section">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Alerts & Notifications
          </h2>
          <div className="space-y-4">
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: getColor("success"),
                color: getColor("successForeground"),
              }}
            >
              <strong>Success:</strong> Your changes have been saved!
            </div>
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: getColor("info"),
                color: getColor("infoForeground"),
              }}
            >
              <strong>Info:</strong> Here's some helpful information.
            </div>
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: getColor("warning"),
                color: getColor("warningForeground"),
              }}
            >
              <strong>Warning:</strong> Please review before proceeding.
            </div>
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: getColor("danger"),
                color: getColor("dangerForeground"),
              }}
            >
              <strong>Danger:</strong> This action cannot be undone!
            </div>
          </div>
        </section>

        {/* Accessibility Report */}
        <section className="sg-section">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Accessibility Report
          </h2>
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: getColor("foreground") }}
            >
              WCAG AA Contrast Ratios
            </h3>
            <div className="space-y-2">
              {[
                {
                  fg: "foreground" as SemanticToken,
                  bg: "background" as SemanticToken,
                  label: "Foreground / Background",
                },
                {
                  fg: "primaryForeground" as SemanticToken,
                  bg: "primary" as SemanticToken,
                  label: "Primary Button",
                },
                {
                  fg: "accentForeground" as SemanticToken,
                  bg: "accent" as SemanticToken,
                  label: "Accent Button",
                },
                {
                  fg: "successForeground" as SemanticToken,
                  bg: "success" as SemanticToken,
                  label: "Success Alert",
                },
                {
                  fg: "dangerForeground" as SemanticToken,
                  bg: "danger" as SemanticToken,
                  label: "Danger Alert",
                },
              ].map(({ fg, bg, label }) => {
                const passes = meetsWCAG_AA(getColor(fg), getColor(bg));
                return (
                  <div key={label} className="flex items-center gap-3">
                    <span
                      className={passes ? "text-green-500" : "text-red-500"}
                      style={{ fontSize: "1.2rem" }}
                    >
                      {passes ? "✓" : "✗"}
                    </span>
                    <span style={{ color: getColor("foreground") }}>
                      {label}
                    </span>
                    <span
                      className="ml-auto font-mono text-sm"
                      style={{ color: getColor("muted") }}
                    >
                      {passes ? "Pass" : "Fail"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
