import HeroPanel from "@/components/HeroPanel";

export default function Home() {
  return (
    <>
      {/* Hero Section with Dark Panel */}
      <HeroPanel>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight">
            Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12">
            Creative developer crafting beautiful digital experiences
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/about"
              className="px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
            >
              View Work
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </HeroPanel>

      {/* Additional Content Section */}
      <section className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center" data-speed="1.1">
        <div className="container mx-auto px-6 py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Explore a selection of recent work showcasing design, development, and creative problem-solving.
          </p>
        </div>
      </section>

      {/* Another Section for scrolling demo */}
      <section className="min-h-screen bg-zinc-100 dark:bg-black flex items-center justify-center" data-speed="0.9">
        <div className="container mx-auto px-6 py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Let's Collaborate
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Ready to bring your ideas to life? Let's create something extraordinary together.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Start a Project
          </a>
        </div>
      </section>
    </>
  );
}
