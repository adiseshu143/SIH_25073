import React, { useState, useEffect } from 'react';

const PlowingVisual = () => {
  const [pos, setPos] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setPos((p) => {
        const next = p + dir * 4;
        if (next >= 100) { setDir(-1); return 100; }
        if (next <= 0) { setDir(1); return 0; }
        return next;
      });
    }, 120);
    return () => clearInterval(id);
  }, [dir]);
  return (
    <div className="space-y-4">
      <div className="h-32 rounded-lg bg-gradient-to-b from-amber-200 to-amber-400 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-amber-600/60 transition-all" style={{ width: `${pos}%` }} />
        <div className="absolute top-2 left-2 text-2xl">🚜</div>
        <div className="absolute bottom-2 right-2 text-xs text-amber-900 font-semibold">Turning and aerating the soil...</div>
      </div>
      <p className="text-gray-700 text-sm">Primary tillage breaks up soil, improves aeration and prepares the field for planting.</p>
    </div>
  );
};

export default PlowingVisual;
