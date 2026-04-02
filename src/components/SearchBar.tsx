'use client';

import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export default function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full max-w-xl mx-auto"
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-accent-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-center bg-bg-secondary/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden focus-within:border-accent/30 transition-colors duration-300">
          {/* Search icon */}
          <div className="pl-5 text-text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search pets..."
            className="w-full px-4 py-4 bg-transparent text-text-primary placeholder-text-muted text-base outline-none"
            style={{ fontFamily: 'var(--font-body)' }}
          />

          {value && (
            <button
              onClick={() => onChange('')}
              className="pr-4 text-text-muted hover:text-text-primary transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      {value && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-text-muted text-sm mt-3 text-center"
        >
          {resultCount} pet{resultCount !== 1 ? 's' : ''} found
        </motion.p>
      )}
    </motion.div>
  );
}
