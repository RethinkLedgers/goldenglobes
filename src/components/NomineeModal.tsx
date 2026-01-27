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
    // Trigger enter animation
    requestAnimationFrame(() => setIsVisible(true));
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ${
        isVisible ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-t-2xl sm:rounded-2xl transition-transform duration-300 ease-out ${
          isVisible ? "modal-slide-up" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white text-lg hover:bg-black/80 transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-t-2xl sm:rounded-t-2xl">
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
            <div className="w-full h-full bg-gradient-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center">
              <span className="text-6xl">🎬</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 -mt-8 relative">
          <h2 className="text-xl font-bold text-white mb-1">{nominee.title}</h2>
          {nominee.details && (
            <p className="text-sm text-[#FFD700] mb-3">{nominee.details}</p>
          )}

          {/* Description */}
          {nominee.description && (
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {nominee.description}
            </p>
          )}

          {/* Other Nominations */}
          {otherNominations.length > 0 && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Other Nominations
              </h3>
              <div className="flex flex-wrap gap-2">
                {otherNominations.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20"
                  >
                    🏆 {cat}
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
