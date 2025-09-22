import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const posts = [
  { id: 1, name: 'Aisha', text: 'Harvested 20% more after drip irrigation!', badge: 'Water Saver' },
  { id: 2, name: 'Liam', text: 'Started composting—soil health improved.', badge: 'Compost Champ' },
];

function Community() {
  const location = useLocation();
  useEffect(() => {
    const el = document.getElementById('community-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.pathname]);
  return (
    <section id="community-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold">Community</h2>
      <div className="mt-6 grid gap-4">
        {posts.map(p => (
          <div key={p.id} className="p-5 bg-white rounded-xl shadow-soft border flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-semibold text-primary">
              {p.name[0]}
            </div>
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-gray-700">{p.text}</div>
              <div className="mt-2 inline-block px-2 py-0.5 text-sm rounded-full bg-secondary/20 text-secondary">{p.badge}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Community;
