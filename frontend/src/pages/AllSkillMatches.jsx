import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const skillCategories = {
  'Web Development': ['JavaScript', 'React', 'HTML', 'CSS', 'Next.js','web dev','Web development'],
  'App Development': ['Flutter', 'React Native', 'Swift', 'Kotlin','flutter'],
  'Cybersecurity': ['Network Security', 'Ethical Hacking', 'Cryptography','Cyber Security'],
  'Machine Learning': ['TensorFlow', 'PyTorch', 'Data Science','ML','ml'],
  'Other': []
};

const AllSkillMatches = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/users/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProfiles(data);
    };

    fetchAll();
  }, []);

  const categorizeProfiles = () => {
    const categorized = {};

    Object.entries(skillCategories).forEach(([category, keywords]) => {
      categorized[category] = profiles.filter(profile =>
        profile.skills.some(skill =>
          keywords.length ? keywords.includes(skill) : true
        )
      );
    });

    return categorized;
  };

  const categories = categorizeProfiles();

  return (
    <div className="p-6">
      <DashboardHeader/>
      <h1 className="text-2xl font-bold mb-6 text-orange-600 mt-10">Explore Skill Categories</h1>
      {Object.entries(categories).map(([category, users]) => ( 
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div key={user._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg">
            <div className="flex flex-col justify-between  mb-2">
              <h3 className="text-orange-600 text-md font-bold">{user.fullname}</h3>
              <span className="bg-orange-100 px-3 py-1 mt-1 rounded-full text-sm font-medium self-start w-fit">
                {user.experienceLevel}
              </span>

              <p className="text-sm text-gray-600 mb-2">{user.experienceSummary}</p>
              <span className="text-sm text-yellow-500 font-medium">⭐ {user.rating}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{user.bio}</p>
            <p className="text-xs font-semibold text-gray-500">Skills Offered:</p>
            <ul className="flex flex-wrap gap-2 text-xs text-gray-700 mb-2">
              {user.skills.map((skill, i) => (
                <li key={i} className="bg-orange-100 px-2 py-1 rounded-full">{skill}</li>
              ))}
            </ul>
            <p className="text-xs font-semibold text-gray-500">Interested in:</p>
            <ul className="flex flex-wrap gap-2 text-xs text-blue-700">
              {user.interests.map((interest, i) => (
                <li key={i} className="bg-blue-100 px-2 py-1 rounded-full">{interest}</li>
              ))}
            </ul>
            <button
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              View Profile
            </button>
          </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSkillMatches;
