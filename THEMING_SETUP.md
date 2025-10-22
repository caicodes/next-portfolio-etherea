# Theming Setup Guide

A comprehensive guide for the token-primitive/semantic design system implemented in this Next.js portfolio using Tailwind CSS v4.

## Overview

This project uses a structured design system approach with three layers:

1. **Design Tokens** - Raw color, spacing, typography values
2. **Semantic Tokens** - Contextual mappings (background, foreground, etc.)
3. **Component Classes** - Ready-to-use UI patterns

## Design Token Structure

### Color System

#### Primitive Color Scales

- **Neutral Scale**: `--neutral-50` to `--neutral-950` (11 steps)
- **Primary Scale**: `--primary-50` to `--primary-900` (9 steps)
- **Accent Scale**: `--accent-50` to `--accent-900` (9 steps)

#### Semantic Color Mapping

```css
/* Light Mode Defaults */
--background: var(--neutral-50);
--foreground: var(--neutral-900);
--muted: var(--neutral-100);
--muted-foreground: var(--neutral-500);
--primary: var(--primary-600);
--secondary: var(--neutral-100);
```

### Typography Scale

- **Sizes**: `--text-xs` (0.75rem) to `--text-4xl` (2.25rem)
- **Fonts**: Geist Sans (primary), Geist Mono (code)

### Spacing Scale

- **Range**: `--space-px` (1px) to `--space-24` (6rem)
- **Consistent 4px base grid system**

### Border Radius

- **Scale**: `--radius-sm` (0.125rem) to `--radius-full` (9999px)

## Dark Mode Implementation

Automatic switching based on `prefers-color-scheme: dark`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: var(--neutral-950);
    --foreground: var(--neutral-100);
    /* Additional overrides... */
  }
}
```

## Component Classes

### Cards

```html
<div class="card">
  <!-- Card content -->
</div>
```

### Buttons

```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-ghost">Ghost Button</button>
```

### Form Inputs

```html
<input class="input" type="text" placeholder="Enter text..." />
```

### Typography

```html
<h1 class="text-heading text-4xl">Main Heading</h1>
<p class="text-body">Body text with proper line height</p>
<span class="text-muted">Muted secondary text</span>
```

### Surfaces

```html
<div class="surface-elevated">Elevated surface with shadow</div>
<button class="surface-interactive">Interactive hover states</button>
```

## Usage Guidelines

### 1. Color Usage

- **Background/Foreground**: Use semantic tokens (`background`, `foreground`)
- **Interactive Elements**: Use `primary` for main actions, `secondary` for secondary actions
- **Hierarchy**: Use `muted` for less important content
- **Status**: Use dedicated status colors (`success`, `warning`, `error`, `info`)

### 2. Typography Hierarchy

```css
/* Headings */
.text-4xl /* Main page titles */
/* Main page titles */
.text-3xl /* Section headings */
.text-2xl /* Subsection headings */
.text-xl  /* Card titles */
.text-lg  /* Large body text */

/* Body Text */
.text-base /* Default body text */
.text-sm   /* Secondary information */
.text-xs; /* Fine print, metadata */
```

### 3. Spacing Consistency

- Use the spacing scale for margins, padding, and gaps
- Follow 4px base grid: `space-1` (4px), `space-2` (8px), etc.
- Common patterns:
  - Card padding: `p-6` or `p-8`
  - Section spacing: `mb-12` or `mb-16`
  - Element gaps: `gap-4` or `gap-6`

### 4. Component Composition

```html
<!-- Example: Portfolio card -->
<div class="card p-6 surface-interactive">
  <h3 class="text-heading text-xl mb-3">Project Title</h3>
  <p class="text-body text-sm mb-4">Project description...</p>
  <div class="flex gap-2">
    <button class="btn btn-primary">View Project</button>
    <button class="btn btn-ghost">Learn More</button>
  </div>
</div>
```

## Extending the System

### Adding New Colors

1. Define primitive scale in `:root`
2. Map to semantic tokens
3. Add dark mode overrides
4. Register in `@theme` directive

```css
/* 1. Primitive */
--success-50: #f0fdf4;
--success-500: #22c55e;
--success-900: #14532d;

/* 2. Semantic */
--success: var(--success-500);
--success-foreground: var(--neutral-50);

/* 3. Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --success: var(--success-400);
  }
}

/* 4. Theme registration */
@theme {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
}
```

### Adding Component Variants

```css
.btn-success {
  @apply btn bg-success text-success-foreground hover:bg-success/90;
}

.card-interactive {
  @apply card surface-interactive cursor-pointer;
}
```

## Integration with PrimeReact

When adding PrimeReact components, map their CSS variables to our tokens:

```css
/* PrimeReact theme integration */
.p-component {
  --primary-color: theme(colors.primary);
  --surface-ground: theme(colors.background);
  --text-color: theme(colors.foreground);
  --border-color: theme(colors.border);
}
```

## File Structure

```
app/
├── globals.css          # Main theme file
└── components/
    ├── ui/             # Base UI components
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   └── Input.tsx
    └── layout/         # Layout components
        ├── Header.tsx
        └── Footer.tsx
```

## Best Practices

1. **Consistency**: Always use semantic tokens, not primitive values directly
2. **Maintainability**: Group related styles in component files
3. **Performance**: Leverage CSS custom properties for dynamic theming
4. **Accessibility**: Ensure sufficient contrast ratios in both light and dark modes
5. **Scalability**: Follow the token → semantic → component hierarchy

## Testing Dark Mode

```javascript
// Toggle dark mode programmatically for testing
document.documentElement.style.colorScheme = "dark";
document.documentElement.style.colorScheme = "light";
```

## Migration Path

When moving from this system to a component library:

1. Map existing semantic tokens to library variables
2. Create wrapper components that use our design system
3. Gradually replace custom classes with library components
4. Maintain consistent spacing and color usage

---

This theming system provides a solid foundation for building a cohesive, maintainable, and scalable design system for your portfolio website.
