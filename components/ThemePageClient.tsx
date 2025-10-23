"use client";
import React from "react";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeBuilder from "@/components/ThemeBuilder";

export default function ThemePageClient() {
  return (
    <ThemeProvider>
      <main className="min-h-screen p-8 mt-48">
        <h1 className="text-2xl font-bold mb-4">Theme Builder</h1>
        <ThemeBuilder />
      </main>
    </ThemeProvider>
  );
}
