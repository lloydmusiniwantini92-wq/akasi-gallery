import React from 'react';
import { motion } from 'motion/react';
import { Check, Mail, Globe, ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants/assets';

interface ShopViewProps {
  products: any[];
  repoStatus: string;
  onSelectProduct: (product: any) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ products, repoStatus, onSelectProduct }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen pt-24 pb-24 px-8 md:px-24"
  >
    <div className="max-w-7xl mx-auto">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#C5A059]">Viewing Room</span>
          </div>
          <h1 className="font-serif text-6xl md:text-9xl tracking-tighter text-black leading-none uppercase font-light">The Repository.</h1>
        </div>
        <p className="font-sans text-sm text-black/60 max-w-sm leading-loose">
          Authorized limited editions and unique physical directives, available for secure acquisition into private archives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {products.map((product) => (
          <motion.div 
            key={product.id} 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-none"
          >
            <div className="aspect-[3/4] bg-[#F9F8F6] overflow-hidden relative border border-black/5 shadow-xl group-hover:shadow-2xl transition-all duration-700">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s] ease-out" alt={product.title} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700 flex items-center justify-center">
                 <button 
                    onClick={() => onSelectProduct(product)}
                    className="px-8 py-3 bg-white text-black font-sans text-[9px] uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 hover:bg-[#C5A059]"
                  >
                     View Details & Add to Cart
                  </button>
              </div>
              <div className="absolute top-6 left-6 font-mono text-[9px] uppercase tracking-[0.4em] text-black/20">EDITION.LIBRE</div>
            </div>
            <div className="mt-8 flex justify-between items-end">
              <div className="space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#C5A059]">Ref. {product.id.slice(-6)}</p>
                <h3 className="font-serif text-2xl text-black tracking-tight uppercase leading-none">{product.title}</h3>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs tracking-[0.2em] text-[#8B5E3C] font-bold">${Number(product.price).toLocaleString()}</p>
                <div className="flex items-center gap-2 justify-end mt-2">
                   <div className="w-2 h-px bg-black/20" />
                   <p className="font-mono text-[8px] uppercase tracking-widest text-black/30">Secured Archive</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* COMMISSION CTA */}
      <div className="mt-24 bg-[#D9D2C5] py-24 md:py-32 px-12 md:px-24 text-center relative overflow-hidden border-t border-black/5">
         <div className="absolute inset-0 opacity-5 grayscale brightness-110">
            <img src={IMAGES.studio1} className="w-full h-full object-cover" alt="Studio" />
         </div>
         <div className="relative z-10 space-y-12">
            <span className="font-mono text-[10px] uppercase tracking-[1em] text-[#8B5E3C]">Custom Directives</span>
            <h2 className="font-serif text-5xl md:text-7xl text-black tracking-tighter uppercase font-light">Commission a Narrative.</h2>
            <p className="font-sans text-sm text-black/60 max-w-xl mx-auto leading-loose">
               Collaborate directly with Akasi Osei to author a bespoke directive that captures your personal ancestral arc.
            </p>
            <button className="px-16 py-6 bg-black text-white font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[#8B5E3C] transition-all duration-700 cursor-none">
               Request Consultation
            </button>
         </div>
      </div>
    </div>
  </motion.div>
);
