"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const FEATURED_IMAGES = [
  "/images/artwork/artwork-11.jpg",
  "/images/artwork/artwork-03.jpg",
  "/images/artwork/artwork-04.jpg",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[800px] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={FEATURED_IMAGES[0]}
          alt="Artwork by Akasi Osei"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Floating small images */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        className="absolute top-32 right-10 hidden lg:flex flex-col gap-4 z-10"
      >
        {FEATURED_IMAGES.slice(1).map((src, i) => (
          <div
            key={i}
            className="relative w-28 h-20 overflow-hidden border border-white/10"
          >
            <Image
              src={src}
              alt={`Artwork ${i + 2}`}
              fill
              sizes="112px"
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-12 lg:px-24 2xl:px-48"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-white/50" />
          <span
            className="text-[10px] tracking-[0.35em] text-white/50 uppercase"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Contemporary Fine Art
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="text-[clamp(4.5rem,12vw,11rem)] font-light leading-[0.85] tracking-[-0.03em] mb-8 text-white"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Where Africa
          <br />
          <em className="italic text-white/90">meets America.</em>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: "easeOut" }}
          className="text-white/50 text-base lg:text-xl font-light max-w-lg mb-12 leading-[1.8]"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          The work of Akasi Osei — Ghanaian roots, Zimbabwean soul, American
          voice. Exhibited at the Black Girl Art Show, Chicago 2025.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap gap-5"
        >
          <button
            onClick={() => scrollTo("gallery")}
            className="group relative text-[10px] tracking-[0.25em] uppercase px-10 py-5 bg-white text-black font-semibold overflow-hidden transition-all duration-500 hover:bg-white/90 cursor-pointer"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Enter Gallery
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="text-[10px] tracking-[0.25em] uppercase px-10 py-5 border border-white/20 text-white/80 hover:border-white/60 hover:text-white transition-all duration-500 font-medium cursor-pointer"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Meet the Artist
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-[9px] tracking-[0.3em] text-white/30 uppercase"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
