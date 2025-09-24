import React from 'react';

const items = [
  { name: 'Golden Tractor', price: 100, emoji: '🚜' },
  { name: 'Magic Seeds', price: 50, emoji: '🌱' },
  { name: 'Rainbow Cow', price: 200, emoji: '🐮' },
  { name: 'Lucky Hat', price: 30, emoji: '👒' },
];

export default function FarmShop({ onBuy }) {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-8 border-4 border-yellow-200">
      <h2 className="text-2xl font-extrabold text-yellow-700 mb-4 text-center">Farm Shop</h2>
      <div className="grid grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.name} className="flex flex-col items-center bg-yellow-50 rounded-xl p-4 shadow hover:scale-105 transition cursor-pointer" onClick={() => onBuy(item)}>
            <div className="text-4xl mb-2">{item.emoji}</div>
            <div className="font-bold text-lg text-yellow-800">{item.name}</div>
            <div className="text-yellow-600 font-semibold mt-1">{item.price} XP</div>
            <button className="mt-2 px-4 py-1 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-600 transition">Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}
