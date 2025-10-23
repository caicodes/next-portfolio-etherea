import { Metadata } from "next";
import ThemeBuilderClient from "./ThemeBuilderClient";

export const metadata: Metadata = {
  title: "Theme Builder | Portfolio",
  description:
    "Customize and build beautiful color themes with live preview. Export and share your custom themes.",
};

export default function ThemePage() {
  return <ThemeBuilderClient />;
}
