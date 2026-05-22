import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES, HERO_SLIDES, ABOUT_IMAGES } from './constants/assets';
import { CustomCursor, Splashscreen } from './components/CoreUI';
import { Navbar, MenuOverlay } from './components/Navigation';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/Checkout';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { AboutView } from './views/AboutView';

const NAV_ITEMS = [
  { label: "Archive", view: 'home', section: 'masterpieces', img: IMAGES.masterpiece1 },
  { label: "Viewing Room", view: 'shop', section: 'shop', img: IMAGES.masterpiece2 },
  { label: "Narrative", view: 'about', section: 'about', img: ABOUT_IMAGES.hero },
  { label: "Exhibitions", view: 'home', section: 'exhibitions', img: IMAGES.studio2 },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  const initialHash = typeof window !== 'undefined' ? window.location.hash.replace('#', '').split('/')[0] : 'home';
  const validViews = ['home', 'shop', 'about'];
  const [view, setView] = useState(validViews.includes(initialHash) ? initialHash : 'home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [heroIndex, setHeroIndex] = useState(0);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Cart State
  const [cartItems, setCartItems] = useState<Array<{ product: any; variant: any; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    region: '',
    zip: '',
    country: 'US',
  });
  const [products, setProducts] = useState<any[]>([]);
  const [repoStatus, setRepoStatus] = useState('Standalone');

  const scrollPositions = useRef<Record<string, number>>({});
  const pendingScroll = useRef<{ sectionId?: string; y?: number } | null>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (!isTransitioning.current) {
        scrollPositions.current[view] = window.scrollY;
      }
    };
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });

    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const [newView, sectionId] = hash.split('/');
      const validatedView = validViews.includes(newView) ? newView : 'home';
      
      setIsMenuOpen(false);
      setSelectedProduct(null);
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
      
      if (view === validatedView) {
        if (sectionId) {
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'auto' });
          }, 50);
        } else {
          const y = scrollPositions.current[validatedView] || 0;
          window.scrollTo({ top: y, behavior: 'auto' });
        }
      } else {
        pendingScroll.current = { 
          sectionId, 
          y: sectionId ? undefined : (scrollPositions.current[validatedView] || 0) 
        };
        isTransitioning.current = true;
        setView(validatedView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('popstate', handlePopState);

    // Initial section routing if hash exists on load
    const hash = window.location.hash.replace('#', '');
    const [_, initialSectionId] = hash.split('/');
    if (initialSectionId) {
      setTimeout(() => {
        const el = document.getElementById(initialSectionId);
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }, 500);
    }

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    // Fetch Products
    const fetchProducts = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      try {
        const res = await fetch('/api/products', { signal: controller.signal });
        const data = await res.json();
        if (data && data.length > 0) {
          setProducts(data);
          setRepoStatus('Connected');
        }
      } catch (err) {
        console.log("Archive synchronization paused. Operating in standalone mode.");
      } finally {
        clearTimeout(timeoutId);
      }
    };
    fetchProducts();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('popstate', handlePopState);
      clearInterval(interval);
    };
  }, [view]);

  const handleOrderSubmit = async (orderPayload: any) => {
    setCheckoutStep('processing');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (res.ok) {
        setCheckoutStep('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          address1: '',
          city: '',
          region: '',
          zip: '',
          country: 'US',
        });
      } else {
        alert(`Failed to place order: ${data.error || 'Please check your details and try again.'}`);
        setCheckoutStep('form');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Network error: Failed to submit order to the bridge server.');
      setCheckoutStep('form');
    }
  };

  const navigateTo = (newView: string, sectionId?: string) => {
    const hash = `#${newView}${sectionId ? `/${sectionId}` : ''}`;
    if (window.location.hash !== hash) {
      window.history.pushState({ view: newView, sectionId }, '', hash);
    }
    
    setIsMenuOpen(false);

    if (view === newView) {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'auto' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else {
      pendingScroll.current = { 
        sectionId, 
        y: sectionId ? undefined : 0 
      };
      isTransitioning.current = true;
      setView(newView);
    }
  };

  const handleAddToCart = (product: any, variant: any) => {
    setCartItems(prev => {
      const existing = prev.findIndex(i => i.product.id === product.id && i.variant?.id === variant?.id);
      if (existing >= 0) {
        const newItems = [...prev];
        newItems[existing].quantity += 1;
        return newItems;
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, qty: number) => {
    const newItems = [...cartItems];
    newItems[index].quantity = qty;
    setCartItems(newItems);
  };

  const removeItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const openCheckoutFromCart = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setCheckoutStep('form');
  };

  return (
    <div className="relative font-sans selection:bg-[#C5A059] selection:text-black">
      <AnimatePresence>{isLoading && <Splashscreen />}</AnimatePresence>
      <CustomCursor cursorPos={cursorPos} />

      <Navbar 
        scrolled={scrolled} 
        view={view} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        navigateTo={navigateTo} 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navigateTo={navigateTo} 
        hoveredNav={hoveredNav} 
        setHoveredNav={setHoveredNav} 
        NAV_ITEMS={NAV_ITEMS} 
      />

      <AnimatePresence 
        mode="wait"
        onExitComplete={() => {
          if (pendingScroll.current) {
            const { sectionId, y } = pendingScroll.current;
            
            // Wait 50ms for the new view to actually mount and render its height
            // before we attempt to restore the scroll position.
            setTimeout(() => {
              if (sectionId) {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'auto' });
              } else if (y !== undefined) {
                window.scrollTo({ top: y, behavior: 'auto' });
              }
              isTransitioning.current = false;
            }, 50);
            
            pendingScroll.current = null;
          } else {
            isTransitioning.current = false;
          }
        }}
      >
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {view === 'home' ? (
            <HomeView 
              heroIndex={heroIndex}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              openCheckout={(item) => setSelectedProduct(item)}
              navigateTo={navigateTo}
            />
          ) : view === 'shop' ? (
            <ShopView 
              products={products}
              repoStatus={repoStatus}
              onSelectProduct={(product) => setSelectedProduct(product)}
            />
          ) : (
            <AboutView 
              navigateTo={navigateTo}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <Footer navigateTo={navigateTo} />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={openCheckoutFromCart}
      />

      <ProductDetail 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {isCheckoutOpen && (
        <CheckoutModal 
          cartItems={cartItems} 
          onClose={() => {
             if (checkoutStep === 'success') {
                setCartItems([]);
             }
             setIsCheckoutOpen(false);
             setCheckoutStep('form');
          }} 
          checkoutStep={checkoutStep} 
          setCheckoutStep={setCheckoutStep} 
          form={form} 
          setForm={setForm} 
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
}
