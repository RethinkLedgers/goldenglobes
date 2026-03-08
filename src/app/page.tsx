"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { categories } from "@/data/nominees";
import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  const [isLiveMode, setIsLiveMode] = useState(false);

  return (
    <main className={`relative z-10 transition-all duration-1000 ${isLiveMode ? "live-mode" : ""}`}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-16">
        {/* Golden Globe Logo/Icon */}
        <div className="gold-ring flex items-center justify-center mb-8">
          <div className="text-6xl">🌍</div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.2em] uppercase shimmer-text mb-4">
          Golden Globes
        </h1>

        {/* Subtitle */}
        <p className="text-[var(--gold-dark)] text-sm tracking-[0.4em] uppercase mb-2">
          83rd Annual Golden Globe Awards
        </p>

        {/* Elegant divider */}
        <div className="gold-divider w-48 my-6" />

        {/* Ceremony details */}
        <p className="text-[var(--gold)] text-sm tracking-[0.2em] uppercase font-light mb-4">
          January 2026
        </p>

        <div className="flex flex-col gap-2 text-xs tracking-wider text-gray-400 uppercase">
          <p>
            Broadcast on{" "}
            <span className="text-white font-medium">CBS</span>
          </p>
          <p>
            <span className="text-white font-medium">The Beverly Hilton</span>, Beverly Hills, CA
          </p>
        </div>

        {/* Live Mode Toggle */}
        <button
          onClick={() => setIsLiveMode(!isLiveMode)}
          className={`mt-8 flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 ${
            isLiveMode
              ? "bg-[var(--gold)] text-black shadow-[0_0_30px_rgba(197,164,78,0.5)]"
              : "bg-white/5 text-gray-400 border border-white/10 hover:border-[var(--gold)]/30"
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isLiveMode ? "bg-black animate-pulse" : "bg-gray-500"}`} />
          <span className="text-xs uppercase tracking-wider font-medium">
            {isLiveMode ? "Live Mode Active" : "Enter Live Mode"}
          </span>
        </button>
      </section>

      {/* Nominations Section */}
      <section className="pb-16 px-4 sm:px-6">
        {/* Section Header */}
        <div className="sm:max-w-2xl sm:mx-auto mb-8">
          <div className="gold-divider mb-6" />
          <div className="text-center py-4">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
              Official Nominations{" "}
              <span className="text-[var(--gold)]">
                Coming Soon
              </span>
            </p>
          </div>
          <div className="gold-divider" />
        </div>

        {/* Placeholder Categories */}
        <div className="sm:max-w-2xl sm:mx-auto space-y-4">
          {categories.slice(0, 6).map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={index}
              isLiveMode={isLiveMode}
            />
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="sm:max-w-2xl sm:mx-auto mt-8 p-6 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-gray-400 text-sm mb-2">
            Nominations will be announced December 2025
          </p>
          <p className="text-[var(--gold)] text-xs tracking-wider uppercase">
            Check back for the complete list of nominees
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 text-center pb-8">
        <div className="gold-divider mx-8 mb-8" />
        <p className="text-[var(--gold-dark)] text-xs tracking-[0.2em] uppercase">
          83rd Golden Globe Awards
        </p>
        <p className="text-gray-600 text-xs mt-2 tracking-wider">
          Celebrating Excellence in Film and Television
        </p>
        <div className="mt-8 text-gray-500 text-xs tracking-wider">
          <p>Made by: Sienna Cant</p>
          <p className="mt-1">
            Email:{" "}
            <a href="mailto:sienna@rethink-ai.com" className="text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors">
              sienna@rethink-ai.com
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
