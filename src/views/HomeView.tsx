import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Globe, ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import { IMAGES, HERO_SLIDES, ABOUT_IMAGES, EXPERIMENTAL_GALLERY } from '../constants/assets';
import { MASTERPIECES, COLLECTIONS, EXHIBITIONS, HERO_SEQUENCE } from '../data/galleryData';
import { PrivateViewOverlay } from '../components/PrivateViewOverlay';
import { EditorialReveal } from '../components/EditorialReveal';

interface HomeViewProps {
  heroIndex: number;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  openCheckout: (item: any) => void;
  navigateTo: (view: string, section?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  heroIndex, hoveredId, setHoveredId, openCheckout, navigateTo 
}) => {
  const [activeAccordion, setActiveAccordion] = useState<number>(1);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(2);
  return (
  <>
    {/* SECTION 1: HERO */}
    <section id="home" className="h-screen relative overflow-hidden bg-black">
      {/* Mobile Static Hero */}
      <div className="absolute inset-0 z-0 md:hidden">
         <img src={HERO_SLIDES[0]} className="w-full h-full object-cover" alt="Exhibition Slide" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>

      {/* Desktop Carousel */}
      {HERO_SLIDES.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 z-0 hidden md:block"
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
            AKASI PRESENTS
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
        className="absolute bottom-20 right-6 md:bottom-24 md:right-24 z-30 group flex items-center gap-6 cursor-none"
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
        <EditorialReveal delay={0.1}>
          <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-[#8B5E3C] mb-8 block">The Manifesto</span>
        </EditorialReveal>
        <EditorialReveal delay={0.2}>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1] tracking-tighter text-black mb-16 font-light italic">
            "I want my art to feel like a <span className="text-[#8B5E3C]">held breath.</span>"
          </h2>
        </EditorialReveal>
        
        <div className="space-y-12 pl-12 border-l border-black/10">
          <EditorialReveal delay={0.3}>
            <p className="font-sans text-sm md:text-base text-black/60 tracking-wide leading-[2.5] max-w-xl">
              Akasi Osei is an emerging artist whose work explores identity, resilience, and the embodied experience of everyday life. Influenced by a cross-cultural perspective, her practice reflects an ongoing negotiation between inherited histories and lived experience.
            </p>
          </EditorialReveal>
          <EditorialReveal delay={0.4}>
            <p className="font-sans text-sm md:text-base text-black/60 tracking-wide leading-[2.5] max-w-xl">
              Through hybrid, symbolic figures and layered compositions, she transforms uncertainty into opportunities for self-definition with optimism.
            </p>
          </EditorialReveal>
          
          <EditorialReveal delay={0.5}>
            <div className="flex justify-center md:justify-start -ml-12 md:ml-0 w-[calc(100%+3rem)] md:w-auto mt-12 md:mt-0">
              <button 
                onClick={() => navigateTo('about')}
                className="group px-12 md:px-16 py-6 md:py-8 bg-[#8B5E3C] text-white hover:bg-black transition-colors duration-700 cursor-none inline-flex items-center gap-6 md:gap-8 shadow-xl"
              >
                <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.5em]">
                  The Full Narrative
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-700" />
              </button>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </motion.section>

    {/* SECTION 3: MASTERPIECES */}
    <section id="masterpieces" className="bg-[#F9F8F6] py-16 md:py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center gap-6">
          <div className="space-y-4">
            <EditorialReveal delay={0.1}>
              <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-[#C5A059] block">Selected Works</span>
            </EditorialReveal>
            <EditorialReveal delay={0.2}>
              <h2 className="font-serif text-6xl md:text-8xl tracking-tighter text-black leading-none uppercase font-light">The Shop.</h2>
            </EditorialReveal>
          </div>
          <EditorialReveal delay={0.3}>
            <p className="font-sans text-sm md:text-base text-black/60 max-w-md leading-loose">
              A permanent exploration of identity through mixed media, gold leaf, and high-fidelity textures.
            </p>
          </EditorialReveal>
        </div>

        {/* Mobile Swipe Indicator */}
        <EditorialReveal delay={0.4}>
           <div className="md:hidden flex items-center justify-end mb-6 w-full">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A059] flex items-center gap-2">
                Swipe to explore <ArrowRight size={12} className="animate-pulse" />
              </span>
           </div>
        </EditorialReveal>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {MASTERPIECES.map((art, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 100, scale: 0.95 }} 
              whileInView={{ opacity: 1, y: 0, scale: 1 }} 
              viewport={{ once: true, margin: "-15%" }} 
              transition={{ duration: 1.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }} 
              onMouseEnter={() => setHoveredId(i)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-none flex-none w-[85vw] md:w-[450px] snap-center"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 shadow-xl border border-black/5">
                <img src={art.img} className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110" alt={art.title} />
                <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/40 transition-all duration-700 flex items-center justify-center">
                   <button 
                      onClick={() => navigateTo('shop')}
                      className="px-8 py-3 bg-white text-black font-sans text-[9px] uppercase tracking-[0.4em] md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700 hover:bg-[#C5A059] absolute bottom-8 md:static shadow-xl md:shadow-none"
                    >
                       View Details & Shop
                    </button>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-end">
                <div className="space-y-1 text-left">
                  <h3 className="font-serif text-2xl text-black tracking-tight uppercase leading-none">{art.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-black/30">{art.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex justify-center">
          <button 
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-4 text-black hover:text-[#C5A059] transition-colors group cursor-none"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.4em]">View The Repository</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>

    {/* SECTION 4: COLLECTIONS */}
    <section id="collections" className="bg-[#D9D2C5] text-black py-16 md:py-32 overflow-hidden relative border-y border-black/5">
       <div className="absolute inset-0 opacity-5">
          <img src={IMAGES.masterpiece3} className="w-full h-full object-cover" alt="Background" />
       </div>
       <div className="max-w-7xl mx-auto px-8 md:px-24 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 gap-6">
             <div className="space-y-4">
                <EditorialReveal delay={0.1}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-[#8B5E3C] block">Curated Sets</span>
                </EditorialReveal>
                <EditorialReveal delay={0.2}>
                  <h2 className="font-serif text-6xl md:text-8xl tracking-tighter italic leading-none text-black">The Series.</h2>
                </EditorialReveal>
             </div>
             <EditorialReveal delay={0.3}>
               <p className="font-sans text-sm md:text-base text-black/60 leading-loose max-w-md">
                  Each series is a deep dive into a specific narrative arc, authored over months of studio seclusion.
               </p>
             </EditorialReveal>
          </div>
             
          {/* Mobile Swipe Indicator */}
          <EditorialReveal delay={0.4}>
             <div className="md:hidden flex items-center justify-end mb-6 w-full">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B5E3C] flex items-center gap-2">
                  Swipe to explore <ArrowRight size={12} className="animate-pulse" />
                </span>
             </div>
          </EditorialReveal>
             
          {/* Desktop: Elastic Carousel | Mobile: Horizontal Swipe Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory md:overflow-hidden md:flex-row h-[400px] md:h-[650px] gap-4 mb-16 md:mb-24 scrollbar-hide pb-8 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
             {[...COLLECTIONS.map(c => c.img), ...EXPERIMENTAL_GALLERY, IMAGES.studio3].map((img, i) => {
               const isActive = activeAccordion === i;
               return (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 100, scale: 0.95 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   viewport={{ once: true, margin: "-15%" }}
                   transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   onMouseEnter={() => setActiveAccordion(i)}
                   className={`relative group overflow-hidden border border-black/5 shadow-xl md:shadow-2xl bg-[#0a0a0a] transition-all duration-700 ease-[0.16,1,0.3,1] ${
                     isActive ? 'md:flex-[6]' : 'md:flex-[1]'
                   } aspect-[4/5] md:aspect-auto flex-none w-[85vw] md:w-auto snap-center cursor-none`}
                 >
                   <img src={img} className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 ${!isActive && 'md:opacity-60 md:grayscale'}`} alt="Series Flow" />
                   
                   <div className={`absolute inset-0 transition-all duration-700 flex flex-col justify-end p-8 ${isActive ? 'bg-gradient-to-t from-black/90 via-black/20 to-transparent' : 'bg-black/40'}`}>
                      <AnimatePresence>
                         {(isActive || window.innerWidth < 768) && (
                           <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: 10 }}
                             transition={{ duration: 0.5, delay: 0.2 }}
                             className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
                           >
                             <div className="text-left w-full overflow-hidden">
                               <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#C5A059] mb-2 drop-shadow-md">Curated Study 00{i+1}</p>
                               <p className="font-serif text-2xl md:text-5xl text-white italic tracking-tighter drop-shadow-lg whitespace-nowrap">Archive File</p>
                             </div>
                             <button className="shrink-0 px-4 md:px-6 py-3 md:py-4 border border-white/20 text-white font-sans text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-none backdrop-blur-sm">
                               Unlock
                             </button>
                           </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                 </motion.div>
               );
             })}
          </div>
       </div>
    </section>

    {/* DELETED SECTIONS 5 & 6 */}

    {/* DELETED SECTION 7 */}
  </>
  );
};
