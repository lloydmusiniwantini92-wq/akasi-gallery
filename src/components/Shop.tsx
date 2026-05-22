"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Printer, Package, Truck, Check, ChevronDown } from "lucide-react";
import { artworks } from "@/lib/artworks";

const PRINT_SIZES = [
  { id: "8x10", label: '8"×10"', price: 45 },
  { id: "11x14", label: '11"×14"', price: 75 },
  { id: "16x20", label: '16"×20"', price: 120 },
  { id: "18x24", label: '18"×24"', price: 175 },
  { id: "24x36", label: '24"×36"', price: 249 },
];

const MATERIALS = [
  { id: "fine-art", label: "Fine Art Matte Paper", description: "Museum-quality 230gsm" },
  { id: "canvas", label: "Stretched Canvas", description: "Gallery-wrap, ready to hang" },
  { id: "metal", label: "Aluminum Print", description: "Vibrant, float-mounted" },
];

const FEATURES = [
  { icon: Printer, text: "Premium archival inks — prints last 100+ years" },
  { icon: Package, text: "Ships in protective packaging, globally" },
  { icon: Truck, text: "Fulfilled via Printify — ships within 3–5 days" },
  { icon: Check, text: "Artist-approved color calibration on every print" },
];

export default function Shop() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedArtwork, setSelectedArtwork] = useState(artworks[0]);
  const [selectedSize, setSelectedSize] = useState(PRINT_SIZES[1]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [added, setAdded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOrder = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const totalPrice = selectedSize.price + (selectedMaterial.id === "canvas" ? 30 : selectedMaterial.id === "metal" ? 50 : 0);

  return (
    <section
      id="shop"
      ref={ref}
      className="py-48 lg:py-64 bg-[#0d0d0d] border-t border-white/5"
      aria-labelledby="shop-heading"
    >
      <div className="max-w-6xl mx-auto px-12 lg:px-24 2xl:px-48">
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
              Print on Demand
            </span>
          </div>
          <h2
            id="shop-heading"
            className="text-[clamp(3.5rem,8vw,6.5rem)] font-light text-white leading-[0.85] tracking-[-0.02em] mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Own a Piece of the Work
          </h2>
          <p
            className="text-white/45 max-w-2xl text-lg lg:text-xl font-light leading-[1.8]"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Every print is produced with museum-grade precision through our Printify
            partnership — artist-approved, archival quality, and shipped to your door worldwide.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20">
          {/* Product viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Preview image */}
            <div className="relative h-72 lg:h-96 bg-[#111] overflow-hidden border border-white/5">
              <Image
                src={selectedArtwork.imagePath}
                alt={`Print of ${selectedArtwork.title} by Akasi Osei`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-4"
              />
              {/* Frame mock */}
              <div className="absolute inset-4 border border-white/5 pointer-events-none" />
            </div>

            {/* Artwork selector */}
            <div>
              <label
                className="block text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Select Artwork
              </label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#111] border border-white/10 text-white/70 text-sm hover:border-white/25 transition-colors cursor-pointer"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span className="truncate">{selectedArtwork.title}</span>
                  <ChevronDown size={14} className={`flex-shrink-0 ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute top-full left-0 right-0 z-20 bg-[#111] border border-white/10 border-t-0 max-h-52 overflow-y-auto"
                    role="listbox"
                  >
                    {artworks.map((a) => (
                      <button
                        key={a.id}
                        role="option"
                        aria-selected={selectedArtwork.id === a.id}
                        onClick={() => {
                          setSelectedArtwork(a);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer flex items-center gap-3 ${
                          selectedArtwork.id === a.id
                            ? "bg-white/10 text-white"
                            : "text-white/50 hover:bg-white/5 hover:text-white"
                        }`}
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden">
                          <Image src={a.imagePath} alt={a.title} fill className="object-cover" sizes="32px" />
                        </div>
                        <div>
                          <div>{a.title}</div>
                          <div className="text-[10px] text-white/30">{a.medium}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 p-3 border border-white/5">
                  <Icon size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-white/40 text-xs leading-relaxed"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Order panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="space-y-8"
          >
            <div>
              <h3
                className="text-2xl font-light text-white mb-1"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {selectedArtwork.title}
              </h3>
              <p
                className="text-white/40 text-xs tracking-widest uppercase"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Fine Art Print
              </p>
            </div>

            {/* Size selector */}
            <div>
              <label
                className="block text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Print Size
              </label>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Select print size">
                {PRINT_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize.id === size.id}
                    className={`py-3 px-2 text-center border transition-all duration-200 cursor-pointer ${
                      selectedSize.id === size.id
                        ? "border-white bg-white text-black"
                        : "border-white/10 text-white/45 hover:border-white/30"
                    }`}
                  >
                    <span
                      className="block text-xs font-light"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {size.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Material selector */}
            <div>
              <label
                className="block text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Material
              </label>
              <div className="space-y-2" role="group" aria-label="Select material">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    aria-pressed={selectedMaterial.id === mat.id}
                    className={`w-full flex items-start gap-3 p-3 border text-left transition-all duration-200 cursor-pointer ${
                      selectedMaterial.id === mat.id
                        ? "border-white/50 bg-white/5"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-3.5 h-3.5 rounded-full border flex-shrink-0 ${
                        selectedMaterial.id === mat.id
                          ? "border-white bg-white"
                          : "border-white/25"
                      }`}
                    />
                    <div>
                      <p
                        className="text-white/80 text-sm"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {mat.label}
                      </p>
                      <p
                        className="text-white/35 text-xs"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {mat.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price + Order */}
            <div className="border-t border-white/5 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-white/50 text-sm"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Total
                </span>
                <span
                  className="text-3xl font-light text-white"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  ${totalPrice}
                </span>
              </div>

              <button
                onClick={handleOrder}
                className={`w-full py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  added
                    ? "bg-white/20 text-white border border-white/20"
                    : "bg-white text-black hover:bg-white/90"
                }`}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {added ? (
                  <>
                    <Check size={14} />
                    Added to Cart
                  </>
                ) : (
                  "Order Print"
                )}
              </button>

              <p
                className="text-center text-[10px] text-white/25 mt-4 leading-relaxed"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Powered by Printify · Global shipping · Artist-approved
              </p>
            </div>

            {/* Printify badge */}
            <div className="flex items-center gap-2 pt-2">
              <ExternalLink size={11} className="text-white/20" />
              <span
                className="text-[10px] text-white/20"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Prints fulfilled by Printify — secure checkout
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
