import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  if (!user) return <div className="p-8 text-center">Please log in to view your profile.</div>;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-soft border p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}`}
            alt="avatar"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <div className="font-bold text-2xl text-primary">{user.displayName || 'No Name'}</div>
            <div className="text-gray-700 text-base">{user.email}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="font-semibold">User ID:</div>
          <div className="text-gray-600 text-sm">{user.uid}</div>
        </div>
        {/* Add more user details here if needed */}
      </div>
    </div>
  );
};

export default ProfilePage;
