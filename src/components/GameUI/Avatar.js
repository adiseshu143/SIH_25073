import React from 'react';

export default function Avatar({ name, level, avatarUrl }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Farmer')}&background=8BC34A&color=fff&rounded=true&size=128`}
        alt="avatar"
        className="w-20 h-20 rounded-full border-4 border-green-400 shadow-lg bg-white"
      />
      <div className="font-bold text-green-800 text-lg">{name || 'Farmer'}</div>
      <div className="text-xs bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 font-bold">Level {level}</div>
    </div>
  );
}
