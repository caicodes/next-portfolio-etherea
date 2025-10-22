"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface HeroPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export default function HeroPanel({
  children,
  className = "",
}: HeroPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Subtle fade in animation for the panel
    gsap.fromTo(
      panelRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      ref={panelRef}
      className={`relative h-screen w-full flex items-center justify-center bg-zinc-950 dark:bg-black ${className}`}
    >
      {/* Optional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/50 pointer-events-none" />

      {/* Debug HERO text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-800 text-[20vw] font-black pointer-events-none opacity-20">
        HERO
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
