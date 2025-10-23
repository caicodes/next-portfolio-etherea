# Fullscreen Horizontal Scroll Slider

A GSAP-powered fullscreen slider component that pulls content from WordPress posts. Built with Next.js 16, React 19, TypeScript, and GSAP 3.13.

## ✨ Features

- ✅ **GSAP Horizontal Scrolling** - Smooth scroll-triggered horizontal transitions
- ✅ **100% Native WordPress** - No plugins required (except optional free ones)
- ✅ **Full Viewport Panels** - Each slide is 100vw × 100vh
- ✅ **Background Images** - WordPress featured images
- ✅ **Video Backgrounds** - YouTube or local video support
- ✅ **Content Parallax** - Smooth content fade-in animations
- ✅ **Responsive Typography** - Scales beautifully on all devices
- ✅ **CTA Buttons** - Customizable call-to-action buttons
- ✅ **Text Color Control** - Per-slide text color customization
- ✅ **REST API Integration** - Fetch slides from WordPress API
- ✅ **TypeScript** - Full type safety

## 🚀 Quick Start

### 1. Create Posts in WordPress

1. Create regular WordPress posts
2. Set featured image (becomes background)
3. Add title (becomes heading)
4. Add excerpt (becomes subheading)
5. Optionally add custom fields:
   - `youtube_url` - YouTube video URL
   - `text_color` - Text color (hex)
   - `button_text` - CTA button text
   - `button_url` - CTA button link

### 2. WordPress Setup

Add this code to your theme's `functions.php`:

See `lib/wordpress/SLIDER_SETUP.md` for complete WordPress setup code.

### 3. Use in Next.js

```typescript
// Server Component (Recommended)
import FullscreenSlider from "@/components/FullscreenSlider";
import { fetchSliderPosts } from "@/lib/wordpress/slider-api";

export default async function SliderPage() {
  const slides = await fetchSliderPosts({
    wpUrl: "https://portfolio.caitoy.com",
    postIds: [3239, 3240, 3241], // Your post IDs in the order you want
    cacheTime: 300, // Optional: cache duration in seconds
  });

  return <FullscreenSlider slides={slides} />;
}
```

## 📁 Files Created

### Components
- `components/FullscreenSlider.tsx` - Main slider component with GSAP
- `components/SlidePanel.tsx` - Individual slide panel
- `components/VideoBackground.tsx` - YouTube & local video handler

### WordPress Integration
- `lib/wordpress/slider-types.ts` - TypeScript types
- `lib/wordpress/slider-api.ts` - WordPress API integration
- `lib/wordpress/slider-post-type.md` - (Optional) Custom post type setup
- `lib/wordpress/SLIDER_SETUP.md` - **Complete WordPress setup guide**

### Demo
- `app/slider-demo/page.tsx` - Live demo with sample data

## 🎨 Demo

Visit `/slider-demo` to see the slider in action with sample slides.

## 🔧 How It Works

1. **Horizontal Scroll Trigger**: Uses GSAP ScrollTrigger to pin the container and translate slides horizontally as the user scrolls vertically
2. **WordPress Integration**: Fetches post data via REST API (`/wp-json/wp/v2/posts`)
3. **Video Backgrounds**: Supports both YouTube embeds and local video files
4. **Parallax Content**: Fade-in animation for slide content tied to horizontal scroll position

## 📖 Documentation

See `/lib/wordpress/SLIDER_SETUP.md` for:
- Complete WordPress setup instructions
- Native custom fields configuration
- REST API endpoint examples
- Full usage examples

## 🎯 Advantages Over Elementor Plugin

- ✅ **No Plugin Dependency** - 100% native code
- ✅ **Better Performance** - Lightweight, optimized GSAP animations
- ✅ **Full Control** - Customize everything
- ✅ **Type Safe** - Full TypeScript support
- ✅ **Modern Stack** - React 19 + Next.js 16
- ✅ **SEO Friendly** - Server-side rendering support
- ✅ **Extensible** - Easy to add new features

## 💡 Usage Tips

### Ordering Slides
The order of slides is determined by the `postIds` array you pass:
```typescript
postIds: [3241, 3239, 3240] // Slide order: 3241, 3239, 3240
```

### Text Readability
- Use `text_color` meta field to ensure text is readable
- Dark overlays are applied automatically to improve contrast
- Recommended: White text (`#ffffff`) for most backgrounds

### Performance
- Images are loaded from WordPress media library
- Consider using optimized images (WebP format)
- Videos auto-play muted for better UX

## 🎬 Example Post Setup

**Post ID: 3239 - "Welcome"**
- Title: `Welcome to Our Portfolio`
- Excerpt: `Discover stunning design and development work`
- Featured Image: Hero background (1920×1080)
- Custom Fields:
  - `text_color`: `#ffffff`
  - `button_text`: `View Projects`
  - `button_url`: `/work`

**Post ID: 3240 - "About"**
- Title: `Creative Design Studio`
- Excerpt: `Crafting digital experiences since 2020`
- Featured Image: Office photo
- Custom Fields:
  - `youtube_url`: `https://youtube.com/watch?v=...`
  - `text_color`: `#ffffff`
  - `button_text`: `Learn More`
  - `button_url`: `/about`

## 🔗 Navigation

A "Slider" link has been added to the header navigation to access the demo at `/slider-demo`.

## 🚀 Next Steps

1. Set up WordPress custom fields (see `SLIDER_SETUP.md`)
2. Create your slider posts in WordPress
3. Get the post IDs
4. Create a page using `FullscreenSlider` component
5. Pass your WordPress URL and post IDs

Enjoy your new fullscreen slider! 🎉
