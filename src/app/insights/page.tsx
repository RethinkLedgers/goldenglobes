"use client";

import Link from "next/link";
import { categories, studios, getStatistics } from "@/data/nominees";

export default function InsightsPage() {
  const stats = getStatistics();

  // Calculate insights
  const filmWins = categories.filter(c => c.type === 'film').length;
  const tvWins = categories.filter(c => c.type === 'television').length;
  const avgCompetitiveness = categories.reduce((acc, c) => acc + c.competitiveness, 0) / categories.length;

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="font-serif text-4xl tracking-wider shimmer-text mb-4">
          Ceremony Insights
        </h1>
        <p className="text-gray-400">
          Analysis and trends from the 83rd Golden Globe Awards
        </p>
      </div>

      {/* Key Insights */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="font-serif text-2xl tracking-wider text-center mb-8">
          <span className="shimmer-text">Key Findings</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Film vs Television",
              value: `${filmWins}:${tvWins}`,
              desc: "Distribution of awards between film and television categories",
              icon: "🎭",
            },
            {
              title: "Average Competitiveness",
              value: `${avgCompetitiveness.toFixed(1)}/10`,
              desc: "Overall competitiveness score across all categories",
              icon: "📊",
            },
            {
              title: "First-Time Winners",
              value: `${stats.firstTimeWinners}`,
              desc: "Winners receiving their first Golden Globe",
              icon: "⭐",
            },
            {
              title: "Most Awarded Project",
              value: stats.mostAwardedProject?.title || "N/A",
              desc: `${stats.mostAwardedProject?.wins} wins from ${stats.mostAwardedProject?.nominations} nominations`,
              icon: "🏆",
            },
            {
              title: "Total Nominees",
              value: `${stats.totalNominees}`,
              desc: "Individual nominees across all categories",
              icon: "👥",
            },
            {
              title: "Success Rate",
              value: `${Math.round((categories.length / stats.totalNominees) * 100)}%`,
              desc: "Overall nominee to winner ratio",
              icon: "📈",
            },
          ].map((insight) => (
            <div
              key={insight.title}
              className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{insight.icon}</span>
                <h3 className="text-sm text-gray-400 uppercase tracking-wider">{insight.title}</h3>
              </div>
              <p className="text-3xl font-serif text-[var(--gold)] mb-2">{insight.value}</p>
              <p className="text-sm text-gray-500">{insight.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Leaderboard */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="font-serif text-2xl tracking-wider text-center mb-8">
          <span className="shimmer-text">Studio Leaderboard</span>
        </h2>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="space-y-4">
            {studios.map((studio, index) => (
              <div key={studio.name} className="flex items-center gap-4">
                <div className="w-8 text-center font-serif text-[var(--gold)]">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium">{studio.name}</p>
                    <p className="text-sm text-gray-400">{studio.wins} wins</p>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] rounded-full transition-all"
                      style={{ width: `${(studio.wins / studios[0].wins) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{studio.nominations} nominations</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Heatmap */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="font-serif text-2xl tracking-wider text-center mb-8">
          <span className="shimmer-text">Category Competitiveness</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative p-4 rounded-lg text-center cursor-pointer transition-all"
              style={{
                backgroundColor: `rgba(197, 164, 78, ${category.competitiveness / 20})`,
              }}
            >
              <span className="text-lg">{category.icon}</span>
              <p className="text-xs text-white/80 mt-2 truncate">{category.name.replace('Best ', '').replace('Motion Picture - ', '').replace('Performance by an ', '')}</p>
              <p className="text-[10px] text-white/60">{category.competitiveness}/10</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
          <span>Less competitive</span>
          <div className="flex gap-1">
            {[1, 3, 5, 7, 9].map((v) => (
              <div key={v} className="w-6 h-4 rounded" style={{ backgroundColor: `rgba(197, 164, 78, ${v / 20})` }} />
            ))}
          </div>
          <span>Highly competitive</span>
        </div>
      </div>

      {/* Night Summary */}
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl tracking-wider text-center mb-8">
          <span className="shimmer-text">Night Summary</span>
        </h2>
        <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--gold)]/10 to-transparent border border-[var(--gold)]/20">
          <p className="text-gray-300 leading-relaxed">
            The 83rd Golden Globe Awards saw <span className="text-[var(--gold)]">{stats.mostAwardedProject?.title}</span> dominate
            multiple categories with {stats.mostAwardedProject?.wins} wins, while new talent emerged across acting awards.
            The ceremony highlighted strong performances in both film and television, with several
            <span className="text-[var(--gold)]"> first-time winners</span> receiving recognition. {studios[0].name} led
            studio representation with {studios[0].wins} total wins.
          </p>
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
