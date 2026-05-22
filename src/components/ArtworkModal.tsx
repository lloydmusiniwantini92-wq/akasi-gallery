"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { Artwork } from "@/lib/artworks";

interface ArtworkModalProps {
  artwork: Artwork | null;
  artworks: Artwork[];
  onClose: () => void;
  onSelect: (artwork: Artwork) => void;
}

export default function ArtworkModal({
  artwork,
  artworks,
  onClose,
  onSelect,
}: ArtworkModalProps) {
  const currentIndex = artworks.findIndex((a) => a.id === artwork?.id);

  const goNext = useCallback(() => {
    const next = artworks[(currentIndex + 1) % artworks.length];
    onSelect(next);
  }, [artworks, currentIndex, onSelect]);

  const goPrev = useCallback(() => {
    const prev =
      artworks[(currentIndex - 1 + artworks.length) % artworks.length];
    onSelect(prev);
  }, [artworks, currentIndex, onSelect]);

  useEffect(() => {
    if (!artwork) return;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [artwork, onClose, goNext, goPrev]);

  const scrollToShop = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("shop");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing: ${artwork.title}`}
        >
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl bg-[#111] border border-white/5 flex flex-col lg:flex-row max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative lg:w-3/5 h-64 sm:h-80 lg:h-auto bg-[#0a0a0a] flex-shrink-0">
              <Image
                src={artwork.imagePath}
                alt={artwork.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex flex-col lg:w-2/5 p-8 lg:p-10 overflow-y-auto">
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200"
              >
                <X size={16} />
              </button>

              <div className="flex-1">
                <div className="mb-2">
                  <span
                    className="text-[9px] tracking-[0.3em] text-white/30 uppercase"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {artwork.category.replace("-", " ")}
                  </span>
                </div>
                <h2
                  className="text-3xl lg:text-4xl font-light text-white mb-4 leading-tight"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {artwork.title}
                </h2>
                <p
                  className="text-white/50 text-sm mb-6 leading-relaxed"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {artwork.description}
                </p>

                <div className="space-y-2 text-sm text-white/40 border-t border-white/5 pt-5 mb-6" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  <div className="flex justify-between">
                    <span>Year</span>
                    <span className="text-white/70">{artwork.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medium</span>
                    <span className="text-white/70">{artwork.medium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimensions</span>
                    <span className="text-white/70">{artwork.dimensions}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-white/5 pt-5 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-2xl font-light text-white"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      ${artwork.price.toLocaleString()}
                    </span>
                    <span
                      className={`text-[10px] tracking-widest uppercase px-3 py-1 ${
                        artwork.available
                          ? "border border-white/20 text-white/50"
                          : "border border-red-500/20 text-red-400/70"
                      }`}
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {artwork.available ? "Available" : "Sold"}
                    </span>
                  </div>

                  {artwork.available && (
                    <button
                      onClick={scrollToShop}
                      className="w-full bg-white text-black text-[11px] tracking-[0.2em] uppercase py-3.5 hover:bg-white/90 transition-colors font-medium mb-3 cursor-pointer"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      Inquire to Purchase
                    </button>
                  )}

                  <button
                    onClick={scrollToShop}
                    className="w-full border border-white/15 text-white/60 text-[11px] tracking-[0.2em] uppercase py-3.5 hover:border-white/40 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    <ExternalLink size={12} />
                    Order a Fine Art Print
                  </button>
                </div>
              </div>

              {/* Print sizes */}
              <div>
                <p
                  className="text-[9px] tracking-[0.2em] text-white/25 uppercase mb-2"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Available Print Sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {artwork.printSizes.map((size) => (
                    <span
                      key={size}
                      className="text-[10px] text-white/40 border border-white/10 px-2 py-1"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous artwork"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-white/30 bg-black/50 transition-all duration-200 lg:left-4"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next artwork"
              className="absolute right-3 top-1/2 -translate-y-1/2 lg:right-auto lg:left-[59%] w-10 h-10 flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-white/30 bg-black/50 transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
