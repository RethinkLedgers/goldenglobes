"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { ceremonyInfo, categories, getStatistics } from "@/data/nominees";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const stats = getStatistics();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative z-10 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="font-serif text-lg tracking-wider shimmer-text">Golden Globes</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider">
              <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">Home</Link>
              <Link href="/timeline" className="text-gray-400 hover:text-white transition-colors">Timeline</Link>
              <Link href="/replay" className="text-gray-400 hover:text-white transition-colors">Replay</Link>
              <Link href="/winners" className="text-gray-400 hover:text-white transition-colors">Winners</Link>
              <Link href="/nominees" className="text-gray-400 hover:text-white transition-colors">Nominees</Link>
              <Link href="/insights" className="text-gray-400 hover:text-white transition-colors">Insights</Link>
              <Link href="/data" className="text-gray-400 hover:text-white transition-colors">Data Lab</Link>
            </div>
            <button className="md:hidden text-white">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--gold)]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Globe icon */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-8xl mb-6 animate-pulse">🌍</div>
        </div>

        {/* Title */}
        <h1 className={`font-serif text-6xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] uppercase shimmer-text mb-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Golden Globes
        </h1>

        {/* Year */}
        <p className={`text-[var(--gold)] text-2xl tracking-[0.3em] uppercase font-light mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          2026
        </p>

        {/* Subheading */}
        <p className={`text-gray-400 text-lg max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          An interactive exploration of the ceremony including nominees, winners, speeches, and industry insights.
        </p>

        {/* Primary buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            href="/timeline"
            className="px-8 py-4 bg-[var(--gold)] text-black font-medium uppercase tracking-wider text-sm rounded-lg hover:bg-[var(--gold-bright)] transition-all hover:shadow-[0_0_30px_rgba(197,164,78,0.5)]"
          >
            Explore the Ceremony
          </Link>
          <Link
            href="/winners"
            className="px-8 py-4 border border-[var(--gold)]/50 text-[var(--gold)] font-medium uppercase tracking-wider text-sm rounded-lg hover:bg-[var(--gold)]/10 transition-all"
          >
            View Winners Dashboard
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Quick Highlights Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-center tracking-wider mb-4">
            <span className="shimmer-text">Ceremony Highlights</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Key statistics from the 83rd Golden Globe Awards
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Stat Cards */}
            {[
              { label: "Awards Presented", value: ceremonyInfo.totalAwards, icon: "🏆" },
              { label: "Total Nominees", value: ceremonyInfo.totalNominees, icon: "👥" },
              { label: "Films Nominated", value: ceremonyInfo.totalFilms, icon: "🎬" },
              { label: "TV Shows Nominated", value: ceremonyInfo.totalShows, icon: "📺" },
              { label: "First-Time Winners", value: ceremonyInfo.firstTimeWinners, icon: "⭐" },
              { label: "Multiple Award Projects", value: 4, icon: "🌟" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-[var(--gold)]/30 transition-all cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-serif text-[var(--gold)] mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                <div className="absolute inset-0 rounded-xl bg-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Winners */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-[var(--gold)]/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-center tracking-wider mb-4">
            <span className="shimmer-text">Featured Winners</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">Top moments from the ceremony</p>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
              <div
                key={category.id}
                className="group relative p-6 rounded-xl bg-black/50 border border-white/10 hover:border-[var(--gold)]/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{category.type}</p>
                    <p className="text-sm text-white font-medium">{category.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-[var(--gold)]/20 flex items-center justify-center">
                    <span className="text-2xl">🎭</span>
                  </div>
                  <div>
                    <p className="text-lg font-serif text-[var(--gold)]">{category.winner.name}</p>
                    {category.winner.project && (
                      <p className="text-sm text-gray-400">{category.winner.project}</p>
                    )}
                  </div>
                </div>
                {category.moment && (
                  <p className="mt-4 text-xs text-gray-500 italic">"{category.moment}"</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/winners"
              className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              View All Winners
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 12L10 8L6 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Sections */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Ceremony Timeline", desc: "Relive the entire ceremony moment by moment", href: "/timeline", icon: "⏱️" },
              { title: "Nominee Explorer", desc: "Browse every nominee across all categories", href: "/nominees", icon: "🔍" },
              { title: "Connections Engine", desc: "Discover relationships between nominees", href: "/connections", icon: "🔗" },
              { title: "Data Lab", desc: "Deep dive into ceremony statistics", href: "/data", icon: "📊" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-[var(--gold)]/30 transition-all"
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h3 className="text-lg font-serif text-white mb-2 group-hover:text-[var(--gold)] transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🌍</span>
            <span className="font-serif text-xl tracking-wider shimmer-text">Golden Globes 2026</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            An interactive exploration of the 83rd Golden Globe Awards
          </p>
          <p className="text-gray-600 text-xs">
            Made by: Sienna Cant •{" "}
            <a href="mailto:sienna@rethink-ai.com" className="text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors">
              sienna@rethink-ai.com
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
