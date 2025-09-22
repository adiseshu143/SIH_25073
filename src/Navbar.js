import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, onShowAuth, onLogout }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      <NavLink to="/" className="flex items-center gap-2 font-semibold text-primary">
        <FaLeaf className="text-primary" />
        <span>PixelFarmers</span>
      </NavLink>
      <div className="hidden md:flex items-center gap-6 text-sm">
        <button
          className="px-2 py-1 rounded-md transition-colors text-gray-700 hover:text-primary"
          onClick={() => {
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.location.href = '/';
            }
          }}
        >
          Home
        </button>
        <button
          className="px-2 py-1 rounded-md transition-colors text-gray-700 hover:text-primary"
          onClick={() => {
            if (window.location.pathname === '/') {
              const section = document.getElementById('features-section');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            } else {
              window.location.href = '/features';
            }
          }}
        >
          Features
        </button>
        <NavLink to="/dashboard-leaderboard" className={({ isActive }) => `px-2 py-1 rounded-md transition-colors ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>Leaderboard</NavLink>
        <NavLink to="/community" className={({ isActive }) => `px-2 py-1 rounded-md transition-colors ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>Community</NavLink>
        {!isAuthenticated && (
          <NavLink to="/about" className={({ isActive }) => `px-2 py-1 rounded-md transition-colors ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>About</NavLink>
        )}
        {isAuthenticated ? (
          <div className="relative group">
            <button type="button" aria-label="Profile" className="px-2 py-1 rounded-full text-sm text-gray-700 hover:text-primary transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary">👤</div>
            </button>
            <div className="absolute right-0 mt-2 hidden group-hover:block z-50">
              <div className="w-48 bg-white rounded-lg shadow-2xl border border-gray-100 p-2">
                <NavLink to="/profile" className="block text-sm px-2 py-1 rounded hover:bg-gray-50">Profile</NavLink>
                <NavLink to="/about" className="block text-sm px-2 py-1 rounded hover:bg-gray-50">About</NavLink>
                <button onClick={onLogout} className="w-full text-left text-sm px-2 py-1 rounded hover:bg-gray-50 text-red-700">Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={() => onShowAuth(true)} className="px-3 py-1 rounded-md text-sm text-gray-700 hover:text-primary transition-colors">Login</button>
            <button onClick={() => onShowAuth(false)} className="px-3 py-1 rounded-md text-sm bg-primary text-white hover:bg-green-600 transition-colors">Sign Up</button>
          </div>
        )}
      </div>
    </div>
  </nav>
);

export default Navbar;
