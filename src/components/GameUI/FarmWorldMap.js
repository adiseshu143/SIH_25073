import React from 'react';

// SVG Farm World Map with animated landmarks and avatar
export default function FarmWorldMap({ tasks, current, onLandmarkClick }) {
  // Example coordinates for 9 landmarks
  const points = [
    { x: 80, y: 320, label: 'Field', icon: '🌱' },
    { x: 200, y: 250, label: 'Barn', icon: '🏠' },
    { x: 320, y: 180, label: 'Windmill', icon: '🌬️' },
    { x: 440, y: 220, label: 'Pond', icon: '💧' },
    { x: 560, y: 300, label: 'Silo', icon: '🌾' },
    { x: 680, y: 240, label: 'Orchard', icon: '🍎' },
    { x: 800, y: 180, label: 'Greenhouse', icon: '🏡' },
    { x: 920, y: 120, label: 'Market', icon: '🛒' },
    { x: 1040, y: 80, label: 'Sunflower', icon: '🌻' },
  ];
  return (
    <div className="w-full flex justify-center my-8 relative">
      <svg viewBox="0 0 1150 400" className="w-full max-w-6xl h-[28rem] rounded-3xl shadow-2xl bg-gradient-to-b from-blue-100 to-green-100">
        {/* Animated background elements */}
        <ellipse cx="200" cy="60" rx="60" ry="20" fill="#fff" opacity="0.7" className="animate-cloudMove" />
        <ellipse cx="900" cy="50" rx="80" ry="25" fill="#fff" opacity="0.7" className="animate-cloudMove2" />
        <circle cx="100" cy="80" r="40" fill="#fde047" opacity="0.8" />
        {/* Glowing path for progress */}
        <polyline
          points={points.slice(0, current + 1).map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#facc15"
          strokeWidth="16"
          strokeLinejoin="round"
          className="animate-pathProgress"
        />
        {/* Landmarks */}
        {tasks.map((task, idx) => (
          <g key={task.title} onClick={() => onLandmarkClick(idx)} style={{ cursor: 'pointer' }}>
            <circle
              cx={points[idx].x}
              cy={points[idx].y}
              r={idx === current ? 38 : 28}
              fill={idx < current ? '#bbf7d0' : idx === current ? '#fef9c3' : '#fff'}
              stroke={idx === current ? '#f59e42' : '#a3e635'}
              strokeWidth={idx === current ? 7 : 4}
              className={idx === current ? 'animate-glow' : ''}
            />
            <text
              x={points[idx].x}
              y={points[idx].y + 10}
              textAnchor="middle"
              fontSize={idx === current ? 38 : 28}
              fontWeight="bold"
              fill="#166534"
            >
              {points[idx].icon}
            </text>
            <text
              x={points[idx].x}
              y={points[idx].y + 48}
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fill="#166534"
              className="drop-shadow"
            >
              {points[idx].label}
            </text>
            {/* Celebration sparkles */}
            {idx < current && (
              <text x={points[idx].x + 24} y={points[idx].y - 24} fontSize="22" fill="#facc15">✨</text>
            )}
          </g>
        ))}
        {/* Avatar/Tractor */}
        <g>
          <circle
            cx={points[current].x}
            cy={points[current].y - 44}
            r="20"
            fill="#444"
            className="animate-avatarFloat"
          />
          <rect
            x={points[current].x - 22}
            y={points[current].y - 64}
            width="44"
            height="22"
            fill="#facc15"
            stroke="#444"
            strokeWidth="2"
            rx="6"
            className="animate-avatarFloat"
          />
        </g>
      </svg>
    </div>
  );
}
