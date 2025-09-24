import React from 'react';

export default function BadgePopup({ badge, onClose }) {
  if (!badge) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-bounceIn">
        <div className="text-5xl mb-2">🏅</div>
        <div className="text-2xl font-bold text-green-700 mb-2">New Badge!</div>
        <div className="text-lg font-semibold text-yellow-700 mb-4">{badge}</div>
        <button className="px-6 py-2 bg-green-500 text-white rounded-full font-bold shadow hover:bg-green-700 transition" onClick={onClose}>Awesome!</button>
      </div>
    </div>
  );
}
