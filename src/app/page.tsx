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
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
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

      {/* Toast */}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onDone={() => setToast({ visible: false, message: '' })}
      />
    </main>
  );
}
