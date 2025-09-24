import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const coreFeatures = [
  { icon: '🤝', title: 'Peer Sharing & Leaderboards', desc: 'Compete and collaborate with friends and farmers.' },
  { icon: '🎮', title: 'Gamified Quests', desc: 'Complete fun quests and unlock new levels.' },
  { icon: '🌱', title: 'Sustainable Farming', desc: 'Learn eco-friendly techniques as you play.' },
  { icon: '🏆', title: 'Badges & Rewards', desc: 'Earn badges and celebrate your achievements.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'See your growth and farming journey.' },
  { icon: '🛒', title: 'Farm Shop', desc: 'Buy virtual items and power-ups for your farm.' },
];
export default function Features() {
  const navigate = useNavigate();
  return (
    <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-extrabold text-green-800 mb-8 text-center drop-shadow">Core Features</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {coreFeatures.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.07, rotate: [0, 2, -2, 0] }}
            className="p-8 bg-gradient-to-br from-yellow-50 via-green-100 to-green-200 rounded-3xl shadow-2xl border-4 border-green-200 flex flex-col items-center gap-2 hover:shadow-yellow-200 transition-all duration-200"
          >
            <div className="text-5xl mb-2 animate-bounce">{c.icon}</div>
            <div className="font-extrabold text-xl text-green-900 mb-1">{c.title}</div>
            <p className="text-base text-green-700 text-center">{c.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link to="/play" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow-soft hover:shadow-md transition text-lg font-semibold">
          Start Your Farming Quest <span className="ml-2">→</span>
        </Link>
      </div>
      <button
        className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-gradient-to-r from-green-400 to-yellow-300 text-white rounded-2xl font-extrabold text-2xl shadow-xl hover:scale-105 hover:from-green-500 hover:to-yellow-400 transition-all duration-200 border-2 border-green-600 animate-glow z-50"
        onClick={() => navigate('/play')}
      >
        🌱 Start Your Farming Quest
      </button>
      {/* Community Section */}
      <div className="mt-20 bg-white/80 rounded-2xl shadow-2xl border-4 border-green-200 p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-green-800 mb-4 text-center drop-shadow">Community</h2>
        <p className="text-lg text-green-700 text-center mb-4">Connect, share, and grow with fellow farmers! Ask questions, share tips, and celebrate your progress together.</p>
        <a href="/community" className="inline-block bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-green-700 transition">Go to Community</a>
      </div>

      {/* About Section */}
      <div className="mt-12 bg-white/80 rounded-2xl shadow-2xl border-4 border-yellow-200 p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-yellow-700 mb-4 text-center drop-shadow">About PixelFarmers</h2>
        <p className="text-lg text-yellow-800 text-center mb-4">PixelFarmers is a gamified platform to make learning sustainable farming fun and interactive. Complete quests, earn badges, and join a vibrant community of learners!</p>
      </div>
    </section>
  );
}

