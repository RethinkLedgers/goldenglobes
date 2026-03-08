"use client";

import { Nominee } from "@/data/nominees";
import Image from "next/image";
import { useState } from "react";

interface NomineeCardProps {
  nominee: Nominee;
  index: number;
  onClick?: () => void;
}

export default function NomineeCard({ nominee, index, onClick }: NomineeCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        nominee.winner
          ? 'bg-gradient-to-br from-[var(--gold)]/20 to-transparent ring-1 ring-[var(--gold)]/30'
          : 'bg-white/5'
      }`}
    >
      {/* Winner badge */}
      {nominee.winner && (
        <div className="absolute top-2 right-2 z-10">
          <span className="text-lg">🏆</span>
        </div>
      )}

      {/* Image container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {nominee.image && !imageError ? (
          <Image
            src={nominee.image}
            alt={nominee.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, 200px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a0a] to-[#0d0d0d] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center">
              <span className="text-xl">{nominee.winner ? '🏆' : '👤'}</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className={`text-sm font-medium leading-tight line-clamp-2 transition-colors duration-300 ${
          nominee.winner ? 'text-[var(--gold)]' : 'text-white/90 group-hover:text-[var(--gold)]'
        }`}>
          {nominee.name}
        </h3>
        {nominee.project && (
          <p className="text-[11px] text-gray-400 mt-1 truncate">{nominee.project}</p>
        )}
        {nominee.role && (
          <p className="text-[10px] text-gray-500 mt-0.5">as {nominee.role}</p>
        )}
        {nominee.firstTimeWinner && (
          <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] bg-[var(--gold)]/20 text-[var(--gold)] uppercase tracking-wider">
            First Win
          </span>
        )}
      </div>
    </div>
  );
}
