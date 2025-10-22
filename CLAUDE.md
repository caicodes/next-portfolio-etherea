# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The site features GSAP-powered smooth scrolling and parallax effects for an immersive user experience.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 4 with inline theme configuration
- **Animations**: GSAP 3.13.0 with ScrollTrigger and ScrollSmoother plugins
- **Fonts**: Geist Sans and Geist Mono (via next/font)

### Project Structure
```
app/                    # Next.js App Router pages
  layout.tsx           # Root layout with Header, SmoothScrollProvider, Footer
  page.tsx             # Homepage
  about/page.tsx       # About page
  work/page.tsx        # Work/portfolio page
  contact/page.tsx     # Contact page
  globals.css          # Global styles with Tailwind imports and CSS variables

components/            # Reusable React components
  SmoothScrollProvider.tsx  # GSAP ScrollSmoother wrapper
  Header.tsx           # Fixed header with scroll-based animations
  Footer.tsx           # Site footer
  HeroPanel.tsx        # Hero section component

public/                # Static assets
```

### GSAP Animation System

The site uses GSAP for advanced scroll-based animations. Key implementation details:

#### ScrollSmoother Integration
- **Location**: `components/SmoothScrollProvider.tsx`
- **Behavior**: Only enabled on desktop (viewport > 768px)
- **Settings**: smooth: 1.5, effects: true, smoothTouch: 0.1
- **Structure**: Wraps entire app content in root layout, excluding fixed header

#### Parallax Effects
Add `data-speed` attributes to any element within smooth scroll content:
- `data-speed="0.8"`: Scrolls faster (good for backgrounds)
- `data-speed="1.0"`: Normal scroll speed
- `data-speed="1.2"`: Scrolls slower (parallax effect)

Example from `/about` page:
- Hero: `data-speed="0.8"` (fast)
- Text sections: `data-speed="0.95"` (slightly fast)
- Images: `data-speed="1.1"` (slow parallax)
- Staggered cards: `data-speed="1.05"`, `1.15"`, `1.25"` (progressive parallax)

#### Header Animation System
- **Initial animations**: Logo drops in with elastic bounce, nav links stagger in
- **Scroll trigger**: Header shrinks after scrolling past 100vh (hero section)
- **Scrolled state**: Reduced height (h-20), blurred backdrop, subtle shadow
- **Default state**: Larger height (h-36/h-40), transparent background

### Key Patterns

#### Client Components
All GSAP-dependent components use `'use client'` directive and the `useGSAP` hook from `@gsap/react` instead of `useEffect` for proper React integration and cleanup.

```typescript
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

useGSAP(() => {
  // GSAP animations here
  // Cleanup is handled automatically
}, [dependencies]);
```

#### Path Aliases
TypeScript is configured with `@/*` path alias pointing to the project root.

```typescript
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
```

#### Responsive Design
- Desktop-first GSAP animations (disabled on mobile for performance)
- Mobile breakpoint: 768px (md: in Tailwind)
- Mobile menu icon displayed below md breakpoint

#### Theming
- Automatic dark mode via `prefers-color-scheme`
- CSS variables defined in `globals.css` (--background, --foreground)
- Tailwind inline theme configuration in `globals.css` using `@theme inline`
- Dark mode classes throughout components (e.g., `dark:bg-zinc-950/70`)

## Important Notes

### GSAP Best Practices
1. Always use `useGSAP` hook instead of `useEffect` for GSAP code
2. Register plugins at module level: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother)`
3. Keep `data-speed` values between 0.5-1.5 for subtle effects
4. Disable smooth scroll on mobile (already configured via matchMedia)
5. Use matchMedia for responsive animations

### Layout Structure
The root layout has a specific structure required for ScrollSmoother:
1. Header is fixed and outside smooth scroll wrapper
2. SmoothScrollProvider wraps main content and footer
3. Main content has padding-top to account for fixed header

### Styling
- Tailwind CSS 4 uses new inline theme syntax in globals.css
- No separate tailwind.config file - configuration is in CSS
- Custom fonts loaded via next/font and exposed as CSS variables

## Resources

See `SMOOTHSCROLL_SETUP.md` for detailed GSAP ScrollSmoother configuration and usage examples.
