import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from './PropertyCard';

const CategorySection = ({ title, homes, onBook }) => {
  const initialDisplayCount = 6;
  const [visibleCount, setVisibleCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(initialDisplayCount);
  };

  const displayedHomes = homes.slice(0, visibleCount);

  if (homes.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="relative inline-block mb-8">
        <h2 className="text-4xl font-bold font-['Urbanist']">{title}</h2>
        <div className="absolute -bottom-1 left-0 w-3/4 h-1 bg-[#5A80E9] rounded-full shadow-[0_0_15px_rgba(90,128,233,0.7)]" />
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {displayedHomes.map((home) => (
            <motion.div
              key={home.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <PropertyCard home={home} onBook={onBook} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {homes.length > initialDisplayCount && (
        <div className="text-center mt-12">
          {visibleCount < homes.length ? (
            <button
              onClick={handleShowMore}
              className="px-8 py-3 text-lg font-semibold border-2 border-[#5A80E9] rounded-full text-[#A8C5FF] hover:bg-[#5A80E9] hover:text-white hover:shadow-[0_0_20px_rgba(90,128,233,0.5)] transition-all duration-300"
            >
              🔽 Show More
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="px-8 py-3 text-lg font-semibold border-2 border-[#5A80E9] rounded-full text-[#A8C5FF] hover:bg-[#5A80E9] hover:text-white hover:shadow-[0_0_20px_rgba(90,128,233,0.5)] transition-all duration-300"
            >
              🔼 Show Less
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
