import React from 'react';
import AnimatedLogo from './AnimatedLogo';
import ProgressBar from './ProgressBar';
import ProfileSection from './ProfileSection';

const Badge = ({ label }) => (
  <div className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">{label}</div>
);

const CircularGauge = ({ value = 72 }) => (
  <div className="relative w-36 h-36">
    <svg className="w-full h-full" viewBox="0 0 36 36">
      <path className="text-gray-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
      <path className="text-primary" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none"
        strokeDasharray={`72, 100`} d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center font-semibold">72%</div>
  </div>
);

const Dashboard = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <ProfileSection />
    <AnimatedLogo size={40} />
    <h2 className="text-3xl font-bold mt-6">Your Progress</h2>
    <div className="mt-8 grid lg:grid-cols-3 gap-8">
      <div className="p-6 bg-white rounded-xl shadow-soft border">
        <div className="font-semibold mb-2">Weekly Quest Progress</div>
        <ProgressBar value={64} />
      </div>
      <div className="p-6 bg-white rounded-xl shadow-soft border flex items-center justify-center">
        <div className="text-center">
          <div className="font-semibold mb-2">Sustainability Score</div>
          <CircularGauge value={72} />
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-soft border">
        <div className="font-semibold mb-2">Badges Unlocked</div>
        <div className="flex flex-wrap gap-2">
          {['Water Saver', 'Soil Steward', 'Compost Champ'].map(b => <Badge key={b} label={b} />)}
        </div>
      </div>
    </div>
  </section>
);

export default Dashboard;
