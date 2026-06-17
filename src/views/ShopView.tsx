import React from 'react';
import { motion } from 'motion/react';
import { Check, Mail, Globe, ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants/assets';
import { EditorialReveal } from '../components/EditorialReveal';

interface ShopViewProps {
  products: any[];
  repoStatus: string;
  onSelectProduct: (product: any) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ products, repoStatus, onSelectProduct }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-[#D9D2C5] min-h-screen pt-24 pb-24 px-8 md:px-24"
  >
    <div className="max-w-7xl mx-auto">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-4">
          <EditorialReveal delay={0.1}>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#C5A059]">SHOP</span>
            </div>
          </EditorialReveal>
          <EditorialReveal delay={0.2}>
            <h1 className="font-serif text-6xl md:text-9xl tracking-tighter text-black leading-none italic">SHOP.</h1>
          </EditorialReveal>
        </div>
        <EditorialReveal delay={0.3}>
          <p className="font-sans text-sm text-black/60 max-w-sm leading-loose">
            Authorized limited editions and unique physical directives, available for secure acquisition into private archives.
          </p>
        </EditorialReveal>
      </div>

      <div 
        className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-12 md:gap-y-24 pb-12 md:pb-0 scrollbar-hide -mx-8 px-8 md:mx-0 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.length === 0 ? (
          <div className="w-full md:col-span-2 lg:col-span-3 text-center py-24">
            <p className="font-mono text-xs uppercase tracking-widest text-black/40 animate-pulse">
              Synchronizing with Printify Archive...
            </p>
          </div>
        ) : (
          products.map((product, i) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.5, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-none flex-none w-[80vw] md:w-auto snap-center"
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
          ))
        )}
      </div>


    </div>
  </motion.div>
);
