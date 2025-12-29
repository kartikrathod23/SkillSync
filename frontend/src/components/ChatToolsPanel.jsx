import React, { useEffect, useState } from "react";
import UpcomingSessions from "./UpcomingSessions";
import SessionRequestModal from "./SessionRequestModal";
const API_BASE = import.meta.env.VITE_API_BASE_URL;


import { io } from 'socket.io-client';
const socket = io(API_BASE);

const ChatToolsPanel = ({ receiverId }) => {
  const [user, setUser] = useState(null);
  const [acceptedSessions, setAcceptedSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);



  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch(`${API_BASE}/api/sessions/accepted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAcceptedSessions(data);
    };

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

    fetchSessions();
    fetchCurrentUser();
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

  const handleSessionSubmit = async (formData) => {
    await fetch(`${API_BASE}/api/sessions/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    setShowModal(false);
  };

  return (
    <div className="hidden lg:block w-1/3 bg-white p-6 shadow-inner border-l border-gray-200 overflow-y-auto">
      <h2 className="text-xl font-semibold text-orange-600 mb-4">Tools & Sessions</h2>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Request a Session
      </button>

      <UpcomingSessions sessions={acceptedSessions} currentUser={user} onComplete={removeCompletedSession}/>

      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Inspiration</h3>
        <blockquote className="italic text-gray-600 border-l-4 pl-4 border-orange-400">
          "The beautiful thing about learning is nobody can take it away from you."
        </blockquote>
      </div>

      <SessionRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSessionSubmit}
        recipientId={receiverId}
      />
    </div>
  );
};

export default ChatToolsPanel;
