"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/nominees";

type ReplayStep = 'category' | 'nominees' | 'winner' | 'moment';

export default function ReplayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<ReplayStep>('category');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentCategory = categories[currentIndex];

  const handleNext = () => {
    if (step === 'category') setStep('nominees');
    else if (step === 'nominees') setStep('winner');
    else if (step === 'winner') setStep('moment');
    else {
      if (currentIndex < categories.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setStep('category');
      }
    }
  };

  const handlePrevious = () => {
    if (step === 'moment') setStep('winner');
    else if (step === 'winner') setStep('nominees');
    else if (step === 'nominees') setStep('category');
    else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setStep('moment');
      }
    }
  };

  const handleSkip = () => {
    if (currentIndex < categories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setStep('category');
    }
  };

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-12 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="font-serif text-4xl tracking-wider shimmer-text mb-4">
          Ceremony Replay
        </h1>
        <p className="text-gray-400">
          Relive the ceremony in sequence, category by category
        </p>
      </div>

      {/* Progress */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Category {currentIndex + 1} of {categories.length}</span>
          <span>{Math.round(((currentIndex + 1) / categories.length) * 100)}% Complete</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / categories.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="min-h-[500px] p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {['category', 'nominees', 'winner', 'moment'].map((s, i) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all ${
                  step === s ? 'w-8 bg-[var(--gold)]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Category Step */}
          {step === 'category' && (
            <div className="text-center animate-fade-in">
              <p className="text-xs text-[var(--gold-dark)] uppercase tracking-wider mb-4">
                {currentCategory.type === 'film' ? '🎬 Film Category' : '📺 Television Category'}
              </p>
              <div className="text-6xl mb-6">{currentCategory.icon}</div>
              <h2 className="font-serif text-3xl text-white mb-4">{currentCategory.name}</h2>
              <p className="text-sm text-gray-500">Tap Next to reveal nominees</p>
            </div>
          )}

          {/* Nominees Step */}
          {step === 'nominees' && (
            <div className="animate-fade-in">
              <h3 className="text-sm text-[var(--gold-dark)] uppercase tracking-wider mb-4 text-center">Nominees</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentCategory.nominees.map((nominee, i) => (
                  <div
                    key={nominee.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{nominee.name}</p>
                        {nominee.project && (
                          <p className="text-xs text-gray-500">{nominee.project}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Winner Step */}
          {step === 'winner' && (
            <div className="text-center animate-fade-in">
              <p className="text-sm text-[var(--gold)] uppercase tracking-wider mb-6">🏆 The Winner Is...</p>
              <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-[var(--gold)]/20 to-transparent border border-[var(--gold)]/40">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="font-serif text-3xl text-[var(--gold)] mb-2">{currentCategory.winner.name}</h2>
                {currentCategory.winner.project && (
                  <p className="text-gray-400">{currentCategory.winner.project}</p>
                )}
                {currentCategory.winner.role && (
                  <p className="text-sm text-gray-500">as {currentCategory.winner.role}</p>
                )}
                {currentCategory.winner.firstTimeWinner && (
                  <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs bg-[var(--gold)]/20 text-[var(--gold)] uppercase tracking-wider">
                    First-Time Winner!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Moment Step */}
          {step === 'moment' && (
            <div className="text-center animate-fade-in">
              <p className="text-sm text-[var(--gold-dark)] uppercase tracking-wider mb-6">Ceremony Moment</p>
              <div className="max-w-lg mx-auto p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-4xl mb-4">✨</div>
                <p className="text-gray-300 leading-relaxed italic">
                  "{currentCategory.moment || `${currentCategory.winner.name} wins ${currentCategory.name}!`}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 && step === 'category'}
            className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <button
            onClick={handleSkip}
            className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === categories.length - 1 && step === 'moment'}
            className="px-6 py-3 rounded-lg bg-[var(--gold)] text-black font-medium hover:bg-[var(--gold-bright)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-4xl mx-auto mt-12">
        <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors text-sm">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
