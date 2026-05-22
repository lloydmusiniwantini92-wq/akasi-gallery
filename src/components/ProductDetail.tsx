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
        className="fixed inset-0 z-[2500] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-[#F9F8F6] w-full max-w-5xl flex flex-col md:flex-row shadow-2xl relative my-8"
        >
          <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 text-black/40 hover:text-black z-20 transition-colors cursor-none bg-white/80 md:bg-transparent p-2 rounded-full md:rounded-none md:p-0">
            <X size={24} />
          </button>

          {/* Left Column: Image */}
          <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-black/5 bg-white flex flex-col justify-center">
            <div className="aspect-square bg-stone-100 overflow-hidden relative shadow-xl">
              <img src={(product.images && product.images[activeImageIndex]) || product.image || product.img} alt={product.title} className="w-full h-full object-cover" />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 mt-6 overflow-x-auto scrollbar-hide py-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {product.images.map((imgUrl: string, idx: number) => (
                   <button 
                     key={idx} 
                     onClick={() => setActiveImageIndex(idx)}
                     className={`w-16 h-16 flex-shrink-0 border ${activeImageIndex === idx ? 'border-[#C5A059]' : 'border-black/5'} overflow-hidden transition-all duration-300 hover:border-[#C5A059]/50 cursor-none`}
                   >
                      <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                   </button>
                ))}
              </div>
            )}

            <div className="mt-8 text-center md:text-left">
              <h2 className="font-serif text-3xl md:text-4xl text-black tracking-tight">{product.title}</h2>
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#C5A059] mt-2">
                Ref. {product.id ? String(product.id).slice(-6) : product.title.slice(0, 6).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-between bg-[#F9F8F6]">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#C5A059] mb-4 block">Product Details</span>
              <h1 className="font-serif text-4xl md:text-5xl text-black tracking-tighter italic leading-none mb-8">Acquisition.</h1>
              
              {cleanDescription && (
                <div className="mb-12">
                   <p className="font-sans text-sm text-black/60 leading-loose">
                     {cleanDescription}
                   </p>
                </div>
              )}

              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 mb-12">
                  <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">Select Edition Size</label>
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

            <div className="border-t border-black/5 pt-8 mt-8">
               <div className="flex justify-between items-end mb-8">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-black/40">Investment</p>
                  <p className="font-serif text-3xl text-black">${displayPrice.toFixed(2)}</p>
               </div>

               <button 
                 onClick={handleAddToCart}
                 className="w-full py-6 bg-black text-white font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[#C5A059] transition-all duration-700 cursor-none"
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
