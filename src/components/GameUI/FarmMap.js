import React from 'react';

// Simple SVG farm map with clickable areas for tasks
export default function FarmMap({ onAreaClick }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto my-8">
      <svg viewBox="0 0 800 400" className="w-full h-auto rounded-2xl shadow-lg border-4 border-green-300 bg-gradient-to-b from-green-100 to-green-300">
        {/* Field */}
        <rect x="60" y="200" width="300" height="120" fill="#a3e635" stroke="#166534" strokeWidth="4" rx="20" onClick={() => onAreaClick('field')} />
        {/* Barn */}
        <rect x="400" y="120" width="120" height="100" fill="#fbbf24" stroke="#92400e" strokeWidth="4" rx="15" onClick={() => onAreaClick('barn')} />
        {/* Market */}
        <ellipse cx="650" cy="300" rx="70" ry="40" fill="#f87171" stroke="#991b1b" strokeWidth="4" onClick={() => onAreaClick('market')} />
        {/* Animated Tractor */}
        <g>
          <circle cx="180" cy="320" r="18" fill="#444" />
          <rect x="160" y="300" width="40" height="20" fill="#facc15" stroke="#444" strokeWidth="2" rx="5" />
        </g>
        {/* Clouds */}
        <ellipse cx="120" cy="60" rx="40" ry="18" fill="#fff" opacity="0.7" />
        <ellipse cx="700" cy="50" rx="50" ry="20" fill="#fff" opacity="0.7" />
        {/* Sun */}
        <circle cx="60" cy="60" r="30" fill="#fde047" />
      </svg>
      <div className="absolute left-20 top-[270px] text-lg font-bold text-green-900 animate-bounce">Field</div>
      <div className="absolute left-[430px] top-[170px] text-lg font-bold text-yellow-900 animate-pulse">Barn</div>
      <div className="absolute left-[670px] top-[320px] text-lg font-bold text-red-700 animate-bounce">Market</div>
    </div>
  );
}
