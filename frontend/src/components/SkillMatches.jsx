import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillMatches = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/api/match', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setMatches(data);
      console.log(data)
    };

    fetchMatches();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Suggested Skill Exchange Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match, i) => (
          <div key={i} className="border p-4 rounded-lg hover:shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-orange-600 text-md font-bold">{match.fullname}</h3>
              {/* <span className="text-sm text-yellow-500 font-medium">⭐ {match.rating}</span> */}
            </div>
            <p className="bg-orange-100 px-2 py-1 rounded-full inline-block">{match.experienceLevel}</p>
            <p className="text-sm text-gray-600 mb-2">{match.experienceSummary}</p>
            <p className="text-sm text-gray-900">
              Can Teach: {match.skills.join(', ')}<br />
              Wants to Learn: {match.interests.join(', ')}
            </p>
            <button
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={() => navigate(`/profile/${match._id}`)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
      <button className='ml-auto block mt-2 p-2 rounded-2xl text-orange-600 font-bold'>View More →</button>
    </div>
  );
};

export default SkillMatches;
