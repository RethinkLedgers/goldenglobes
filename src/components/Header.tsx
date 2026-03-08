"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="relative py-8 px-4 text-center overflow-hidden">
      {/* Subtle top light streak */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

      {/* Golden Globe branding */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Globe icon */}
        <div className="text-4xl mb-4">🌍</div>

        {/* GOLDEN GLOBES title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-[0.3em] uppercase shimmer-text mb-2">
          Golden Globes
        </h1>

        {/* 83rd subtitle */}
        <p className="text-[var(--gold-dark)] text-xs tracking-[0.4em] uppercase mb-1">
          83rd Annual Golden Globe Awards
        </p>

        {/* Elegant divider */}
        <div className="gold-divider w-32 my-3" />

        {/* Ceremony details */}
        <p className="text-[var(--gold)] text-xs tracking-[0.2em] uppercase font-light">
          January 2026 • CBS • The Beverly Hilton
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent" />
    </header>
  );
}
