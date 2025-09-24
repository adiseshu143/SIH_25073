

import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import FarmWorldMap from './components/GameUI/FarmWorldMap';
import TaskDetail from './TaskDetail';
import SubstepDetail from './SubstepDetail';
import ProfilePage from './ProfilePage';
import ProfileSection from './ProfileSection';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import AnimatedFarmingLogo from './AnimatedLogo';
import DashboardLeaderboard from './DashboardLeaderboard';
import { ProgressProvider } from './ProgressContext';
import { auth, googleProvider } from './firebase';
import Container from './Container';
import GameNavbar from './components/GameUI/GameNavbar';
import Hero from './Hero';
import Features from './Features';
import About from './About';
import Community from './Community';
import AuthForm from './AuthForm';
import GameFooter from './components/GameUI/GameFooter';

import SubstepVisuals from './components/GameUI/SubstepVisuals';
import AdventureMap from './components/GameUI/AdventureMap';
import Confetti from './components/GameUI/Confetti';
import { TASKS } from './TaskDetail'; // Only import TASKS once


// Main App component
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [showLogo, setShowLogo] = useState(() => !sessionStorage.getItem('splashShown'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => {
        setShowLogo(false);
        sessionStorage.setItem('splashShown', 'true');
        if (!isAuthenticated) {
          navigate('/auth', { replace: true });
        } else {
          navigate('/main', { replace: true });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showLogo, isAuthenticated, navigate]);

  return (
    <ProgressProvider>
      <AnimatePresence mode="wait">
        {showLogo ? (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <AnimatedFarmingLogo size={180} />
            <h1 className="mt-6 text-4xl font-extrabold text-green-700 tracking-wide drop-shadow-lg">PixelFarmers</h1>
          </div>
        ) : (
          <Container>
            <GameNavbar onProfile={() => navigate('/profile')} onShop={() => {}} onQuests={() => {}} />
            {location.pathname !== '/auth' && <Hero />}
            <Routes>
              <Route path="/" element={<Features />} />
              <Route path="/features" element={<Features />} />
              <Route path="/play" element={<PlayPage />} />
              <Route path="/task/:id" element={<TaskDetail />} />
              <Route path="/task/:id/step/:stepIdx/substep/:subIdx" element={<SubstepDetail />} />
              <Route path="/dashboard-leaderboard" element={<DashboardLeaderboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* ...other routes or components if needed... */}
            </Routes>
          </Container>
        )}
      </AnimatePresence>
    </ProgressProvider>
  );
}


// Import substep descriptions from TaskDetail.js
const SUBSTEP_DESCRIPTIONS = {
  'Collect samples': `Collecting soil samples is the first and most crucial step in soil testing. Take samples from multiple locations in the field for accurate results. Proper sampling helps determine nutrient needs and improve crop yield.`,
  'Test pH': 'Use a soil pH kit to determine the acidity or alkalinity of the soil, which affects nutrient availability.',
  'Assess nutrients': 'Analyze the soil for essential nutrients like nitrogen, phosphorus, and potassium.',
  'Record moisture': 'Measure and record the moisture content to plan irrigation and crop selection.',
  'Remove weeds': 'Clear weeds to prevent competition for nutrients and water.',
  'Pick stones': 'Remove stones and debris to prepare a smooth seedbed.',
  'Dispose debris': 'Safely dispose of organic and inorganic debris to maintain field hygiene.',
  'Check water source': 'Inspect the water source for quality and availability before irrigation.',
  'Irrigate lightly': 'Apply a small amount of water to settle the soil before sowing.',
  'Choose plow': 'Select the appropriate plow based on soil type and crop requirements.',
  'Set depth': 'Adjust the plow to the correct depth for effective tillage.',
  'Plow field': 'Turn and aerate the soil to improve structure and root penetration.',
  'Break clods': 'Use harrows to break up large soil clods for a finer seedbed.',
  // ...add more as needed...
};

// Map substep names to public YouTube animated videos or open resources
const SUBSTEP_VIDEO_MAP = {
  'Collect samples': 'https://www.youtube.com/embed/1oC6g1n2y6g', // Example: Soil Sampling Animation
  'Test pH': 'https://www.youtube.com/embed/0vZkzLQ2hag', // Example: Soil pH Testing Animation
  'Assess nutrients': 'https://www.youtube.com/embed/0vZkzLQ2hag', // Example: Soil Nutrient Testing Animation
  'Record moisture': 'https://www.youtube.com/embed/2vZkzLQ2hag', // Example: Soil Moisture Animation (replace with real)
  'Remove weeds': 'https://www.youtube.com/embed/2QhU3rC1b8w', // Example: Weeding Animation
  'Pick stones': 'https://www.youtube.com/embed/3vZkzLQ2hag', // Example: Stone Picking Animation (replace with real)
  'Dispose debris': 'https://www.youtube.com/embed/4vZkzLQ2hag', // Example: Debris Disposal Animation (replace with real)
  'Check water source': 'https://www.youtube.com/embed/5vZkzLQ2hag', // Example: Water Source Checking Animation (replace with real)
  'Irrigate lightly': 'https://www.youtube.com/embed/6vZkzLQ2hag', // Example: Light Irrigation Animation (replace with real)
  'Choose plow': 'https://www.youtube.com/embed/7vZkzLQ2hag', // Example: Plow Selection Animation (replace with real)
  'Set depth': 'https://www.youtube.com/embed/8vZkzLQ2hag', // Example: Plow Depth Animation (replace with real)
  'Plow field': 'https://www.youtube.com/embed/9vZkzLQ2hag', // Example: Plowing Animation (replace with real)
  'Break clods': 'https://www.youtube.com/embed/10vZkzLQ2hag', // Example: Clod Breaking Animation (replace with real)
  // ...add more as needed...
};


// --- PlayPage Component ---

function PlayPage() {
  const [current, setCurrent] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState(0);
  const tasks = TASKS;
  const navigate = useNavigate();

  const handleLandmarkClick = (idx) => {
    setPopupStep(0);
    setCurrent(idx);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);
  const handleNextStep = () => setPopupStep((s) => Math.min(s + 1, tasks[current].steps.length - 1));
  const handlePrevStep = () => setPopupStep((s) => Math.max(s - 1, 0));

  // For popup confetti and badge
  const [showPopupConfetti, setShowPopupConfetti] = useState(false);
  React.useEffect(() => {
    if (showPopup) {
      setShowPopupConfetti(true);
      const t = setTimeout(() => setShowPopupConfetti(false), 1800);
      return () => clearTimeout(t);
    }
  }, [showPopup]);

  // Progress bar for steps
  const stepProgress = ((popupStep + 1) / tasks[current].steps.length) * 100;
  // Check if all substeps in this step are completed (for celebratory animation)
  // (Assume you have a progress context or can add logic here)

  return (
    <section id="play-section" className="min-h-[60vh] flex flex-col items-center justify-center py-10 relative overflow-hidden">
      {/* Animated immersive background for popup */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute inset-0 w-full h-full animate-gradientMove" style={{ minHeight: 600 }}>
          <defs>
            <radialGradient id="bg1" cx="60%" cy="40%" r="100%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="60%" stopColor="#bbf7d0" />
              <stop offset="100%" stopColor="#dbeafe" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg1)" />
          {/* Animated clouds */}
          <g className="animate-clouds">
            <ellipse cx="20%" cy="18%" rx="60" ry="18" fill="#fff" opacity="0.5" />
            <ellipse cx="80%" cy="25%" rx="50" ry="15" fill="#fff" opacity="0.4" />
            <ellipse cx="30%" cy="80%" rx="40" ry="12" fill="#fff" opacity="0.3" />
          </g>
          {/* Sun rays */}
          <g className="animate-sunRays">
            <circle cx="50%" cy="10%" r="30" fill="#fde047" opacity="0.3" />
            {[...Array(12)].map((_, i) => (
              <rect key={i} x="50%" y="10%" width="4" height="40" fill="#fde047" opacity="0.15" transform={`rotate(${i * 30} 50 10)`} />
            ))}
          </g>
        </svg>
      </div>
      <h2 className="text-4xl font-extrabold text-green-800 mb-4 drop-shadow text-center relative z-10">Farm Adventure Quest</h2>
      <AdventureMap tasks={tasks} current={current} onLocationClick={handleLandmarkClick} />
      {showPopup && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        >
          {showPopupConfetti && (
            <div className="absolute inset-0 z-50 pointer-events-none">
              <Confetti trigger={showPopupConfetti} />
            </div>
          )}
          {/* Adventure book style popup */}
          <div className="relative flex w-full max-w-3xl md:max-w-4xl min-h-[60vh] max-h-[90vh] rounded-3xl shadow-2xl border-8 border-yellow-700 bg-gradient-to-br from-yellow-100 via-amber-50 to-green-50 overflow-hidden animate-bookOpen"
            style={{ width: '95vw', maxWidth: '900px', minHeight: '60vh', maxHeight: '90vh' }}>
            {/* Quest path sidebar */}
            <div className="w-32 md:w-40 bg-gradient-to-b from-yellow-200 via-yellow-100 to-green-100 border-r-4 border-yellow-400 flex flex-col items-center py-6 md:py-8 relative z-10 overflow-y-auto max-h-full">
              <div className="mb-6 text-3xl font-extrabold text-yellow-800 drop-shadow flex flex-col items-center">
                <span className="text-5xl mb-2">{tasks[current].icon || '🌱'}</span>
                <span className="text-lg text-yellow-900">Quest Path</span>
              </div>
              <ol className="flex flex-col gap-4 w-full items-center">
                {tasks[current].steps.map((step, idx) => (
                  <li key={idx} className={`w-28 px-2 py-2 rounded-xl text-center font-bold text-base border-2 ${idx === popupStep ? 'bg-yellow-300 border-yellow-600 text-yellow-900 scale-105 shadow-lg' : 'bg-yellow-50 border-yellow-200 text-yellow-700'} transition-all duration-200 mb-2 cursor-pointer hover:bg-yellow-200`} onClick={() => setPopupStep(idx)}>
                    <span className="block">Step {idx + 1}</span>
                    <span className="text-xs font-normal">{step.step}</span>
                  </li>
                ))}
              </ol>
              <div className="absolute bottom-4 left-0 w-full flex flex-col items-center">
                <span className="text-xs text-yellow-700">Total Steps</span>
                <span className="text-lg font-bold text-yellow-900">{tasks[current].steps.length}</span>
              </div>
            </div>
            {/* Main quest content */}
            <div className="flex-1 flex flex-col items-center justify-between py-4 md:py-8 px-2 md:px-6 relative overflow-y-auto max-h-full w-full">
              <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 z-20" onClick={closePopup} title="Close">&times;</button>
              <div className="flex flex-col items-center gap-2 mb-2">
                <div className="font-extrabold text-3xl text-green-800 drop-shadow mb-1 text-center">{tasks[current].title}</div>
                <div className="text-yellow-800 mb-2 text-base text-center italic max-w-xl">{tasks[current].description}</div>
                <div className="font-bold text-lg text-yellow-900 mb-2 flex items-center gap-2 bg-yellow-100 rounded-full px-5 py-2 shadow border-2 border-yellow-300 animate-glow">
                  <span className="text-2xl">🏅</span> <span className="tracking-wide">Quest Step</span>: {tasks[current].steps[popupStep].step}
                </div>
              </div>
              {/* Substeps as creative cards */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-2 mb-2 w-full overflow-y-auto max-h-[45vh]">
                {tasks[current].steps[popupStep].substeps.map((sub, subidx) => (
                  <div
                    key={subidx}
                    className="group flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border-4 border-green-200 bg-gradient-to-br from-yellow-50 via-green-50 to-amber-100 shadow-xl hover:scale-105 hover:border-green-400 hover:bg-green-100 transition-all duration-200 cursor-pointer relative min-w-[160px] max-w-[200px] animate-flipIn"
                    onClick={() => {
                      navigate(`/task/${tasks[current].id}/step/${popupStep}/substep/${subidx}`, { state: { activeStepIdx: popupStep } });
                      setShowPopup(false);
                    }}
                  >
                    <span className="mb-1 scale-110 group-hover:scale-125 transition-transform duration-200"><SubstepVisuals substep={sub} /></span>
                    <span className="text-green-900 font-semibold text-base text-center drop-shadow group-hover:text-green-700">{sub}</span>
                    {/* Decorative vine or sparkle */}
                    <span className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 2 Q18 10 30 16 Q18 22 16 30 Q14 22 2 16 Q14 10 16 2Z" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
              {/* Step navigation */}
              <div className="flex gap-4 mt-4 items-center">
                <button className="text-2xl px-3 py-1 rounded-full bg-yellow-200 hover:bg-yellow-400 shadow transition-all duration-200" onClick={handlePrevStep} disabled={popupStep === 0}>{'<'}</button>
                <span className="text-yellow-900 font-bold">Step {popupStep + 1} / {tasks[current].steps.length}</span>
                <button className="text-2xl px-3 py-1 rounded-full bg-yellow-200 hover:bg-yellow-400 shadow transition-all duration-200" onClick={handleNextStep} disabled={popupStep === tasks[current].steps.length - 1}>{'>'}</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default App;

