import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ product: any; variant: any; quantity: number }>;
  onUpdateQuantity: (index: number, qty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.variant?.price || item.product?.price || 0);
    return sum + (price * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2500]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] bg-white z-[2501] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-black/5">
              <div className="flex items-center gap-4">
                <h2 className="font-serif text-3xl text-black tracking-tight italic">Your Collection.</h2>
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-mono text-[9px]">
                  {items.length}
                </span>
              </div>
              <button onClick={onClose} className="text-black/40 hover:text-black transition-colors cursor-none">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 border border-black/10 flex items-center justify-center rounded-full text-black/20">
                    <span className="font-serif text-2xl italic">0</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-black">Your archive is empty.</h3>
                    <p className="font-sans text-sm text-black/60 mt-4">
                      Browse the viewing room to acquire works.
                    </p>
                  </div>
                  <button onClick={onClose} className="mt-8 px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors font-sans text-[9px] uppercase tracking-[0.4em] cursor-none">
                    Return to Gallery
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item, index) => {
                    const price = Number(item.variant?.price || item.product?.price || 0);
                    return (
                      <div key={index} className="flex gap-6 border-b border-black/5 pb-8 last:border-0 last:pb-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-stone-100 flex-shrink-0 border border-black/5">
                          <img src={item.product.image || item.product.img} alt={item.product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-xl text-black tracking-tight">{item.product.title}</h4>
                              <button onClick={() => onRemoveItem(index)} className="text-black/30 hover:text-red-500 transition-colors cursor-none">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 mt-1">
                              {item.variant?.title || 'Standard'}
                            </p>
                          </div>
                          <div className="flex justify-between items-end mt-4">
                            <div className="flex items-center border border-black/10">
                              <button onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-black/5 cursor-none">
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center font-mono text-[10px]">{item.quantity}</span>
                              <button onClick={() => onUpdateQuantity(index, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-black/5 cursor-none">
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="font-serif text-lg text-black">${(price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-black/5 bg-[#F9F8F6]">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">Subtotal</span>
                  <span className="font-serif text-3xl text-black">${subtotal.toFixed(2)}</span>
                </div>
                <p className="font-sans text-xs text-black/50 mb-8 text-right">
                  Shipping & taxes calculated at checkout.
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full py-6 bg-black text-white font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[#C5A059] transition-all duration-700 cursor-none"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
