import Image from "next/image";

export default function Work() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800 dark:from-black dark:to-zinc-900"
        data-speed="0.8"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            Featured Work
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
            A collection of projects showcasing design, development, and creative solutions
          </p>
        </div>
      </section>

      {/* Project 1 */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="bg-zinc-200 dark:bg-zinc-800 rounded-lg aspect-video flex items-center justify-center"
              data-speed="1.1"
            >
              <Image
                src="/next.svg"
                alt="Project 1"
                width={300}
                height={300}
                className="dark:invert"
              />
            </div>
            <div data-speed="0.95">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Project Alpha
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                A modern web application built with Next.js, featuring real-time data visualization
                and responsive design patterns.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  Tailwind CSS
                </span>
              </div>
              <a
                href="#"
                className="inline-block px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project 2 */}
      <section className="py-32 bg-zinc-100 dark:bg-zinc-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-speed="0.95" className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Project Beta
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                An e-commerce platform with advanced filtering, smooth animations, and a seamless
                checkout experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  React
                </span>
                <span className="px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  GSAP
                </span>
                <span className="px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  Node.js
                </span>
              </div>
              <a
                href="#"
                className="inline-block px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                View Project
              </a>
            </div>
            <div
              className="bg-zinc-200 dark:bg-zinc-800 rounded-lg aspect-video flex items-center justify-center order-1 md:order-2"
              data-speed="1.1"
            >
              <Image
                src="/next.svg"
                alt="Project 2"
                width={300}
                height={300}
                className="dark:invert"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project 3 */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="bg-zinc-200 dark:bg-zinc-800 rounded-lg aspect-video flex items-center justify-center"
              data-speed="1.1"
            >
              <Image
                src="/next.svg"
                alt="Project 3"
                width={300}
                height={300}
                className="dark:invert"
              />
            </div>
            <div data-speed="0.95">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Project Gamma
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                A creative portfolio website with stunning animations, parallax scrolling, and
                optimized performance.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  GSAP
                </span>
                <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full text-sm">
                  Framer Motion
                </span>
              </div>
              <a
                href="#"
                className="inline-block px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-zinc-900 dark:bg-zinc-950 text-white" data-speed="0.9">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Like What You See?
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Let's collaborate on your next project and create something amazing together.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-zinc-900 px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
}
