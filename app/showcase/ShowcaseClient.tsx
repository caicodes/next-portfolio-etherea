"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocalStorageTheme } from "@/lib/theme/hooks";
import type { SemanticToken } from "@/lib/theme/types";
import { meetsWCAG_AA } from "@/lib/theme/utils";
import HeaderSpacer from "@/components/HeaderSpacer";

export default function ShowcaseClient() {
  const { theme } = useLocalStorageTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

    // Stagger in sections
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll(".showcase-section");
      tl.fromTo(
        sections,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
        "-=0.4"
      );
    }
  }, []);

  const getColor = (token: SemanticToken): string => {
    return theme.semantic?.[token] || "#000000";
  };

  const colorTokens: Array<{ token: SemanticToken; label: string; group: string }> = [
    { token: "background", label: "Background", group: "Base" },
    { token: "surface", label: "Surface", group: "Base" },
    { token: "foreground", label: "Foreground", group: "Base" },
    { token: "muted", label: "Muted", group: "Base" },
    { token: "mutedForeground", label: "Muted Foreground", group: "Base" },
    { token: "primary", label: "Primary", group: "Brand" },
    { token: "primaryForeground", label: "Primary Foreground", group: "Brand" },
    { token: "accent", label: "Accent", group: "Brand" },
    { token: "accentForeground", label: "Accent Foreground", group: "Brand" },
    { token: "success", label: "Success", group: "Feedback" },
    { token: "successForeground", label: "Success Foreground", group: "Feedback" },
    { token: "info", label: "Info", group: "Feedback" },
    { token: "infoForeground", label: "Info Foreground", group: "Feedback" },
    { token: "warning", label: "Warning", group: "Feedback" },
    { token: "warningForeground", label: "Warning Foreground", group: "Feedback" },
    { token: "danger", label: "Danger", group: "Feedback" },
    { token: "dangerForeground", label: "Danger Foreground", group: "Feedback" },
    { token: "border", label: "Border", group: "Utilities" },
    { token: "ring", label: "Ring", group: "Utilities" },
  ];

  const groupedTokens = colorTokens.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof colorTokens>);

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: getColor("background") }}
    >
      <HeaderSpacer />

      {/* Header */}
      <div
        ref={headerRef}
        className="py-12"
        style={{
          background: `linear-gradient(to bottom, ${getColor("surface")}, ${getColor("background")})`,
        }}
      >
        <div className="container mx-auto max-w-7xl px-12">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: getColor("foreground") }}
          >
            Theme Showcase
          </h1>
          <p
            className="text-xl max-w-2xl"
            style={{ color: getColor("muted") }}
          >
            Live demonstration of <strong>{theme.name}</strong> with all semantic
            tokens and components
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Color Palette */}
        <section className="showcase-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Color Palette
          </h2>
          {Object.entries(groupedTokens).map(([group, tokens]) => (
            <div key={group} className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: getColor("muted") }}
              >
                {group}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

        {/* Typography */}
        <section className="showcase-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Typography
          </h2>
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: getColor("foreground") }}
            >
              Heading 1
            </h1>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: getColor("foreground") }}
            >
              Heading 2
            </h2>
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: getColor("foreground") }}
            >
              Heading 3
            </h3>
            <p
              className="text-lg mb-4"
              style={{ color: getColor("foreground") }}
            >
              This is regular body text showcasing the foreground color against
              the surface background.
            </p>
            <p className="text-base" style={{ color: getColor("muted") }}>
              This is muted text, often used for secondary information or
              descriptions.
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section className="showcase-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-6 py-3 rounded-lg font-medium transition-transform hover:scale-105"
              style={{
                backgroundColor: getColor("primary"),
                color: getColor("primaryForeground"),
              }}
            >
              Primary Button
            </button>
            <button
              className="px-6 py-3 rounded-lg font-medium transition-transform hover:scale-105"
              style={{
                backgroundColor: getColor("accent"),
                color: getColor("accentForeground"),
              }}
            >
              Accent Button
            </button>
            <button
              className="px-6 py-3 rounded-lg font-medium transition-transform hover:scale-105"
              style={{
                backgroundColor: "transparent",
                color: getColor("foreground"),
                borderWidth: "2px",
                borderColor: getColor("border"),
              }}
            >
              Outline Button
            </button>
          </div>
        </section>

        {/* Alerts/Notifications */}
        <section className="showcase-section mb-16">
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
              <strong>Success:</strong> Your changes have been saved successfully!
            </div>
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: getColor("info"),
                color: getColor("infoForeground"),
              }}
            >
              <strong>Info:</strong> Here's some helpful information for you.
            </div>
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: getColor("warning"),
                color: getColor("warningForeground"),
              }}
            >
              <strong>Warning:</strong> Please review this before proceeding.
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

        {/* Cards */}
        <section className="showcase-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Cards & Containers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: getColor("surface"),
                  borderWidth: "1px",
                  borderColor: getColor("border"),
                }}
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: getColor("foreground") }}
                >
                  Card {i}
                </h3>
                <p
                  className="mb-4"
                  style={{ color: getColor("muted") }}
                >
                  This is a card component demonstrating surface and border colors.
                </p>
                <button
                  className="px-4 py-2 rounded font-medium"
                  style={{
                    backgroundColor: getColor("primary"),
                    color: getColor("primaryForeground"),
                  }}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Form Elements */}
        <section className="showcase-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Form Elements
          </h2>
          <div
            className="p-8 rounded-xl max-w-2xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: getColor("foreground") }}
                >
                  Input Field
                </label>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                  style={{
                    backgroundColor: getColor("background"),
                    color: getColor("foreground"),
                    borderWidth: "1px",
                    borderColor: getColor("border"),
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 3px ${getColor("ring")}40`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: getColor("foreground") }}
                >
                  Select Dropdown
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg cursor-pointer outline-none"
                  style={{
                    backgroundColor: getColor("background"),
                    color: getColor("foreground"),
                    borderWidth: "1px",
                    borderColor: getColor("border"),
                  }}
                >
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: getColor("foreground") }}
                >
                  Textarea
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter message..."
                  className="w-full px-4 py-2 rounded-lg outline-none"
                  style={{
                    backgroundColor: getColor("background"),
                    color: getColor("foreground"),
                    borderWidth: "1px",
                    borderColor: getColor("border"),
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Report */}
        <section className="showcase-section mb-16">
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
                { fg: "foreground" as SemanticToken, bg: "background" as SemanticToken, label: "Foreground / Background" },
                { fg: "primaryForeground" as SemanticToken, bg: "primary" as SemanticToken, label: "Primary Button" },
                { fg: "accentForeground" as SemanticToken, bg: "accent" as SemanticToken, label: "Accent Button" },
                { fg: "successForeground" as SemanticToken, bg: "success" as SemanticToken, label: "Success Alert" },
                { fg: "dangerForeground" as SemanticToken, bg: "danger" as SemanticToken, label: "Danger Alert" },
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
