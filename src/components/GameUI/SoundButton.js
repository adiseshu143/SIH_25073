import React from 'react';

export default function SoundButton({ onClick, isOn }) {
  return (
    <button
      className={`fixed bottom-8 right-8 z-50 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-4 shadow-lg transition-all duration-200 ${isOn ? 'ring-4 ring-green-300' : ''}`}
      onClick={onClick}
      aria-label="Toggle sound"
    >
      {isOn ? '🔊' : '🔈'}
    </button>
  );
}
