import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface PrivateViewOverlayProps {
  title: string;
  medium: string;
  dim: string;
  price: string;
  isHovered: boolean;
  onAcquire: () => void;
}

export const PrivateViewOverlay: React.FC<PrivateViewOverlayProps> = ({ 
  title, medium, dim, price, isHovered, onAcquire 
}) => (
  <AnimatePresence>
    {isHovered && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 p-12 flex flex-col justify-between"
      >
        <div className="space-y-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#C5A059]">Private View</span>
          <h3 className="font-serif text-3xl text-white italic">{title}</h3>
          <div className="pt-4 border-t border-white/10 text-white/50 space-y-1">
            <p className="font-sans text-[10px] uppercase tracking-widest">{medium}</p>
            <p className="font-sans text-[10px] uppercase tracking-widest">{dim}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <span className="font-serif text-2xl text-white italic">{price}</span>
            <button 
              onClick={onAcquire}
              className="px-8 py-3 bg-white text-black font-sans text-[9px] uppercase tracking-[0.3em] hover:bg-[#C5A059] transition-colors"
            >
              Acquire
            </button>
          </div>
          <button className="flex items-center gap-4 text-white/40 hover:text-[#C5A059] transition-colors group">
            <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Request Dossier</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
