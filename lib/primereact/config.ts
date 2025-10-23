import { twMerge } from "tailwind-merge";

/**
 * PrimeReact theme-aware configuration
 *
 * In PrimeReact v9+, components are unstyled by default (no theme CSS imported).
 * Use pass-through props (pt) to style components with Tailwind classes and our theme CSS variables.
 *
 * This file provides pre-configured pt objects for common components.
 */

/**
 * Theme-aware class helpers
 * These CSS variables are set by our theme system (lib/theme/hooks.ts)
 */
export const themeClasses = {
  // Base colors
  bg: {
    base: "bg-[var(--color-background)]",
    surface: "bg-[var(--color-surface)]",
    muted: "bg-[var(--color-muted)]",
  },
  text: {
    base: "text-[var(--color-foreground)]",
    muted: "text-[var(--color-muted)]",
    mutedForeground: "text-[var(--color-muted-foreground)]",
  },
  border: {
    base: "border-[var(--color-border)]",
  },
  ring: {
    base: "ring-[var(--color-ring)]",
  },

  // Brand colors
  primary: {
    bg: "bg-[var(--color-primary)]",
    text: "text-[var(--color-primary-foreground)]",
    border: "border-[var(--color-primary)]",
    hover: "hover:bg-[var(--color-primary)]/90",
  },
  accent: {
    bg: "bg-[var(--color-accent)]",
    text: "text-[var(--color-accent-foreground)]",
    border: "border-[var(--color-accent)]",
    hover: "hover:bg-[var(--color-accent)]/90",
  },

  // Feedback colors
  success: {
    bg: "bg-[var(--color-success)]",
    text: "text-[var(--color-success-foreground)]",
    border: "border-[var(--color-success)]",
  },
  info: {
    bg: "bg-[var(--color-info)]",
    text: "text-[var(--color-info-foreground)]",
    border: "border-[var(--color-info)]",
  },
  warning: {
    bg: "bg-[var(--color-warning)]",
    text: "text-[var(--color-warning-foreground)]",
    border: "border-[var(--color-warning)]",
  },
  danger: {
    bg: "bg-[var(--color-danger)]",
    text: "text-[var(--color-danger-foreground)]",
    border: "border-[var(--color-danger)]",
  },
};

/**
 * Example: Custom button pass-through
 * Usage: <Button pt={customButtonPT} />
 */
export const customButtonPT = {
  root: ({ props }: any) => ({
    className: twMerge(
      "px-4 py-2 rounded-lg font-medium transition-all duration-200",
      props.severity === "success" && `${themeClasses.success.bg} ${themeClasses.success.text}`,
      props.severity === "info" && `${themeClasses.info.bg} ${themeClasses.info.text}`,
      props.severity === "warning" && `${themeClasses.warning.bg} ${themeClasses.warning.text}`,
      props.severity === "danger" && `${themeClasses.danger.bg} ${themeClasses.danger.text}`,
      !props.severity && `${themeClasses.primary.bg} ${themeClasses.primary.text} ${themeClasses.primary.hover}`,
      props.outlined && `bg-transparent ${themeClasses.border.base} border-2`,
      props.disabled && "opacity-50 cursor-not-allowed"
    ),
  }),
  label: {
    className: "font-medium",
  },
};

/**
 * Example: Custom dialog pass-through
 */
export const customDialogPT = {
  root: {
    className: "rounded-xl shadow-2xl",
  },
  header: {
    className: twMerge(
      "px-6 py-4 rounded-t-xl",
      themeClasses.bg.surface,
      themeClasses.text.base,
      themeClasses.border.base,
      "border-b"
    ),
  },
  content: {
    className: twMerge("px-6 py-4", themeClasses.bg.base, themeClasses.text.base),
  },
  footer: {
    className: twMerge(
      "px-6 py-4 rounded-b-xl",
      themeClasses.bg.surface,
      themeClasses.border.base,
      "border-t"
    ),
  },
};

/**
 * Example: Custom dropdown pass-through
 */
export const customDropdownPT = {
  root: ({ props }: any) => ({
    className: twMerge(
      "w-full rounded-lg cursor-pointer",
      "bg-[var(--color-surface)]",
      "border-2",
      "border-[var(--color-border)]",
      "hover:border-[var(--color-ring)]",
      "transition-all",
      props.disabled && "opacity-50 cursor-not-allowed"
    ),
  }),
  input: {
    className: twMerge(
      "px-4 py-3",
      "text-[var(--color-foreground)]",
      "bg-transparent",
      "outline-none",
      "w-full"
    ),
  },
  trigger: {
    className: twMerge(
      "flex items-center justify-center",
      "w-10",
      "text-[var(--color-muted)]"
    ),
  },
  panel: {
    className: twMerge(
      "rounded-lg shadow-2xl mt-2",
      "bg-[var(--color-surface)]",
      "border-2",
      "border-[var(--color-border)]"
    ),
  },
  wrapper: {
    className: "max-h-64 overflow-auto",
  },
  list: {
    className: "p-2 list-none m-0",
  },
  item: ({ context }: any) => ({
    className: twMerge(
      "px-4 py-3 cursor-pointer transition-colors rounded-md",
      "text-[var(--color-foreground)]",
      context.selected && "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
      !context.selected && "hover:bg-[var(--color-muted)]/30",
      context.focused && !context.selected && "bg-[var(--color-muted)]/20"
    ),
  }),
};

