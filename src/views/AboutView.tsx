import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ABOUT_IMAGES, EXPERIMENTAL_GALLERY } from '../constants/assets';
import { COLLECTIONS } from '../data/galleryData';
import { EditorialReveal } from '../components/EditorialReveal';

interface AboutViewProps {
  navigateTo: (view: string, section?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ navigateTo }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Mix of Concierge and Series images
  const mixedImages = [
    EXPERIMENTAL_GALLERY[0],
    COLLECTIONS[0].img,
    EXPERIMENTAL_GALLERY[1],
    COLLECTIONS[1].img
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#D9D2C5] min-h-screen text-[#1A1A1A] selection:bg-[#C5A059] selection:text-white"
    >
      {/* ABOUT HERO */}
      <div className="relative h-screen w-full overflow-hidden flex flex-col justify-end group cursor-none">
        <div className="absolute inset-0 z-0 bg-[#D9D2C5]">
          <img src={ABOUT_IMAGES.hero} className="w-full h-full object-cover object-[50%_30%] brightness-[0.85] group-hover:brightness-100 transition-all duration-[2s] ease-out" alt="Akasi Osei" />
          <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
        </div>
        <div className="relative z-20 px-4 md:px-12 pb-12 md:pb-24 w-full flex flex-col items-center justify-end h-full">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[9px] uppercase tracking-[1em] text-white font-bold mb-8 block text-center drop-shadow-md"
          >
            The Artist & Founder
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[15vw] leading-none text-[#1A1A1A] tracking-tighter italic text-center drop-shadow-xl"
          >
            Akasi Osei.
          </motion.h1>
        </div>
      </div>

      {/* STICKY PARALLAX NARRATIVE */}
      <div ref={containerRef} className="relative w-full flex flex-col md:flex-row border-t border-black/5">
        
        {/* BACKGROUND TYPOGRAPHIC WATERMARK (CONSTRAINED TO LEFT HALF) */}
        <div className="absolute inset-0 md:w-1/2 overflow-hidden pointer-events-none z-0 flex items-center justify-center pt-[10vh]">
           <motion.div style={{ y: quoteY }} className="w-full">
             <h2 className="font-serif text-[8vw] md:text-[6.5vw] text-black/[0.03] md:text-black/[0.04] leading-[0.85] tracking-tighter italic font-light text-center w-full px-8 break-words mix-blend-multiply">
               "If there is nowhere to fit in, there is always somewhere to stand out."
             </h2>
           </motion.div>
        </div>

        {/* LEFT SCROLLING TEXT */}
        <div className="w-full md:w-1/2 relative z-10 flex flex-col py-24 md:py-[20vh] px-8 md:px-16 lg:px-24">
           <div className="max-w-xl mx-auto flex flex-col gap-16 md:gap-[20vh]">
             
             {/* Block 1 */}
             <EditorialReveal delay={0.1}>
               <span className="font-mono text-[9px] uppercase tracking-[0.8em] text-[#C5A059] block mb-12">01 / Origin</span>
               <p className="font-serif text-2xl md:text-4xl text-[#1A1A1A] leading-[1.4] tracking-tight italic">
                 An emerging artist from Kalamazoo, Michigan, and a first-generation American of Zimbabwean and Ghanaian descent.
               </p>
             </EditorialReveal>

             {/* Block 2 */}
             <EditorialReveal delay={0.2}>
               <p className="font-sans text-sm md:text-base text-black/60 leading-relaxed text-justify">
                 Her work explores identity, resilience, and the embodied experience of everyday life. Influenced by a cross-cultural perspective, her practice reflects an ongoing negotiation between inherited histories and lived experience, transforming uncertainty into opportunities for self-definition with optimism.
               </p>
             </EditorialReveal>

             {/* Block 3 */}
             <EditorialReveal delay={0.3} className="pl-8 md:pl-16 border-l border-black/10">
               <p className="font-sans text-sm md:text-base text-black/60 leading-relaxed">
                 Through hybrid, symbolic figures and layered compositions, Osei approaches identity as something continuously shaped and reimagined. She blends abstraction and figuration with bold color, intricate patterning, and animal-like forms.
               </p>
             </EditorialReveal>
             
             {/* CV Block */}
             <EditorialReveal delay={0.4} className="pt-16 border-t border-black/10">
               <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#C5A059] mb-8 block">Curriculum Vitae</span>
               <div className="flex flex-col gap-6 font-sans text-sm text-black/50 leading-relaxed">
                  <p>Bachelors of Fine Arts<br/>Exhibited in Kalamazoo, Detroit, Chicago</p>
                  <p>Artist-in-Residence<br/>National Gallery of Bulawayo (2022)</p>
               </div>
             </EditorialReveal>

           </div>
        </div>

        {/* RIGHT STICKY IMAGE */}
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen md:sticky top-0 relative overflow-hidden group border-l border-black/5">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            src={ABOUT_IMAGES.redPortrait} 
            className="absolute inset-0 w-full h-full object-cover object-[50%_10%] opacity-95 group-hover:opacity-100 transition-all duration-[2s] ease-out" 
            alt="Akasi Osei" 
          />
          <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none transition-opacity duration-1000 group-hover:opacity-0" />
        </div>
      </div>

      {/* ASYMMETRICAL ARCHIVAL STUDY (NOW USING CONCIERGE & SERIES IMAGES) */}
      <div className="w-full bg-[#D9D2C5] py-16 md:py-48 px-8 md:px-16 border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
          
          <div className="flex flex-col md:flex-row justify-between items-end">
             <div>
               <EditorialReveal delay={0.1}>
                 <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#C5A059] block mb-6">02 / Process</span>
               </EditorialReveal>
               <EditorialReveal delay={0.2}>
                 <h2 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] tracking-tighter italic font-light leading-none">
                    Archival Study.
                 </h2>
               </EditorialReveal>
             </div>
             <EditorialReveal delay={0.3}>
               <p className="font-sans text-sm text-black/40 max-w-xs mt-8 md:mt-0 leading-relaxed text-right">
                  A curated collection of process imagery, documenting the physical birth of each directive.
               </p>
             </EditorialReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {mixedImages.map((img, i) => {
              const isLarge = i === 0 || i === 3;
              const colSpan = isLarge ? 'col-span-2' : 'col-span-1 md:col-span-1';
              const aspect = isLarge ? 'aspect-[4/3]' : 'aspect-[3/4] mt-0 md:mt-12';
              
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 100, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden cursor-none ${colSpan} ${aspect}`}
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-[1.5s] ease-out group-hover:opacity-100" 
                    alt={`Process Archive ${i + 1}`} 
                  />
                  <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white drop-shadow-md mb-1 block">Directive</span>
                    <h3 className="font-serif text-xl text-white italic drop-shadow-md">Study 0{i + 1}</h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA SECTION - ELEVATED MINIMALISM */}
      <div className="relative bg-[#D9D2C5] py-24 md:py-56 px-8 md:px-24 text-center flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh] group cursor-none overflow-hidden border-t border-black/10">
         <div className="absolute inset-0 bg-[#C5A059] transition-opacity duration-[2s] opacity-0 group-hover:opacity-10 z-0"></div>
         <motion.div 
           initial={{ opacity: 0, y: 100, scale: 0.95 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true, margin: "-15%" }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 w-full max-w-4xl"
         >
           <EditorialReveal delay={0.2}>
             <span className="font-mono text-[9px] uppercase tracking-[0.8em] text-black/40 mb-16 block">03 / The Collection</span>
           </EditorialReveal>
           <EditorialReveal delay={0.3}>
             <h2 className="font-serif text-6xl md:text-9xl text-black tracking-tighter mb-24 italic font-light leading-none">
               Explore <br/> the Works.
             </h2>
           </EditorialReveal>
           <EditorialReveal delay={0.4}>
             <button 
               onClick={() => navigateTo('shop')}
               className="px-12 py-5 border border-black/20 text-black font-sans text-[10px] uppercase tracking-[0.6em] hover:bg-black hover:text-white transition-all duration-700 cursor-none"
             >
               Enter Archive
             </button>
           </EditorialReveal>
         </motion.div>
      </div>
    </motion.div>
  );
};
