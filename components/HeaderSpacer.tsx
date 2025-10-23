/**
 * HeaderSpacer Component
 *
 * Adds proper spacing below fixed header for pages without hero sections.
 * Height matches the unshrunk header (h-36/h-40) to prevent content from
 * being hidden behind the fixed header.
 */

export default function HeaderSpacer() {
  return (
    <div
      className="h-36 md:h-40"
      aria-hidden="true"
    />
  );
}
