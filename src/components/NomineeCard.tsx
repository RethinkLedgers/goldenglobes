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
      className="relative group overflow-hidden rounded-xl card-glow bg-[#0a0a0a] transition-transform duration-300 hover:scale-105 cursor-pointer"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {!imageError ? (
          <Image
            src={nominee.image}
            alt={nominee.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-bold text-white leading-tight line-clamp-2">
            {nominee.title}
          </h3>
          {nominee.details && (
            <p className="text-xs text-[#FFD700] mt-1 truncate">{nominee.details}</p>
          )}
        </div>

        {/* Sparkle effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFD700] rounded-full animate-ping" />
          <div className="absolute top-4 left-3 w-1 h-1 bg-[#FFF8DC] rounded-full animate-ping" style={{ animationDelay: "0.2s" }} />
          <div className="absolute bottom-12 right-4 w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-ping" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
