import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const DashboardHeader = ({ userName }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      const profileRes = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await profileRes.json();
      setCurrentUser(profileData);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('chatUserId');
    window.location.href = '/login';
  };

  const handleGoToChat = () => {
    if (currentUser?._id) {
      localStorage.setItem('userId', currentUser._id);
      navigate(`/chat/${currentUser._id}`);
    }
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md rounded-xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userName} 👋</h1>
        <p className="text-gray-600 text-sm">Connect-Learn-Exchange </p>
      </div>

      <div className="flex items-center space-x-4">
        {currentUser && (
          <>
            <HomeIcon
              onClick={handleGoHome}
              className="w-8 h-8 text-green-500 cursor-pointer hover:scale-110 transition"
              title="Dashboard"
            />
            <UserCircleIcon
              onClick={() => navigate(`/profile/${currentUser._id}`)}
              className="w-8 h-8 text-orange-500 cursor-pointer hover:scale-110 transition"
              title="Profile"
            />
            <ChatBubbleOvalLeftEllipsisIcon
              onClick={handleGoToChat}
              className="w-8 h-8 text-blue-500 cursor-pointer hover:scale-110 transition"
              title="Chat"
            />
            <ArrowRightOnRectangleIcon
              onClick={handleLogout}
              className="w-8 h-8 text-red-500 cursor-pointer hover:scale-110 transition"
              title="Logout"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
