'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroShowcase from '@/components/HeroShowcase';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import PetCard from '@/components/PetCard';
import Toast from '@/components/Toast';
import ThemeToggle from '@/components/ThemeToggle';
import { pets, type Category, type Pet } from '@/lib/pets';

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [toast, setToast] = useState({ visible: false, message: '' });

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      const matchesSearch = search === '' ||
        pet.name.toLowerCase().includes(search.toLowerCase()) ||
        pet.slug.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || pet.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleCopy = useCallback(async (pet: Pet) => {
    try {
      const res = await fetch(`/pets/${pet.fileName}`);
      const svgText = await res.text();
      await navigator.clipboard.writeText(svgText);
      setToast({ visible: true, message: `Copied ${pet.name} SVG!` });
    } catch {
      setToast({ visible: true, message: 'Failed to copy' });
    }
  }, []);

  const handleDownload = useCallback((pet: Pet) => {
    const a = document.createElement('a');
    a.href = `/pets/${pet.fileName}`;
    a.download = pet.fileName;
    a.click();
    setToast({ visible: true, message: `Downloading ${pet.name}...` });
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Top bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <a
          href="https://github.com/abderrahimghazali/clawd-pet"
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-10 h-10 rounded-xl
            bg-bg-secondary/80 border border-border
            hover:border-border-hover hover:bg-bg-card
            transition-all duration-200
            flex items-center justify-center
            text-text-secondary hover:text-text-primary
          "
          aria-label="View on GitHub"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-16 pb-8 px-4 sm:pt-24 sm:pb-12">
        <div className="hero-glow" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <HeroShowcase />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="bg-gradient-to-r from-accent via-amber-300 to-accent-secondary bg-clip-text text-transparent">
            Clawd Pets
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-secondary text-base sm:text-lg text-center mb-10 max-w-md"
        >
          {pets.length} animated SVG pets. Click to copy, search to find.
        </motion.p>

        {/* Search */}
        <div className="w-full max-w-xl px-4 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            resultCount={filteredPets.length}
          />
        </div>

        {/* Categories */}
        <div className="px-4">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 sm:px-8 pb-20 pt-6 max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredPets.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredPets.map((pet, i) => (
                  <PetCard
                    key={pet.slug}
                    pet={pet}
                    index={i}
                    onCopy={handleCopy}
                    onDownload={handleDownload}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-text-muted text-lg mb-2">No pets found</p>
              <p className="text-text-muted/60 text-sm">Try a different search term</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Request CTA */}
      <section className="px-4 pb-20 text-center">
        <div className="inline-flex flex-col items-center gap-2 px-6 py-5 rounded-2xl bg-bg-secondary/50 border border-border">
          <p className="text-text-secondary text-sm">
            Need a specific pet?{' '}
            <a
              href="https://github.com/abderrahimghazali/clawd-pet/issues/new?labels=pet-request&title=Pet+request:+"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              Open an issue on GitHub
            </a>
          </p>
        </div>
      </section>

      {/* Toast */}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onDone={() => setToast({ visible: false, message: '' })}
      />
    </main>
  );
}
