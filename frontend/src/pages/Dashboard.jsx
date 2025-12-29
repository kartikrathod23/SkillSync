import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import StatsOverview from '../components/StatsOverview';
import SkillMatches from '../components/SkillMatches';
import UpcomingSessions from '../components/UpcomingSessions';
import CreateSessionForm from '../components/CreateSessionForm';
import Announcements from '../components/Announcements';
import ProfileShowcase from '../components/ProfileShowcase';
import SessionRequests from '../components/SessionRequests';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

import { io } from 'socket.io-client';
const socket = io(API_BASE);


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [acceptedSessions, setAcceptedSessions] = useState([]);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data);
    } else {
      console.error('Failed to fetch user');
    }
  };

  const fetchAcceptedSessions = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/api/sessions/accepted`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (Array.isArray(data)) {
      setAcceptedSessions(data);
    } else {
      console.error('Unexpected response:', data);
      setAcceptedSessions([]);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchAcceptedSessions();
  }, []);

  useEffect(() => {
    if (!user) return;

    socket.emit('join', user._id);

    socket.on('sessionAccepted', (session) => {
      if (session.requester._id === user._id) {
        setAcceptedSessions(prev => [...prev, session]);
      }
    });

    return () => {
      socket.off('sessionAccepted');
    };
  }, [user]);

  const addAcceptedSession = (session) => {
    setAcceptedSessions((prev) => [...prev, session]);
  };

  const removeCompletedSession = (sessionId) => {
    setAcceptedSessions((prev) => prev.filter(s => s._id !== sessionId));
  };


  if (!user) return <p className="text-center text-gray-500">Loading Dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <DashboardHeader userName={user.fullname || 'User'} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="h-[40vh] overflow-hidden">
          <StatsOverview />
        </div>
        <div className="h-[40vh] overflow-y-auto">
          <UpcomingSessions sessions={acceptedSessions} currentUser={user} onComplete={removeCompletedSession}/>
        </div>
        <div className="h-[40vh] overflow-y-auto">
          <SessionRequests onAccept={addAcceptedSession} />
        </div>
      </div>

      <div className="mt-10">
        <SkillMatches />
      </div>

      <div className="mt-10">
        <ProfileShowcase />
      </div>

      <div className="mt-10">
        <Announcements />
      </div>
    </div>
  );
};

export default Dashboard;
