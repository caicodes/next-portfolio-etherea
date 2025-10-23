import { Metadata } from "next";
import PrimeReactClient from "./PrimeReactClient";

export const metadata: Metadata = {
  title: "PrimeReact Showcase | Portfolio",
  description:
    "Demonstration of PrimeReact components integrated with our theme system.",
};

export default function PrimeReactPage() {
  return <PrimeReactClient />;
}
