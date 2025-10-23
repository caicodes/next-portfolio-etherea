'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useGSAP(() => {
    // Initial entrance animations
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate logo dropping in
    tl.fromTo(
      logoRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }
    );

    // Animate navigation links dropping in with stagger
    tl.fromTo(
      navRef.current?.children || [],
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // Animate mobile menu button
    if (menuButtonRef.current) {
      tl.fromTo(
        menuButtonRef.current,
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }

    // Scroll trigger for shrinking header
    // Start after scrolling past 200px
    ScrollTrigger.create({
      start: '200px top',
      end: 99999,
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? 'h-20 bg-white/70 backdrop-blur-xl shadow-[0_8px_16px_rgba(0,0,0,0.04)] dark:bg-zinc-950/70 dark:shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
          : 'h-36 md:h-40 bg-transparent'
      }`}
      style={{
        borderBottom: isScrolled ? '1px solid rgba(228, 228, 231, 0.3)' : '1px solid transparent',
        transition: 'all 700ms ease-out, border-bottom 700ms ease-out',
      }}
    >
      <nav className="container mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <div ref={logoRef}>
          <Link href="/" className="flex items-center">
            <div
              className={`bg-zinc-200 dark:bg-zinc-800 rounded-md flex items-center justify-center transition-all duration-700 ease-out ${
                isScrolled ? 'w-14 h-14' : 'w-24 h-24 md:w-28 md:h-28'
              }`}
            >
              <svg
                className={`text-zinc-600 dark:text-zinc-400 transition-all duration-700 ease-out ${
                  isScrolled ? 'w-9 h-9' : 'w-16 h-16 md:w-20 md:h-20'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div
          ref={navRef}
          className={`hidden md:flex items-center gap-8 transition-all duration-700 ease-out ${
            isScrolled ? 'text-sm' : 'text-base'
          }`}
        >
          <Link
            href="/"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/work"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Work
          </Link>
          <Link
            href="/landing"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Landing
          </Link>
          <Link
            href="/etherea"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Etherea
          </Link>
          <Link
            href="/styleguide"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Styleguide
          </Link>
          <Link
            href="/contact"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          ref={menuButtonRef}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg
            className={`text-zinc-900 dark:text-zinc-100 transition-all duration-700 ease-out ${
              isScrolled ? 'w-6 h-6' : 'w-8 h-8'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
