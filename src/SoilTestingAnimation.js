import React from 'react';
import { motion } from 'framer-motion';

function SoilTestingAnimation({ substep }) {
  switch (substep) {
    case 'Collect samples':
      return (
        <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-5xl mb-2">🧤</div>
          <motion.div
            className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center border-4 border-yellow-700 mb-2"
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-3xl">🟫</span>
          </motion.div>
          <div className="text-sm text-gray-700">Collecting soil into watch glass</div>
        </motion.div>
      );
    case 'Test pH':
      return (
        <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-5xl mb-2">🧪</div>
          <motion.div
            className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center border-4 border-green-700 mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-3xl">🟩</span>
          </motion.div>
          <div className="text-sm text-gray-700">Testing pH with color change</div>
        </motion.div>
      );
    case 'Assess nutrients':
      return (
        <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-5xl mb-2">🧫</div>
          <motion.div
            className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center border-4 border-blue-700 mb-2"
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          >
            <span className="text-3xl">🧬</span>
          </motion.div>
          <div className="text-sm text-gray-700">Analyzing nutrients in lab</div>
        </motion.div>
      );
    case 'Record moisture':
      return (
        <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-5xl mb-2">💧</div>
          <motion.div
            className="w-24 h-24 bg-cyan-200 rounded-full flex items-center justify-center border-4 border-cyan-700 mb-2"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-3xl">💦</span>
          </motion.div>
          <div className="text-sm text-gray-700">Measuring soil moisture</div>
        </motion.div>
      );
    default:
      return null;
  }
}

export default SoilTestingAnimation;
