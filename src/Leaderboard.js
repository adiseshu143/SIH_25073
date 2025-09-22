import React from 'react';

const rows = [
  { name: 'Aisha K.', location: 'Nairobi', points: 980, rank: 1 },
  { name: 'Liam P.', location: 'Dublin', points: 920, rank: 2 },
  { name: 'Maya R.', location: 'Delhi', points: 880, rank: 3 },
  { name: 'Diego S.', location: 'Lima', points: 820, rank: 4 },
  { name: 'Yuna H.', location: 'Seoul', points: 790, rank: 5 },
];
const medal = (rank) => rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-300' : rank === 3 ? 'bg-amber-600' : 'bg-gray-200';

const Leaderboard = () => (
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

export default Leaderboard;
