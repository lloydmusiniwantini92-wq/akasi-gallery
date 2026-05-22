import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ProductDetailProps {
  product: any;
  onClose: () => void;
  onAddToCart: (product: any, variant: any) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<number | string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    } else {
      setSelectedVariantId('');
    }
  }, [product]);

  if (!product) return null;

  const selectedVariant = product?.variants?.find((v: any) => String(v.id) === String(selectedVariantId)) || product;
  
  // Safely parse price whether it's a number, a formatted string like "$12,500", or uses a "p" property
  const rawPrice = selectedVariant?.price || product?.price || (product?.p ? product.p / 100 : 0);
  const displayPrice = typeof rawPrice === 'string' ? Number(rawPrice.replace(/[^0-9.-]+/g,"")) : Number(rawPrice);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant);
  };

  // Strip simple HTML tags from description if present
  const rawDescription = product.description || product.desc || '';
  const cleanDescription = rawDescription.replace(/<\/?[^>]+(>|$)/g, " ").replace(/\s+/g, ' ').trim();

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2500] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-[#F9F8F6] w-full max-w-6xl h-[90vh] md:h-[85vh] flex flex-col md:flex-row shadow-2xl relative overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 text-black hover:text-[#C5A059] z-[60] transition-colors bg-white/80 md:bg-black/5 p-3 rounded-full cursor-none">
            <X size={20} />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="w-full md:w-1/2 h-[45vh] md:h-full bg-stone-100 relative border-b md:border-b-0 md:border-r border-black/5 flex flex-col">
            <div className="flex-1 relative overflow-hidden bg-white flex items-center justify-center">
              <img src={(product.images && product.images[activeImageIndex]) || product.image || product.img} alt={product.title} className="w-full h-full object-contain md:object-cover" />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="h-24 bg-white border-t border-black/5 flex gap-4 overflow-x-auto p-4 items-center shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {product.images.map((imgUrl: string, idx: number) => (
                   <button 
                     key={idx} 
                     onClick={() => setActiveImageIndex(idx)}
                     className={`w-16 h-16 shrink-0 border ${activeImageIndex === idx ? 'border-[#C5A059]' : 'border-black/5'} overflow-hidden transition-all duration-300 hover:border-[#C5A059]/50 cursor-none`}
                   >
                      <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                   </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="w-full md:w-1/2 flex flex-col h-[45vh] md:h-full bg-[#F9F8F6]">
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#C5A059] mb-4 block">Viewing Room</span>
              <h1 className="font-serif text-3xl md:text-5xl text-black tracking-tighter leading-none mb-2">{product.title}</h1>
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40 mb-8 block">
                Ref. {product.id ? String(product.id).slice(-6) : product.title.slice(0, 6).toUpperCase()}
              </p>
              
              {cleanDescription && (
                <div className="mb-10">
                   <p className="font-sans text-sm md:text-base text-black/70 leading-loose text-justify whitespace-pre-wrap">
                     {cleanDescription}
                   </p>
                </div>
              )}

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 mb-8">
                  <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">Select Edition</label>
                  <select
                    value={selectedVariantId}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                    className="w-full bg-white border border-black/10 px-4 py-4 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors cursor-pointer rounded-none"
                  >
                    {product.variants.map((v: any) => (
                      <option key={v.id} value={v.id}>
                        {v.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Sticky Bottom Actions */}
            <div className="border-t border-black/10 bg-white p-6 md:p-8 flex flex-col gap-6 shrink-0 z-10">
               <div className="flex justify-between items-end">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-black/40">Investment</p>
                  <p className="font-serif text-3xl md:text-4xl text-black">${displayPrice.toFixed(2)}</p>
               </div>
               <button 
                 onClick={handleAddToCart}
                 className="w-full py-5 bg-black text-white font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[#C5A059] transition-all duration-700 cursor-none"
               >
                 Add to Collection
               </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
