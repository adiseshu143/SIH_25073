
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TASKS } from './TaskDetail';
import { useProgress } from './ProgressContext';
import SubstepVisuals from './components/GameUI/SubstepVisuals';
import Confetti from './components/GameUI/Confetti';
import BadgePopup from './components/GameUI/BadgePopup';

// Substep descriptions and links (copy from TaskDetail.js)
const SUBSTEP_DESCRIPTIONS = {
  'Collect samples': `Collecting soil samples is the first and most crucial step in soil testing.\nTake samples from multiple locations in the field for accurate results.\nProper sampling helps determine nutrient needs and improve crop yield.`,
  'Test pH': 'Use a soil pH kit to determine the acidity or alkalinity of the soil, which affects nutrient availability.',
  'Assess nutrients': 'Analyze the soil for essential nutrients like nitrogen, phosphorus, and potassium.',
  'Record moisture': 'Measure and record the moisture content to plan irrigation and crop selection.',
  'Remove weeds': 'Clear weeds to prevent competition for nutrients and water.',
  'Pick stones': 'Remove stones and debris to prepare a smooth seedbed.',
  'Dispose debris': 'Safely dispose of organic and inorganic debris to maintain field hygiene.',
  'Check water source': 'Inspect the water source for quality and availability before irrigation.',
  'Irrigate lightly': 'Apply a small amount of water to settle the soil before sowing.',
  'Choose plow': 'Select the appropriate plow based on soil type and crop requirements.',
  'Set depth': 'Adjust the plow to the correct depth for effective tillage.',
  'Plow field': 'Turn and aerate the soil to improve structure and root penetration.',
  'Break clods': 'Use harrows to break up large soil clods for a finer seedbed.',
};
const SUBSTEP_LINKS = {
  'Collect samples': { website: 'https://www.agriculture.com/crops/soil-health/how-to-take-a-soil-sample' },
  'Test pH': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/testing-soil-ph.htm' },
  'Assess nutrients': { website: 'https://www.soilquality.org.au/factsheets/nutrients' },
  'Record moisture': { website: 'https://www.agric.wa.gov.au/soil-moisture-measurement' },
  'Remove weeds': { website: 'https://www.gardeningknowhow.com/plant-problems/weeds/how-to-control-weeds.htm' },
  'Pick stones': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/removing-rocks-from-soil.htm' },
  'Dispose debris': { website: 'https://www.agriculture.com/crops/soil-health/field-cleanup-tips' },
  'Check water source': { website: 'https://www.fao.org/3/t7202e/t7202e08.htm' },
  'Irrigate lightly': { website: 'https://www.gardeningknowhow.com/garden-how-to/watering/how-to-water-plants.htm' },
  'Choose plow': { website: 'https://www.agriculture.com/machinery/implements/choosing-the-right-plow' },
  'Set depth': { website: 'https://www.agriculture.com/machinery/implements/plow-depth-tips' },
  'Plow field': { website: 'https://www.agriculture.com/machinery/implements/plowing-tips' },
  'Break clods': { website: 'https://www.agriculture.com/crops/soil-health/harrowing-tips' },
};

// Map substep names to video filenames (add your own video files as needed)
const SUBSTEP_VIDEO_MAP = {
  'Collect samples': '/substeps/collect_samples.mp4',
  'Test pH': '/substeps/test_ph.mp4',
  'Assess nutrients': '/substeps/assess_nutrients.mp4',
  'Record moisture': '/substeps/record_moisture.mp4',
  'Remove weeds': '/substeps/remove_weeds.mp4',
  'Pick stones': '/substeps/pick_stones.mp4',
  'Dispose debris': '/substeps/dispose_debris.mp4',
  'Check water source': '/substeps/check_water_source.mp4',
  'Irrigate lightly': '/substeps/irrigate_lightly.mp4',
  'Choose plow': '/substeps/choose_plow.mp4',
  'Set depth': '/substeps/set_depth.mp4',
  'Plow field': '/substeps/plow_field.mp4',
  'Break clods': '/substeps/break_clods.mp4',
};


