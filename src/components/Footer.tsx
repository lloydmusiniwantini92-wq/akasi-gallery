import React from 'react';
import { Mail, Instagram, Twitter, Linkedin, ArrowRight, Globe } from 'lucide-react';
import { IMAGES } from '../constants/assets';

interface FooterProps {
  navigateTo: (view: string, section?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateTo }) => (
  <footer className="bg-[#D9D2C5] pt-16 pb-24 px-8 md:px-24 relative overflow-hidden">
    {/* Watermark */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] z-0">
       <h2 className="font-serif text-[30vw] tracking-tighter text-[#8B5E3C] italic leading-none">AKASI.</h2>
    </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-24 md:gap-32 relative z-10">
      <div className="md:col-span-5 space-y-12">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 relative">
            <img 
              src={IMAGES.logoMark} 
              className="w-full h-full object-contain" 
              style={{ 
                clipPath: 'polygon(0% 0%, 80% 0%, 80% 20%, 100% 20%, 100% 100%, 0% 100%)',
                filter: 'invert(1)'
              }}
              alt="Akasis Mark" 
            />
          </div>
          <div className="h-10 overflow-hidden relative">
            <img 
              src={IMAGES.logoType} 
              className="h-full object-contain" 
              style={{ filter: 'invert(1)' }}
              alt="Akasis Logo" 
            />
          </div>
        </div>
        <p className="font-sans text-sm md:text-base text-black/50 leading-[2.5] max-w-sm">
          A high-fidelity archival space dedicated to the preservation and exploration of the Afro-minimalist experience.
        </p>
        <div className="flex gap-8">
           <Instagram size={20} className="text-black/20 hover:text-[#8B5E3C] transition-colors cursor-none" />
           <Linkedin size={20} className="text-black/20 hover:text-[#8B5E3C] transition-colors cursor-none" />
           <Twitter size={20} className="text-black/20 hover:text-[#8B5E3C] transition-colors cursor-none" />
        </div>
      </div>
      
      <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-16">
        <div className="space-y-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#8B5E3C]">The Gallery</p>
          <div className="flex flex-col gap-4">
            <button onClick={() => navigateTo('home')} className="text-left font-sans text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors cursor-none">Main Archive</button>
            <button onClick={() => navigateTo('shop')} className="text-left font-sans text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors cursor-none">The Viewing Room</button>
            <button onClick={() => navigateTo('about')} className="text-left font-sans text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors cursor-none">Narrative Entry</button>
          </div>
        </div>
        
        <div className="space-y-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#8B5E3C]">Connect</p>
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-black/40">Inquiry & Dossier</p>
            <p className="font-sans text-[10px] uppercase tracking-widest text-black/40">Press & Media</p>
            <p className="font-sans text-[10px] uppercase tracking-widest text-black/40">Private Viewing</p>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 space-y-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#8B5E3C]">Legal</p>
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-black/40">Terms of Acquisition</p>
            <p className="font-sans text-[10px] uppercase tracking-widest text-black/40">Archival Preservation</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-48 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
      <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-black/50">© 2024 Akasis Gallery. All Narrative Rights Reserved.</p>
      <div className="flex gap-12 items-center">
        <div className="flex items-center gap-4 text-black/50">
          <Globe size={14} />
          <span className="font-mono text-[9px] uppercase tracking-widest">Global Delivery</span>
        </div>
        <div className="w-12 h-px bg-black/5" />
        <p className="font-mono text-[9px] uppercase tracking-widest text-black/50 italic">Engineered by Arson Pixelz</p>
      </div>
    </div>
  </footer>
);
