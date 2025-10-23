"use client";

import { useRef } from "react";
import type { SlidePanelProps } from "@/lib/wordpress/slider-types";
import VideoBackground from "./VideoBackground";
import Link from "next/link";

export default function SlidePanel({ slide, index, total }: SlidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={panelRef}
      className="slide-panel relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden"
      data-slide-index={index}
    >
      {/* Background Image (if no video) */}
      {slide.video_type === "none" && slide.background_image && (
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.background_image.url})`,
            }}
          />
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Video Background */}
      {slide.video_type !== "none" && (
        <>
          {slide.video_type === "youtube" && slide.youtube_url && (
            <VideoBackground
              type="youtube"
              url={slide.youtube_url}
              posterImage={slide.background_image?.url}
            />
          )}
          {slide.video_type === "local" && slide.local_video && (
            <VideoBackground
              type="local"
              url={slide.local_video.url}
              posterImage={slide.background_image?.url}
            />
          )}
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl text-center">
        {slide.heading && (
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ color: slide.text_color }}
          >
            {slide.heading}
          </h2>
        )}

        {slide.subheading && (
          <p
            className="text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ color: slide.text_color }}
          >
            {slide.subheading}
          </p>
        )}

        {slide.button_text && slide.button_url && (
          <Link
            href={slide.button_url}
            className="inline-block px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: slide.text_color,
              color: slide.text_color === "#ffffff" ? "#000000" : "#ffffff",
            }}
          >
            {slide.button_text}
          </Link>
        )}
      </div>

      {/* Slide Indicator */}
      <div
        className="absolute bottom-8 right-8 text-sm font-mono opacity-70"
        style={{ color: slide.text_color }}
      >
        {index + 1} / {total}
      </div>
    </div>
  );
}
