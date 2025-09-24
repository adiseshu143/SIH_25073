
import React from 'react';
import AnimatedFarmingLogo from '../../AnimatedLogo';

export default function GameNavbar({ onProfile, onShop, onQuests }) {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-200 via-yellow-100 to-green-100 border-b border-green-300 shadow-lg flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
        <AnimatedFarmingLogo size={48} />
        <span className="text-2xl font-extrabold text-green-800 tracking-wider drop-shadow">PixelFarmers</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="/dashboard-leaderboard" className="text-lg font-bold text-green-700 hover:text-yellow-600 transition">Dashboard</a>
        <a href="/features" className="text-lg font-bold text-green-700 hover:text-yellow-600 transition">Features</a>
        <button className="text-lg font-bold text-green-700 hover:text-yellow-600 transition" onClick={onQuests}>Quests</button>
        <button className="text-lg font-bold text-green-700 hover:text-yellow-600 transition" onClick={onShop}>Shop</button>
        <button className="text-lg font-bold text-green-700 hover:text-yellow-600 transition" onClick={onProfile}>Profile</button>
      </div>
    </nav>
  );
}
