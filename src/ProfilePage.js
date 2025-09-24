
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Confetti from './components/GameUI/Confetti';

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const [showConfetti, setShowConfetti] = useState(false);
  if (!user) return <div className="p-8 text-center">Please log in to view your profile.</div>;

  const handleLogout = async () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
    await auth.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 relative overflow-hidden">
      {showConfetti && <Confetti trigger={showConfetti} />}
      <div className="max-w-md w-full bg-white/90 rounded-3xl shadow-2xl border-4 border-yellow-200 flex flex-col items-center px-8 py-10 animate-bounceIn relative z-10">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="animate-floatIcon mb-2">
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}`}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-yellow-300 shadow-xl"
            />
          </div>
          <div className="font-extrabold text-2xl text-green-800 drop-shadow mb-1 text-center">{user.displayName || 'No Name'}</div>
          <div className="text-gray-700 text-base text-center">{user.email}</div>
        </div>
        <div className="mb-6 w-full text-center">
          <span className="font-semibold text-yellow-900">User ID:</span>
          <div className="mt-1 text-green-900 text-lg font-medium break-all">{user.uid}</div>
        </div>
        <button
          className="px-8 py-3 bg-gradient-to-r from-red-400 to-yellow-300 text-white rounded-2xl font-extrabold text-lg shadow-xl hover:scale-105 hover:from-red-500 hover:to-yellow-400 transition-all duration-200 border-2 border-red-600 mb-2 animate-glow"
          onClick={handleLogout}
        >
          Log Out
        </button>
        <div className="mt-2 text-sm text-gray-500 text-center">Logging out will end your session.<br />See you soon, farmer!</div>
      </div>
    </div>
  );
};

export default ProfilePage;
