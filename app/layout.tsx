import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "primeicons/primeicons.css";
import "./primereact-theme.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrimeReactProviderWrapper from "@/components/PrimeReactProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Etherea",
  description: "A creative portfolio showcasing design and development work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrimeReactProviderWrapper>
          <Header />
          <SmoothScrollProvider>
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </PrimeReactProviderWrapper>
      </body>
    </html>
  );
}
