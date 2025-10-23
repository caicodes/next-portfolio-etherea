"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { HeroSlide } from "@/lib/slider/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export default function HeroSlider({
  slides,
  autoplay = true,
  autoplayDelay = 5000,
}: HeroSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animate slide content on change
  const animateSlideContent = (index: number) => {
    const slideContent = slideRefs.current[index];
    if (!slideContent) return;

    const tl = gsap.timeline();
    const elements = slideContent.querySelectorAll(
      ".slide-eyebrow, .slide-title, .slide-subtitle, .slide-description, .slide-cta"
    );

    tl.fromTo(
      elements,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  };

  useEffect(() => {
    // Animate first slide on mount
    const timer = setTimeout(() => animateSlideContent(0), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        effect="fade"
        speed={1200}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white !opacity-50",
          bulletActiveClass: "swiper-pagination-bullet-active !opacity-100",
        }}
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
              }
            : false
        }
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          animateSlideContent(swiper.realIndex);
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background - Image or Video */}
              {slide.background.type === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={slide.background.poster}
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={slide.background.src} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.background.src})`,
                  }}
                  role="img"
                  aria-label={slide.background.alt || slide.content.title}
                />
              )}

              {/* Overlay */}
              {slide.overlay?.enabled && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor:
                      slide.overlay.color || "rgba(0, 0, 0, 0.4)",
                    opacity: slide.overlay.opacity || 0.4,
                  }}
                />
              )}

              {/* Content */}
              <div
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="relative z-10 flex h-full items-center justify-center px-6"
              >
                <div
                  className={`max-w-5xl ${
                    slide.content.alignment === "left"
                      ? "text-left"
                      : slide.content.alignment === "right"
                      ? "text-right"
                      : "text-center"
                  }`}
                >
                  {slide.content.eyebrow && (
                    <p className="slide-eyebrow mb-4 text-sm font-semibold uppercase tracking-widest text-white/90 opacity-0">
                      {slide.content.eyebrow}
                    </p>
                  )}

                  <h1 className="slide-title mb-6 text-5xl font-bold leading-tight text-white opacity-0 md:text-6xl lg:text-7xl text-shadow-dramatic">
                    {slide.content.title}
                  </h1>

                  {slide.content.subtitle && (
                    <h2 className="slide-subtitle mb-6 text-2xl font-medium text-white/95 opacity-0 md:text-3xl text-shadow-soft">
                      {slide.content.subtitle}
                    </h2>
                  )}

                  {slide.content.description && (
                    <p className="slide-description mb-8 text-lg text-white/90 opacity-0 md:text-xl text-shadow-soft max-w-3xl mx-auto">
                      {slide.content.description}
                    </p>
                  )}

                  {slide.content.cta && (
                    <div className="slide-cta opacity-0">
                      <a
                        href={slide.content.cta.href}
                        className={`inline-block px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                          slide.content.cta.variant === "secondary"
                            ? "bg-white text-zinc-900 hover:bg-zinc-100"
                            : slide.content.cta.variant === "outline"
                            ? "border-2 border-white text-white hover:bg-white hover:text-zinc-900"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {slide.content.cta.text}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom scroll indicator */}
      <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <svg
          className="h-8 w-8 text-white opacity-75"
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
    </div>
  );
}
