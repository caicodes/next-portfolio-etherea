import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(SplitText);

/**
 * Split text reveal animation - chars fade in with stagger
 */
export function splitTextReveal(
  element: HTMLElement | string,
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
  }
) {
  const split = new SplitText(element, { type: "chars,words" });

  return gsap.fromTo(
    split.chars,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      stagger: options?.stagger || 0.02,
      duration: options?.duration || 0.6,
      ease: options?.ease || "power3.out",
      delay: options?.delay || 0,
    }
  );
}

/**
 * Split text wave animation - chars bounce in
 */
export function splitTextWave(
  element: HTMLElement | string,
  options?: {
    delay?: number;
    stagger?: number;
  }
) {
  const split = new SplitText(element, { type: "chars" });

  return gsap.fromTo(
    split.chars,
    {
      opacity: 0,
      y: 100,
      rotationX: -90,
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      stagger: options?.stagger || 0.03,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: options?.delay || 0,
    }
  );
}

/**
 * Split text slide animation - words slide up and fade in
 */
export function splitTextSlide(
  element: HTMLElement | string,
  options?: {
    delay?: number;
    stagger?: number;
    direction?: "up" | "down" | "left" | "right";
  }
) {
  const split = new SplitText(element, { type: "words" });
  const direction = options?.direction || "up";

  let fromVars: gsap.TweenVars = { opacity: 0 };
  let toVars: gsap.TweenVars = { opacity: 1 };

  switch (direction) {
    case "up":
      fromVars.y = 60;
      toVars.y = 0;
      break;
    case "down":
      fromVars.y = -60;
      toVars.y = 0;
      break;
    case "left":
      fromVars.x = 60;
      toVars.x = 0;
      break;
    case "right":
      fromVars.x = -60;
      toVars.x = 0;
      break;
  }

  return gsap.fromTo(split.words, fromVars, {
    ...toVars,
    stagger: options?.stagger || 0.05,
    duration: 0.8,
    ease: "power3.out",
    delay: options?.delay || 0,
  });
}

/**
 * Scramble text reveal - chars scramble then reveal
 */
export function splitTextScramble(
  element: HTMLElement | string,
  options?: {
    delay?: number;
    duration?: number;
  }
) {
  const split = new SplitText(element, { type: "chars" });
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  // Store original text
  const originalText = split.chars.map((char) => char.textContent);

  // Scramble phase
  const scrambleTl = gsap.timeline();

  split.chars.forEach((char, i) => {
    scrambleTl.to(
      char,
      {
        duration: 0.6,
        ease: "none",
        onUpdate: function () {
          if (this.progress() < 0.8) {
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
          } else {
            char.textContent = originalText[i];
          }
        },
      },
      i * 0.03
    );
  });

  return scrambleTl;
}

/**
 * Fade in lines - split by lines and fade in
 */
export function splitLinesReveal(
  element: HTMLElement | string,
  options?: {
    delay?: number;
    stagger?: number;
  }
) {
  const split = new SplitText(element, { type: "lines" });

  // Wrap lines to prevent overflow issues
  split.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    line.parentNode?.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  return gsap.fromTo(
    split.lines,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      stagger: options?.stagger || 0.1,
      duration: 1,
      ease: "power4.out",
      delay: options?.delay || 0,
    }
  );
}

/**
 * Elastic text bounce
 */
export function splitTextBounce(
  element: HTMLElement | string,
  options?: {
    delay?: number;
    stagger?: number;
  }
) {
  const split = new SplitText(element, { type: "chars" });

  return gsap.fromTo(
    split.chars,
    {
      opacity: 0,
      scale: 0,
      y: -100,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: options?.stagger || 0.03,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
      delay: options?.delay || 0,
    }
  );
}

/**
 * Rotate in animation
 */
export function splitTextRotate(
  element: HTMLElement | string,
  options?: {
    delay?: number;
    stagger?: number;
  }
) {
  const split = new SplitText(element, { type: "chars" });

  return gsap.fromTo(
    split.chars,
    {
      opacity: 0,
      rotationY: 90,
      transformOrigin: "50% 50%",
    },
    {
      opacity: 1,
      rotationY: 0,
      stagger: options?.stagger || 0.02,
      duration: 0.8,
      ease: "back.out(2)",
      delay: options?.delay || 0,
    }
  );
}
