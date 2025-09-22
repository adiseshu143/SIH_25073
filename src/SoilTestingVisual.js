

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animation for collecting soil samples into a watch glass
import { motion as motionSvg } from 'framer-motion';
const CollectSamplesAnimation = ({ progress }) => (
  <motionSvg.svg width="120" height="60" viewBox="0 0 120 60">
    {/* Watch glass */}
    <ellipse cx="60" cy="45" rx="40" ry="12" fill="#e0e0e0" />
    {/* Soil samples - animate height based on progress */}
    <motionSvg.rect
      x="30"
      y={45 - (progress / 100) * 20}
      width="60"
      animate={{ height: (progress / 100) * 20, y: 45 - (progress / 100) * 20 }}
      initial={false}
      fill="#8d5524"
      style={{ originY: 45 }}
      transition={{ duration: 0.3 }}
    />
    {/* Label */}
    <text x="60" y="58" textAnchor="middle" fontSize="10" fill="#333">Watch Glass</text>
  </motionSvg.svg>
);

// Placeholder for other substep animations
const SubstepAnimations = {
  'Collect samples': CollectSamplesAnimation,
  // Add more substeps and their animation components here
};


const SoilTestingVisual = ({ substep = 'Collect samples', preview = 'Collecting soil samples from different locations...' }) => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let prog = progress;
    let interval;
    if (started && prog < 100) {
      interval = setInterval(() => {
        prog += 10;
        setProgress(prev => (prog > 100 ? 100 : prog));
        if (prog >= 100) clearInterval(interval);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [started, progress]);

  // Select animation component for current substep
  const AnimationComponent = SubstepAnimations[substep];

  return (
    <motion.div className="space-y-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="mb-2 font-bold text-lg text-yellow-900">Soil Testing Preview</div>
      <motion.div className="mt-2 p-3 bg-white border rounded shadow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="font-semibold mb-2">{`Preview: ${substep}`}</div>
        <div className="mb-2 text-gray-600 text-sm">{preview}</div>
        {/* Substep animation */}
        {started && AnimationComponent && (
          <div className="flex justify-center items-center my-3">
            <AnimationComponent progress={progress} />
          </div>
        )}
        <motion.div className="w-full bg-gray-200 rounded-full h-3 mb-1" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.6 }}>
          <motion.div
            className="bg-primary h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        <div className="mt-1 text-xs text-gray-500">{`${progress}%`}</div>
        <button
          className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded font-semibold disabled:opacity-50"
          onClick={() => setStarted(true)}
          disabled={started || progress >= 100}
        >
          {progress < 100 ? substep : 'Completed'}
        </button>
      </motion.div>
      <motion.p className="text-gray-700 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        Analyze pH, nitrogen, phosphorus, potassium, moisture and temperature to understand soil health.
      </motion.p>
    </motion.div>
  );
};

export default SoilTestingVisual;
