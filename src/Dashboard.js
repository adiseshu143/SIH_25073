
import React, { useState } from 'react';
import { useProgress } from './ProgressContext';
import { TASKS } from './TaskDetail';
import GameNavbar from './components/GameUI/GameNavbar';
import FarmMap from './components/GameUI/FarmMap';
import XPBar from './components/GameUI/XPBar';
import QuestPath from './components/GameUI/QuestPath';
import BadgePopup from './components/GameUI/BadgePopup';
import FarmShop from './components/GameUI/FarmShop';
import DailyQuest from './components/GameUI/DailyQuest';
import StreakCounter from './components/GameUI/StreakCounter';
import Confetti from './components/GameUI/Confetti';
import Avatar from './components/GameUI/Avatar';
import GameFooter from './components/GameUI/GameFooter';
import Leaderboard from './Leaderboard';

const demoUser = {
  name: 'Farmer John',
  level: 5,
  xp: 72,
  avatarUrl: '',
  streak: 3,
  badges: ['Water Saver', 'Soil Steward', 'Compost Champ'],
};
const questSteps = [
  'Land Preparation',
  'Selection of Seeds',
  'Sowing/Planting',
  'Manuring & Fertilization',
  'Irrigation',
  'Weeding',
  'Pest & Disease Management',
  'Harvesting',
  'Post-Harvest Handling',
];

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState(2);
  const [showBadge, setShowBadge] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showDaily, setShowDaily] = useState(true);

  function handleAreaClick(area) {
    if (area === 'market') setShowShop(true);
    if (area === 'field') setShowDaily(true);
    if (area === 'barn') setShowBadge('Soil Steward');
  }
  function handleStepClick(idx) {
    if (idx === currentStep + 1) {
      setCurrentStep(idx);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      setShowBadge('Quest Complete!');
    }
  }
  function handleBuy(item) {
    setShowBadge(item.name);
    setShowShop(false);
  }
  function handleDailyComplete() {
    setShowDaily(false);
    setShowBadge('Daily Quest');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-green-200 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <Avatar name={demoUser.name} level={demoUser.level} avatarUrl={demoUser.avatarUrl} />
          <XPBar xp={demoUser.xp} level={demoUser.level} />
          <StreakCounter streak={demoUser.streak} />
        </div>
        <QuestPath steps={questSteps} currentStep={currentStep} onStepClick={handleStepClick} />
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          {demoUser.badges.map(b => (
            <div key={b} className="px-4 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-full font-bold text-yellow-800 shadow animate-bounce">🏅 {b}</div>
          ))}
        </div>
      </div>
      {/* Leaderboard Section */}
      <div className="max-w-4xl mx-auto mt-12 mb-8 bg-white/80 rounded-2xl shadow-2xl border-4 border-green-200 p-8">
        <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center drop-shadow">Leaderboard</h2>
        <Leaderboard />
      </div>
  {showBadge && <BadgePopup badge={showBadge} onClose={() => setShowBadge(null)} />}
  <Confetti trigger={showConfetti} />
    </div>
  );
}
