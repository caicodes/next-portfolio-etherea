import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section - Fast scroll */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800"
        data-speed="0.8"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            About Me
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Creative developer passionate about design and technology
          </p>
        </div>
      </section>

      {/* Story Section - Normal scroll */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-speed="0.95">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                My Story
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                I've been crafting digital experiences for over a decade, combining aesthetics with functionality to create memorable user experiences.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                My approach blends creative vision with technical expertise, ensuring every project not only looks beautiful but performs flawlessly.
              </p>
            </div>
            <div
              className="bg-zinc-200 dark:bg-zinc-800 rounded-lg aspect-square flex items-center justify-center"
              data-speed="1.1"
            >
              <Image
                src="/next.svg"
                alt="Profile"
                width={200}
                height={200}
                className="dark:invert"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Slow scroll for parallax */}
      <section className="py-32 bg-zinc-100 dark:bg-zinc-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2
            className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-16 text-center"
            data-speed="0.9"
          >
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white dark:bg-black p-8 rounded-lg"
              data-speed="1.05"
            >
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Design
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                UI/UX design, visual design, prototyping, and creating design systems that scale.
              </p>
            </div>
            <div
              className="bg-white dark:bg-black p-8 rounded-lg"
              data-speed="1.15"
            >
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Development
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Modern web technologies, React, Next.js, TypeScript, and animation libraries.
              </p>
            </div>
            <div
              className="bg-white dark:bg-black p-8 rounded-lg"
              data-speed="1.25"
            >
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Animation
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                GSAP, Framer Motion, CSS animations, and creating engaging micro-interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Fast scroll */}
      <section
        className="py-32 bg-white dark:bg-black"
        data-speed="0.85"
      >
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            What I Value
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12">
            Quality over quantity. Attention to detail. User-first approach. Continuous learning.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Craftsmanship
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Every pixel matters. Every interaction counts. I believe in creating work that stands the test of time.
              </p>
            </div>
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Innovation
              </h3>
              <p className="text-zinc-400 dark:text-zinc-400">
                Staying ahead of trends and pushing boundaries to create unique, memorable experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Normal scroll */}
      <section className="py-32 bg-zinc-900 dark:bg-zinc-950 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Let's talk about your next project.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-zinc-900 px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}
