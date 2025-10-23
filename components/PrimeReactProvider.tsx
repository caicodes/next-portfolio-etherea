"use client";

import { PrimeReactProvider } from "primereact/api";

export default function PrimeReactProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // PrimeReact configuration is done via component-level pt props
  // See lib/primereact/config.ts for theme-aware configurations
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
