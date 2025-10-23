"use client";

interface SlideIndicatorProps {
  totalSlides: number;
  currentSlide: number;
  onSlideClick?: (index: number) => void;
}

export default function SlideIndicator({
  totalSlides,
  currentSlide,
  onSlideClick,
}: SlideIndicatorProps) {
  const dotSize = 10;
  const dotSpacing = 24;
  const activeDotSize = 14;
  const centerX = (activeDotSize + 4) / 2;

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <svg
        width={activeDotSize + 4}
        height={totalSlides * dotSpacing}
        className="drop-shadow-lg"
      >
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = index === currentSlide;
          const size = isActive ? activeDotSize : dotSize;
          const y = index * dotSpacing + dotSpacing / 2;

          return (
            <g key={index}>
              {/* Outer ring for active slide */}
              {isActive && (
                <circle
                  cx={centerX}
                  cy={y}
                  r={size / 2 + 2}
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              )}

              {/* Dot */}
              <circle
                cx={centerX}
                cy={y}
                r={size / 2}
                fill={isActive ? "white" : "rgba(255, 255, 255, 0.4)"}
                className={`transition-all duration-300 ${
                  onSlideClick ? "cursor-pointer hover:fill-white" : ""
                }`}
                onClick={() => onSlideClick?.(index)}
              />

              {/* Slide number text (only for active) */}
              {isActive && (
                <text
                  x={centerX + activeDotSize + 12}
                  y={y + 4}
                  fill="white"
                  fontSize="12"
                  fontWeight="600"
                  className="font-mono"
                >
                  {String(index + 1).padStart(2, "0")}
                </text>
              )}
            </g>
          );
        })}

        {/* Progress line connecting dots */}
        <line
          x1={centerX}
          y1={dotSpacing / 2}
          x2={centerX}
          y2={(totalSlides - 1) * dotSpacing + dotSpacing / 2}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
          className="transition-all duration-300"
        />

        {/* Active progress line */}
        <line
          x1={centerX}
          y1={dotSpacing / 2}
          x2={centerX}
          y2={currentSlide * dotSpacing + dotSpacing / 2}
          stroke="white"
          strokeWidth="2"
          className="transition-all duration-500"
          style={{
            strokeDasharray: currentSlide * dotSpacing,
            strokeDashoffset: 0,
          }}
        />
      </svg>

      {/* Total slides counter at bottom */}
      <div className="mt-4 text-white text-xs font-mono text-center opacity-60">
        {totalSlides} slides
      </div>
    </div>
  );
}
