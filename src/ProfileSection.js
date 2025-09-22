import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const ProfileSection = () => {
	const [user] = useAuthState(auth);
	if (!user) return null;
	return (
		<section className="max-w-md mx-auto bg-white rounded-xl shadow-soft border p-6 mt-8">
			<div className="flex items-center gap-4">
				<img
					src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}`}
					alt="avatar"
					className="w-16 h-16 rounded-full border"
				/>
				<div>
					<div className="font-bold text-lg text-primary">{user.displayName || 'No Name'}</div>
					<div className="text-gray-700 text-sm">{user.email}</div>
				</div>
			</div>
		</section>
	);
};

export default ProfileSection;
