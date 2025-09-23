import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useProgress } from './ProgressContext';
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
  // ...existing code...
  const { progress } = useProgress();
  // Use React Router location and state to restore activeStepIdx
  const location = useLocation();
  let initialStepIdx = 0;
  if (location.state && typeof location.state.activeStepIdx === 'number') {
    initialStepIdx = location.state.activeStepIdx;
  }
  const [activeStepIdx, setActiveStepIdx] = useState(initialStepIdx);
  const { id } = useParams();
  const task = TASKS.find(t => t.id === Number(id));
  const [completedSubstepsArr, setCompletedSubstepsArr] = useState(() => task?.steps.map(() => []) || []);
  const navigate = useNavigate();
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

if (!task) {
  return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">Task not found</div>;
}

// For Land Preparation, use flex row for steps and video, equally sized
if (task.title === 'Land Preparation') {
  return (
    <div className="min-h-screen flex flex-col gap-8 p-8">
      {/* Centered image, heading, description */}
      <div className="flex flex-col items-center justify-center mb-8">
        <img src="/landpreparation.jpg" alt="Land Preparation" className="w-32 h-32 rounded-2xl object-cover border border-green-300 mb-4 shadow" />
        <h2 className="text-4xl font-bold text-primary mb-2">{task.title}</h2>
        <div className="text-lg text-gray-700 text-center max-w-2xl">{task.description}</div>
      </div>
      {/* Steps and video blocks side by side */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Steps block */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-soft p-8 border border-gray-100 flex flex-col">
          <button onClick={() => navigate(-1)} className="mb-4 text-primary hover:underline font-semibold flex items-center gap-1">
            <span className="text-xl">←</span> Back
          </button>
          {/* Task completion percentage */}
          <div className="mb-4">
            <span className="font-semibold">Task Progress:</span>
            <div className="w-full bg-gray-100 rounded-full h-3 mt-1">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${progress?.[task.id]?.steps?.filter(Boolean).length / task.steps.length * 100 || 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 ml-2">
              {Math.round(progress?.[task.id]?.steps?.filter(Boolean).length / task.steps.length * 100) || 0}%
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {task.steps.map((stepObj, stepIdx) => {
              // Use progress context for substep completion
              const completedSubsteps = progress?.[task.id]?.substeps?.[stepIdx] || [];
              const isCompleted = progress?.[task.id]?.steps?.[stepIdx] || false;
              const isCurrent = stepIdx === activeStepIdx;
              const isLocked = stepIdx > (progress?.[task.id]?.steps?.findIndex(s => !s) ?? 0);
              return (
                <div key={stepObj.step} className="mb-6">
                  <button
                    className={`font-bold text-lg text-green-700 mb-2 w-full text-left flex items-center gap-2 ${isCurrent ? 'bg-green-100' : ''} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !isLocked && setActiveStepIdx(stepIdx)}
                    disabled={isLocked}
                  >
                    {isCompleted ? <span className="text-green-600">✔️</span> : isLocked ? <span className="text-gray-400">🔒</span> : <span className="text-green-700">🌱</span>}
                    {stepObj.step}
                  </button>
                  {/* Progress bar for substeps in this step (only show for current step) */}
                  {isCurrent && (
                    <div className="mb-2">
                      <span className="font-semibold">Progress:</span>
                      <div className="w-full bg-gray-100 rounded-full h-3 mt-1">
                        <div
                          className="bg-primary h-3 rounded-full"
                          style={{ width: `${completedSubsteps.filter(Boolean).length / stepObj.substeps.length * 100 || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        {completedSubsteps.filter(Boolean).length || 0} / {stepObj.substeps.length}
                      </span>
                    </div>
                  )}
                  {isCurrent && (
                    <ul className="ml-4 mt-2">
                      {task.steps[activeStepIdx].substeps.map((substep, subIdx) => {
                        const isSubCompleted = completedSubsteps[subIdx] || false;
                        // Only enable the next incomplete substep, but always enable the first substep of the first step
                        const firstIncomplete = completedSubsteps.findIndex(s => !s);
                        let isSubCurrent = subIdx === (firstIncomplete === -1 ? task.steps[activeStepIdx].substeps.length : firstIncomplete);
                        let isSubLocked = !isSubCurrent && !isSubCompleted;
                        if (activeStepIdx === 0 && subIdx === 0) {
                          isSubLocked = false;
                        }
                        return (
                          <li key={substep} className="mb-2 flex items-center gap-2">
                            <button
                              className={`text-primary hover:underline text-left font-semibold ${isSubLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => {
                                if (!isSubLocked) {
                                  handleSubstepClick(activeStepIdx, subIdx);
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
            <div className="bg-gray-50 rounded-xl shadow border p-4 flex flex-col items-center w-full max-w-lg h-full">
              <div className="font-bold text-base mb-2 text-green-800">{task.steps[activeStepIdx].step}</div>
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
}

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
