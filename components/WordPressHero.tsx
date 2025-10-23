"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import {
  splitTextReveal,
  splitTextWave,
  splitTextSlide,
  splitLinesReveal,
  splitTextBounce,
  splitTextRotate,
} from "@/lib/gsap/textAnimations";

export type TextAnimationType =
  | "reveal"
  | "wave"
  | "slide"
  | "lines"
  | "bounce"
  | "rotate"
  | "none";

interface WordPressHeroProps {
  title: string;
  excerpt?: string;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  overlay?: {
    enabled: boolean;
    opacity?: number;
    color?: string;
  };
  titleAnimation?: TextAnimationType;
  excerptAnimation?: TextAnimationType;
}

export default function WordPressHero({
  title,
  excerpt,
  featuredImage,
  overlay = { enabled: true, opacity: 0.5, color: "rgba(0, 0, 0, 0.5)" },
  titleAnimation = "wave",
  excerptAnimation = "slide",
}: WordPressHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const excerptRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Hero image fade-in
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );
    }

    // Animate title with selected animation type
    if (titleRef.current && titleAnimation !== "none") {
      const delay = 0.5;
      switch (titleAnimation) {
        case "reveal":
          splitTextReveal(titleRef.current, { delay });
          break;
        case "wave":
          splitTextWave(titleRef.current, { delay });
          break;
        case "slide":
          splitTextSlide(titleRef.current, { delay, direction: "up" });
          break;
        case "lines":
          splitLinesReveal(titleRef.current, { delay });
          break;
        case "bounce":
          splitTextBounce(titleRef.current, { delay });
          break;
        case "rotate":
          splitTextRotate(titleRef.current, { delay });
          break;
      }
    }

    // Animate excerpt with selected animation type
    if (excerptRef.current && excerptAnimation !== "none") {
      const delay = 1.2;
      switch (excerptAnimation) {
        case "reveal":
          splitTextReveal(excerptRef.current, { delay });
          break;
        case "wave":
          splitTextWave(excerptRef.current, { delay });
          break;
        case "slide":
          splitTextSlide(excerptRef.current, { delay, direction: "up" });
          break;
        case "lines":
          splitLinesReveal(excerptRef.current, { delay });
          break;
        case "bounce":
          splitTextBounce(excerptRef.current, { delay });
          break;
        case "rotate":
          splitTextRotate(excerptRef.current, { delay });
          break;
      }
    }
  }, [titleAnimation, excerptAnimation]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Featured Image Background */}
      {featuredImage && (
        <div ref={heroRef} className="absolute inset-0">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          {overlay.enabled && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: overlay.color || "rgba(0, 0, 0, 0.5)",
                opacity: overlay.opacity || 0.5,
              }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-6 mt-48">
        <div className="max-w-4xl">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight text-shadow-dramatic"
          >
            {title}
          </h1>
          {excerpt && (
            <p
              ref={excerptRef}
              className="text-xl md:text-2xl text-zinc-200 max-w-2xl mx-auto text-shadow-soft"
            >
              {excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
