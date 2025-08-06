// components/AuthSystem/AuthToggle.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AuthToggle = ({ formType, setFormType }) => (
  <div className="flex justify-center mb-8">
    <div className="relative flex p-1 bg-[#12131C]/70 rounded-lg">
      <button
        onClick={() => setFormType('login')}
        className={`relative z-10 px-6 py-2 text-lg font-semibold transition-colors ${formType === 'login' ? 'text-white' : 'text-[#C5C8D7]'}`}
      >
        Login
      </button>
      <button
        onClick={() => setFormType('signup')}
        className={`relative z-10 px-6 py-2 text-lg font-semibold transition-colors ${formType === 'signup' ? 'text-white' : 'text-[#C5C8D7]'}`}
      >
        Sign Up
      </button>
      <motion.div
        layoutId="active-pill"
        className="absolute inset-0 bg-[#5A80E9]/30 rounded-md"
        style={{
          width: formType === 'login' ? '46%' : '54%',
          left: formType === 'login' ? '2%' : '44%'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  </div>
);

export default AuthToggle;
