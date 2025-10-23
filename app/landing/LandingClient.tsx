"use client";

import WordPressHero from "@/components/WordPressHero";
import WordPressContentPanel from "@/components/WordPressContentPanel";

interface LandingData {
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface LandingClientProps {
  data: LandingData;
}

export default function LandingClient({ data }: LandingClientProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Fullscreen Hero with Featured Image & GSAP Text Animations */}
      <WordPressHero
        title={data.title}
        excerpt={data.excerpt}
        featuredImage={data.featuredImage}
        overlay={{
          enabled: true,
          opacity: 0.6,
          color: "rgba(0, 0, 0, 0.6)",
        }}
        titleAnimation="wave" // 🎨 Change this: "reveal" | "wave" | "slide" | "lines" | "bounce" | "rotate"
        excerptAnimation="slide" // 🎨 Change this too!
      />

      {/* Content Sections with GSAP Scroll Animations */}
      <WordPressContentPanel
        content={data.content}
        backgroundColor="bg-white dark:bg-black"
        dataSpeed="1.05"
        animation="reveal" // 🎨 Text animation for headings
      />

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
