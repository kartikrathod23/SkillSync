import React from 'react';

const UpcomingSessions = () => {
  const sessions = [
    { topic: 'Frontend Basics', date: 'May 25, 2025' },
    { topic: 'MongoDB Deep Dive', date: 'May 28, 2025' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Sessions</h2>
      <ul className="space-y-2">
        {sessions.map((session, i) => (
          <li key={i} className="border rounded p-3">
            <p className="text-orange-600 font-semibold">{session.topic}</p>
            <p className="text-sm text-gray-500">{session.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingSessions;
