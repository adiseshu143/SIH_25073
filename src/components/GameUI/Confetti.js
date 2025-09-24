import React, { useEffect, useRef } from 'react';

// Simple confetti animation using canvas
export default function Confetti({ trigger }) {
  const canvasRef = useRef();
  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = 300;
    const confetti = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 6 + 4,
      d: Math.random() * 80 + 20,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      tilt: Math.random() * 10 - 10
    }));
    let angle = 0;
    let animationFrame;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      angle += 0.01;
      confetti.forEach(c => {
        c.y += Math.cos(angle + c.d) + 1 + c.r / 2;
        c.x += Math.sin(angle);
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, [trigger]);
  return <canvas ref={canvasRef} className="w-full h-[300px] pointer-events-none absolute left-0 top-0 z-50" style={{ display: trigger ? 'block' : 'none' }} />;
}
