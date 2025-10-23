import { Metadata } from "next";
import FullscreenSlider from "@/components/FullscreenSlider";
import type { SlideData } from "@/lib/wordpress/slider-types";

export const metadata: Metadata = {
  title: "Fullscreen Slider Demo | Portfolio",
  description:
    "GSAP-powered horizontal scroll slider with WordPress integration",
};

// Sample slides for demo (replace with WordPress API data)
const sampleSlides: SlideData[] = [
  {
    id: 1,
    title: "Welcome Slide",
    content: "",
    background_image: {
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80",
      alt: "Abstract gradient background",
      width: 1920,
      height: 1080,
    },
    video_type: "none",
    youtube_url: "",
    local_video: null,
    heading: "Welcome to the Future",
    subheading: "Experience the power of GSAP horizontal scrolling",
    text_color: "#ffffff",
    button_text: "Explore More",
    button_url: "/work",
    slide_order: 0,
  },
  {
    id: 2,
    title: "Video Background Slide",
    content: "",
    background_image: {
      url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80",
      alt: "Gradient background",
      width: 1920,
      height: 1080,
    },
    video_type: "youtube",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    local_video: null,
    heading: "Engaging Video Content",
    subheading: "YouTube backgrounds make your slides come alive",
    text_color: "#ffffff",
    button_text: "Learn More",
    button_url: "/about",
    slide_order: 1,
  },
  {
    id: 3,
    title: "Portfolio Showcase",
    content: "",
    background_image: {
      url: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1920&q=80",
      alt: "Colorful gradient",
      width: 1920,
      height: 1080,
    },
    video_type: "none",
    youtube_url: "",
    local_video: null,
    heading: "Our Creative Work",
    subheading: "Browse through stunning projects and case studies",
    text_color: "#ffffff",
    button_text: "View Portfolio",
    button_url: "/work",
    slide_order: 2,
  },
  {
    id: 4,
    title: "Contact Us",
    content: "",
    background_image: {
      url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80",
      alt: "Purple gradient",
      width: 1920,
      height: 1080,
    },
    video_type: "none",
    youtube_url: "",
    local_video: null,
    heading: "Let's Work Together",
    subheading: "Ready to bring your ideas to life? Get in touch today",
    text_color: "#ffffff",
    button_text: "Contact Us",
    button_url: "/contact",
    slide_order: 3,
  },
];

export default function SliderDemoPage() {
  return (
    <>
      <FullscreenSlider slides={sampleSlides} />

      {/* Instructions Panel (Below Slider) */}
      <div className="min-h-screen bg-zinc-900 text-white p-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Fullscreen Slider Component
          </h2>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>What you just experienced:</strong> A GSAP-powered
              horizontal scroll slider with smooth transitions between
              full-screen panels.
            </p>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Features</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Horizontal scroll triggered by vertical scrolling</li>
                <li>Full viewport panels (100vw × 100vh)</li>
                <li>Background images with overlay</li>
                <li>YouTube video backgrounds</li>
                <li>Local video support (coming soon)</li>
                <li>Smooth GSAP animations with scrub</li>
                <li>Content parallax effects</li>
                <li>Responsive typography</li>
                <li>Customizable text colors</li>
                <li>CTA buttons with hover effects</li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                WordPress Integration
              </h3>
              <p className="mb-4">
                This slider pulls content from regular WordPress posts using the
                REST API. No plugins required!
              </p>
              <p className="mb-4">
                <strong>Setup:</strong>
              </p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Create posts in WordPress</li>
                <li>Set featured images as backgrounds</li>
                <li>Add custom fields for YouTube URL, text color, etc.</li>
                <li>Pass post IDs to the slider component</li>
              </ol>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Usage Example</h3>
              <pre className="bg-zinc-950 p-4 rounded overflow-x-auto text-sm">
                {`// Server Component
import FullscreenSlider from "@/components/FullscreenSlider";
import { fetchSliderPosts } from "@/lib/wordpress/slider-api";

export default async function Page() {
  const slides = await fetchSliderPosts({
    wpUrl: "https://your-wordpress.com",
    postIds: [3239, 3240, 3241],
  });

  return <FullscreenSlider slides={slides} />;
}`}
              </pre>
            </div>

            <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                📚 Complete Documentation
              </h3>
              <p>
                See <code className="bg-zinc-800 px-2 py-1 rounded">lib/wordpress/SLIDER_SETUP.md</code> for full WordPress setup instructions and examples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
