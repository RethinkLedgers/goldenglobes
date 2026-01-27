"use client";

import { useState } from "react";
import { Category, Nominee } from "@/data/nominees";
import NomineeCard from "./NomineeCard";
import NomineeModal from "./NomineeModal";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);

  return (
    <div
      className="relative rounded-2xl transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gold gradient border */}
      <div className="gradient-border p-[2px] rounded-2xl">
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-4 flex items-center justify-between sparkle-bg hover:bg-[#222] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl trophy-float">{category.icon}</span>
              <div className="text-left">
                <h2 className="text-lg font-bold shimmer-text">{category.name}</h2>
                <p className="text-sm text-gray-400">
                  {category.nominees.length} shortlisted
                </p>
              </div>
            </div>
            <div
              className={`text-[#FFD700] text-2xl transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              ▼
            </div>
          </button>

          {/* Nominees Grid */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 pt-0 grid grid-cols-2 gap-3">
              {category.nominees.map((nominee, idx) => (
                <NomineeCard
                  key={nominee.title}
                  nominee={nominee}
                  index={idx}
                  onClick={() => setSelectedNominee(nominee)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nominee Detail Modal */}
      {selectedNominee && (
        <NomineeModal
          nominee={selectedNominee}
          categoryName={category.name}
          onClose={() => setSelectedNominee(null)}
        />
      )}
    </div>
  );
}
