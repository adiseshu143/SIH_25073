import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Leaderboard = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function fetchLeaderboard() {
  const querySnapshot = await getDocs(collection(db, 'users'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      // Sort by points descending and assign rank
      data.sort((a, b) => b.points - a.points);
      data.forEach((row, idx) => row.rank = idx + 1);
      setRows(data);
    }
    fetchLeaderboard();
  }, []);

  const medal = (rank) => rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-300' : rank === 3 ? 'bg-amber-600' : 'bg-gray-200';

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold">Leaderboard</h2>
      <div className="mt-6 overflow-hidden rounded-xl border shadow-soft bg-white">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Farmer</th>
              <th className="p-4">Location</th>
              <th className="p-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rank} className="border-t">
                <td className="p-4">
                  <span className={`inline-block w-6 h-6 rounded-full ${medal(r.rank)}`} />
                </td>
                <td className="p-4">{r.name}</td>
                <td className="p-4 text-gray-600">{r.location}</td>
                <td className="p-4 font-semibold">{r.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;
