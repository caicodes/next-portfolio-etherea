"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FullscreenSliderProps } from "@/lib/wordpress/slider-types";
import SlidePanel from "./SlidePanel";

gsap.registerPlugin(ScrollTrigger);

export default function FullscreenSlider({
  slides,
  className = "",
}: FullscreenSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !slidesRef.current || slides.length === 0) {
        return;
      }

      const totalSlides = slides.length;
      const container = containerRef.current;
      const slidesContainer = slidesRef.current;

      // Calculate total width: number of slides × 100vw
      const totalWidth = totalSlides * window.innerWidth;

      // Create horizontal scroll effect
      const mainTimeline = gsap.to(slidesContainer, {
        x: -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Optional: Parallax effect on slide content
      const panels = slidesContainer.querySelectorAll(".slide-panel");
      panels.forEach((panel) => {
        const content = panel.querySelector(".relative.z-10");
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: panel,
                start: "left center",
                end: "center center",
                scrub: 1,
                containerAnimation: mainTimeline,
              },
            }
          );
        }
      });
    },
    { dependencies: [slides], scope: containerRef }
  );

  if (slides.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <p className="text-2xl">No slides available</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Horizontal slides container */}
      <div
        ref={slidesRef}
        className="flex flex-row"
        style={{
          width: `${slides.length * 100}vw`,
        }}
      >
        {slides.map((slide, index) => (
          <SlidePanel
            key={slide.id}
            slide={slide}
            index={index}
            total={slides.length}
          />
        ))}
      </div>
    </div>
  );
}
