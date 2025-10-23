# PrimeReact Integration Guide

This document explains how PrimeReact v9.5 is integrated with our Next.js 16 + Tailwind CSS 4 + Theme System.

## Overview

PrimeReact provides a comprehensive UI component library with support for unstyled mode, allowing full control over styling via Tailwind CSS and our semantic theme tokens.

## Architecture

### Key Concepts

1. **Unstyled Mode**: PrimeReact components are unstyled by default (no theme CSS imported)
2. **Pass-Through Props (pt)**: Mechanism to inject custom classes and styles into component internals
3. **Theme Integration**: Components use CSS variables from our theme system (`lib/theme/hooks.ts`)
4. **CSS Layer Ordering**: Proper layering prevents Tailwind/PrimeReact conflicts

### File Structure

```
components/
  PrimeReactProvider.tsx    # Wraps app with PrimeReact context

lib/primereact/
  config.ts                 # Theme-aware pt configurations

app/
  globals.css               # CSS layer ordering for compatibility
  primereact/              # PrimeReact component showcase
    page.tsx
    PrimeReactClient.tsx
```

## Setup

### 1. CSS Layer Configuration

In `app/globals.css`, define layer ordering to prevent conflicts:

```css
/* CSS Layer ordering for PrimeReact + Tailwind CSS 4 compatibility */
@layer tailwind-base, primereact, tailwind-utilities;

@layer tailwind-base {
  @import "tailwindcss";
}

@layer tailwind-utilities {
  /* Tailwind utilities will be injected here */
}
```

**Why?** This ensures:
- Tailwind's base styles load first
- PrimeReact styles sit in the middle
- Tailwind utilities have highest specificity

### 2. PrimeReactProvider

Wrap your application in `components/PrimeReactProvider.tsx`:

```typescript
"use client";

import { PrimeReactProvider } from "primereact/api";

export default function PrimeReactProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
```

Then use it in `app/layout.tsx`:

```typescript
import PrimeReactProviderWrapper from "@/components/PrimeReactProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PrimeReactProviderWrapper>
          {/* rest of app */}
        </PrimeReactProviderWrapper>
      </body>
    </html>
  );
}
```

### 3. Theme-Aware Configuration

`lib/primereact/config.ts` provides:

1. **themeClasses** - CSS variable-based classes:
```typescript
export const themeClasses = {
  bg: {
    base: "bg-[var(--color-background)]",
    surface: "bg-[var(--color-surface)]",
  },
  text: {
    base: "text-[var(--color-foreground)]",
    muted: "text-[var(--color-muted)]",
  },
  primary: {
    bg: "bg-[var(--color-primary)]",
    text: "text-[var(--color-primary-foreground)]",
    hover: "hover:bg-[var(--color-primary)]/90",
  },
  // ... all 19 semantic tokens
};
```

2. **Custom pt configurations** for common components:
   - `customButtonPT`
   - `customDialogPT`
   - `customDropdownPT`

## Usage Patterns

### Basic Component Usage

Import PrimeReact components and use them directly:

```typescript
import { Button } from "primereact/button";

// Default (unstyled)
<Button label="Click me" />

// With inline styles
<Button
  label="Styled"
  style={{
    backgroundColor: getColor("primary"),
    color: getColor("primaryForeground"),
  }}
/>
```

### Using Pass-Through Props (pt)

Apply custom styling via the `pt` prop:

```typescript
import { Button } from "primereact/button";
import { customButtonPT } from "@/lib/primereact/config";

// Use pre-configured theme-aware styling
<Button label="Primary" pt={customButtonPT} />
<Button label="Success" severity="success" pt={customButtonPT} />
<Button label="Outlined" outlined pt={customButtonPT} />
```

### Custom Pass-Through Example

Create your own pt configuration:

```typescript
import { twMerge } from "tailwind-merge";
import { themeClasses } from "@/lib/primereact/config";

const myButtonPT = {
  root: ({ props }: any) => ({
    className: twMerge(
      "px-6 py-3 rounded-lg font-medium transition-all",
      themeClasses.primary.bg,
      themeClasses.primary.text,
      themeClasses.primary.hover,
      props.disabled && "opacity-50 cursor-not-allowed"
    ),
  }),
  label: {
    className: "font-semibold",
  },
};

<Button label="Custom" pt={myButtonPT} />
```

### Accessing Theme Colors Dynamically

Use the `useLocalStorageTheme` hook to get current theme colors:

```typescript
import { useLocalStorageTheme } from "@/lib/theme/hooks";
import type { SemanticToken } from "@/lib/theme/types";

function MyComponent() {
  const { theme } = useLocalStorageTheme();

  const getColor = (token: SemanticToken): string => {
    return theme.semantic?.[token] || "#000000";
  };

  return (
    <div style={{ backgroundColor: getColor("surface") }}>
      <InputText
        placeholder="Enter text..."
        style={{
          backgroundColor: getColor("background"),
          color: getColor("foreground"),
          borderColor: getColor("border"),
        }}
      />
    </div>
  );
}
```

## Component Examples

### Button

```typescript
import { Button } from "primereact/button";
import { customButtonPT } from "@/lib/primereact/config";

<Button label="Default" pt={customButtonPT} />
<Button label="Success" severity="success" pt={customButtonPT} />
<Button label="Info" severity="info" pt={customButtonPT} />
<Button label="Warning" severity="warning" pt={customButtonPT} />
<Button label="Danger" severity="danger" pt={customButtonPT} />
<Button label="Outlined" outlined pt={customButtonPT} />
<Button label="With Icon" icon="pi pi-check" pt={customButtonPT} />
```

