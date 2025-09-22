import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (
    <section ref={sectionRef} id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold">Core Features</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: '🎮', title: 'Learning Through Play' },
          { icon: '🌱', title: 'Personalized Quests' },
          { icon: '📊', title: 'Progress Tracker' },
          { icon: '🤝', title: 'Peer Sharing & Leaderboards' },
          { icon: '🏆', title: 'Rewards & Recognition' },
        ].map((c, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} className="p-6 bg-white rounded-xl shadow-soft border border-gray-100">
            <div className="text-3xl">{c.icon}</div>
            <div className="mt-3 font-semibold">{c.title}</div>
            <p className="text-sm text-gray-600 mt-1">Engaging, bite-sized experiences crafted for real-world impact.</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <a href="/play" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow-soft hover:shadow-md transition text-lg font-semibold">
          Start Your Journey
        </a>
      </div>
    </section>
  );
};

export default Features;
