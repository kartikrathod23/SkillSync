import React, { useEffect, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import profile from '../pages/Profile.jsx'


const DashboardHeader = ({ userName }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      const profileRes = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await profileRes.json();
      setCurrentUser(profileData);
    }

    fetchData();

  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token'); // remove the auth token
    window.location.href = '/login'; // redirect to login page
  };


  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userName} 👋</h1>
        <p className="text-gray-600 text-sm">Here's your SkillSync dashboard overview</p>
      </div>
      <div className='flex flex-row gap-5'>
        {currentUser && (
          <UserCircleIcon
            onClick={() => navigate(`/profile/${currentUser._id}`)}
            className="w-10 h-10 text-orange-500 cursor-pointer"
          />
        )}
        <button onClick={handleLogout} className="text-orange-500 font-medium ">
          Logout
        </button>
      </div>

    </div>
  );
};

export default DashboardHeader;
