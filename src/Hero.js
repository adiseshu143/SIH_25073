import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import TractorAnimation from './TractorAnimation';


const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleStartJourney = (e) => {
    e.preventDefault();
    navigate('/play');
    setTimeout(() => {
      const playSection = document.getElementById('play-section');
      if (playSection) playSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  // Hide the button on /play, /task/*, /dashboard-leaderboard, /profile, /features, /about, /community
  const hideButton =
    location.pathname.startsWith('/play') ||
    location.pathname.startsWith('/task') ||
    location.pathname.startsWith('/dashboard-leaderboard') ||
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/features') ||
    location.pathname.startsWith('/about') ||
    location.pathname.startsWith('/community');
  return (
    <section className="relative overflow-hidden min-h-[60vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-green-100 via-cream to-cream" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
            Farming Made Fun: <span className="text-primary">Grow Sustainably</span>, Earn Rewards
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Learn by playing, complete personalized quests, track your impact, and shine on leaderboards.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <img
            src="/tractor1.png"
            alt="Tractor"
            className="w-full max-w-xs mx-auto rounded-2xl"
          />
        </motion.div>
      </div>
      {!hideButton && (
        <button
          className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-gradient-to-r from-green-400 to-yellow-300 text-white rounded-2xl font-extrabold text-2xl shadow-xl hover:scale-105 hover:from-green-500 hover:to-yellow-400 transition-all duration-200 border-2 border-green-600 animate-glow z-50"
          onClick={() => navigate('/play')}
        >
          🌱 Start Your Farming Quest
        </button>
      )}
    </section>
  );
};

export default Hero;
