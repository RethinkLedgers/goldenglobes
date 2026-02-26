"use client";

import { ceremonyInfo } from "@/data/nominees";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative pt-12 pb-10 px-4 text-center overflow-hidden">
      {/* Subtle top light streak */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

      {/* Gold ring decoration with Oscar statuette */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="gold-ring flex items-center justify-center mb-6">
          <Image
            src="/oscar-statuette.png"
            alt="Oscar Statuette"
            width={50}
            height={125}
            className="object-contain drop-shadow-[0_0_15px_rgba(197,164,78,0.3)]"
            priority
          />
        </div>

        {/* THE OSCARS title */}
        <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-[0.3em] uppercase shimmer-text mb-2">
          The Oscars
        </h1>

        {/* 98th subtitle */}
        <p className="text-[var(--gold-dark)] text-xs tracking-[0.4em] uppercase mb-1">
          98th Academy Awards
        </p>

        {/* Elegant divider */}
        <div className="gold-divider w-48 my-4" />

        {/* Ceremony details */}
        <p className="text-[var(--gold)] text-sm tracking-[0.2em] uppercase font-light mb-6">
          {ceremonyInfo.date}
        </p>

        <div className="flex flex-col gap-1.5 text-xs tracking-wider text-gray-400 uppercase">
          <p>
            Hosted by{" "}
            <span className="text-white/90 font-medium">{ceremonyInfo.host}</span>
          </p>
          <p>
            {ceremonyInfo.venue}
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />
    </header>
  );
}
