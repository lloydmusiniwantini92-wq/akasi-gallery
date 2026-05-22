import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Globe, ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import { IMAGES, HERO_SLIDES, ABOUT_IMAGES, EXPERIMENTAL_GALLERY } from '../constants/assets';
import { MASTERPIECES, COLLECTIONS, EXHIBITIONS, HERO_SEQUENCE } from '../data/galleryData';
import { PrivateViewOverlay } from '../components/PrivateViewOverlay';

interface HomeViewProps {
  heroIndex: number;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  openCheckout: (item: any) => void;
  navigateTo: (view: string, section?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  heroIndex, hoveredId, setHoveredId, openCheckout, navigateTo 
}) => (
  <>
    {/* SECTION 1: HERO */}
    <section id="home" className="h-screen relative overflow-hidden bg-black">
      {HERO_SLIDES.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ 
            opacity: i === heroIndex ? 1 : 0,
            scale: i === heroIndex ? 1 : 1.08
          }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={slide} className="w-full h-full object-cover" alt="Exhibition Slide" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        </motion.div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-8">
        {/* Industry standard subtle radial gradient for text legibility over busy backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.6)_0%,_rgba(0,0,0,0)_60%)] -z-10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] text-white/90 drop-shadow-md block">
            Akasis Gallery Presents
          </span>
        </motion.div>

        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span 
                className="font-mono text-[clamp(1rem,2vw,2.5rem)] uppercase tracking-[0.6em] mb-4 transition-colors duration-1000 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                style={{ color: HERO_SEQUENCE[heroIndex % HERO_SEQUENCE.length].color }}
              >
                {HERO_SEQUENCE[heroIndex % HERO_SEQUENCE.length].top}
              </span>
              <h1 
                className="font-serif text-[clamp(4rem,12vw,18rem)] tracking-tighter leading-[0.8] transition-colors duration-1000 uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                style={{ color: HERO_SEQUENCE[heroIndex % HERO_SEQUENCE.length].color }}
              >
                {HERO_SEQUENCE[heroIndex % HERO_SEQUENCE.length].bottom}
              </h1>
            </motion.div>
          </AnimatePresence>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mt-12 opacity-30"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 font-sans text-sm md:text-base text-white/90 max-w-xl leading-loose drop-shadow-md"
        >
          A high-fidelity destination for the modern <br/> Afro-minimalist experience.
        </motion.p>
      </div>

      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => {
          const section = document.getElementById('masterpieces');
          section?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-12 right-8 md:bottom-24 md:right-24 z-30 group flex items-center gap-6 cursor-none"
      >
        <div className="flex flex-col items-end drop-shadow-md">
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white md:text-[#C5A059] font-bold md:font-normal group-hover:text-white transition-colors duration-700 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Begin Narrative</span>
          <div className="w-16 h-px bg-white/60 md:bg-[#C5A059]/20 group-hover:bg-white group-hover:w-32 transition-all duration-1000 mt-3 shadow-lg" />
        </div>
        <div className="w-14 h-14 rounded-full border border-white/40 md:border-[#C5A059]/20 bg-black/20 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all duration-700 backdrop-blur-md shadow-xl">
          <ArrowRight size={16} className="text-white md:text-[#C5A059] group-hover:text-black group-hover:translate-x-1 transition-all duration-700" />
        </div>
      </motion.button>
    </section>

    {/* SECTION 2: THE VELVET MANIFESTO */}
    <motion.section className="relative bg-[#D9D2C5] text-black overflow-hidden border-t border-black/5 min-h-screen flex flex-col md:flex-row">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <img src={ABOUT_IMAGES.hero} className="w-full h-full object-cover scale-110" alt="" />
      </div>

      <div className="md:w-1/2 relative min-h-[60vh] md:min-h-screen">
        <div className="absolute inset-0 overflow-hidden border-r border-black/5">
          <img 
            src={ABOUT_IMAGES.hero} 
            className="w-full h-full object-cover object-[50%_20%] transition-transform duration-[5s] hover:scale-105" 
            alt="Akasi Osei" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#D9D2C5]/20" />
          <div className="absolute bottom-12 left-12 z-20">
             <p className="font-serif text-4xl italic text-white tracking-tighter">Akasi Osei</p>
             <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/70 mt-3">The Artist & Founder</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center p-8 md:p-24 md:pl-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-[#8B5E3C] mb-8 block">The Manifesto</span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1] tracking-tighter text-black mb-16 font-light italic">
            "I want my art to feel like a <span className="text-[#8B5E3C]">held breath.</span>"
          </h2>
          
          <div className="space-y-12 pl-12 border-l border-black/10">
            <p className="font-sans text-sm md:text-base text-black/60 tracking-wide leading-[2.5] max-w-xl">
              Akasi Osei is an emerging artist whose work explores identity, resilience, and the embodied experience of everyday life. Influenced by a cross-cultural perspective, her practice reflects an ongoing negotiation between inherited histories and lived experience.
            </p>
            <p className="font-sans text-sm md:text-base text-black/60 tracking-wide leading-[2.5] max-w-xl">
              Through hybrid, symbolic figures and layered compositions, she transforms uncertainty into opportunities for self-definition with optimism.
            </p>
            
            <button 
              onClick={() => navigateTo('about')}
              className="group relative mt-12 px-16 py-8 border border-[#8B5E3C]/30 hover:border-[#8B5E3C] transition-all duration-700 cursor-none overflow-hidden inline-flex items-center gap-8"
            >
              <div className="absolute inset-0 bg-[#8B5E3C] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 font-sans text-[11px] uppercase tracking-[0.5em] text-[#8B5E3C] group-hover:text-white transition-colors duration-700">
                The Full Narrative
              </span>
              <ArrowRight size={16} className="relative z-10 text-[#8B5E3C] group-hover:text-white group-hover:translate-x-2 transition-all duration-700" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>

    {/* SECTION 3: MASTERPIECES */}
    <section id="masterpieces" className="bg-[#F9F8F6] py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-[#C5A059]">Selected Works</span>
            <h2 className="font-serif text-6xl md:text-8xl tracking-tighter text-black leading-none uppercase font-light">The Shop.</h2>
          </div>
          <p className="font-sans text-sm md:text-base text-black/60 max-w-sm leading-loose">
            A permanent exploration of identity through mixed media, gold leaf, and high-fidelity textures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
          {MASTERPIECES.map((art, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 80 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} 
              onMouseEnter={() => setHoveredId(i)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 shadow-2xl border border-black/5">
                <img src={art.img} className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110" alt={art.title} />
                <PrivateViewOverlay 
                  title={art.title} 
                  medium={art.medium} 
                  dim={art.dim} 
                  price={art.price} 
                  isHovered={hoveredId === i} 
                  onAcquire={() => openCheckout(art)}
                />
              </div>
              <div className="mt-8 flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-black tracking-tight uppercase leading-none">{art.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-black/30">{art.year}</p>
                </div>
                <p className="font-mono text-xs tracking-[0.2em] text-[#8B5E3C] font-bold">{art.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-end">
          <button 
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-4 text-black hover:text-[#C5A059] transition-colors group cursor-none"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.4em]">View All Works</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>

    {/* SECTION 4: COLLECTIONS */}
    <section id="collections" className="bg-[#D9D2C5] text-black py-32 overflow-hidden relative border-y border-black/5">
       <div className="absolute inset-0 opacity-5">
          <img src={IMAGES.masterpiece3} className="w-full h-full object-cover" alt="Background" />
       </div>
       <div className="max-w-7xl mx-auto px-8 md:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
             <div className="md:col-span-4 space-y-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-[#8B5E3C]">Curated Sets</span>
                <h2 className="font-serif text-6xl md:text-8xl tracking-tighter italic leading-none text-black">The Series.</h2>
                <p className="font-sans text-sm md:text-base text-black/60 leading-loose">
                   Each series is a deep dive into a specific narrative arc, authored over months of studio seclusion.
                </p>
                <div className="pt-8 border-t border-black/10 flex gap-8">
                   <div className="space-y-2">
                      <p className="font-serif text-4xl italic text-[#8B5E3C]">3</p>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-black/30">Active Series</p>
                   </div>
                   <div className="space-y-2">
                      <p className="font-serif text-4xl italic text-[#8B5E3C]">35</p>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-black/30">Directives</p>
                   </div>
                </div>
             </div>
             
             <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                {COLLECTIONS.map((col, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-none"
                  >
                    <div className="aspect-[2/3] overflow-hidden mb-8 border border-black/5 shadow-2xl relative">
                       <img src={col.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt={col.title} />
                       <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700" />
                    </div>
                    <span className="font-mono text-[9px] text-[#8B5E3C] tracking-widest">{col.id}</span>
                    <h3 className="font-serif text-2xl mt-2 italic group-hover:text-[#8B5E3C] transition-colors">{col.title}</h3>
                  </motion.div>
                ))}
             </div>
          </div>
       </div>
    </section>

    {/* SECTION 5: EXHIBITIONS */}
    <section id="exhibitions" className="bg-[#D9D2C5] py-32 px-8 md:px-24">
       <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 space-y-8">
             <span className="font-mono text-[10px] uppercase tracking-[1em] text-[#8B5E3C]">Presence</span>
             <h2 className="font-serif text-6xl text-black tracking-tighter italic">Global Schedule.</h2>
          </div>
          
          <div className="space-y-4">
             {EXHIBITIONS.map((ex, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                 className="group cursor-none py-10 border-b border-black/5 flex flex-col md:flex-row justify-between items-center gap-12 hover:bg-black/[0.02] px-12 transition-all duration-700"
               >
                 <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    <span className="font-serif text-2xl text-[#8B5E3C] italic">{ex.date}</span>
                    <div className="text-center md:text-left">
                       <h3 className="font-serif text-3xl text-black tracking-tight">{ex.title}</h3>
                       <p className="font-sans text-sm text-black/50 mt-2">{ex.location}</p>
                    </div>
                 </div>
                 <button className="px-12 py-4 border border-black/10 hover:border-[#8B5E3C] hover:text-[#8B5E3C] text-black/40 font-sans text-[9px] uppercase tracking-[0.4em] transition-all duration-700">
                    {ex.status}
                 </button>
               </motion.div>
             ))}
          </div>
       </div>
    </section>

    {/* SECTION 6: THE PRIVATE VIEW */}
    <section id="private" className="bg-[#F9F8F6] py-32 px-8 md:px-24 overflow-hidden border-t border-black/5">
       <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
             <div className="space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-[#C5A059]">The Concierge</span>
                <h2 className="font-serif text-6xl md:text-8xl tracking-tighter text-black leading-none italic font-light">Exclusive <br/> Access.</h2>
             </div>
             <p className="font-sans text-sm md:text-base text-black/60 max-w-sm leading-loose">
                Collectors within our circle gain access to private directives and archival sketches.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             {EXPERIMENTAL_GALLERY.slice(0, 3).map((img, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 80 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                 className="relative group aspect-[3/4] overflow-hidden border border-black/5 shadow-2xl bg-white"
               >
                 <img src={img} className="w-full h-full object-contain p-4 transition-all duration-1000" alt="Private Archive" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-700 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 text-center">
                       <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2">Private Study 00{i+1}</p>
                       <p className="font-serif text-3xl text-white italic tracking-tighter">$4,200</p>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center border-t border-black/5 pt-24">
             <div className="space-y-12">
                <p className="font-sans text-sm md:text-base text-black/60 leading-[2.5] max-w-lg">
                   Collectors within our circle gain access to private directives, archival sketches, and early acquisition opportunities before public entry.
                </p>
                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-6 group cursor-none">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-all duration-700">
                         <Mail size={16} className="text-black group-hover:text-black" />
                      </div>
                      <span className="font-sans text-[11px] uppercase tracking-widest text-black/70">Join the Private Archive</span>
                   </div>
                </div>
             </div>
             <div className="aspect-video overflow-hidden border border-black/5 shadow-2xl relative group cursor-none">
                <img src={IMAGES.studio3} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" alt="Studio View" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
             </div>
          </div>
       </div>
    </section>

    {/* SECTION 7: EXPERIMENTAL FLOW */}
    <section className="bg-[#D9D2C5] pt-32 pb-8 overflow-hidden border-t border-black/5">
       <div className="flex gap-12 animate-scroll">
          {[...EXPERIMENTAL_GALLERY, ...EXPERIMENTAL_GALLERY].map((img, i) => (
            <div key={i} className="flex-none w-[300px] md:w-[500px] aspect-[4/5] overflow-hidden transition-all duration-[2s] border border-black/5 shadow-2xl">
               <img src={img} className="w-full h-full object-cover" alt="Gallery Flow" />
            </div>
          ))}
       </div>
    </section>
  </>
);
