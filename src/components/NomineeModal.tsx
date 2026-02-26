"use client";

import { Nominee, findOtherNominations } from "@/data/nominees";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NomineeModalProps {
  nominee: Nominee;
  categoryName: string;
  onClose: () => void;
}

export default function NomineeModal({ nominee, categoryName, onClose }: NomineeModalProps) {
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const otherNominations = findOtherNominations(nominee.title, categoryName);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Reset image error when nominee changes
  useEffect(() => {
    setImageError(false);
  }, [nominee.title]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ${
        isVisible ? "bg-black/85 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-[var(--gold-dark)]/20 rounded-t-xl sm:rounded-xl transition-transform duration-300 ease-out ${
          isVisible ? "modal-slide-up" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 text-sm hover:text-white hover:border-[var(--gold-dark)]/40 transition-all"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-t-xl sm:rounded-t-xl">
          {nominee.image && !imageError ? (
            <Image
              src={nominee.image}
              alt={nominee.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a0a] to-[#0d0d0d] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-[var(--gold-dark)]/30 flex items-center justify-center">
                <span className="text-xs text-[var(--gold-dark)] tracking-wider uppercase">N/A</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 -mt-8 relative">
          <h2
            className="font-serif text-xl font-medium text-white mb-1"
          >
            {nominee.title}
          </h2>
          {nominee.details && (
            <p className="text-sm text-[var(--gold)] opacity-80 mb-3">{nominee.details}</p>
          )}

          {/* Description */}
          {nominee.description && (
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {nominee.description}
            </p>
          )}

          {/* Other Nominations */}
          {otherNominations.length > 0 && (
            <div className="pt-4">
              <div className="gold-divider mb-4" />
              <h3 className="text-[10px] font-medium text-[var(--gold-dark)] uppercase tracking-[0.2em] mb-3">
                Other Nominations
              </h3>
              <div className="flex flex-wrap gap-2">
                {otherNominations.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center px-3 py-1.5 rounded text-[11px] tracking-wide text-[var(--gold-light)] bg-[var(--gold)]/[0.07] border border-[var(--gold-dark)]/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
