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
      className="relative group overflow-hidden rounded-lg bg-[#0a0a0a] border border-white/[0.06] transition-all duration-500 ease-out hover:border-[var(--gold-dark)]/40 hover:scale-[1.02] cursor-pointer hover:shadow-[0_0_30px_rgba(197,164,78,0.15),0_0_60px_rgba(197,164,78,0.08)]"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {!imageError ? (
          <Image
            src={nominee.image}
            alt={nominee.title}
            fill
            className="object-cover transition-all duration-500 group-hover:brightness-75"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a0a] to-[#0d0d0d] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-[var(--gold-dark)]/30 flex items-center justify-center">
              <span className="text-[10px] text-[var(--gold-dark)] tracking-wider uppercase">N/A</span>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

        {/* Gold accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-medium text-white/90 leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-[var(--gold)]">
            {nominee.title}
          </h3>
          {nominee.details && (
            <p className="text-[11px] text-[var(--gold)] mt-1 truncate opacity-80 group-hover:opacity-100 transition-opacity duration-300">{nominee.details}</p>
          )}
        </div>
      </div>
    </div>
  );
}
