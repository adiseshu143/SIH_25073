import React from 'react';

export default function DailyQuest({ quest, onComplete }) {
  if (!quest) return null;
  return (
    <div className="max-w-md mx-auto bg-green-50 border-2 border-green-300 rounded-2xl shadow-lg p-6 mt-8 flex flex-col items-center animate-pulse">
      <div className="text-xl font-bold text-green-800 mb-2">🌟 Daily Quest</div>
      <div className="text-lg text-green-700 mb-4">{quest}</div>
      <button className="px-6 py-2 bg-green-500 text-white rounded-full font-bold shadow hover:bg-green-700 transition" onClick={onComplete}>Mark as Done</button>
    </div>
  );
}
