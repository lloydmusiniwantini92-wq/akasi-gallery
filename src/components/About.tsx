"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-48 lg:py-64 px-12 lg:px-24 2xl:px-48 max-w-6xl mx-auto"
      aria-labelledby="about-heading"
    >
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Main image */}
          <div className="relative h-[480px] lg:h-[600px] overflow-hidden">
            <Image
              src="/images/artwork/artwork-07.jpg"
              alt="Artwork by Akasi Osei"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Secondary inset image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute -bottom-8 -right-6 w-40 h-52 lg:w-52 lg:h-64 border-4 border-[#0a0a0a] overflow-hidden hidden sm:block"
          >
            <Image
              src="/images/artwork/artwork-04.jpg"
              alt="Detail artwork by Akasi Osei"
              fill
              sizes="208px"
              className="object-cover"
            />
          </motion.div>

          {/* Stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-8 -left-4 bg-[#0a0a0a] border border-white/10 p-5 hidden md:block"
          >
            <p
              className="text-4xl font-light text-white mb-1"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              12+
            </p>
            <p
              className="text-[10px] tracking-widest text-white/40 uppercase"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Original Works
            </p>
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-white/30" />
            <span
              className="text-[10px] tracking-[0.35em] text-white/40 uppercase"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              The Artist
            </span>
          </div>

          <h2
            id="about-heading"
            className="text-[clamp(3.5rem,8vw,6.5rem)] font-light text-white leading-[0.85] tracking-[-0.02em] mb-10"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Akasi Osei.
            <br />
            <em className="italic text-white/50">Born between worlds.</em>
          </h2>

          <div
            className="space-y-6 text-white/60 text-lg lg:text-xl font-light leading-[1.8]"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <p>
              Akasi Osei is an American contemporary artist whose work lives at
              the intersection of the ancestral and the avant-garde. Born to a
              Ghanaian father and a Zimbabwean mother, she grew up navigating
              the rich, sometimes contradictory landscapes of African tradition
              and Black American experience — and she learned early that art was
              the only map that made sense of both.
            </p>
            <p>
              Educated in the fine arts in America, Akasi develops a visual
              language that draws on Ghanaian Adinkra symbolism, Zimbabwean
              Shona textile patterns, and the bold abstraction of the American
              art canon. Her work is neither African nor American — it is
              precisely, unapologetically, both.
            </p>
            <p>
              Working primarily in oil, acrylic, and mixed media, she builds
              paintings that demand time. Layers upon layers, textures that
              reveal new meaning as the light changes, compositions that feel as
              ancient as an oral tradition and as urgent as today's headlines.
            </p>
            <p>
              In October 2025, Akasi exhibited at the{" "}
              <span className="text-white">Black Girl Art Show</span> at the
              iconic Aon Grand Ballroom, Navy Pier, Chicago — one of the
              most celebrated showcases for Black women artists in America. It
              wasn't her introduction to the art world. It was her declaration.
            </p>
          </div>

          {/* Signature badges */}
          <div className="flex flex-wrap gap-3 mt-10">
            {[
              "Ghanaian Roots",
              "Zimbabwean Heritage",
              "American Voice",
              "BGAS Chicago 2025",
            ].map((badge) => (
              <span
                key={badge}
                className="text-[10px] tracking-widest uppercase px-4 py-2 border border-white/15 text-white/40"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
