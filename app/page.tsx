import HeroSlider from "@/components/HeroSlider";
import type { HeroSlide } from "@/lib/slider/types";

export default function Home() {
  // Define slide data
  const slides: HeroSlide[] = [
    {
      id: 1,
      background: {
        type: "image",
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80",
        alt: "Modern workspace with creative design",
      },
      content: {
        eyebrow: "Creative Development",
        title: "Crafting Digital Experiences",
        subtitle: "Where design meets innovation",
        description:
          "Transforming ideas into beautiful, functional digital products that inspire and engage.",
        cta: {
          text: "View Work",
          href: "/work",
          variant: "primary",
        },
        alignment: "center",
      },
      overlay: {
        enabled: true,
        opacity: 0.5,
        color: "rgba(0, 0, 0, 0.5)",
      },
    },
    {
      id: 2,
      background: {
        type: "video",
        src: "/videos/hero-background.mp4", // Replace with your video URL
        poster: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=1920&q=80",
      },
      content: {
        eyebrow: "Motion & Design",
        title: "Bringing Ideas to Life",
        subtitle: "Dynamic experiences that captivate",
        description:
          "Seamless animations and interactions that tell your story in motion.",
        cta: {
          text: "Explore Motion",
          href: "/work",
          variant: "outline",
        },
        alignment: "center",
      },
      overlay: {
        enabled: true,
        opacity: 0.6,
        color: "rgba(15, 23, 42, 0.6)",
      },
    },
    {
      id: 3,
      background: {
        type: "image",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
        alt: "Code and development",
      },
      content: {
        eyebrow: "Engineering",
        title: "Built to Perform",
        subtitle: "Fast, scalable, and beautiful",
        description:
          "Modern web applications built with cutting-edge technologies for exceptional performance.",
        cta: {
          text: "Start a Project",
          href: "/contact",
          variant: "secondary",
        },
        alignment: "center",
      },
      overlay: {
        enabled: true,
        opacity: 0.55,
        color: "rgba(0, 0, 0, 0.55)",
      },
    },
  ];

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={slides} autoplay autoplayDelay={6000} />

      {/* Featured Projects Section */}
      <section
        className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center"
        data-speed="1.05"
      >
        <div className="container mx-auto px-6 py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12">
            Explore a selection of recent work showcasing design, development,
            and creative problem-solving.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project cards */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-75 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                  Project 1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Creative Portfolio
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Design & Development
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-75 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                  Project 2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                E-Commerce Platform
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">Full Stack</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-75 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                  Project 3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Brand Experience
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Motion & Interactive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration CTA Section */}
      <section
        className="min-h-screen bg-zinc-100 dark:bg-black flex items-center justify-center"
        data-speed="0.95"
      >
        <div className="container mx-auto px-6 py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Let's Collaborate
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Ready to bring your ideas to life? Let's create something
            extraordinary together.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start a Project
          </a>
        </div>
      </section>
    </>
  );
}
