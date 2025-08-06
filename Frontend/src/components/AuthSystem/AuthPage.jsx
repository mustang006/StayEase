import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandHeader from './BrandHeader';
import AuthToggle from './AuthToggle';
import AuthForm from './AuthForm';
import AnimatedParticles from './AnimatedParticles';

const AuthPage = () => {
  const [formType, setFormType] = useState('login');

  return (
    <div className="relative min-h-screen w-full bg-[#0D1117] flex items-center justify-center font-['Inter'] p-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560185893-a55de8537e49?auto=format&fit=crop&w=1950&q=80')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] via-transparent to-[#0D1117]" />
      <AnimatedParticles />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md p-8 bg-[#1A1B2E]/50 backdrop-blur-lg border border-[#5A80E9]/20 rounded-2xl shadow-2xl"
      >
        <BrandHeader />
        <AuthToggle formType={formType} setFormType={setFormType} />
        <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
          <AnimatePresence initial={false} mode="wait">
            <AuthForm type={formType} setFormType={setFormType} />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
