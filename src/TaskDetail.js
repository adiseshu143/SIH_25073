import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useProgress } from './ProgressContext';
import QuestPath from './components/GameUI/QuestPath';
import SubstepVisuals from './components/GameUI/SubstepVisuals';
import Confetti from './components/GameUI/Confetti';
import BadgePopup from './components/GameUI/BadgePopup';
// Map step names to video filenames
const LAND_PREP_VIDEO_MAP = {
  'Soil Testing and Analysis': '/1.soil testing.mp4',
  'Clearing the Field': '/2.cleaning field - Made with Clipchamp.mp4',
  'Pre-Irrigation': '/3.pre irrigation.mp4',
  'Primary Tillage (Plowing)': '/4. Primary Tillage (Plowing).mp4',
  'Secondary Tillage (Harrowing)': '/5. Secondary Tillage (Harrowing).mp4',
  'Land Leveling': '/6. Land Leveling Level.mp4',
  'Applying Amendments and Fertilizers': '/7. Applying Amendments and Fertilizers.mp4',
  'Bed or Hole Preparation': '/8. Bed or Hole Preparation.mp4',
  'Ensuring Proper Drainage': '/9. Ensuring Proper Drainage.mp4',
  'Final Inspection': '/10.final inspection.mp4',
};

function getLandPrepVideoSrc(stepName) {
  return LAND_PREP_VIDEO_MAP[stepName] || '';
}
// import { motion } from 'framer-motion';

// ...TASKS array definition goes here (all steps, substeps, etc.)...

export const TASKS = [
  {
    id: 1,
    title: 'Land Preparation',
    description: 'Complete all steps for proper land preparation.',
    image: '/tractor.jpg',
    color: 'bg-green-100',
    steps: [
      { step: 'Soil Testing and Analysis', substeps: ['Collect samples', 'Test pH', 'Assess nutrients', 'Record moisture'] },
      { step: 'Clearing the Field', substeps: ['Remove weeds', 'Pick stones', 'Dispose debris'] },
      { step: 'Pre-Irrigation', substeps: ['Check water source', 'Irrigate lightly'] },
      { step: 'Primary Tillage (Plowing)', substeps: ['Choose plow', 'Set depth', 'Plow field'] },
      { step: 'Secondary Tillage (Harrowing)', substeps: ['Break clods', 'Level surface'] },
      { step: 'Land Leveling', substeps: ['Survey field', 'Fill low spots', 'Ensure slope'] },
      { step: 'Applying Amendments and Fertilizers', substeps: ['Calculate rate', 'Apply evenly', 'Incorporate'] },
      { step: 'Bed or Hole Preparation', substeps: ['Mark rows', 'Prepare beds/holes'] },
      { step: 'Ensuring Proper Drainage', substeps: ['Plan channels', 'Install pipes', 'Test flow'] },
      { step: 'Final Inspection', substeps: ['Walk-through', 'Verify readiness'] }
    ]
  },
  {
    id: 2,
    title: 'Selection of Seeds',
    description: 'Select and prepare seeds for sowing.',
    image: '/logo192.png',
    color: 'bg-yellow-100',
    steps: [
      { step: 'Choose crop variety', substeps: ['Choose crop variety'] },
      { step: 'Check seed quality', substeps: ['Check seed quality'] },
      { step: 'Purchase certified seeds', substeps: ['Purchase certified seeds'] },
      { step: 'Store seeds properly', substeps: ['Store seeds properly'] }
    ]
  },
  {
    id: 3,
    title: 'Sowing/Planting',
    description: 'Sow or plant seeds in the prepared field.',
    image: '/logo512.png',
    color: 'bg-blue-100',
    steps: [
      { step: 'Prepare sowing equipment', substeps: ['Prepare sowing equipment'] },
      { step: 'Sow seeds at proper depth', substeps: ['Sow seeds at proper depth'] },
      { step: 'Cover seeds with soil', substeps: ['Cover seeds with soil'] }
    ]
  },
  {
    id: 4,
    title: 'Manuring and Fertilization',
    description: 'Add nutrients to support crop growth.',
    image: '/logo192.png',
    color: 'bg-orange-100',
    steps: [
      { step: 'Apply manure', substeps: ['Select manure type', 'Spread evenly', 'Mix into soil'] },
      { step: 'Apply fertilizers', substeps: ['Choose fertilizer type', 'Apply fertilizers', 'Mix into soil'] },
      { step: 'Mix into soil', substeps: ['Use tiller', 'Ensure even distribution'] }
    ]
  },
  {
    id: 5,
    title: 'Irrigation',
    description: 'Provide water to crops as needed.',
    image: '/logo512.png',
    color: 'bg-cyan-100',
    steps: [
      { step: 'Check water source', substeps: ['Inspect pump', 'Test water quality'] },
      { step: 'Irrigate at proper intervals', substeps: ['Set schedule', 'Monitor soil moisture'] },
      { step: 'Monitor soil moisture', substeps: ['Use moisture meter', 'Adjust irrigation'] }
    ]
  },
  {
    id: 6,
    title: 'Weeding',
    description: 'Control weeds to protect crops.',
    image: '/logo192.png',
    color: 'bg-lime-100',
    steps: [
      { step: 'Identify weeds', substeps: ['Scout field', 'List weed types'] },
      { step: 'Remove weeds manually or chemically', substeps: ['Hand removal', 'Apply herbicide'] },
      { step: 'Monitor for regrowth', substeps: ['Inspect weekly', 'Repeat removal if needed'] }
    ]
  },
  {
    id: 7,
    title: 'Pest and Disease Management',
    description: 'Protect crops from pests and diseases.',
    image: '/logo512.png',
    color: 'bg-red-100',
    steps: [
      { step: 'Scout for pests/diseases', substeps: ['Inspect leaves', 'Check for symptoms'] },
      { step: 'Apply control measures', substeps: ['Select pesticide', 'Apply as directed'] },
      { step: 'Monitor crop health', substeps: ['Record observations', 'Adjust treatment'] }
    ]
  },
  {
    id: 8,
    title: 'Harvesting',
    description: 'Harvest crops efficiently and safely.',
    image: '/logo192.png',
    color: 'bg-purple-100',
    steps: [
      { step: 'Check crop maturity', substeps: ['Inspect color', 'Test firmness'] },
      { step: 'Harvest at right time', substeps: ['Choose harvest date', 'Use proper tools'] },
      { step: 'Handle crops carefully', substeps: ['Avoid bruising', 'Store gently'] }
    ]
  },
  {
    id: 9,
    title: 'Post-Harvest Handling and Storage',
    description: 'Ensure quality and reduce losses after harvest.',
    image: '/logo512.png',
    color: 'bg-gray-100',
    steps: [
      { step: 'Clean harvested crops', substeps: ['Remove dirt', 'Sort by size'] },
      { step: 'Sort and grade', substeps: ['Grade by quality', 'Pack for market'] },
      { step: 'Store in proper conditions', substeps: ['Set temperature', 'Monitor humidity'] }
    ]
  }
];



