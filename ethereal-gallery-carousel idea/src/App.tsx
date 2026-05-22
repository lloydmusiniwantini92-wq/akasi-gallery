/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "framer-motion";
import { Mouse, Keyboard, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const startProgress = useCallback(() => {
    setLoadingProgress(0);
    setIsLoaded(false);
    const interval = 50;
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    startProgress();
  }, [startProgress]);

  const strokeDashoffset = 364.4 - (364.4 * loadingProgress) / 100;
  
  const bgImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuC8z1IDRBnzaMjW-Fo5yTK6N8JWUMijKgxedxdY5Esuwnatwal1X9g87yAA0iGFtDUwJqioDokjgRr0NeDoWQuM95wkwxgDFK_Ko4ekFgZ23cuyjueZGIQyesjvxU7q1VlY74kMQU_A6r4g5HANlVaQiyp9ja0X4uwRaQFpDlcfDn7BGippJIfbz-cIB2L1M9OgHJY8VWia-OpGNevwDfL0nZJuTFgJnPegXpDdK8miZjFDKkEZJFrNG6a8HG6VSo_ZcmZEq01jZ5s";

  const [hasLaunched, setHasLaunched] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f9f9f9] text-[#1a1c1c] selection:bg-black selection:text-white overflow-hidden">
      {/* TopNavBar */}
      <AnimatePresence>
        {!hasLaunched && (
          <motion.nav 
            initial={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-8 bg-white/80 backdrop-blur-md border-b border-zinc-100 font-serif"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-light tracking-[0.2em] uppercase"
            >
              ETHEREAL GALLERY
            </motion.div>
            
            <div className="hidden md:flex items-center gap-12">
              {["Exhibitions", "Archive", "Artists", "About"].map((item, idx) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="text-zinc-400 hover:text-black transition-colors duration-300 text-xs tracking-widest uppercase font-sans font-medium"
                  href="#"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group relative flex items-center gap-2 text-black border-b border-black pb-1 text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
            >
              ENTER VR
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative flex-grow h-screen overflow-hidden flex items-center justify-center cursor-move">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 bg-[#f3f3f4] overflow-hidden">
          <motion.div
            className="w-full h-full"
            drag={hasLaunched}
            dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
            dragElastic={0.1}
          >
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: hasLaunched ? 1.5 : 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-full h-full object-cover origin-center max-w-none"
              style={{ width: hasLaunched ? "150vw" : "100%", height: hasLaunched ? "150vh" : "100%", transform: hasLaunched ? 'translate(-16%, -16%)' : 'none' }}
              src={bgImage}
              alt="Gallery Space"
              referrerPolicy="no-referrer"
              draggable="false"
            />
          </motion.div>
          {!hasLaunched && (
            <motion.div 
              exit={{ opacity: 0 }} 
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none"
            ></motion.div>
          )}
        </div>

        {/* Central Modal */}
        <AnimatePresence>
          {!hasLaunched && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl px-6 pointer-events-auto"
            >
              <div className="bg-white/95 backdrop-blur-2xl p-8 md:p-16 flex flex-col items-center text-center border border-zinc-200/50 shadow-2xl shadow-black/5">
                <header className="mb-12">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[10px] font-bold text-zinc-400 mb-4 block tracking-[0.4em] uppercase"
                  >
                    IMMERSIVE PREVIEW
                  </motion.span>
                  <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-black mb-4 leading-tight tracking-tight">
                    Enter the <br/> Virtual Ether
                  </h1>
                </header>

                {/* Loader */}
                <div className="relative flex items-center justify-center mb-12">
                  <svg className="w-28 h-28 md:w-32 md:h-32 -rotate-90">
                    <circle
                      className="text-zinc-100 stroke-zinc-100"
                      cx="64"
                      cy="64"
                      fill="transparent"
                      r="58"
                      strokeWidth="1"
                    ></circle>
                    <motion.circle
                      className="text-black stroke-black"
                      cx="64"
                      cy="64"
                      fill="transparent"
                      r="58"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 364.4 }}
                      animate={{ strokeDashoffset }}
                      style={{ 
                        strokeDasharray: "364.4"
                      }}
                    ></motion.circle>
                  </svg>
                  <div className="absolute font-sans font-bold text-black text-[10px] tracking-tighter">
                    {loadingProgress}%
                  </div>
                </div>

                {/* Instructions */}
                <div className="grid grid-cols-2 gap-8 w-full mb-12 pt-12 border-t border-zinc-100">
                  <div className="flex flex-col items-center gap-3">
                    <Mouse className="w-4 h-4 text-black opacity-40" />
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                      Mouse to look
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Keyboard className="w-4 h-4 text-black opacity-40" />
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                      Drag to move
                    </p>
                  </div>
                </div>

                {/* Action */}
                <motion.button
                  whileHover={{ scale: isLoaded ? 1.01 : 1 }}
                  whileTap={{ scale: isLoaded ? 0.98 : 1 }}
                  onClick={() => isLoaded && setHasLaunched(true)}
                  className={`group relative w-full py-5 text-white transition-all duration-300 ${isLoaded ? 'bg-black hover:bg-zinc-800 cursor-pointer' : 'bg-zinc-300 cursor-not-allowed'}`}
                >
                  <span className="text-[11px] font-bold tracking-[0.5em] uppercase">
                    {isLoaded ? 'LAUNCH EXPERIENCE' : 'LOADING...'}
                  </span>
                </motion.button>
                
                <p className="mt-8 text-zinc-400 text-[9px] uppercase tracking-widest font-medium opacity-70">
                  VR Headset supported but not required
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <AnimatePresence>
        {!hasLaunched && (
          <motion.footer 
            initial={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full py-10 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8 bg-white border-t border-zinc-100 font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-400"
          >
            <div>
              © 2024 ETHEREAL GALLERY
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {["Privacy", "Terms", "Legal", "Contact"].map((item) => (
                <a
                  key={item}
                  className="hover:text-black transition-colors duration-300"
                  href="#"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}
