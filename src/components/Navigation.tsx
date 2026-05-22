import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, Instagram, Linkedin, Twitter, Mail, Globe, ShoppingBag } from 'lucide-react';
import { IMAGES } from '../constants/assets';

interface NavbarProps {
  scrolled: boolean;
  view: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  navigateTo: (view: string, section?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, view, isMenuOpen, setIsMenuOpen, navigateTo, cartCount, onOpenCart }) => {
  const isLight = view === 'shop' || scrolled;

  const navBgClass = scrolled 
    ? (isLight ? 'bg-white/40 backdrop-blur-lg border-b border-black/5 py-3' : 'bg-black/30 backdrop-blur-lg border-b border-white/5 py-3')
    : 'bg-transparent';

  const textClass = isLight ? 'text-black/60 hover:text-[#8B5E3C]' : 'text-white/60 hover:text-[#C5A059]';
  const iconClass = isLight ? 'text-black hover:text-[#8B5E3C]' : 'text-white hover:text-[#C5A059]';
  const logoFilter = isLight ? 'invert(1)' : 'none';

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 px-8 py-6 flex justify-between items-center ${navBgClass}`}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-4 cursor-none group" onClick={() => navigateTo('home')}>
        <div className={`aspect-square transition-all duration-700 group-hover:scale-110 relative ${
          scrolled ? 'w-6 h-6 md:w-8 md:h-8' : 'w-9 h-9 md:w-11 md:h-11'
        }`}>
          <img 
            src={IMAGES.logoMark} 
            className="w-full h-full object-contain transition-all duration-700" 
            style={{ 
              clipPath: 'polygon(0% 0%, 80% 0%, 80% 20%, 100% 20%, 100% 100%, 0% 100%)',
              filter: logoFilter
            }}
            alt="Logo Mark" 
          />
        </div>
        <div className={`h-6 md:h-8 overflow-hidden transition-all duration-700 ${scrolled ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100'}`}>
          <img 
            src={IMAGES.logoType} 
            className="h-full object-contain transition-all duration-700" 
            style={{ filter: logoFilter }}
            alt="Akasis Logo" 
          />
        </div>
      </div>

      {/* Center: Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-10">
        <button 
          onClick={() => navigateTo('home', 'masterpieces')}
          className={`font-sans text-[10px] uppercase tracking-[0.4em] transition-all duration-700 cursor-none ${textClass}`}
        >
          Archive
        </button>
        <button 
          onClick={() => navigateTo('shop')}
          className={`font-sans text-[10px] uppercase tracking-[0.4em] transition-all duration-700 cursor-none ${textClass}`}
        >
          Viewing Room
        </button>
        <button 
          onClick={() => navigateTo('about')}
          className={`font-sans text-[10px] uppercase tracking-[0.4em] transition-all duration-700 cursor-none ${textClass}`}
        >
          Narrative
        </button>
        <button 
          onClick={() => navigateTo('home', 'exhibitions')}
          className={`font-sans text-[10px] uppercase tracking-[0.4em] transition-all duration-700 cursor-none ${textClass}`}
        >
          Presence
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6 md:gap-8">
        <button 
          onClick={onOpenCart}
          className={`p-2 transition-colors cursor-none relative ${iconClass}`}
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-[#C5A059] text-black text-[8px] font-mono flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 transition-colors cursor-none ${iconClass}`}
        >
          {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
    </motion.nav>
  );
};

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (view: string, section?: string) => void;
  hoveredNav: number | null;
  setHoveredNav: (i: number | null) => void;
  NAV_ITEMS: any[];
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ 
  isOpen, onClose, navigateTo, hoveredNav, setHoveredNav, NAV_ITEMS 
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] bg-black flex"
      >
        <div className="w-full md:w-1/2 h-full p-8 md:p-12 lg:p-16 xl:p-24 flex flex-col justify-between border-r border-black/5 bg-[#D9D2C5]">
          <div className="space-y-2">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                onMouseEnter={() => setHoveredNav(i)}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={() => { navigateTo(item.view, item.section); onClose(); }}
                className="group cursor-none py-4 border-b border-black/5 flex items-end justify-between overflow-visible"
              >
                <div className="relative">
                  <span className="font-mono text-[10px] text-[#8B5E3C] absolute -top-4 left-0 opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                  <h2 className="font-serif text-[10vw] md:text-[5.5vw] xl:text-8xl text-black/80 tracking-tighter group-hover:translate-x-8 transition-transform duration-700 italic font-light whitespace-nowrap">
                    {item.label}
                  </h2>
                </div>
                <ArrowRight size={32} className="text-[#8B5E3C] opacity-0 group-hover:opacity-100 group-hover:-rotate-45 transition-all duration-500 shrink-0 ml-4" />
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-12 pt-12">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#8B5E3C] mb-4">Contact</p>
              <p className="font-sans text-[11px] text-black/40 tracking-widest leading-loose">
                inquiry@akasis.gallery <br/>
                +1 (269) 555-0192
              </p>
            </div>
            <div className="flex gap-6 items-end justify-end">
              <Instagram size={18} className="text-black/20 hover:text-[#8B5E3C] transition-colors cursor-none" />
              <Linkedin size={18} className="text-black/20 hover:text-[#8B5E3C] transition-colors cursor-none" />
              <Twitter size={18} className="text-black/20 hover:text-[#8B5E3C] transition-colors cursor-none" />
            </div>
          </div>
        </div>

        <div className="hidden md:block w-1/2 h-full relative overflow-hidden bg-[#111]">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredNav ?? 'default'}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img 
                src={hoveredNav !== null ? NAV_ITEMS[hoveredNav].img : IMAGES.portrait} 
                className="w-full h-full object-cover" 
                alt="Nav Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-24 right-24 text-right">
             <p className="font-mono text-[10px] uppercase tracking-[1em] text-[#C5A059] mb-4">The Collection</p>
             <h3 className="font-serif text-6xl text-white italic tracking-tighter">Akasi Osei</h3>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 md:top-10 md:right-10 text-black/60 hover:text-black md:text-white/60 md:hover:text-white transition-colors p-4 cursor-none z-50"
        >
          <X size={28} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

const ArrowRight = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