export default function SubstepDetail() {
  const { id, stepIdx, subIdx } = useParams();
  const navigate = useNavigate();
  const { progress, markSubstepComplete } = useProgress();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const task = TASKS.find(t => t.id === Number(id));
  const totalSteps = task?.steps.length;
  const totalSubsteps = task?.steps.map(s => s.substeps.length);
  if (!task) return <div>Task not found</div>;
  const step = task.steps[stepIdx];
  if (!step) return <div>Step not found</div>;
  const substep = step.substeps[subIdx];
  if (!substep) return <div>Substep not found</div>;
  const isSubCompleted = progress?.[task.id]?.substeps?.[stepIdx]?.[subIdx] || false;

  // Floating farm icons for background
  const floatingIcons = [
    { icon: '🌾', style: { left: '8%', top: '18%', animationDelay: '0s' } },
    { icon: '🚜', style: { left: '85%', top: '25%', animationDelay: '1s' } },
    { icon: '🌻', style: { left: '18%', top: '80%', animationDelay: '2s' } },
    { icon: '🥕', style: { left: '75%', top: '75%', animationDelay: '3s' } },
    { icon: '🪴', style: { left: '50%', top: '10%', animationDelay: '1.5s' } },
  ];

  // Handle completion celebration
  const handleComplete = () => {
    markSubstepComplete(task.id, Number(stepIdx), Number(subIdx), totalSteps, totalSubsteps);
    setShowConfetti(true);
    setShowBadge(true);
    setTimeout(() => setShowConfetti(false), 2500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fef9c3 60%, #dbeafe 100%)' }}>
      {/* Floating farm icons */}
      {floatingIcons.map((f, i) => (
        <span key={i} className="fixed text-5xl pointer-events-none animate-floatIcon" style={{ ...f.style, position: 'fixed', zIndex: 1 }}>{f.icon}</span>
      ))}
      {/* Confetti celebration */}
      <Confetti trigger={showConfetti || isSubCompleted} />
      {/* Badge popup */}
      {showBadge && (
        <BadgePopup badge={"Substep Complete!"} onClose={() => setShowBadge(false)} />
      )}
      {/* Main creative card */}
      <div style={{ position: 'relative', zIndex: 10 }} className="max-w-xl w-full bg-white/90 rounded-3xl shadow-2xl border-4 border-yellow-200 flex flex-col items-center justify-center px-8 py-10 animate-bounceIn">
        <button onClick={() => navigate(-1)} className="mb-4 text-primary hover:underline font-semibold flex items-center gap-1">
          <span className="text-xl">←</span> Back
        </button>
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="animate-floatIcon mb-2"><SubstepVisuals substep={substep} /></div>
          <h2 className="text-3xl font-extrabold text-green-800 drop-shadow mb-1 text-center">{substep}</h2>
        </div>
        {/* Animated video for substep */}
        {SUBSTEP_VIDEO_MAP[substep] ? (
          <div className="w-full flex items-center justify-center mb-4">
            <div className="rounded-2xl border-4 border-yellow-300 shadow-lg overflow-hidden bg-gradient-to-br from-yellow-50 to-green-50 animate-glow" style={{ width: '100%', maxWidth: 420 }}>
              <video
                controls
                autoPlay
                loop
                className="w-full h-56 object-cover rounded-xl"
                src={SUBSTEP_VIDEO_MAP[substep]}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ) : (
          <div className="w-full h-56 flex items-center justify-center bg-gray-100 rounded-xl mb-4 text-gray-400 font-bold text-lg">No video available</div>
        )}
        {/* Description */}
        <div className="mb-4 w-full text-center">
          <span className="font-semibold text-yellow-900">Description:</span>
          <div className="mt-1 whitespace-pre-line text-green-900 text-lg font-medium">{SUBSTEP_DESCRIPTIONS[substep] || 'No description available.'}</div>
        </div>
        {/* Mark as Complete button */}
        <div className="mb-4 w-full flex justify-center">
          <button
            className={`px-6 py-3 bg-gradient-to-r from-green-400 to-yellow-300 text-white rounded-2xl font-extrabold text-lg shadow-xl hover:scale-105 hover:from-green-500 hover:to-yellow-400 transition-all duration-200 border-2 border-green-600 ${isSubCompleted ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleComplete}
            disabled={isSubCompleted}
          >
            {isSubCompleted ? 'Completed!' : 'Mark as Complete'}
          </button>
        </div>
        {/* Website link */}
        <div className="mb-2 w-full text-center">
          <span className="font-semibold text-yellow-900">Learn more:</span>
          {SUBSTEP_LINKS[substep] && (
            <a href={SUBSTEP_LINKS[substep].website} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline">More info</a>
          )}
        </div>
      </div>
    </div>
  );
}
