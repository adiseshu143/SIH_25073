import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Add steps and substeps for each task
export const TASKS = [
  {
    id: 1,
    title: 'Land Preparation',
    description: 'Complete all steps for proper land preparation.',
    image: '/tractor.jpg',
    color: 'bg-green-100',
    steps: [
      {
        step: 'Soil Testing and Analysis',
        substeps: ['Collect samples', 'Test pH', 'Assess nutrients', 'Record moisture']
      },
      {
        step: 'Clearing the Field',
        substeps: ['Remove weeds', 'Pick stones', 'Dispose debris']
      },
      {
        step: 'Pre-Irrigation',
        substeps: ['Check water source', 'Irrigate lightly']
      },
      {
        step: 'Primary Tillage (Plowing)',
        substeps: ['Choose plow', 'Set depth', 'Plow field']
      },
      {
        step: 'Secondary Tillage (Harrowing)',
        substeps: ['Break clods', 'Level surface']
      },
      {
        step: 'Land Leveling',
        substeps: ['Survey field', 'Fill low spots', 'Ensure slope']
      },
      {
        step: 'Applying Amendments and Fertilizers',
        substeps: ['Calculate rate', 'Apply evenly', 'Incorporate']
      },
      {
        step: 'Bed or Hole Preparation',
        substeps: ['Mark rows', 'Prepare beds/holes']
      },
      {
        step: 'Ensuring Proper Drainage',
        substeps: ['Plan channels', 'Install pipes', 'Test flow']
      },
      {
        step: 'Final Inspection',
        substeps: ['Walk-through', 'Verify readiness']
      }
    ]
  },
  {
    id: 2,
    title: 'Selection of Seeds',
    description: 'Select and prepare seeds for sowing.',
    image: '/logo192.png',
    color: 'bg-yellow-100',
    steps: [
      {
        step: 'Choose crop variety',
        substeps: ['Choose crop variety']
      },
      {
        step: 'Check seed quality',
        substeps: ['Check seed quality']
      },
      {
        step: 'Purchase certified seeds',
        substeps: ['Purchase certified seeds']
      },
      {
        step: 'Store seeds properly',
        substeps: ['Store seeds properly']
      }
    ]
  },
  {
    id: 3,
    title: 'Sowing/Planting',
    description: 'Sow or plant seeds in the prepared field.',
    image: '/logo512.png',
    color: 'bg-blue-100',
    steps: [
      {
        step: 'Prepare sowing equipment',
        substeps: ['Prepare sowing equipment']
      },
      {
        step: 'Sow seeds at proper depth',
        substeps: ['Sow seeds at proper depth']
      },
      {
        step: 'Cover seeds with soil',
        substeps: ['Cover seeds with soil']
      }
    ]
  },
  {
    id: 4,
    title: 'Manuring and Fertilization',
    description: 'Add nutrients to support crop growth.',
    image: '/logo192.png',
    color: 'bg-orange-100',
    steps: [
      {
        step: 'Apply manure',
        substeps: ['Select manure type', 'Spread evenly', 'Mix into soil']
      },
      {
        step: 'Apply fertilizers',
        substeps: ['Choose fertilizer type', 'Apply fertilizers', 'Mix into soil']
      },
      {
        step: 'Mix into soil',
        substeps: ['Use tiller', 'Ensure even distribution']
      }
    ]
  },
  {
    id: 5,
    title: 'Irrigation',
    description: 'Provide water to crops as needed.',
    image: '/logo512.png',
    color: 'bg-cyan-100',
    steps: [
      {
        step: 'Check water source',
        substeps: ['Inspect pump', 'Test water quality']
      },
      {
        step: 'Irrigate at proper intervals',
        substeps: ['Set schedule', 'Monitor soil moisture']
      },
      {
        step: 'Monitor soil moisture',
        substeps: ['Use moisture meter', 'Adjust irrigation']
      }
    ]
  },
  {
    id: 6,
    title: 'Weeding',
    description: 'Control weeds to protect crops.',
    image: '/logo192.png',
    color: 'bg-lime-100',
    steps: [
      {
        step: 'Identify weeds',
        substeps: ['Scout field', 'List weed types']
      },
      {
        step: 'Remove weeds manually or chemically',
        substeps: ['Hand removal', 'Apply herbicide']
      },
      {
        step: 'Monitor for regrowth',
        substeps: ['Inspect weekly', 'Repeat removal if needed']
      }
    ]
  },
  {
    id: 7,
    title: 'Pest and Disease Management',
    description: 'Protect crops from pests and diseases.',
    image: '/logo512.png',
    color: 'bg-red-100',
    steps: [
      {
        step: 'Scout for pests/diseases',
        substeps: ['Inspect leaves', 'Check for symptoms']
      },
      {
        step: 'Apply control measures',
        substeps: ['Select pesticide', 'Apply as directed']
      },
      {
        step: 'Monitor crop health',
        substeps: ['Record observations', 'Adjust treatment']
      }
    ]
  },
  {
    id: 8,
    title: 'Harvesting',
    description: 'Harvest crops efficiently and safely.',
    image: '/logo192.png',
    color: 'bg-purple-100',
    steps: [
      {
        step: 'Check crop maturity',
        substeps: ['Inspect color', 'Test firmness']
      },
      {
        step: 'Harvest at right time',
        substeps: ['Choose harvest date', 'Use proper tools']
      },
      {
        step: 'Handle crops carefully',
        substeps: ['Avoid bruising', 'Store gently']
      }
    ]
  },
  {
    id: 9,
    title: 'Post-Harvest Handling and Storage',
    description: 'Ensure quality and reduce losses after harvest.',
    image: '/logo512.png',
    color: 'bg-gray-100',
    steps: [
      {
        step: 'Clean harvested crops',
        substeps: ['Remove dirt', 'Sort by size']
      },
      {
        step: 'Sort and grade',
        substeps: ['Grade by quality', 'Pack for market']
      },
      {
        step: 'Store in proper conditions',
        substeps: ['Set temperature', 'Monitor humidity']
      }
    ]
  }
];
const SUBSTEP_VIDEOS = {
  'Collect samples': 'https://www.youtube.com/embed/8Q1q7QhQ2vA',
  'Test pH': 'https://www.youtube.com/embed/1QwqQwqQwqQ',
  'Assess nutrients': 'https://www.youtube.com/embed/2QwqQwqQwqQ',
  'Record moisture': 'https://www.youtube.com/embed/3QwqQwqQwqQ',
  'Remove weeds': 'https://www.youtube.com/embed/4QwqQwqQwqQ',
  'Pick stones': 'https://www.youtube.com/embed/5QwqQwqQwqQ',
  'Dispose debris': 'https://www.youtube.com/embed/6QwqQwqQwqQ',
  'Check water source': 'https://www.youtube.com/embed/7QwqQwqQwqQ',
  'Irrigate lightly': 'https://www.youtube.com/embed/8QwqQwqQwqQ',
  'Choose plow': 'https://www.youtube.com/embed/9QwqQwqQwqQ',
  'Set depth': 'https://www.youtube.com/embed/10QwqQwqQwqQ',
  'Plow field': 'https://www.youtube.com/embed/11QwqQwqQwqQ',
  'Break clods': 'https://www.youtube.com/embed/12QwqQwqQwqQ',
  'Level surface': 'https://www.youtube.com/embed/13QwqQwqQwqQ',
  'Survey field': 'https://www.youtube.com/embed/14QwqQwqQwqQ',
  'Fill low spots': 'https://www.youtube.com/embed/15QwqQwqQwqQ',
  'Ensure slope': 'https://www.youtube.com/embed/16QwqQwqQwqQ',
  'Calculate rate': 'https://www.youtube.com/embed/17QwQwqQwqQ',
  'Apply evenly': 'https://www.youtube.com/embed/18QwqQwqQwqQ',
  'Incorporate': 'https://www.youtube.com/embed/19QwQwqQwqQ',
  'Mark rows': 'https://www.youtube.com/embed/20QwqQwqQwqQ',
  'Prepare beds/holes': 'https://www.youtube.com/embed/21QwqQwqQwqQ',
  'Plan channels': 'https://www.youtube.com/embed/22QwqQwqQwqQ',
  'Install pipes': 'https://www.youtube.com/embed/23QwqQwqQwqQ',
  'Test flow': 'https://www.youtube.com/embed/24QwqQwqQwqQ',
  'Walk-through': 'https://www.youtube.com/embed/25QwqQwqQwqQ',
  'Verify readiness': 'https://www.youtube.com/embed/26QwqQwqQwqQ',
  'Choose crop variety': 'https://www.youtube.com/embed/27QwqQwqQwqQ',
  'Check seed quality': 'https://www.youtube.com/embed/28QwqQwqQwqQ',
  'Purchase certified seeds': 'https://www.youtube.com/embed/29QwqQwqQwqQ',
  'Store seeds properly': 'https://www.youtube.com/embed/30QwqQwqQwqQ',
  'Prepare sowing equipment': 'https://www.youtube.com/embed/31QwqQwqQwqQ',
  'Sow seeds at proper depth': 'https://www.youtube.com/embed/32QwqQwqQwqQ',
  'Cover seeds with soil': 'https://www.youtube.com/embed/33QwqQwqQwqQ',
  'Apply manure': 'https://www.youtube.com/embed/34QwqQwqQwqQ',
  'Apply fertilizers': 'https://www.youtube.com/embed/35QwqQwqQwqQ',
  'Mix into soil': 'https://www.youtube.com/embed/36QwqQwqQwqQ',
  'Irrigate at proper intervals': 'https://www.youtube.com/embed/37QwQwqQwqQ',
  'Monitor soil moisture': 'https://www.youtube.com/embed/38QwQwqQwqQ',
  'Identify weeds': 'https://www.youtube.com/embed/39QwqQwqQwqQ',
  'Remove weeds manually or chemically': 'https://www.youtube.com/embed/40QwqQwqQwqQ',
  'Monitor for regrowth': 'https://www.youtube.com/embed/41QwqQwqQwqQ',
  'Scout for pests/diseases': 'https://www.youtube.com/embed/42QwqQwqQwqQ',
  'Apply control measures': 'https://www.youtube.com/embed/43QwqQwqQwqQ',
  'Monitor crop health': 'https://www.youtube.com/embed/44QwqQwqQwqQ',
  'Check crop maturity': 'https://www.youtube.com/embed/45QwqQwqQwqQ',
  'Harvest at right time': 'https://www.youtube.com/embed/46QwqQwqQwqQ',
  'Handle crops carefully': 'https://www.youtube.com/embed/47QwqQwqQwqQ',
  'Clean harvested crops': 'https://www.youtube.com/embed/48QwqQwqQwqQ',
  'Sort and grade': 'https://www.youtube.com/embed/49QwqQwqQwqQ',
  'Store in proper conditions': 'https://www.youtube.com/embed/50QwqQwqQwqQ',
};

