"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const pressItems = [
  {
    outlet: "Black Girl Art Show",
    quote:
      "Osei's work demands more than admiration — it demands a reckoning. Her canvases are archives and forecasts at once.",
    date: "October 2025",
    location: "Navy Pier, Chicago",
    image: "/images/artwork/artwork-11.jpg",
    type: "Exhibition",
  },
  {
    outlet: "Featured Exhibition",
    quote:
      "Where ancestral memory meets the urgency of contemporary abstraction — Akasi Osei is building a body of work that will outlast its era.",
    date: "2025",
    location: "Chicago, Illinois",
    image: "/images/artwork/artwork-03.jpg",
    type: "Review",
  },
  {
    outlet: "Collector's Note",
    quote:
      "A rare thing: paintings that have something new to say every time you stand before them. This is art that grows with you.",
    date: "2024",
    location: "Private Collection",
    image: "/images/artwork/artwork-04.jpg",
    type: "Testimonial",
  },
];

export default function Press() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="press"
      ref={ref}
      className="py-48 lg:py-64 px-12 lg:px-24 2xl:px-48 max-w-6xl mx-auto"
      aria-labelledby="press-heading"
    >
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
            Recognition
          </span>
        </div>
        <h2
          id="press-heading"
          className="text-[clamp(3.5rem,8vw,6.5rem)] font-light text-white leading-[0.85] tracking-[-0.02em]"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Press &amp; Exhibition
        </h2>
      </motion.div>

      {/* Large featured quote */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 1 }}
        className="border-l-[3px] border-white/20 pl-8 lg:pl-12 mb-24 lg:mb-32"
      >
        <p
          className="text-[clamp(1.6rem,4vw,3.5rem)] font-light italic text-white/90 leading-[1.3] max-w-5xl"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          "In October 2025, Akasi Osei stood before hundreds at the Aon Grand
          Ballroom, Navy Pier, Chicago — part of the Black Girl Art Show, one
          of the most powerful travelling exhibitions for Black women artists in
          the United States. The room changed when people encountered her work."
        </p>
        <p
          className="text-white/40 text-sm mt-8 tracking-[0.2em] uppercase font-light"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Black Girl Art Show · Chicago · October 12, 2025
        </p>
      </motion.div>

      {/* Press cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {pressItems.map((item, i) => (
          <motion.div
            key={item.outlet}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
            className="border border-white/8 overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.outlet}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute top-4 left-4">
                <span
                  className="text-[9px] tracking-[0.25em] uppercase text-white/50 border border-white/20 px-2 py-1"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {item.type}
                </span>
              </div>
            </div>
            <div className="p-6">
              <p
                className="text-xl font-light italic text-white/70 mb-4 leading-snug"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                "{item.quote}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-white/25" />
                <p
                  className="text-white/30 text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {item.outlet} · {item.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
