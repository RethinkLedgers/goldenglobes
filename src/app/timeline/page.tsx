"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/nominees";

export default function TimelinePage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-12 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="font-serif text-4xl tracking-wider shimmer-text mb-4">
          Ceremony Timeline
        </h1>
        <p className="text-gray-400">
          Relive the entire 83rd Golden Globe Awards moment by moment
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/50 to-transparent" />

          {/* Opening */}
          <div className="relative pl-20 pb-12">
            <div className="absolute left-6 w-5 h-5 rounded-full bg-[var(--gold)] border-4 border-black" />
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-[var(--gold)] uppercase tracking-wider mb-2">Opening</p>
              <h3 className="text-xl font-serif text-white mb-2">Ceremony Begins</h3>
              <p className="text-sm text-gray-400">
                Host Nikki Glaser opens the 83rd Golden Globe Awards at The Beverly Hilton.
              </p>
            </div>
          </div>

          {/* Categories */}
          {categories.map((category, index) => (
            <div key={category.id} className="relative pl-20 pb-8">
              <div className="absolute left-6 w-5 h-5 rounded-full bg-[var(--gold-dark)] border-4 border-black" />

              <div
                className={`p-6 rounded-xl border transition-all cursor-pointer ${
                  expandedCategory === category.id
                    ? 'bg-[var(--gold)]/10 border-[var(--gold)]/40'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-[var(--gold-dark)] uppercase tracking-wider mb-1">
                      {category.type === 'film' ? '🎬 Film' : '📺 Television'}
                    </p>
                    <h3 className="text-lg font-serif text-white flex items-center gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500">Award #{index + 1}</span>
                </div>

                {/* Winner */}
                <div className="flex items-center gap-4 p-3 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/20 flex items-center justify-center">
                    🏆
                  </div>
                  <div>
                    <p className="text-[var(--gold)] font-medium">{category.winner.name}</p>
                    {category.winner.project && (
                      <p className="text-sm text-gray-400">{category.winner.project}</p>
                    )}
                  </div>
                </div>

                {/* Moment */}
                {category.moment && (
                  <p className="text-sm text-gray-500 italic mb-3">"{category.moment}"</p>
                )}

                {/* Expanded nominees */}
                {expandedCategory === category.id && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">All Nominees</p>
                    <div className="space-y-2">
                      {category.nominees.map((nominee) => (
                        <div
                          key={nominee.id}
                          className={`flex items-center gap-3 p-2 rounded ${
                            nominee.winner ? 'bg-[var(--gold)]/10' : 'bg-white/5'
                          }`}
                        >
                          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-sm">
                            {nominee.winner ? '🏆' : '👤'}
                          </div>
                          <div>
                            <p className={`text-sm ${nominee.winner ? 'text-[var(--gold)]' : 'text-white'}`}>
                              {nominee.name}
                            </p>
                            {nominee.role && (
                              <p className="text-xs text-gray-500">as {nominee.role}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Closing */}
          <div className="relative pl-20 pb-12">
            <div className="absolute left-6 w-5 h-5 rounded-full bg-[var(--gold)] border-4 border-black" />
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-[var(--gold)] uppercase tracking-wider mb-2">Closing</p>
              <h3 className="text-xl font-serif text-white mb-2">Ceremony Concludes</h3>
              <p className="text-sm text-gray-400">
                The 83rd Golden Globe Awards comes to a close. Thank you for joining us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-3xl mx-auto mt-8">
        <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors text-sm">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
