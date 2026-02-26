"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import IntelligenceModal from "@/components/IntelligenceModal";
import Confetti from "@/components/Confetti";
import { categories } from "@/data/nominees";
import Image from "next/image";

export default function Home() {
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Live mode activation
  useEffect(() => {
    if (!isLiveMode) return;

    // Show confetti on mode activation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  }, [isLiveMode]);

  return (
    <main className={`relative z-10 transition-all duration-1000 ${isLiveMode ? "live-mode" : ""}`}>
      {/* Live Mode Overlay */}
      {isLiveMode && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[var(--gold)]/5 blur-3xl" />
        </div>
      )}

      <Hero />
      <div className="pb-12">
        <Header />

      {/* Live on ABC + Live Mode Toggle */}
      <div className="flex items-center justify-center gap-6 py-4 flex-wrap">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/abc-logo.png"
            alt="ABC"
            width={36}
            height={36}
            className="object-contain"
          />
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400">
              Live on <span className="text-white font-medium">ABC</span>
            </p>
            <p className="text-[10px] tracking-wider text-gray-500 mt-0.5">
              7:00 PM ET / 4:00 PM PT
            </p>
          </div>
        </div>

        {/* Live Mode Toggle */}
        <button
          onClick={() => setIsLiveMode(!isLiveMode)}
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500 ${
            isLiveMode
              ? "bg-[var(--gold)] text-black shadow-[0_0_30px_rgba(197,164,78,0.5)]"
              : "bg-white/5 text-gray-400 border border-white/10 hover:border-[var(--gold)]/30"
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isLiveMode ? "bg-black animate-pulse" : "bg-gray-500"}`} />
          <span className="text-xs uppercase tracking-wider font-medium">
            {isLiveMode ? "Live Mode" : "Enter Live Mode"}
          </span>
          {!isLiveMode && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Live Stats Bar */}
      {isLiveMode && (
        <div className="mx-4 sm:mx-auto sm:max-w-2xl mb-4 animate-fade-in">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                <span className="text-xs text-[var(--gold)] uppercase tracking-wider">Live Mode Active</span>
              </div>
              <div className="text-xs text-gray-400">
                <span className="text-white font-medium">March 15, 2026</span> • 7:00 PM ET / 4:00 PM PT
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Awaiting ceremony start</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[var(--gold)]">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Awards Intelligence Button */}
      <div className="mx-4 sm:mx-auto sm:max-w-2xl mb-6">
        <button
          onClick={() => setIsIntelligenceOpen(true)}
          className={`w-full p-4 rounded-xl border transition-all duration-500 group ${
            isLiveMode
              ? "bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/10 to-[var(--gold)]/20 border-[var(--gold)]/40 shadow-[0_0_40px_rgba(197,164,78,0.2)]"
              : "bg-gradient-to-r from-[var(--gold)]/10 via-[var(--gold)]/5 to-[var(--gold)]/10 border-[var(--gold)]/20 hover:border-[var(--gold)]/40 hover:shadow-[0_0_40px_rgba(197,164,78,0.15)]"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors ${
                isLiveMode ? "bg-[var(--gold)]/30" : "bg-[var(--gold)]/10"
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white font-medium tracking-wide">Awards Intelligence</p>
                <p className="text-xs text-gray-500">
                  {isLiveMode ? "Live mode enabled" : "Deep dive into nomination data & trends"}
                </p>
              </div>
            </div>
            <div className="text-[var(--gold)] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Nominations banner */}
      <div className="mx-4 sm:mx-auto sm:max-w-2xl mt-2 mb-8">
        <div className={`gold-divider ${isLiveMode ? "live-intensified" : ""}`} />
        <div className="py-4 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
            Official Nominations{" "}
            <span className={`transition-colors duration-500 ${isLiveMode ? "text-[var(--gold-bright)]" : "text-[var(--gold)]"}`}>
              - 23 Categories
            </span>
          </p>
        </div>
        <div className={`gold-divider ${isLiveMode ? "live-intensified" : ""}`} />
      </div>

      {/* Categories */}
      <div className="px-4 sm:px-6 sm:max-w-2xl sm:mx-auto space-y-3">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.name}
            category={category}
            index={index}
            isLiveMode={isLiveMode}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="gold-divider mx-8 mb-8" />
        <p className="text-[var(--gold-dark)] text-xs tracking-[0.2em] uppercase">
          98th Academy Awards
        </p>
        <p className="text-gray-600 text-xs mt-2 tracking-wider">
          Sinners leads with 10 nominations
        </p>
        <div className="mt-8 text-gray-500 text-xs tracking-wider">
          <p>Made by: Sienna Cant</p>
          <p className="mt-1">
            Email:{" "}
            <a href="mailto:sienna@rethink-ai.com" className="text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors">
              sienna@rethink-ai.com
            </a>
          </p>
          <p className="mt-1">
            Company:{" "}
            <a href="https://www.msg2ai.xyz/" target="_blank" rel="noopener noreferrer" className="text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors">
              Msg2ai
            </a>
          </p>
        </div>
      </footer>
      </div>

      {/* Intelligence Modal */}
      <IntelligenceModal
        isOpen={isIntelligenceOpen}
        onClose={() => setIsIntelligenceOpen(false)}
        isLiveMode={isLiveMode}
      />

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </main>
  );
}
