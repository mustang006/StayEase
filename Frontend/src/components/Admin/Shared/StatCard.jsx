import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-[#1A1B2E]/50 backdrop-blur-md border border-[#5A80E9]/20 p-6 rounded-xl flex items-center gap-6"
  >
    <div className="p-4 rounded-full" style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}50` }}>
      {icon}
    </div>
    <div>
      <p className="text-lg text-[#C5C8D7]">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

export default StatCard;
