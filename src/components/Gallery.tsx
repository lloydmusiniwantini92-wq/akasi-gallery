"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { artworks, categories } from "@/lib/artworks";
import type { Artwork } from "@/lib/artworks";
import ArtworkModal from "./ArtworkModal";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: "easeOut" } 
  },
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "all"
      ? artworks
      : artworks.filter((a) => a.category === activeCategory);

  const handleSelect = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="py-48 lg:py-64 px-12 lg:px-24 2xl:px-48 max-w-6xl mx-auto"
        aria-labelledby="gallery-heading"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-white/30" />
            <span
              className="text-[10px] tracking-[0.35em] text-white/40 uppercase"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Selected Works
            </span>
          </div>
          <h2
            id="gallery-heading"
            className="text-[clamp(3.5rem,8vw,7rem)] font-light text-white leading-[0.9] tracking-[-0.02em] mb-12"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            The Collection
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter artworks by category">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-white/40 hover:border-white/40 hover:text-white/70"
                }`}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          ref={gridRef}
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8"
          role="tabpanel"
        >
          {filtered.map((artwork, i) => (
            <motion.article
              key={artwork.id}
              variants={itemVariants}
              className="break-inside-avoid"
            >
              <button
                onClick={() => handleSelect(artwork)}
                className="group relative w-full block overflow-hidden bg-[#111] cursor-zoom-in focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label={`View ${artwork.title} — ${artwork.medium}, ${artwork.year}`}
              >
                {/* Artwork image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={artwork.imagePath}
                    alt={`${artwork.title} by Akasi Osei`}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      <p
                        className="text-white text-xl font-light mb-1"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        {artwork.title}
                      </p>
                      <p
                        className="text-white/60 text-[10px] tracking-widest uppercase"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {artwork.medium}
                      </p>
                    </div>
                  </div>

                  {/* Available badge */}
                  {!artwork.available && (
                    <div className="absolute top-3 left-3 bg-black/80 px-2 py-1">
                      <span className="text-[9px] tracking-widest uppercase text-red-400/80" style={{ fontFamily: "DM Sans, sans-serif" }}>
                        Sold
                      </span>
                    </div>
                  )}

                  {/* Featured badge */}
                  {artwork.featured && (
                    <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm px-2 py-1 border border-white/10">
                      <span className="text-[9px] tracking-widest uppercase text-white/60" style={{ fontFamily: "DM Sans, sans-serif" }}>
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="p-4 text-left border border-white/5 border-t-0">
                  <h3
                    className="text-white font-light text-lg leading-tight mb-1"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {artwork.title}
                  </h3>
                  <p
                    className="text-white/35 text-[10px] tracking-wider uppercase"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {artwork.year} · {artwork.medium}
                  </p>
                </div>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Artwork Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        artworks={filtered.length > 0 ? filtered : artworks}
        onClose={handleClose}
        onSelect={handleSelect}
      />
    </>
  );
}
