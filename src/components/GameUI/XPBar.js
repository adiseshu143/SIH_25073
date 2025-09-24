import React from 'react';

export default function XPBar({ xp, level }) {
  return (
    <div className="w-full max-w-md mx-auto flex items-center gap-4 my-4">
      <div className="flex flex-col items-center">
        <div className="text-xs text-gray-500">Level</div>
        <div className="text-2xl font-bold text-yellow-600 drop-shadow">{level}</div>
      </div>
      <div className="flex-1 h-6 bg-yellow-100 rounded-full overflow-hidden shadow-inner relative">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(xp, 100)}%` }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-yellow-900">
          {xp}% XP
        </span>
      </div>
    </div>
  );
}
