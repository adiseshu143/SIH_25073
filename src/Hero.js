import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TractorAnimation from './TractorAnimation';


const Hero = () => {
  const navigate = useNavigate();
  const handleStartJourney = (e) => {
    e.preventDefault();
    navigate('/play');
    setTimeout(() => {
      const playSection = document.getElementById('play-section');
      if (playSection) playSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  return (
    <section className="relative overflow-hidden">
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
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/play"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg shadow-soft hover:shadow-md transition"
              onClick={handleStartJourney}
            >
              Start Your Journey
            </a>
            <a href="/features" className="inline-flex items-center gap-2 bg-white text-gray-800 px-5 py-3 rounded-lg border hover:border-primary hover:text-primary transition">
              Learn More
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <TractorAnimation />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
