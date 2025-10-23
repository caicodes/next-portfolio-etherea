import { Metadata } from "next";
import StyleguideClient from "./StyleguideClient";

export const metadata: Metadata = {
  title: "Style Guide | Portfolio",
  description:
    "Comprehensive style guide showcasing all UI components and theme management.",
};

export default function StyleguidePage() {
  return <StyleguideClient />;
}
