"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface EthereaData {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  } | null;
  contentImages: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
}

interface EthereaClientProps {
  data: EthereaData;
}

export default function EthereaClient({ data }: EthereaClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const excerptRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero image fade-in
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }

    // Title drop-in animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "back.out(1.7)",
        }
      );
    }

    // Excerpt fade-in
    if (excerptRef.current) {
      gsap.fromTo(
        excerptRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.8,
          ease: "power3.out",
        }
      );
    }

    // Content scroll reveal
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll(
        "p, h2, h3, figure, img"
      );

      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            y: 80,
            opacity: 0,
          },
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
      });

      // Image hover effects
      const images = contentRef.current.querySelectorAll("img");
      images.forEach((img) => {
        img.addEventListener("mouseenter", () => {
          gsap.to(img, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        img.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section with Featured Image */}
      {data.featuredImage && (
        <section className="relative h-screen w-full overflow-hidden">
          <div ref={heroRef} className="absolute inset-0">
            <Image
              src={data.featuredImage.url}
              alt={data.featuredImage.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center text-center px-6 mt-48">
            <div className="max-w-4xl">
              <h1
                ref={titleRef}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight text-shadow-dramatic"
              >
                {data.title}
              </h1>
              {data.excerpt && (
                <p
                  ref={excerptRef}
                  className="text-xl md:text-2xl text-zinc-200 max-w-2xl mx-auto text-shadow-soft"
                >
                  {data.excerpt}
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
      )}

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-black" data-speed="1.05">
        <div className="container mx-auto px-6 max-w-4xl">
          <article
            ref={contentRef}
            className="prose prose-lg prose-zinc dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-p:text-zinc-600 dark:prose-p:text-zinc-400
              prose-img:rounded-lg prose-img:shadow-xl
              prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:mt-4 prose-figcaption:text-zinc-500"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </section>

      {/* Additional Images Gallery (if any) */}
      {data.contentImages.length > 0 && (
        <section
          className="py-20 bg-zinc-100 dark:bg-zinc-900"
          data-speed="0.95"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-12 text-center">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {data.contentImages.map((image, index) => (
                <figure
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-video overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {image.caption && (
                    <figcaption className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="py-32 bg-zinc-900 dark:bg-black text-white"
        data-speed="0.9"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore More</h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Discover more projects and creative work
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/work"
              className="px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
            >
              View All Work
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
