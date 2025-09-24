import React from 'react';

export default function QuestPath({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-between my-8 relative">
      {steps.map((step, idx) => (
        <div key={step} className="flex flex-col items-center z-10">
          <button
            className={`w-16 h-16 rounded-full border-4 font-bold text-lg shadow-lg transition-all duration-300 ${idx < currentStep ? 'bg-green-400 border-green-700 text-white' : idx === currentStep ? 'bg-yellow-300 border-yellow-600 text-yellow-900 animate-bounce' : 'bg-gray-200 border-gray-400 text-gray-500'}`}
            onClick={() => onStepClick(idx)}
            disabled={idx > currentStep}
          >
            {idx < currentStep ? '✔️' : idx === currentStep ? '⭐' : idx + 1}
          </button>
          <div className="mt-2 text-xs font-semibold text-center max-w-[4rem]">{step}</div>
        </div>
      ))}
      {/* Path line */}
      <div className="absolute top-1/2 left-8 right-8 h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-gray-200 -z-0 rounded-full" style={{ zIndex: 0 }} />
    </div>
  );
}
