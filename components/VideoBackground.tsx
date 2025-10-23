"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  type: "youtube" | "local";
  url: string;
  posterImage?: string;
}

export default function VideoBackground({
  type,
  url,
  posterImage,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [youtubeId, setYoutubeId] = useState<string>("");

  useEffect(() => {
    if (type === "youtube") {
      // Extract YouTube video ID from URL
      const videoIdMatch = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );
      if (videoIdMatch) {
        setYoutubeId(videoIdMatch[1]);
      }
    }
  }, [type, url]);

  useEffect(() => {
    if (type === "local" && videoRef.current) {
      // Auto-play local video when mounted
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay prevented:", error);
      });
    }
  }, [type]);

  if (type === "youtube" && youtubeId) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          allow="autoplay; encrypted-media"
          title="Background video"
          style={{
            pointerEvents: "none",
          }}
        />
        {/* Overlay to prevent interaction with video */}
        <div className="absolute inset-0 bg-transparent pointer-events-none" />
      </div>
    );
  }

  if (type === "local") {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return null;
}
