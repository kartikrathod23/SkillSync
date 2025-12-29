import React from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE = import.meta.env.VITE_API_BASE_URL;


const UpcomingSessions = ({ sessions, currentUser, onComplete }) => {
  const navigate = useNavigate();

  const handleComplete = async (sessionId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/api/sessions/${sessionId}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    if (res.ok) {
      onComplete(sessionId); // remove from list
    } else {
      console.error("Failed to mark session completed");
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-2xl shadow-amber-500 px-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Sessions</h2>
      <ul className="space-y-2">
        {Array.isArray(sessions) && currentUser && sessions.map((session, i) => {
          const isRequester = session.requester._id === currentUser._id;
          const roleLabel = isRequester ? "You will be learning" : "You will be teaching";
          const otherUser = isRequester ? session.recipient : session.requester;

          const now = new Date();
          const sessionTime = new Date(session.scheduledAt);
          const isJoinAvailable = now >= sessionTime;

          return (
            <li key={session._id} className="border rounded p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-orange-600 font-semibold">{session.topic}</p>
                  <p className="text-sm text-gray-500">
                    {sessionTime.toLocaleString()}
                  </p>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded mt-1 inline-block mr-2">
                    {roleLabel}
                  </span>
                  <span className="block mt-1 text-sm">
                    <span className="font-semibold text-gray-700">With: </span>
                    <span
                      className="inline-flex items-center gap-1 text-blue-600 font-medium cursor-pointer hover:underline hover:text-blue-800 transition"
                      onClick={() => navigate(`/profile/${otherUser._id}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M12 12c2.7 0 4.88-2.18 4.88-4.88S14.7 2.24 12 2.24 7.12 4.42 7.12 7.12 9.3 12 12 12zm0 2.4c-2.98 0-8.4 1.5-8.4 4.5v1.2c0 .66.54 1.2 1.2 1.2h14.4c.66 0 1.2-.54 1.2-1.2v-1.2c0-3-5.42-4.5-8.4-4.5z" />
                      </svg>
                      {otherUser.fullname}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {isJoinAvailable && (
                    <>
                      <button
                        className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
                        onClick={() => navigate(`/session/${session._id}`)}
                      >
                        Join
                      </button>
                      <button
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-xs"
                        onClick={() => handleComplete(session._id)}
                      >
                        Mark as Done
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UpcomingSessions;
