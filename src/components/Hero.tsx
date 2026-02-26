"use client";

import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ bg: 0, silhouette: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Small delay to ensure browser paints initial state before animating
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 50);

      // Only calculate parallax when hero is visible
      if (heroRef.current && scrollY < window.innerHeight) {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Background moves slower (0.3x speed)
            // Silhouette moves at medium speed (0.5x speed)
            setParallaxOffset({
              bg: scrollY * 0.3,
              silhouette: scrollY * 0.5
            });
            ticking = false;
          });
          ticking = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Dark gradient background - slowest layer */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a] will-change-transform"
        style={{ transform: `translateY(${parallaxOffset.bg}px)` }}
      />

      {/* Subtle blurred Oscar silhouette - medium speed layer */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          opacity: 0.06,
          transform: `translateY(${parallaxOffset.silhouette}px)`
        }}
      >
        <svg
          viewBox="0 0 100 300"
          className="h-[60vh] w-auto"
          style={{ filter: "blur(8px)" }}
          fill="white"
        >
          <path d="M50 15 C58 15 64 22 64 30 C64 38 58 44 52 46 L52 52 L64 52 C68 52 72 56 72 60 L72 68 L68 68 L68 62 C68 60 66 58 64 58 L52 58 L52 72 L72 72 C76 72 80 76 80 80 L80 90 L76 90 L76 84 C76 82 74 80 72 80 L52 80 L52 100 L68 100 C72 100 76 104 76 108 L76 118 L72 118 L72 112 C72 110 70 108 68 108 L52 108 L52 140 L76 140 C80 140 84 144 84 148 L84 162 L80 162 L80 154 C80 152 78 150 76 150 L52 150 L52 200 L80 200 C84 200 88 204 88 208 L88 225 L84 225 L84 214 C84 212 82 210 80 210 L52 210 L52 280 L64 280 L64 300 L36 300 L36 280 L48 280 L48 210 L20 210 C18 210 16 212 16 214 L16 225 L12 225 L12 208 C12 204 16 200 20 200 L48 200 L48 150 L24 150 C22 150 20 152 20 154 L20 162 L16 162 L16 148 C16 144 20 140 24 140 L48 140 L48 108 L32 108 C30 108 28 110 28 112 L28 118 L24 118 L24 108 C24 104 28 100 32 100 L48 100 L48 80 L28 80 C26 80 24 82 24 84 L24 90 L20 90 L20 80 C20 76 24 72 28 72 L48 72 L48 58 L36 58 C34 58 32 60 32 62 L32 68 L28 68 L28 60 C28 56 32 52 36 52 L48 52 L48 46 C42 44 36 38 36 30 C36 22 42 15 50 15 Z" />
        </svg>
      </div>

      {/* Radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_60%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Content - normal scroll speed */}
      <div
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-[1800ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1
          className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.08em] text-white leading-tight transition-all duration-[1600ms] delay-200 [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          The 98th Academy Awards
        </h1>

        <div
          className={`w-24 sm:w-32 md:w-40 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto mt-8 mb-8 transition-all duration-[1400ms] delay-700 [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />

        <p
          className={`text-gray-400 text-sm sm:text-base md:text-lg tracking-[0.25em] uppercase font-light transition-all duration-[1400ms] delay-[1000ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          An Interactive Awards Experience
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          hasScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-600">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>
    </section>
  );
}
