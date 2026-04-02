'use client';

import { motion } from 'framer-motion';
import SvgPet from './SvgPet';
import type { Pet } from '@/lib/pets';

interface PetCardProps {
  pet: Pet;
  index: number;
  onCopy: (pet: Pet) => void;
  onDownload: (pet: Pet) => void;
}

export default function PetCard({ pet, index, onCopy, onDownload }: PetCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
      className="group relative"
    >
      <div
        onClick={() => onCopy(pet)}
        className="
          relative cursor-pointer rounded-2xl
          bg-bg-card/60 border border-border
          hover:bg-bg-card-hover hover:border-border-hover
          hover:shadow-[0_8px_40px_rgba(245,166,35,0.06)]
          transition-all duration-300 ease-out
          overflow-hidden
        "
      >
        {/* SVG Container */}
        <div className="relative p-4 pb-2 flex items-center justify-center aspect-square">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <SvgPet fileName={pet.fileName} className="w-full h-full [&>svg]:w-full [&>svg]:h-full" />
          </div>

          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-bg-primary/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-accent/90 text-bg-primary text-xs font-semibold">
              Copy SVG
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(pet);
              }}
              className="p-2 rounded-lg bg-bg-card/90 border border-border-hover text-text-primary hover:bg-bg-card-hover transition-colors"
              title="Download SVG"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="px-3 pb-3 pt-1 text-center">
          <p className="text-text-secondary text-xs font-medium truncate group-hover:text-text-primary transition-colors">
            {pet.name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
