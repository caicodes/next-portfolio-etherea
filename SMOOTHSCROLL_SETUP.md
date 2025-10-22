# GSAP ScrollSmoother Setup

This portfolio site now has GSAP ScrollSmoother configured in the main layout for smooth scrolling with parallax effects.

## Features Implemented

### 1. ScrollSmoother Provider (`components/SmoothScrollProvider.tsx`)
- Uses `@gsap/react` and the `useGSAP` hook for proper React integration
- ScrollSmoother is initialized only on desktop (viewport width > 768px) using matchMedia
- Smooth scrolling with effects enabled for `data-speed` attributes
- Properly cleaned up on unmount

### 2. Sticky Header (`components/Header.tsx`)
- Fixed position header with 80x80px logo placeholder (SVG)
- Transparent background initially
- Blurred and translucent background on scroll using ScrollTrigger
- Responsive navigation with mobile menu icon
- Placeholder navigation links (Home, About, Work, Contact)

### 3. Footer (`components/Footer.tsx`)
- Three-column layout on desktop
- Links to main pages
- Social media placeholder links
- Responsive design

### 4. Root Layout Integration
- ScrollSmoother wraps the entire app
- Header is fixed and outside the main content flow
- Main content has proper padding-top to account for fixed header
- Footer is included in the smooth scroll content

## Using data-speed Attributes

To create parallax effects, add `data-speed` attributes to any element within the smooth scroll content:

```jsx
// Scroll faster than normal (moves up faster)
<div data-speed="0.8">Fast content</div>

// Normal scroll speed
<div data-speed="1.0">Normal content</div>

// Scroll slower than normal (parallax effect)
<div data-speed="1.2">Slow content</div>
```

### Example (see `/about` page):
- Hero section: `data-speed="0.8"` - scrolls faster
- Story section text: `data-speed="0.95"` - slightly faster
- Story section image: `data-speed="1.1"` - slower (parallax)
- Skills cards: `data-speed="1.05"`, `1.15`, `1.25` - increasing parallax

## Testing

Visit the `/about` page to see the smooth scroll and parallax effects in action:
```
http://localhost:3002/about
```

Scroll down to see:
- Smooth scrolling (desktop only)
- Header blur effect
- Various parallax speeds on different sections
- Responsive layout

## Configuration

### Smooth Scroll Settings
In `components/SmoothScrollProvider.tsx`:
```typescript
ScrollSmoother.create({
  wrapper: smoothWrapperRef.current,
  content: smoothContentRef.current,
  smooth: 1.5,              // Adjust smoothness (0-3)
  effects: true,            // Enable data-speed effects
  smoothTouch: 0.1,         // Light smooth on mobile
});
```

### Header Blur Trigger
In `components/Header.tsx`:
```typescript
ScrollTrigger.create({
  start: 'top -80',         // Trigger after scrolling 80px
  end: 99999,
  onUpdate: (self) => {
    setIsScrolled(self.progress > 0);
  },
});
```

## Dependencies
- `gsap`: ^3.13.0
- `@gsap/react`: ^2.1.2
- `next`: 16.0.0
- `react`: 19.2.0

## Best Practices
1. Use `data-speed` values between 0.5 and 1.5 for subtle effects
2. Values < 1.0 = scroll faster (good for backgrounds)
3. Values > 1.0 = scroll slower (good for foreground parallax)
4. Keep smooth scroll disabled on mobile for better performance
5. Use `useGSAP` hook instead of raw useEffect for GSAP animations
