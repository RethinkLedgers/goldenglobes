"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/nominees";

export default function NomineesPage() {
  const [selectedType, setSelectedType] = useState<'all' | 'film' | 'television'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showWinnersOnly, setShowWinnersOnly] = useState(false);

  const allNominees = categories.flatMap(c =>
    c.nominees.map(n => ({ ...n, categoryName: c.name, categoryType: c.type, categoryIcon: c.icon }))
  );

  const filteredNominees = allNominees.filter(n => {
    if (selectedType !== 'all' && n.categoryType !== selectedType) return false;
    if (showWinnersOnly && !n.winner) return false;
    return true;
  });

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="font-serif text-4xl tracking-wider shimmer-text mb-4">
          Nominee Explorer
        </h1>
        <p className="text-gray-400">
          Browse every nominee across all {categories.length} categories
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          {/* Type filter */}
          <div className="flex items-center gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'film', label: '🎬 Film' },
              { value: 'television', label: '📺 TV' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedType(filter.value as 'all' | 'film' | 'television')}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all ${
                  selectedType === filter.value
                    ? 'bg-[var(--gold)] text-black'
                    : 'bg-white/5 text-gray-400 border border-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Winners toggle */}
          <button
            onClick={() => setShowWinnersOnly(!showWinnersOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all ${
              showWinnersOnly
                ? 'bg-[var(--gold)] text-black'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            🏆 Winners Only
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-6xl mx-auto mb-6">
        <p className="text-sm text-gray-500 text-center">
          Showing {filteredNominees.length} nominees
        </p>
      </div>

      {/* Nominees Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNominees.map((nominee) => (
            <div
              key={`${nominee.id}-${nominee.categoryName}`}
              className={`group relative p-4 rounded-xl border transition-all ${
                nominee.winner
                  ? 'bg-gradient-to-br from-[var(--gold)]/10 to-transparent border-[var(--gold)]/30'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Winner badge */}
              {nominee.winner && (
                <div className="absolute top-2 right-2">
                  <span className="text-lg">🏆</span>
                </div>
              )}

              {/* Avatar */}
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--gold)]/20 flex items-center justify-center mb-3">
                <span className="text-2xl">{nominee.winner ? '🏆' : '👤'}</span>
              </div>

              {/* Info */}
              <div className="text-center">
                <p className={`font-medium ${nominee.winner ? 'text-[var(--gold)]' : 'text-white'}`}>
                  {nominee.name}
                </p>
                {nominee.project && (
                  <p className="text-xs text-gray-400 mt-1">{nominee.project}</p>
                )}
                {nominee.role && (
                  <p className="text-xs text-gray-500">as {nominee.role}</p>
                )}
              </div>

              {/* Category */}
              <div className="mt-3 pt-3 border-t border-white/10 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1">
                  <span>{nominee.categoryIcon}</span>
                  <span className="truncate max-w-[150px]">{nominee.categoryName}</span>
                </p>
              </div>

              {/* First time winner badge */}
              {nominee.firstTimeWinner && (
                <div className="mt-2 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[var(--gold)]/20 text-[var(--gold)] uppercase tracking-wider">
                    First Win
                  </span>
                </div>
              )}
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
