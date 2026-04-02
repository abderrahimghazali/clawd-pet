'use client';

import { motion } from 'framer-motion';
import { categories, type Category } from '@/lib/pets';

interface CategoryFilterProps {
  active: Category;
  onChange: (category: Category) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="flex flex-wrap justify-center gap-2"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`
            relative px-4 py-2 rounded-xl text-sm font-medium
            transition-all duration-200 ease-out
            ${active === cat.id
              ? 'text-bg-primary'
              : 'text-text-secondary hover:text-text-primary bg-bg-secondary/50 hover:bg-bg-secondary border border-border hover:border-border-hover'
            }
          `}
        >
          {active === cat.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-accent rounded-xl"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <span className="text-xs opacity-70">{cat.emoji}</span>
            {cat.label}
          </span>
        </button>
      ))}
    </motion.div>
  );
}
