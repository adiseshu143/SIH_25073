import React from 'react';

export default function StreakCounter({ streak }) {
  return (
    <div className="flex items-center gap-2 bg-yellow-100 border-2 border-yellow-300 rounded-full px-4 py-2 shadow font-bold text-yellow-800 text-lg mt-4 mx-auto w-fit animate-bounce">
      <span role="img" aria-label="fire">🔥</span>
      {streak} day streak!
    </div>
  );
}
