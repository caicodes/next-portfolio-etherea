// Types for hero slider slides

export interface SlideBackground {
  type: "image" | "video";
  src: string;
  poster?: string; // For video thumbnails
  alt?: string; // For images
}

export interface SlideContent {
  eyebrow?: string; // Small text above title
  title: string;
  subtitle?: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
  };
  alignment?: "left" | "center" | "right";
}

export interface HeroSlide {
  id: string | number;
  background: SlideBackground;
  content: SlideContent;
  overlay?: {
    enabled: boolean;
    opacity?: number; // 0-1
    color?: string;
  };
}
