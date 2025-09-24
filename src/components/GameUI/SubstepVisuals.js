// SubstepVisuals.js
// Maps substep names to attractive SVG/animated visuals for the PlayPage substep modal
import React from 'react';

export default function SubstepVisuals({ substep }) {
  // Add more visuals as needed for your substeps
  switch (substep) {
    case 'Collect samples':
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <ellipse cx="60" cy="70" rx="50" ry="8" fill="#d1fae5" />
          <rect x="50" y="20" width="20" height="40" rx="8" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
          <circle cx="60" cy="40" r="8" fill="#34d399" stroke="#166534" strokeWidth="2" />
          <rect x="56" y="28" width="8" height="12" rx="3" fill="#fef9c3" />
          <text x="60" y="78" textAnchor="middle" fontSize="12" fill="#166534">Soil Sample</text>
        </svg>
      );
    case 'Test pH':
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <ellipse cx="60" cy="70" rx="50" ry="8" fill="#dbeafe" />
          <rect x="52" y="30" width="16" height="30" rx="6" fill="#f87171" stroke="#991b1b" strokeWidth="2" />
          <rect x="58" y="20" width="4" height="10" rx="2" fill="#fef9c3" />
          <text x="60" y="78" textAnchor="middle" fontSize="12" fill="#991b1b">pH Test</text>
        </svg>
      );
    case 'Remove weeds':
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <ellipse cx="60" cy="70" rx="50" ry="8" fill="#bbf7d0" />
          <rect x="54" y="30" width="12" height="30" rx="6" fill="#a3e635" stroke="#166534" strokeWidth="2" />
          <path d="M60 30 Q65 20 70 30" stroke="#166534" strokeWidth="2" fill="none" />
          <path d="M60 30 Q55 20 50 30" stroke="#166534" strokeWidth="2" fill="none" />
          <text x="60" y="78" textAnchor="middle" fontSize="12" fill="#166534">Weed</text>
        </svg>
      );
    case 'Plow field':
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <ellipse cx="60" cy="70" rx="50" ry="8" fill="#fde68a" />
          <rect x="40" y="50" width="40" height="10" rx="5" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
          <rect x="55" y="30" width="10" height="20" rx="4" fill="#f59e42" stroke="#92400e" strokeWidth="2" />
          <text x="60" y="78" textAnchor="middle" fontSize="12" fill="#92400e">Plowing</text>
        </svg>
      );
    // Add more cases for other substeps...
    default:
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <ellipse cx="60" cy="70" rx="50" ry="8" fill="#e0e7ff" />
          <rect x="50" y="30" width="20" height="30" rx="8" fill="#f3f4f6" stroke="#a1a1aa" strokeWidth="2" />
          <text x="60" y="78" textAnchor="middle" fontSize="12" fill="#6d28d9">Substep</text>
        </svg>
      );
  }
}