export default function TaskDetail() {
  // Get task id from route params and find the task
  const { id } = useParams();
  const task = TASKS.find(t => t.id === Number(id));
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

    // Add website links for all substeps in every step
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


  const [activeSubstep, setActiveSubstep] = useState({ stepIdx: null, subIdx: null });
  const [completedSteps, setCompletedSteps] = useState([]);

  function handleSubstepClick(stepIdx, subIdx) {
  // Navigate to substep detail page
  navigate(`/task/${task.id}/step/${stepIdx}/substep/${subIdx}`);
  }

  function handleCompleteStep(stepIdx) {
    setCompletedSteps((prev) => prev.includes(stepIdx) ? prev : [...prev, stepIdx]);
  }

  return (
    <div className={`min-h-screen py-10 px-4 flex flex-col items-center ${task.color}`}>
  <div className="max-w-4xl w-full bg-white rounded-2xl shadow-soft p-8 border border-gray-100">
        <button onClick={() => navigate(-1)} className="mb-4 text-primary hover:underline font-semibold flex items-center gap-1">
          <span className="text-xl">←</span> Back
        </button>
        <div className="flex flex-col items-center mb-8">
          <img src={task.image} alt={task.title} className="w-40 h-40 object-cover rounded-xl border-4 border-primary shadow mb-6" />
          <h2 className="text-4xl font-extrabold text-primary mb-2">{task.title}</h2>
          <p className="text-gray-700 text-lg mb-6 px-2 text-center" style={{ minHeight: '80px' }}>{task.description}</p>
        </div>
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-bold mb-6 text-primary">Steps</h3>
            <div className="flex flex-row gap-8">
              <div className="flex-1">
                <ol className="space-y-8">
                  {task.steps.map((stepObj, stepIdx) => (
                    <li key={stepIdx} className="bg-cream rounded-xl p-8 border-l-4 border-primary shadow-lg mb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold">{stepIdx + 1}</span>
                        <span className="font-bold text-xl text-gray-800">{stepObj.step}</span>
                        <button
                          className={`ml-auto px-3 py-1 rounded bg-primary text-white text-sm font-semibold ${completedSteps.includes(stepIdx) ? 'opacity-60 cursor-default' : 'hover:bg-green-600'}`}
                          onClick={() => handleCompleteStep(stepIdx)}
                          disabled={completedSteps.includes(stepIdx)}
                        >{completedSteps.includes(stepIdx) ? '✓ Completed' : 'Mark Step Complete'}</button>
                      </div>
                      <ul className="ml-8 space-y-3">
                        {stepObj.substeps.map((substep, subIdx) => (
                          <li key={subIdx} className="flex flex-col">
                            <button
                              className={`flex items-center gap-3 text-gray-700 font-medium text-base py-2 px-2 rounded hover:bg-primary/10 focus:outline-none ${activeSubstep.stepIdx === stepIdx && activeSubstep.subIdx === subIdx ? 'bg-primary/20' : ''}`}
                              onClick={() => handleSubstepClick(stepIdx, subIdx)}
                            >
                              {/* Only show tick if step is completed */}
                              {completedSteps.includes(stepIdx) && (
                                <span className="text-green-500 text-lg">✔</span>
                              )}
                              <span>{substep}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
              {/* Details panel beside steps */}
              <div className="flex-1">
                {activeSubstep.stepIdx !== null && activeSubstep.subIdx !== null && (
                  <div className="p-6 w-full max-w-xl bg-white border rounded shadow text-gray-700 text-sm flex flex-col gap-6">
                    {/* Progress bar for the step */}
                    <div className="mb-3">
                      <span className="font-semibold text-primary">Progress</span>
                      <div className="w-full bg-gray-100 rounded-full h-3 mt-1">
                        <div className="bg-primary h-3 rounded-full" style={{ width: `${completedSteps.includes(activeSubstep.stepIdx) ? 100 : 0}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{completedSteps.includes(activeSubstep.stepIdx) ? '100%' : '0%'}</span>
                    </div>
                    {/* Description */}
                    <div className="mb-2">
                      <span className="font-semibold">Description:</span>
                      <div className="mt-1 whitespace-pre-line">{SUBSTEP_DESCRIPTIONS[task.steps[activeSubstep.stepIdx].substeps[activeSubstep.subIdx]] || 'No description available.'}</div>
                    </div>
                    {/* Website link */}
                    <div className="mb-2">
                      <span className="font-semibold">Learn more:</span>
                      {SUBSTEP_LINKS[task.steps[activeSubstep.stepIdx].substeps[activeSubstep.subIdx]] && (
                        <a href={SUBSTEP_LINKS[task.steps[activeSubstep.stepIdx].substeps[activeSubstep.subIdx]].website} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline">More info</a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
