export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800 dark:from-black dark:to-zinc-900"
        data-speed="0.8"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
            Have a project in mind? Let's talk about how we can work together
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div data-speed="0.95">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                Let's Create Something Amazing
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Whether you have a project idea, need help with development, or just want to say
                hello, I'd love to hear from you.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2 uppercase tracking-wider">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@example.com"
                    className="text-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    hello@example.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2 uppercase tracking-wider">
                    Social
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      Twitter
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2 uppercase tracking-wider">
                    Location
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Available worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-speed="1.05">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-100"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-100"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-100 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-32 bg-zinc-100 dark:bg-zinc-900" data-speed="0.9">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-12">
            Quick Links
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a
              href="/about"
              className="p-6 bg-white dark:bg-black rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                About Me
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Learn more about my background and experience
              </p>
            </a>
            <a
              href="/work"
              className="p-6 bg-white dark:bg-black rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                My Work
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Check out my recent projects and case studies
              </p>
            </a>
            <a
              href="/"
              className="p-6 bg-white dark:bg-black rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Home
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Back to the homepage
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
