import React, { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const StatsOverview = () => {
  const [stats, setStats] = useState({
    completedSessions: 0,
    skillsOffered: 0,
    skillsLearned: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/sessions/stats/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    };

    fetchStats();
  }, []);

  const statsList = [
    { title: 'Sessions Completed', value: stats.completedSessions },
    { title: 'Skills Offered', value: stats.skillsOffered },
    { title: 'Skills Learned', value: stats.skillsLearned }
  ];

  return (
    <div className="col-span-1 lg:col-span-1 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 -mt-5">Your Stats</h2>
      <div className="space-y-4">
        {statsList.map((stat, i) => (
          <div key={i} className="p-1 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-xl font-bold text-orange-600">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
