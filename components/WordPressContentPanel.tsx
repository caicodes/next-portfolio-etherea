"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TextAnimationType } from "./WordPressHero";
import {
  splitTextReveal,
  splitTextWave,
  splitTextSlide,
  splitLinesReveal,
} from "@/lib/gsap/textAnimations";

gsap.registerPlugin(ScrollTrigger);

interface WordPressContentPanelProps {
  content: string; // HTML content from WordPress
  backgroundColor?: string;
  textColor?: string;
  dataSpeed?: string; // For parallax effect
  animation?: TextAnimationType;
}

export default function WordPressContentPanel({
  content,
  backgroundColor = "white dark:bg-zinc-900",
  textColor = "text-zinc-900 dark:text-zinc-50",
  dataSpeed = "1.05",
  animation = "reveal",
}: WordPressContentPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll(
      "p, h2, h3, h4, figure, img, ul, ol, blockquote"
    );

    elements.forEach((element) => {
      // Fade in animation for all elements
      gsap.fromTo(
        element,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Apply text animations to headings
      if (element.tagName.match(/H[1-6]/) && animation !== "none") {
        ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          onEnter: () => {
            switch (animation) {
              case "reveal":
                splitTextReveal(element as HTMLElement, { delay: 0.2 });
                break;
              case "wave":
                splitTextWave(element as HTMLElement, { delay: 0.2 });
                break;
              case "slide":
                splitTextSlide(element as HTMLElement, { delay: 0.2 });
                break;
              case "lines":
                splitLinesReveal(element as HTMLElement, { delay: 0.2 });
                break;
            }
          },
          once: true,
        });
      }
    });

    // Image hover effects
    const images = contentRef.current.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" });
      });

      img.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
      });
    });
  }, [animation]);

  return (
    <section
      className={`py-20 ${backgroundColor}`}
      data-speed={dataSpeed}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <article
          ref={contentRef}
          className={`prose prose-lg prose-zinc dark:prose-invert max-w-none ${textColor}
            prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-zinc-600 dark:prose-p:text-zinc-400
            prose-img:rounded-lg prose-img:shadow-xl
            prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:mt-4 prose-figcaption:text-zinc-500`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
