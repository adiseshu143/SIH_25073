import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TASKS } from './TaskDetail';
// Substep descriptions (copy from TaskDetail.js)
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

export default function SubstepDetail() {
  const { id, stepIdx, subIdx } = useParams();
  const navigate = useNavigate();
  const task = TASKS.find(t => t.id === Number(id));
  if (!task) return <div>Task not found</div>;
  const step = task.steps[stepIdx];
  if (!step) return <div>Step not found</div>;
  const substep = step.substeps[subIdx];
  if (!substep) return <div>Substep not found</div>;

  // You can import SUBSTEP_DESCRIPTIONS and SUBSTEP_LINKS from TaskDetail.js if exported
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-primary hover:underline font-semibold flex items-center gap-1">
        <span className="text-xl">←</span> Back
      </button>
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-soft p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-primary mb-2">{substep}</h2>
        {/* Description */}
        <div className="mb-4">
          <span className="font-semibold">Description:</span>
          <div className="mt-1 whitespace-pre-line">{SUBSTEP_DESCRIPTIONS[substep] || 'No description available.'}</div>
        </div>
        {/* Progress (always 0% for demo, you can add logic) */}
        <div className="mb-4">
          <span className="font-semibold">Progress:</span>
          <div className="w-full bg-gray-100 rounded-full h-3 mt-1">
            <div className="bg-primary h-3 rounded-full" style={{ width: `0%` }} />
          </div>
          <span className="text-xs text-gray-500 ml-2">0%</span>
        </div>
        {/* Website link */}
        <div className="mb-2">
          <span className="font-semibold">Learn more:</span>
          {SUBSTEP_LINKS[substep] && (
            <a href={SUBSTEP_LINKS[substep].website} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline">More info</a>
          )}
        </div>
      </div>
    </div>
  );
}