export default function TaskDetail() {
  const { progress } = useProgress();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  // Gamification state (must be before any return)
  const [showBadge, setShowBadge] = useState(null);
  const [showQuestComplete, setShowQuestComplete] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  // Step state
  let initialStepIdx = 0;
  if (location.state && typeof location.state.activeStepIdx === 'number') {
    initialStepIdx = location.state.activeStepIdx;
  }
  const [activeStepIdx, setActiveStepIdx] = useState(initialStepIdx);
  const task = TASKS.find(t => t.id === Number(id));
  const [completedSubstepsArr, setCompletedSubstepsArr] = useState(() => task?.steps.map(() => []) || []);

  // Substep descriptions
  const SUBSTEP_DESCRIPTIONS = {
    'Collect samples': `Collecting soil samples is the first and most crucial step in soil testing.
Take samples from multiple locations in the field for accurate results.
Proper sampling helps determine nutrient needs and improve crop yield.`,
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
    'Level surface': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/soil-leveling-tips.htm' },
    'Survey field': { website: 'https://www.agriculture.com/crops/soil-health/land-surveying-basics' },
    'Fill low spots': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/filling-low-spots-in-lawn.htm' },
    'Ensure slope': { website: 'https://www.agriculture.com/crops/soil-health/field-drainage-tips' },
    'Calculate rate': { website: 'https://www.agriculture.com/crops/soil-health/fertilizer-rate-calculator' },
    'Apply evenly': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/applying-fertilizer-evenly.htm' },
    'Incorporate': { website: 'https://www.agriculture.com/crops/soil-health/incorporating-fertilizer-into-soil.htm' },
    'Mark rows': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/row-planting-vegetables.htm' },
    'Prepare beds/holes': { website: 'https://www.gardeningknowhow.com/garden-how-to/projects/preparing-garden-beds.htm' },
    'Plan channels': { website: 'https://www.agriculture.com/crops/soil-health/irrigation-channel-design.htm' },
    'Install pipes': { website: 'https://www.agriculture.com/machinery/irrigation/pipe-installation-tips' },
    'Test flow': { website: 'https://www.agriculture.com/machinery/irrigation/water-flow-testing.htm' },
    'Walk-through': { website: 'https://www.agriculture.com/crops/soil-health/field-inspection-checklist' },
    'Verify readiness': { website: 'https://www.agriculture.com/crops/soil-health/field-readiness-tips' },
    'Choose crop variety': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/choosing-varieties.htm' },
    'Check seed quality': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/seed-quality.htm' },
    'Purchase certified seeds': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/certified-seeds.htm' },
      'Store seeds properly': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/storing-seeds.htm' },
      'Prepare sowing equipment': { website: 'https://www.gardeningknowhow.com/garden-how-to/tools/seed-sowing-tools.htm' },
      'Sow seeds at proper depth': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/seed-depth.htm' },
      'Cover seeds with soil': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/covering-seeds.htm' },
      'Select manure type': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/types-of-manure.htm' },
      'Spread evenly': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/spreading-manure.htm' },
      'Mix into soil': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/mixing-manure.htm' },
      'Choose fertilizer type': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/types-of-fertilizer.htm' },
      'Apply fertilizers': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/applying-fertilizer.htm' },
      'Use tiller': { website: 'https://www.gardeningknowhow.com/garden-how-to/tools/using-a-tiller.htm' },
      'Ensure even distribution': { website: 'https://www.gardeningknowhow.com/garden-how-to/soil-fertilizers/even-distribution.htm' },
      'Inspect pump': { website: 'https://www.agriculture.com/machinery/irrigation/pump-inspection-tips' },
      'Test water quality': { website: 'https://www.agriculture.com/crops/soil-health/water-quality-testing.htm' },
      'Set schedule': { website: 'https://www.gardeningknowhow.com/garden-how-to/watering/watering-schedule.htm' },
      'Monitor soil moisture': { website: 'https://www.agric.wa.gov.au/soil-moisture-measurement' },
      'Use moisture meter': { website: 'https://www.gardeningknowhow.com/garden-how-to/tools/moisture-meter.htm' },
      'Adjust irrigation': { website: 'https://www.agriculture.com/machinery/irrigation/adjusting-irrigation.htm' },
      'Scout field': { website: 'https://www.agriculture.com/crops/soil-health/field-scouting-tips' },
      'List weed types': { website: 'https://www.gardeningknowhow.com/plant-problems/weeds/types-of-weeds.htm' },
      'Hand removal': { website: 'https://www.gardeningknowhow.com/plant-problems/weeds/hand-weeding.htm' },
      'Apply herbicide': { website: 'https://www.gardeningknowhow.com/plant-problems/weeds/applying-herbicide.htm' },
      'Inspect weekly': { website: 'https://www.gardeningknowhow.com/plant-problems/weeds/weed-inspection.htm' },
      'Repeat removal if needed': { website: 'https://www.gardeningknowhow.com/plant-problems/weeds/repeat-weeding.htm' },
      'Inspect leaves': { website: 'https://www.gardeningknowhow.com/plant-problems/pests/insect-inspection.htm' },
      'Check for symptoms': { website: 'https://www.gardeningknowhow.com/plant-problems/disease/disease-symptoms.htm' },
      'Select pesticide': { website: 'https://www.gardeningknowhow.com/plant-problems/pests/selecting-pesticide.htm' },
      'Apply as directed': { website: 'https://www.gardeningknowhow.com/plant-problems/pests/applying-pesticide.htm' },
      'Record observations': { website: 'https://www.gardeningknowhow.com/plant-problems/pests/recording-observations.htm' },
      'Adjust treatment': { website: 'https://www.gardeningknowhow.com/plant-problems/pests/adjusting-treatment.htm' },
      'Inspect color': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/harvest-color.htm' },
      'Test firmness': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/harvest-firmness.htm' },
      'Choose harvest date': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/harvest-date.htm' },
      'Use proper tools': { website: 'https://www.gardeningknowhow.com/garden-how-to/tools/harvest-tools.htm' },
      'Avoid bruising': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/avoiding-bruising.htm' },
      'Store gently': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/storing-harvest.htm' },
      'Remove dirt': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/cleaning-harvest.htm' },
      'Sort by size': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/sorting-harvest.htm' },
      'Grade by quality': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/grading-harvest.htm' },
      'Pack for market': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/packing-harvest.htm' },
      'Set temperature': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/storage-temperature.htm' },
      'Monitor humidity': { website: 'https://www.gardeningknowhow.com/edible/vegetables/vgen/storage-humidity.htm' },
    };


  // ...existing code...
  const [completedSteps, setCompletedSteps] = useState([]);

  function handleSubstepClick(stepIdx, subIdx) {
  // Navigate to substep detail page, pass activeStepIdx in state
  navigate(`/task/${task.id}/step/${stepIdx}/substep/${subIdx}`, { state: { activeStepIdx: stepIdx } });
  }

  function handleCompleteStep(stepIdx) {
    setCompletedSteps((prev) => prev.includes(stepIdx) ? prev : [...prev, stepIdx]);
  }


const stepIcons = ['🧪','🧹','💧','🚜','🪓','📏','🧴','🛏️','💧','🔍'];

// Award badge and XP on step/substep complete
React.useEffect(() => {
  if (task && progress?.[task.id]?.steps?.every(Boolean)) {
    setShowQuestComplete(true);
    setShowBadge('Quest Complete!');
    setXp(100);
    setLevel((l) => l + 1);
  }
}, [progress, task]);

if (!task) {
  return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">Task not found</div>;
}

// Floating farm icons
const floatingIcons = [
  { icon: '🌾', style: { left: '10%', top: '20%', animationDelay: '0s' } },
  { icon: '🚜', style: { left: '80%', top: '30%', animationDelay: '1s' } },
  { icon: '🌻', style: { left: '20%', top: '70%', animationDelay: '2s' } },
  { icon: '🥕', style: { left: '70%', top: '80%', animationDelay: '3s' } },
  { icon: '🪴', style: { left: '50%', top: '10%', animationDelay: '1.5s' } },
];

return (
  <div className="min-h-screen w-full relative bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 overflow-x-hidden">
    {/* Floating farm icons */}
    {floatingIcons.map((f, i) => (
      <span key={i} className="fixed text-5xl pointer-events-none animate-floatIcon" style={{ ...f.style, position: 'fixed', zIndex: 1 }}>{f.icon}</span>
    ))}
    {/* Confetti for completion */}
    {progress?.[task.id]?.steps?.every(Boolean) && <Confetti trigger={true} />}
    {/* Badge popup */}
    {showBadge && (
      <BadgePopup badge={showBadge} onClose={() => setShowBadge(null)} />
    )}
    {/* Quest complete banner */}
    {showQuestComplete && (
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-200 via-green-100 to-blue-100 px-10 py-4 rounded-2xl shadow-2xl border-4 border-green-300 text-3xl font-extrabold text-green-800 animate-bounceIn flex items-center gap-4">
        <span>🏆</span> Quest Complete!
      </div>
    )}
    {/* Animated avatar */}
    <div className="absolute left-8 top-8 z-10">
      <img src="/logo192.png" alt="Avatar" className="w-20 h-20 rounded-full border-4 border-yellow-300 shadow-xl animate-avatarFloat" />
      <div className="mt-2 text-center text-green-900 font-bold text-lg">Level {level}</div>
    </div>
    {/* Quest Path */}
    <div className="pt-8">
      <QuestPath steps={task.steps.map(s => s.step)} currentStep={activeStepIdx} onStepClick={setActiveStepIdx} />
    </div>
    {/* Main content */}
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto mt-4">
      {/* Steps block */}
      <div className="flex-1 min-w-0 bg-white/90 rounded-3xl shadow-2xl p-8 border-4 border-green-200 flex flex-col">
        <button onClick={() => navigate(-1)} className="mb-4 text-primary hover:underline font-semibold flex items-center gap-1">
          <span className="text-xl">←</span> Back
        </button>
        <div className="flex items-center gap-4 mb-4">
          <img src={task.image} alt={task.title} className="w-16 h-16 rounded-xl border-2 border-green-300 shadow" />
          <div>
            <h2 className="text-3xl font-extrabold text-green-800 mb-1 drop-shadow">{task.title}</h2>
            <div className="text-lg text-yellow-900 italic">{task.description}</div>
          </div>
        </div>
        {/* XP/Level bar */}
        <div className="mb-6">
          <span className="font-semibold">XP Progress:</span>
          <div className="w-full bg-gray-100 rounded-full h-4 mt-1 relative overflow-hidden">
            <div
              className="bg-yellow-400 h-4 rounded-full transition-all duration-700 animate-xpBar"
              style={{ width: `${xp}%` }}
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-green-900">{xp} XP</span>
          </div>
        </div>
        {/* Step cards */}
        <div className="flex flex-col gap-6">
          {task.steps.map((stepObj, stepIdx) => {
            const completedSubsteps = progress?.[task.id]?.substeps?.[stepIdx] || [];
            const isCompleted = progress?.[task.id]?.steps?.[stepIdx] || false;
            const isCurrent = stepIdx === activeStepIdx;
            const isLocked = stepIdx > (progress?.[task.id]?.steps?.findIndex(s => !s) ?? 0);
            return (
              <div key={stepObj.step} className={`rounded-2xl p-4 shadow-lg border-2 flex flex-col gap-2 transition-all duration-300 ${isCurrent ? 'bg-yellow-100 border-yellow-300 scale-105 animate-bounceIn' : isCompleted ? 'bg-green-100 border-green-300 opacity-80' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{stepIcons[stepIdx % stepIcons.length]}</span>
                  <button
                    className={`font-bold text-lg text-green-800 flex-1 text-left ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !isLocked && setActiveStepIdx(stepIdx)}
                    disabled={isLocked}
                  >
                    {stepObj.step}
                  </button>
                  {isCompleted ? <span className="text-green-600 text-xl">✔️</span> : isLocked ? <span className="text-gray-400 text-xl">🔒</span> : <span className="text-green-700 text-xl">🌱</span>}
                </div>
                {/* Substeps for current step */}
                {isCurrent && (
                  <ul className="flex flex-wrap gap-4 mt-2">
                    {task.steps[activeStepIdx].substeps.map((substep, subIdx) => {
                      const isSubCompleted = completedSubsteps[subIdx] || false;
                      const firstIncomplete = completedSubsteps.findIndex(s => !s);
                      let isSubCurrent = subIdx === (firstIncomplete === -1 ? task.steps[activeStepIdx].substeps.length : firstIncomplete);
                      let isSubLocked = !isSubCurrent && !isSubCompleted;
                      if (activeStepIdx === 0 && subIdx === 0) {
                        isSubLocked = false;
                      }
                      return (
                        <li key={substep} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl border-2 shadow transition-all duration-200 ${isSubCompleted ? 'bg-green-100 border-green-300' : isSubCurrent ? 'bg-yellow-100 border-yellow-300 scale-105 animate-flipIn' : 'bg-white border-gray-200'}`}>
                          <SubstepVisuals substep={substep} />
                          <button
                            className={`text-primary hover:underline text-center font-semibold ${isSubLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => {
                              if (!isSubLocked) {
                                // Always navigate to SubstepDetail for video/description/mark as complete
                                navigate(`/task/${task.id}/step/${activeStepIdx}/substep/${subIdx}`, { state: { activeStepIdx } });
                              }
                            }}
                            disabled={isSubLocked}
                          >
                            {isSubCompleted ? <span className="text-green-600">✔️</span> : isSubLocked ? <span className="text-gray-400">🔒</span> : <span className="text-green-700">🌱</span>}
                            {substep}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Video block, equally sized and aligned */}
      <div className="flex-1 min-w-0 flex items-center justify-center">
        {activeStepIdx !== null && (
          <div className="bg-white/80 rounded-3xl shadow-xl border-4 border-yellow-200 p-6 flex flex-col items-center w-full max-w-lg h-full">
            <div className="font-bold text-xl mb-2 text-green-800 flex items-center gap-2">
              <span>{stepIcons[activeStepIdx % stepIcons.length]}</span>
              {task.steps[activeStepIdx].step}
            </div>
            <video
              controls
              className="w-full h-64 object-cover rounded-lg border"
              src={getLandPrepVideoSrc(task.steps[activeStepIdx].step)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  </div>
);

// For other tasks, keep default layout
return (
  <div className="min-h-screen flex flex-col md:flex-row gap-8 p-8">
    <div className="flex-1 max-w-2xl bg-white rounded-2xl shadow-soft p-8 border border-gray-100">
      {/* ...existing code... */}
      {/* Steps and progress logic unchanged for other tasks */}
      {/* ...existing code... */}
    </div>
  </div>
);
}
