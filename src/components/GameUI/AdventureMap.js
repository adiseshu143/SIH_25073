import React from 'react';

// SVG Farm Adventure Map with winding path and locations
export default function AdventureMap({ tasks, current, onLocationClick }) {
  // Example coordinates for 9 locations (could be improved for real SVG art)
  const points = [
    { x: 60, y: 320 },
    { x: 160, y: 260 },
    { x: 260, y: 200 },
    { x: 360, y: 180 },
    { x: 460, y: 220 },
    { x: 560, y: 280 },
    { x: 660, y: 240 },
    { x: 760, y: 180 },
    { x: 860, y: 120 },
  ];
  return (
    <div className="w-full flex justify-center my-8">
      <svg viewBox="0 0 950 400" className="w-full max-w-4xl h-80 rounded-3xl shadow-xl bg-gradient-to-b from-blue-100 to-green-100 relative overflow-visible">
        {/* Sun */}
        <circle cx="120" cy="70" r="38" fill="#fde047" stroke="#fbbf24" strokeWidth="6" className="animate-spin-slow" />
        {/* Animated clouds */}
        <g className="animate-cloud1">
          <ellipse cx="300" cy="60" rx="40" ry="18" fill="#fff" opacity="0.8" />
          <ellipse cx="340" cy="65" rx="22" ry="12" fill="#fff" opacity="0.7" />
        </g>
        <g className="animate-cloud2">
          <ellipse cx="700" cy="90" rx="36" ry="16" fill="#fff" opacity="0.8" />
          <ellipse cx="740" cy="95" rx="18" ry="10" fill="#fff" opacity="0.7" />
        </g>
        {/* Birds */}
        <g className="animate-bird1">
          <path d="M180 120 Q185 115 190 120" stroke="#444" strokeWidth="2" fill="none" />
          <path d="M190 120 Q195 125 200 120" stroke="#444" strokeWidth="2" fill="none" />
        </g>
        <g className="animate-bird2">
          <path d="M800 60 Q805 55 810 60" stroke="#444" strokeWidth="2" fill="none" />
          <path d="M810 60 Q815 65 820 60" stroke="#444" strokeWidth="2" fill="none" />
        </g>
        {/* Decorative farm fields */}
        <ellipse cx="480" cy="390" rx="420" ry="40" fill="#bbf7d0" opacity="0.5" />
        <ellipse cx="480" cy="370" rx="320" ry="22" fill="#a7f3d0" opacity="0.4" />
        {/* Winding path */}
        <polyline
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#a3e635"
          strokeWidth="12"
          strokeLinejoin="round"
          className="animate-pathGlow"
        />
        {/* Progress highlight */}
        <polyline
          points={points.slice(0, current + 1).map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#facc15"
          strokeWidth="14"
          strokeLinejoin="round"
          className="animate-pathProgress"
        />
        {/* Locations */}
        {tasks.map((task, idx) => (
          <g key={task.title} onClick={() => onLocationClick(idx)} style={{ cursor: 'pointer' }}>
            <circle
              cx={points[idx].x}
              cy={points[idx].y}
              r={idx === current ? 36 : 26}
              fill={idx < current ? 'url(#completedGrad)' : idx === current ? 'url(#currentGrad)' : '#fff'}
              stroke={idx === current ? '#f59e42' : idx < current ? '#22c55e' : '#a3e635'}
              strokeWidth={idx === current ? 7 : idx < current ? 5 : 4}
              className={idx === current ? 'animate-glow' : idx < current ? 'animate-pulse' : ''}
              filter={idx === current ? 'url(#glow)' : ''}
            />
            <text
              x={points[idx].x}
              y={points[idx].y + 10}
              textAnchor="middle"
              fontSize={idx === current ? 36 : 26}
              fontWeight="bold"
              fill={idx < current ? '#16a34a' : '#166534'}
              style={{ filter: idx === current ? 'drop-shadow(0 0 6px #fde047)' : undefined }}
            >
              {task.icon || '🌱'}
            </text>
            {/* Celebration sparkles */}
            {idx < current && (
              <text x={points[idx].x + 24} y={points[idx].y - 24} fontSize="22" fill="#facc15" className="animate-sparkle">✨</text>
            )}
            {/* Animated ring for current */}
            {idx === current && (
              <circle
                cx={points[idx].x}
                cy={points[idx].y}
                r={42}
                fill="none"
                stroke="#fde047"
                strokeWidth={4}
                className="animate-currentRing"
                opacity={0.7}
              />
            )}
          </g>
        ))}
        {/* Avatar/Tractor with animation */}
        <g className="animate-avatarFloat">
          {/* Tractor body */}
          <rect
            x={points[current].x - 22}
            y={points[current].y - 62}
            width="44"
            height="22"
            fill="#facc15"
            stroke="#444"
            strokeWidth="2"
            rx="6"
            filter="url(#shadow)"
          />
          {/* Tractor wheels */}
          <circle cx={points[current].x - 12} cy={points[current].y - 40} r="8" fill="#444" stroke="#222" strokeWidth="2" />
          <circle cx={points[current].x + 12} cy={points[current].y - 40} r="8" fill="#444" stroke="#222" strokeWidth="2" />
          {/* Tractor window */}
          <rect x={points[current].x - 10} y={points[current].y - 60} width="20" height="10" fill="#fffde4" stroke="#aaa" strokeWidth="1" rx="2" />
          {/* Fun face */}
          <circle cx={points[current].x} cy={points[current].y - 51} r="3" fill="#fff" />
          <ellipse cx={points[current].x - 1.2} cy={points[current].y - 51.5} rx="0.7" ry="1" fill="#222" />
          <ellipse cx={points[current].x + 1.2} cy={points[current].y - 51.5} rx="0.7" ry="1" fill="#222" />
          <path d={`M${points[current].x - 1},${points[current].y - 48} Q${points[current].x},${points[current].y - 47} ${points[current].x + 1},${points[current].y - 48}`} stroke="#222" strokeWidth="0.7" fill="none" />
        </g>
        {/* SVG defs for gradients, glow, shadow */}
        <defs>
          <radialGradient id="completedGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="100%" stopColor="#22c55e" />
          </radialGradient>
          <radialGradient id="currentGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fbbf24" />
          </radialGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#888" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
