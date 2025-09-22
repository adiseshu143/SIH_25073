import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';

function DashboardLeaderboard() {
  const location = useLocation();
  useEffect(() => {
    const el = document.getElementById('dashboard-leaderboard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.pathname]);
  return (
    <section id="dashboard-leaderboard-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Dashboard />
      <Leaderboard />
    </section>
  );
}

export default DashboardLeaderboard;
