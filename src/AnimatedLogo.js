import React from 'react';
import { motion } from 'framer-motion';

const AnimatedFarmingLogo = ({ size = 40 }) => (
  <motion.div
    initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
    animate={{ scale: 1, opacity: 1, rotate: 0 }}
    transition={{ duration: 1, type: 'spring' }}
    className="flex flex-col items-center justify-center py-2"
  >
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sun */}
      <motion.circle cx="90" cy="30" r="16" fill="#FFD700" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }} />
      {/* Field */}
      <motion.ellipse cx="60" cy="90" rx="45" ry="18" fill="#8D5524" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.7, duration: 0.8 }} />
      {/* Green rows */}
      <motion.path d="M20 90 Q60 70 100 90" stroke="#228B22" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }} />
      <motion.path d="M30 95 Q60 80 90 95" stroke="#228B22" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1 }} />
      {/* Tractor */}
      <motion.g initial={{ x: -40 }} animate={{ x: 0 }} transition={{ delay: 1.5, duration: 1 }}>
        <rect x="45" y="70" width="18" height="10" rx="2" fill="#FFD700" />
        <rect x="60" y="72" width="10" height="8" rx="2" fill="#228B22" />
        <circle cx="50" cy="82" r="4" fill="#333" />
        <circle cx="70" cy="82" r="4" fill="#333" />
      </motion.g>
    </svg>
  </motion.div>
);

export default AnimatedFarmingLogo;
