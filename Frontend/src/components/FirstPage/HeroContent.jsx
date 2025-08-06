import React from 'react';
import { motion } from 'framer-motion';

export default function HeroContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-4xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold tracking-tight text-white"
        style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.4)' }}
        variants={itemVariants}
      >
        Find a Home That Matches Your Vibe
      </motion.h1>
      <motion.p
        className="mt-4 text-lg md:text-xl text-gray-300"
        variants={itemVariants}
      >
        Luxury stays for the modern traveler.
      </motion.p>
    </motion.div>
  );
}