### Dialog

```typescript
import { Dialog } from "primereact/dialog";
import { customDialogPT } from "@/lib/primereact/config";

const [visible, setVisible] = useState(false);

<Button label="Show" onClick={() => setVisible(true)} />

<Dialog
  header="Modal Title"
  visible={visible}
  onHide={() => setVisible(false)}
  pt={customDialogPT}
>
  <p>Dialog content here</p>
</Dialog>
```

### Dropdown

```typescript
import { Dropdown } from "primereact/dropdown";
import { customDropdownPT } from "@/lib/primereact/config";

const cities = [
  { name: "New York", code: "NY" },
  { name: "London", code: "LDN" },
];

const [selectedCity, setSelectedCity] = useState(null);

<Dropdown
  value={selectedCity}
  onChange={(e) => setSelectedCity(e.value)}
  options={cities}
  optionLabel="name"
  placeholder="Select a City"
  pt={customDropdownPT}
/>
```

### DataTable

```typescript
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const products = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 200 },
];

<DataTable
  value={products}
  style={{
    backgroundColor: getColor("surface"),
    color: getColor("foreground"),
  }}
>
  <Column field="id" header="ID" sortable />
  <Column field="name" header="Name" sortable />
  <Column field="price" header="Price" sortable />
</DataTable>
```

### Form Components

```typescript
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

const [date, setDate] = useState(null);
const [checked, setChecked] = useState(false);

<InputText
  placeholder="Enter text..."
  style={{
    backgroundColor: getColor("background"),
    color: getColor("foreground"),
    borderColor: getColor("border"),
  }}
/>

<Calendar
  value={date}
  onChange={(e) => setDate(e.value)}
  style={{
    backgroundColor: getColor("background"),
    color: getColor("foreground"),
  }}
/>

<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.checked)}
/>
```

## Advanced: Creating Custom pt Configs

For complex components, create reusable pt configurations in `lib/primereact/config.ts`:

```typescript
export const customCardPT = {
  root: {
    className: twMerge(
      "rounded-xl shadow-lg",
      themeClasses.bg.surface,
      themeClasses.border.base,
      "border"
    ),
  },
  header: {
    className: twMerge(
      "p-6 rounded-t-xl",
      themeClasses.text.base,
      "font-bold text-xl"
    ),
  },
  body: {
    className: twMerge("p-6", themeClasses.text.base),
  },
  footer: {
    className: twMerge(
      "p-6 rounded-b-xl",
      themeClasses.bg.muted,
      themeClasses.border.base,
      "border-t"
    ),
  },
};
```

## Best Practices

1. **Always use pt props** for consistent theme integration
2. **Leverage themeClasses** instead of hardcoding colors
3. **Use twMerge** to properly merge Tailwind classes
4. **Keep pt configs in lib/primereact/config.ts** for reusability
5. **Test with multiple themes** via the Theme Builder page
6. **Check WCAG accessibility** in the Showcase page

## Troubleshooting

### Components Look Broken

**Problem**: Components render without styles or look unstyled.

**Solution**: Ensure you're either:
1. Using `pt` props with custom styling, OR
2. Applying inline `style` props with theme colors

PrimeReact v9+ is unstyled by default - you must provide styling.

### Tailwind Classes Not Applying

**Problem**: Tailwind classes in pt props don't work.

**Solution**: Check CSS layer ordering in `globals.css`. Ensure:
```css
@layer tailwind-base, primereact, tailwind-utilities;
```

### Theme Colors Not Updating

**Problem**: Components don't reflect theme changes.

**Solution**: Use CSS variables via `getColor()` function or `themeClasses`, not hardcoded hex values. CSS variables update automatically when theme changes.

### Type Errors with pt Props

**Problem**: TypeScript errors when using custom pt configurations.

**Solution**: Import proper types from PrimeReact:
```typescript
import type { ButtonPassThroughOptions } from "primereact/button";

const customPT: ButtonPassThroughOptions = {
  // ...
};
```

## Resources

- **Live Demo**: Visit `/primereact` page to see all components in action
- **Theme Showcase**: Visit `/showcase` to see theme integration
- **Theme Builder**: Visit `/theme` to create and test custom themes
- **PrimeReact Docs**: https://primereact.org/
- **Pass-Through Props Guide**: https://primereact.org/passthrough/

## Component Library Scope

PrimeReact is particularly valuable for:

- **Drawers/Sidebars**: `Sidebar`, `PanelMenu`
- **Menus**: `Menu`, `MegaMenu`, `TieredMenu`, `ContextMenu`
- **Galleries**: `Galleria`, `Carousel`
- **Forms**: `InputText`, `Calendar`, `MultiSelect`, `TreeSelect`, `AutoComplete`
- **Data Display**: `DataTable`, `DataView`, `Timeline`, `Tree`
- **Overlays**: `Dialog`, `OverlayPanel`, `ConfirmDialog`
- **File Upload**: `FileUpload`
- **Charts**: `Chart` component with Chart.js integration

For simple components (basic buttons, cards, divs), prefer native HTML with Tailwind CSS to keep the bundle size minimal.
