import React from 'react';
import { motion } from 'motion/react';
import { IMAGES } from '../constants/assets';

interface CustomCursorProps {
  cursorPos: { x: number; y: number };
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorPos }) => (
  <motion.div 
    className="fixed top-0 left-0 w-8 h-8 border border-[#C5A059] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    animate={{ x: cursorPos.x - 16, y: cursorPos.y - 16 }}
    transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
  />
);

export const Splashscreen: React.FC = () => (
  <div className="fixed inset-0 bg-[#D9D2C5] z-[10000] flex items-center justify-center overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center relative flex flex-col items-center gap-8"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 md:w-24 md:h-24 relative">
          <img 
            src={IMAGES.logoMark} 
            className="w-full h-full object-contain" 
            style={{ clipPath: 'polygon(0% 0%, 80% 0%, 80% 20%, 100% 20%, 100% 100%, 0% 100%)' }}
            alt="Logo Mark" 
          />
        </div>
        <div className="w-48 md:w-64 overflow-hidden relative">
          <img 
            src={IMAGES.logoType} 
            className="w-full h-full object-contain" 
            alt="Logo Type" 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="font-mono text-[9px] text-[#8B5E3C] tracking-[1em] uppercase">Narrative Entry</p>
      </div>

      <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
        <div className="w-64 h-64 bg-white rounded-full" />
      </div>
    </motion.div>
    
    <motion.div 
      className="absolute bottom-0 left-0 h-1 bg-white/30"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 2.2, ease: "easeInOut" }}
    />
  </div>
);
