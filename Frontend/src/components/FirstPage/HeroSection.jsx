import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroContent from './HeroContent';
import ParticleBackground from './ParticleBackground';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <ParticleBackground />
      <motion.div
        style={{ y }}
        className="relative z-10 flex h-full w-full items-center justify-center"
      >
        <HeroContent />
      </motion.div>
    </section>
  );
}
