import React from 'react';

export default function AnimatedButton({ children, onClick, className = '' }) {
  return (
    <button
      className={`px-6 py-3 bg-gradient-to-r from-green-400 to-yellow-300 text-white font-extrabold rounded-full shadow-lg hover:scale-105 hover:from-yellow-300 hover:to-green-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 ${className}`}
      onClick={onClick}
    >
      <span className="drop-shadow-lg text-lg">{children}</span>
    </button>
  );
}
