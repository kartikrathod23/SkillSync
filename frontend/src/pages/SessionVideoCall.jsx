
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoCall from '../components/VideoCall';
const API_BASE = import.meta.env.VITE_API_BASE_URL;


const SessionVideoCall = () => {
  const { sessionId } = useParams();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const [userRes, sessionRes] = await Promise.all([
          fetch(`${API_BASE}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/api/sessions/${sessionId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!userRes.ok || !sessionRes.ok) throw new Error('Request failed');

        const userData = await userRes.json();
        const sessionData = await sessionRes.json();

        setUser(userData);
        setSession(sessionData);
      } catch (err) {
        console.error('Error fetching session/user:', err);
        setError('Failed to load session.');
      }
    };

    fetchData();
  }, [sessionId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user || !session) return <p>Loading...</p>;

  if (
    user._id !== session.requester._id &&
    user._id !== session.recipient._id
  ) {
    return <p className="text-red-500">Unauthorized</p>;
  }

  // Generate consistent room name (no need to share)
  const roomName = `skillsync-${session.requester._id}-${session.recipient._id}`;

  return (
    <div className="h-screen bg-white flex justify-center items-center">
      {/* Use community Jitsi instance through VideoCall */}
      <VideoCall roomName={roomName} displayName={user.fullname} />
    </div>
  );
};

export default SessionVideoCall;
