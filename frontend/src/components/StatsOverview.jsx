import React from 'react';

const StatsOverview = () => {
  const stats = [
    { title: 'Sessions Completed', value: 12 },
    { title: 'Skills Offered', value: 5 },
    { title: 'Skills Learned', value: 3 },
  ];

  return (
    <div className="col-span-1 lg:col-span-1 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Stats</h2>
      <div className="space-y-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-xl font-bold text-orange-600">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;