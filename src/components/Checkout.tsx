import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe outside of component
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_KEY && STRIPE_KEY !== 'your_stripe_publishable_key' ? loadStripe(STRIPE_KEY) : null;

interface CheckoutModalProps {
  cartItems: any[];
  onClose: () => void;
  checkoutStep: 'form' | 'processing' | 'success';
  setCheckoutStep: (step: any) => void;
  form: any;
  setForm: (form: any) => void;
  onSubmit: (orderPayload: any) => Promise<void>;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  cartItems, onClose, checkoutStep, setCheckoutStep, form, setForm, onSubmit
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (cartItems.length > 0 && checkoutStep === 'form') {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems })
      })
      .then(res => res.json())
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      })
      .catch(console.error);
    }
  }, [cartItems, checkoutStep]);

  return (
    <AnimatePresence>
      {cartItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[3000] flex items-start md:items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto md:overflow-hidden -webkit-overflow-scrolling-touch"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 shadow-2xl relative my-0 md:my-8 min-h-screen md:min-h-0"
          >
            <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 text-black/20 hover:text-black z-20 transition-colors cursor-none bg-white/80 md:bg-transparent rounded-full p-2">
              <X size={24} />
            </button>

            {/* Left Column: Order Summary */}
            <OrderSummary cartItems={cartItems} />

            {/* Right Column: Checkout Form Wrapper */}
            <div className="p-6 md:p-16 flex flex-col justify-center overflow-visible md:max-h-[80vh] md:overflow-y-auto">
              {checkoutStep === 'form' ? (
                clientSecret ? (
                  stripePromise ? (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                      <CheckoutForm 
                        cartItems={cartItems}
                        form={form} 
                        setForm={setForm} 
                        onSubmit={onSubmit} 
                        setCheckoutStep={setCheckoutStep} 
                      />
                    </Elements>
                  ) : (
                    <CheckoutForm 
                      cartItems={cartItems}
                      form={form} 
                      setForm={setForm} 
                      onSubmit={onSubmit} 
                      setCheckoutStep={setCheckoutStep} 
                      isSimulated={true}
                    />
                  )
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <div className="w-8 h-8 border-2 border-black/10 border-t-[#C5A059] rounded-full animate-spin" />
                  </div>
                )
              ) : checkoutStep === 'processing' ? (
                <div className="text-center py-24 space-y-8">
                  <div className="w-16 h-16 border-2 border-black/5 border-t-[#C5A059] rounded-full animate-spin mx-auto" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#C5A059] animate-pulse">Securing Narrative...</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-12"
                >
                  <div className="w-24 h-24 bg-[#C5A059] rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Check size={48} className="text-black" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-serif text-4xl text-black tracking-tighter italic">Acquisition Initiated.</h3>
                    <p className="font-sans text-sm text-black/60 leading-loose">
                      Your order has been registered in the archives. Our concierge will follow up shortly to confirm delivery.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-full py-6 border border-black/10 hover:border-black font-sans text-[10px] uppercase tracking-[0.4em] transition-all duration-700 cursor-none"
                  >
                    Return to Gallery
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const OrderSummary = ({ cartItems }: { cartItems: any[] }) => {
  const total = cartItems.reduce((sum, item) => sum + (Number(item.variant?.price || item.product?.price || 0) * item.quantity), 0);
  
  return (
    <div className="bg-[#F9F8F6] p-6 md:p-16 border-b md:border-b-0 md:border-r border-black/5 flex flex-col justify-between">
      <div>
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#C5A059] mb-8 block">Order Summary</span>
        <div className="space-y-6 mb-8 max-h-[30vh] md:max-h-[40vh] overflow-y-auto pr-4 -webkit-overflow-scrolling-touch">
          {cartItems.map((cartItem, idx) => (
            <div key={idx} className="flex gap-4 border-b border-black/5 pb-4 last:border-0">
              <div className="w-16 h-16 bg-white border border-black/5 flex-shrink-0">
                <img src={cartItem.product.image || cartItem.product.img} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                   <p className="font-serif text-lg text-black leading-none">{cartItem.product.title}</p>
                   <p className="font-mono text-[8px] uppercase tracking-widest text-black/40 mt-1">{cartItem.variant?.title || 'Standard'}</p>
                </div>
                <div className="flex justify-between items-end">
                   <p className="font-mono text-[9px] text-black/60">Qty: {cartItem.quantity}</p>
                   <p className="font-serif text-sm text-black">${Number(cartItem.variant?.price || cartItem.product?.price || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-8 mt-8 border-t border-black/5 flex justify-between items-end">
        <p className="font-mono text-[10px] uppercase tracking-widest text-black/40">Total Acquisition</p>
        <p className="font-serif text-3xl text-black">
           ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const CheckoutForm = ({ cartItems, form, setForm, onSubmit, setCheckoutStep, isSimulated = false }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');

  const handleProceed = async () => {
    if (
      !form.name || 
      !form.email || 
      !form.phone || 
      !form.address1 || 
      !form.city || 
      !form.region || 
      !form.zip || 
      !form.country
    ) {
      setErrorMessage("Please fill in all shipping fields.");
      return;
    }

    setCheckoutStep('processing');

    if (!isSimulated) {
      if (!stripe || !elements) return;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: 'if_required' // We don't want to redirect if not necessary
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed.");
        setCheckoutStep('form');
        return;
      }
    } else {
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Payment Successful (or simulated)! Build Printify payload
    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || 'Collector';

    const orderPayload = {
      external_id: "order-" + Date.now(),
      line_items: cartItems.map((item: any) => ({
        product_id: item.product.id,
        variant_id: typeof item.variant?.id === 'number' ? item.variant.id : Number(item.variant?.id) || item.variant?.id,
        quantity: item.quantity
      })),
      shipping_method: 1,
      send_shipping_notification: false,
      address_to: {
        first_name: firstName,
        last_name: lastName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        region: form.region,
        city: form.city,
        address1: form.address1,
        zip: form.zip
      }
    };

    onSubmit(orderPayload);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-4xl text-black tracking-tighter mb-4 italic">Request Acquisition.</h3>
        <p className="font-sans text-sm text-black/60 leading-loose">
          Secure this directive within our archives. Please provide your collector credentials and shipping directives for processing.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">Full Name</label>
            <input 
              type="text" 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-stone-50 border-b border-black/10 py-2 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors" 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">Email Address</label>
            <input 
              type="email" 
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full bg-stone-50 border-b border-black/10 py-2 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors" 
              placeholder="collector@archive.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">Phone Number</label>
            <input 
              type="tel" 
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              className="w-full bg-stone-50 border-b border-black/10 py-2 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors" 
              placeholder="+1 555-555-5555"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">Street Address</label>
            <input 
              type="text" 
              value={form.address1}
              onChange={(e) => setForm({...form, address1: e.target.value})}
              className="w-full bg-stone-50 border-b border-black/10 py-2 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors" 
              placeholder="123 Gallery Lane"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">City</label>
            <input 
              type="text" 
              value={form.city}
              onChange={(e) => setForm({...form, city: e.target.value})}
              className="w-full bg-stone-50 border-b border-black/10 py-2 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors" 
              placeholder="New York"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">State / Region</label>
            <input 
              type="text" 
              value={form.region}
              onChange={(e) => setForm({...form, region: e.target.value})}
              className="w-full bg-stone-50 border-b border-black/10 py-2 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors" 
              placeholder="NY"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">ZIP / Postal Code</label>
            <input 
              type="text" 
              value={form.zip}
              onChange={(e) => setForm({...form, zip: e.target.value})}
              className="w-full bg-stone-50 border-b border-black/10 py-2 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors" 
              placeholder="10001"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">Country (ISO)</label>
            <select 
              value={form.country}
              onChange={(e) => setForm({...form, country: e.target.value})}
              className="w-full bg-stone-50 border-b border-black/10 py-2 font-sans text-xs outline-none focus:border-[#C5A059] transition-colors cursor-pointer" 
            >
              <option value="US">United States (US)</option>
              <option value="CA">Canada (CA)</option>
              <option value="GB">United Kingdom (GB)</option>
              <option value="AU">Australia (AU)</option>
              <option value="DE">Germany (DE)</option>
              <option value="FR">France (FR)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-black/5 space-y-4">
        <div className="flex items-center gap-2 mb-4 text-[#C5A059]">
          <Lock size={12} />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em]">Secure Payment</span>
        </div>
        
        {isSimulated ? (
          <div className="bg-stone-50 border border-black/5 p-4 text-center">
            <p className="font-sans text-sm text-black/60 tracking-wide">
               Stripe Payment Processing Simulated (Setup Pending)
            </p>
          </div>
        ) : (
          <div className="min-h-[100px]">
            <PaymentElement />
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="text-red-500 font-sans text-[10px] uppercase tracking-widest">
          {errorMessage}
        </div>
      )}

      <button 
        onClick={handleProceed}
        disabled={!stripe && !isSimulated}
        className="w-full py-6 bg-black text-white font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[#C5A059] transition-all duration-700 disabled:opacity-30 flex items-center justify-center gap-6 group cursor-none mt-8"
      >
        Proceed to Securing Work
        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};