/**
 * Custom InputText pass-through
 */
export const customInputTextPT = {
  root: {
    className: twMerge(
      "w-full px-4 py-3 rounded-lg",
      "bg-[var(--color-surface)]",
      "text-[var(--color-foreground)]",
      "border-2",
      "border-[var(--color-border)]",
      "outline-none",
      "transition-all",
      "hover:border-[var(--color-ring)]",
      "focus:border-[var(--color-ring)]",
      "focus:ring-2",
      "focus:ring-[var(--color-ring)]/20",
      "placeholder:text-[var(--color-muted)]"
    ),
  },
};

/**
 * Custom Calendar pass-through
 */
export const customCalendarPT = {
  root: {
    className: twMerge("w-full"),
  },
  input: {
    root: {
      className: twMerge(
        "w-full px-4 py-3 rounded-lg",
        "bg-[var(--color-surface)]",
        "text-[var(--color-foreground)]",
        "border-2",
        "border-[var(--color-border)]",
        "outline-none",
        "transition-all",
        "hover:border-[var(--color-ring)]",
        "focus:border-[var(--color-ring)]",
        "focus:ring-2",
        "focus:ring-[var(--color-ring)]/20",
        "placeholder:text-[var(--color-muted)]",
        "cursor-pointer"
      ),
    },
  },
  panel: {
    className: twMerge(
      "rounded-xl shadow-2xl mt-2 p-4",
      "bg-[var(--color-surface)]",
      "border-2",
      "border-[var(--color-border)]"
    ),
  },
};

/**
 * Custom Checkbox pass-through
 */
export const customCheckboxPT = {
  root: {
    className: twMerge("inline-flex items-center"),
  },
  box: ({ context }: any) => ({
    className: twMerge(
      "w-6 h-6 rounded flex items-center justify-center",
      "border-2",
      "border-[var(--color-border)]",
      "transition-all cursor-pointer",
      context.checked && "bg-[var(--color-primary)] border-[var(--color-primary)]",
      !context.checked && "bg-[var(--color-surface)] hover:border-[var(--color-ring)]"
    ),
  }),
  icon: {
    className: twMerge(
      "w-4 h-4",
      "text-[var(--color-primary-foreground)]"
    ),
  },
};

/**
 * Custom DataTable pass-through
 */
export const customDataTablePT = {
  root: {
    className: twMerge(themeClasses.bg.surface, "rounded-xl overflow-hidden"),
  },
  header: {
    className: twMerge(
      "p-4",
      themeClasses.bg.muted,
      themeClasses.text.base,
      "font-semibold"
    ),
  },
  table: {
    className: "w-full border-collapse",
  },
  thead: {
    className: twMerge(themeClasses.bg.muted),
  },
  tbody: {
    className: themeClasses.text.base,
  },
  headerRow: {
    className: themeClasses.border.base,
  },
  headerCell: {
    className: twMerge(
      "px-6 py-4 text-left font-semibold",
      themeClasses.text.base,
      themeClasses.border.base,
      "border-b"
    ),
  },
  bodyRow: ({ context }: any) => ({
    className: twMerge(
      "transition-colors",
      themeClasses.border.base,
      "border-b",
      context.stripedRows && context.index % 2 === 1 && "bg-[var(--color-muted)]/10",
      "hover:bg-[var(--color-muted)]/20"
    ),
  }),
  cell: {
    className: twMerge("px-6 py-4", themeClasses.text.base),
  },
  sortIcon: {
    className: twMerge("ml-2", themeClasses.text.muted),
  },
};

/**
 * Custom Menu pass-through
 */
export const customMenuPT = {
  root: {
    className: twMerge(
      "p-2 rounded-lg shadow-xl min-w-[12rem]",
      themeClasses.bg.surface,
      themeClasses.border.base,
      "border"
    ),
  },
  menu: {
    className: "list-none p-0 m-0",
  },
  menuitem: {
    className: twMerge(
      "px-3 py-2 rounded cursor-pointer transition-colors",
      themeClasses.text.base,
      "hover:bg-[var(--color-muted)]/20"
    ),
  },
  action: {
    className: "flex items-center gap-2",
  },
  icon: {
    className: twMerge("text-base", themeClasses.text.muted),
  },
  label: {
    className: themeClasses.text.base,
  },
  separator: {
    className: twMerge("my-1 border-t", themeClasses.border.base),
  },
};
