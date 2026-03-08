"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, projects, getStatistics } from "@/data/nominees";

export default function WinnersPage() {
  const [selectedType, setSelectedType] = useState<'all' | 'film' | 'television'>('all');
  const stats = getStatistics();

  const filteredCategories = selectedType === 'all'
    ? categories
    : categories.filter(c => c.type === selectedType);

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="font-serif text-4xl tracking-wider shimmer-text mb-4">
          Winners Dashboard
        </h1>
        <p className="text-gray-400">
          Complete overview of all 83rd Golden Globe Award winners
        </p>
      </div>

      {/* Stats Overview */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-transparent border border-[var(--gold)]/30 text-center">
            <p className="text-4xl font-serif text-[var(--gold)] mb-1">{stats.totalAwards}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Awards</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-4xl font-serif text-white mb-1">{stats.filmCategories}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Film Categories</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-4xl font-serif text-white mb-1">{stats.tvCategories}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">TV Categories</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 text-center">
            <p className="text-4xl font-serif text-white mb-1">{stats.firstTimeWinners}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">First-Time Winners</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-4 justify-center">
          {[
            { value: 'all', label: 'All Categories' },
            { value: 'film', label: '🎬 Film' },
            { value: 'television', label: '📺 Television' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedType(filter.value as 'all' | 'film' | 'television')}
              className={`px-4 py-2 rounded-lg text-sm uppercase tracking-wider transition-all ${
                selectedType === filter.value
                  ? 'bg-[var(--gold)] text-black'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Winners Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group p-5 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[var(--gold)]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{category.type}</p>
                  <p className="text-sm text-white font-medium">{category.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/20 flex items-center justify-center text-xl">
                  🏆
                </div>
                <div className="flex-1">
                  <p className="text-[var(--gold)] font-medium">{category.winner.name}</p>
                  {category.winner.project && (
                    <p className="text-xs text-gray-400">{category.winner.project}</p>
                  )}
                  {category.winner.role && (
                    <p className="text-xs text-gray-500">as {category.winner.role}</p>
                  )}
                </div>
                {category.winner.firstTimeWinner && (
                  <span className="px-2 py-1 rounded text-[10px] bg-[var(--gold)]/20 text-[var(--gold)] uppercase tracking-wider">
                    First Win
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Projects */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="font-serif text-2xl tracking-wider text-center mb-8">
          <span className="shimmer-text">Top Performing Projects</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.sort((a, b) => b.wins - a.wins).slice(0, 3).map((project, index) => (
            <div
              key={project.id}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/20 flex items-center justify-center text-xl font-serif text-[var(--gold)]">
                  #{index + 1}
                </div>
                <div>
                  <p className="text-lg font-serif text-white">{project.title}</p>
                  <p className="text-xs text-gray-500">{project.type === 'film' ? '🎬 Film' : '📺 TV Series'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <p className="text-2xl font-serif text-[var(--gold)]">{project.nominations}</p>
                  <p className="text-xs text-gray-500">Nominations</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-[var(--gold)]/10">
                  <p className="text-2xl font-serif text-[var(--gold)]">{project.wins}</p>
                  <p className="text-xs text-gray-500">Wins</p>
                </div>
              </div>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] rounded-full"
                  style={{ width: `${(project.wins / project.nominations) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                {Math.round((project.wins / project.nominations) * 100)}% success rate
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-6xl mx-auto mt-12">
        <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors text-sm">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
