"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocalStorageTheme } from "@/lib/theme/hooks";
import type { SemanticToken } from "@/lib/theme/types";

// PrimeReact Components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

// Using styled Aura theme with custom overrides
// No need for individual pt configs anymore
import HeaderSpacer from "@/components/HeaderSpacer";

export default function PrimeReactClient() {
  const { theme } = useLocalStorageTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Component states
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [checked, setChecked] = useState(false);
  const menuRef = useRef<Menu>(null);

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
      const sections = containerRef.current.querySelectorAll(".prime-section");
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

  // Sample data for dropdown
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  // Sample data for DataTable
  const products = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 99 },
    { id: 2, name: "Smart Watch", category: "Wearables", price: 249 },
    { id: 3, name: "Laptop Stand", category: "Accessories", price: 49 },
    { id: 4, name: "USB-C Cable", category: "Cables", price: 12 },
    { id: 5, name: "Mechanical Keyboard", category: "Peripherals", price: 159 },
  ];

  // Menu items
  const menuItems: MenuItem[] = [
    { label: "Profile", icon: "pi pi-user" },
    { label: "Settings", icon: "pi pi-cog" },
    { separator: true },
    { label: "Logout", icon: "pi pi-sign-out" },
  ];

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
            PrimeReact Showcase
          </h1>
          <p
            className="text-xl max-w-2xl"
            style={{ color: getColor("muted") }}
          >
            PrimeReact v9.5 components using <strong>Lara Dark theme</strong>{" "}
            customized with <strong>{theme.name}</strong> color palette
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Buttons Section */}
        <section className="prime-section mb-16">
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
              <Button label="Disabled" disabled />
              <Button label="With Icon" icon="pi pi-check" />
              <Button
                label="Show Dialog"
                icon="pi pi-external-link"
                onClick={() => setDialogVisible(true)}
              />
            </div>
          </div>
        </section>

        {/* Dialog Section */}
        <section className="prime-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Dialog / Modal
          </h2>
          <Dialog
            header="Example Dialog"
            visible={dialogVisible}
            style={{ width: "50vw" }}
            onHide={() => setDialogVisible(false)}
          >
            <p>
              This is a PrimeReact Dialog component styled with the Lara Dark theme
              customized to match our semantic color tokens.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                label="Cancel"
                outlined
                onClick={() => setDialogVisible(false)}
              />
              <Button
                label="Confirm"
                onClick={() => setDialogVisible(false)}
              />
            </div>
          </Dialog>
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <p
              className="mb-4"
              style={{ color: getColor("foreground") }}
            >
              Click the "Show Dialog" button above to see the dialog in action.
            </p>
          </div>
        </section>

        {/* Form Components Section */}
        <section className="prime-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Form Components
          </h2>
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <div className="space-y-6 max-w-2xl">
              {/* Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dropdown
                </label>
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Select a City"
                  className="w-full"
                />
              </div>

              {/* Input Text */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Input Text
                </label>
                <InputText
                  placeholder="Enter text..."
                  className="w-full"
                />
              </div>

              {/* Calendar */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Calendar
                </label>
                <Calendar
                  value={date}
                  onChange={(e) => setDate(e.value as Date)}
                  placeholder="Select a date"
                  className="w-full"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox
                  inputId="agree"
                  checked={checked}
                  onChange={(e) => setChecked(e.checked || false)}
                />
                <label
                  htmlFor="agree"
                  className="cursor-pointer"
                >
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Section */}
        <section className="prime-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            DataTable
          </h2>
          <DataTable
            value={products}
            stripedRows
            className="border border-[var(--color-border)] rounded-xl overflow-hidden"
          >
            <Column field="id" header="ID" sortable />
            <Column field="name" header="Name" sortable />
            <Column field="category" header="Category" sortable />
            <Column
              field="price"
              header="Price"
              sortable
              body={(rowData) => `$${rowData.price}`}
            />
          </DataTable>
        </section>

        {/* Menu Section */}
        <section className="prime-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Menu
          </h2>
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <Button
              label="Show Menu"
              icon="pi pi-bars"
              onClick={(e) => menuRef.current?.toggle(e)}
            />
            <Menu
              model={menuItems}
              popup
              ref={menuRef}
            />
          </div>
        </section>

        {/* Integration Info */}
        <section className="prime-section mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: getColor("foreground") }}
          >
            Theme Integration
          </h2>
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: getColor("surface"),
              borderWidth: "1px",
              borderColor: getColor("border"),
            }}
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: getColor("foreground") }}
            >
              How It Works
            </h3>
            <div className="space-y-4">
              <p style={{ color: getColor("foreground") }}>
                PrimeReact components use the <strong>Lara Dark theme</strong>{" "}
                as a base, with CSS variable overrides in{" "}
                <code
                  className="px-2 py-1 rounded font-mono text-sm"
                  style={{
                    backgroundColor: getColor("muted"),
                    color: getColor("mutedForeground"),
                  }}
                >
                  app/primereact-theme.css
                </code>
              </p>
              <ul
                className="list-disc list-inside space-y-2 ml-4"
                style={{ color: getColor("muted") }}
              >
                <li>
                  <strong>Base:</strong> Lara Dark theme provides professional
                  styling out of the box
                </li>
                <li>
                  <strong>Customization:</strong> CSS variables map PrimeReact
                  theme tokens to our semantic colors
                </li>
                <li>
                  <strong>Integration:</strong> All components automatically use
                  theme colors from{" "}
                  <code>useLocalStorageTheme</code>
                </li>
                <li>
                  <strong>Layer ordering:</strong> tailwind-base → primereact →
                  tailwind-utilities
                </li>
                <li>
                  <strong>Best of both:</strong> PrimeReact polish + custom
                  theme flexibility
                </li>
              </ul>
              <div
                className="mt-6 p-4 rounded-lg"
                style={{
                  backgroundColor: getColor("info"),
                  color: getColor("infoForeground"),
                }}
              >
                <strong>Pro Tip:</strong> Visit the Theme page to switch between
                different color palettes. All PrimeReact components update
                automatically via CSS variables!
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
