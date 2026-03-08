"use client";

import Link from "next/link";
import { categories, ceremonyInfo, studios } from "@/data/nominees";

export default function DataLabPage() {
  // Calculate various statistics
  const filmCategories = categories.filter(c => c.type === 'film');
  const tvCategories = categories.filter(c => c.type === 'television');
  const allNominees = categories.flatMap(c => c.nominees);
  const winners = categories.map(c => c.winner);

  // Type breakdown
  const actorWinners = winners.filter(w => w.type === 'actor').length;
  const directorWinners = winners.filter(w => w.type === 'director').length;
  const producerWinners = winners.filter(w => w.type === 'producer').length;

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="font-serif text-4xl tracking-wider shimmer-text mb-4">
          Golden Globes Data Lab
        </h1>
        <p className="text-gray-400">
          Deep dive into ceremony statistics and analytics
        </p>
      </div>

      {/* Pie Chart - Film vs TV */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-serif text-white mb-6 text-center">Awards Distribution</h3>
            <div className="flex items-center justify-center gap-8">
              {/* Simple pie representation */}
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="var(--gold)"
                    strokeWidth="20"
                    strokeDasharray={`${(filmCategories.length / categories.length) * 251.2} 251.2`}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="rgba(197, 164, 78, 0.3)"
                    strokeWidth="20"
                    strokeDasharray={`${(tvCategories.length / categories.length) * 251.2} 251.2`}
                    strokeDashoffset={`-${(filmCategories.length / categories.length) * 251.2}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-serif text-[var(--gold)]">{categories.length}</p>
                    <p className="text-[10px] text-gray-500">TOTAL</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-[var(--gold)]" />
                  <div>
                    <p className="text-white">Film</p>
                    <p className="text-sm text-gray-400">{filmCategories.length} categories</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-[var(--gold)]/30" />
                  <div>
                    <p className="text-white">Television</p>
                    <p className="text-sm text-gray-400">{tvCategories.length} categories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-serif text-white mb-6 text-center">Winner Types</h3>
            <div className="space-y-4">
              {[
                { label: 'Actors', value: actorWinners, color: 'var(--gold)' },
                { label: 'Directors', value: directorWinners, color: 'var(--gold-bright)' },
                { label: 'Producers/Projects', value: producerWinners, color: 'var(--gold-dark)' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm text-white">{item.value}</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(item.value / categories.length) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Table */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="font-serif text-2xl tracking-wider text-center mb-8">
          <span className="shimmer-text">Ceremony Statistics</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="text-right py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { metric: "Total Awards Presented", value: ceremonyInfo.totalAwards },
                { metric: "Total Nominees", value: ceremonyInfo.totalNominees },
                { metric: "Films Nominated", value: ceremonyInfo.totalFilms },
                { metric: "Television Shows Nominated", value: ceremonyInfo.totalShows },
                { metric: "Film Categories", value: filmCategories.length },
                { metric: "Television Categories", value: tvCategories.length },
                { metric: "First-Time Winners", value: ceremonyInfo.firstTimeWinners },
                { metric: "Average Nominees per Category", value: (allNominees.length / categories.length).toFixed(1) },
              ].map((row) => (
                <tr key={row.metric} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-300">{row.metric}</td>
                  <td className="py-3 px-4 text-sm text-[var(--gold)] text-right font-medium">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Studio Rankings */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="font-serif text-2xl tracking-wider text-center mb-8">
          <span className="shimmer-text">Studio Rankings</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">Studio</th>
                <th className="text-center py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">Nominations</th>
                <th className="text-center py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">Wins</th>
                <th className="text-right py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {studios.map((studio, index) => (
                <tr key={studio.name} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-sm text-[var(--gold)]">#{index + 1}</td>
                  <td className="py-3 px-4 text-sm text-white">{studio.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-400 text-center">{studio.nominations}</td>
                  <td className="py-3 px-4 text-sm text-[var(--gold)] text-center font-medium">{studio.wins}</td>
                  <td className="py-3 px-4 text-sm text-gray-400 text-right">
                    {Math.round((studio.wins / studio.nominations) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors text-sm">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
