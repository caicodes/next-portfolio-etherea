import { Metadata } from "next";
import ShowcaseClient from "./ShowcaseClient";

export const metadata: Metadata = {
  title: "Theme Showcase | Portfolio",
  description: "Live demonstration of the current theme with all semantic tokens and components in action.",
};

export default function ShowcasePage() {
  return <ShowcaseClient />;
}
