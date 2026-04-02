'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SvgPet from './SvgPet';
import { heroPets } from '@/lib/pets';

export default function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroPets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-40 h-40 sm:w-52 sm:h-52">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-accent/5 blur-3xl scale-150" />

      {/* Orbit dots */}
      <div className="absolute inset-[-20px] animate-[spin_20s_linear_infinite]">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent/30"
            style={{
              top: `${50 + 48 * Math.sin((i * Math.PI) / 2)}%`,
              left: `${50 + 48 * Math.cos((i * Math.PI) / 2)}%`,
            }}
          />
        ))}
      </div>

      {/* Pet */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroPets[currentIndex]}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-full h-full"
        >
          <SvgPet
            fileName={`${heroPets[currentIndex]}.svg`}
            className="w-full h-full [&>svg]:w-full [&>svg]:h-full drop-shadow-[0_0_40px_rgba(245,166,35,0.15)]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
        {heroPets.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`
              w-1.5 h-1.5 rounded-full transition-all duration-300
              ${i === currentIndex ? 'bg-accent w-4' : 'bg-text-muted/40 hover:bg-text-muted'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
