// components/AuthSystem/SocialButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SocialButton = ({ children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex-1 flex items-center justify-center p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg text-white hover:bg-[#5A80E9]/20 transition-all duration-300"
  >
    {children}
  </motion.button>
);

export default SocialButton;
