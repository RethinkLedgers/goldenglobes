"use client";

import { useState, useEffect, useRef } from "react";
import { Category, Nominee } from "@/data/nominees";
import NomineeCard from "./NomineeCard";
import NomineeModal from "./NomineeModal";

interface CategoryCardProps {
  category: Category;
  index: number;
  isLiveMode?: boolean;
}

export default function CategoryCard({ category, index, isLiveMode = false }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Card with gold left accent */}
      <div className={`bg-[#0d0d0d] border rounded-lg overflow-hidden transition-all duration-500 ${
        isLiveMode
          ? "border-[var(--gold)]/30"
          : "border-[var(--gold-dark)]/20"
      }`}>
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="category-header w-full px-5 py-4 flex items-center justify-between transition-colors hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-4">
            <div className={`w-px h-8 transition-all duration-500 ${
              isLiveMode
                ? "bg-gradient-to-b from-transparent via-[var(--gold-bright)] to-transparent"
                : "bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent"
            }`} />
            <div className="flex items-center gap-3">
              <span className="text-xl">{category.icon}</span>
              <div className="text-left">
                <h2
                  className={`font-serif text-base font-medium tracking-wide transition-colors duration-500 ${
                    isLiveMode ? "text-white" : "text-white/90"
                  }`}
                >
                  {category.name}
                </h2>
                <p className="text-xs text-gray-500 tracking-wider mt-0.5">
                  {category.nominees.length} NOMINEES
                </p>
              </div>
            </div>
          </div>
          <div
            className={`text-sm transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            } ${isLiveMode ? "text-[var(--gold)]" : "text-[var(--gold-dark)]"}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Winner Preview */}
        {category.winner && !isExpanded && (
          <div className="px-5 pb-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20">
              <span className="text-lg">🏆</span>
              <div>
                <p className="text-[var(--gold)] font-medium text-sm">{category.winner.name}</p>
                {category.winner.project && (
                  <p className="text-xs text-gray-500">{category.winner.project}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Nominees Grid */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="gold-divider mx-5" />
          <div className="p-4 grid grid-cols-2 gap-3">
            {category.nominees.map((nominee, idx) => (
              <NomineeCard
                key={nominee.id}
                nominee={nominee}
                index={idx}
                onClick={() => setSelectedNominee(nominee)}
              />
            ))}
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
