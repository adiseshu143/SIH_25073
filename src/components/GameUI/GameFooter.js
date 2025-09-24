import React from 'react';

export default function GameFooter() {
  return (
    <footer className="w-full bg-gradient-to-r from-green-100 via-yellow-50 to-green-200 text-center py-4 mt-12 border-t border-green-200 shadow-inner">
      <div className="text-sm text-green-800 font-semibold">© {new Date().getFullYear()} PixelFarmers. Grow, Play, Succeed!</div>
    </footer>
  );
}
