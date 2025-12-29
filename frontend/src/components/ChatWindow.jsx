import React, { useRef, useEffect, useState } from 'react';
import ChatInput from './ChatInput';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ChatWindow = ({ messages, onSend, myId, receiverId }) => {
  const endRef = useRef(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchProfile = async () => {
      const res = await fetch(`${API_BASE}/api/auth/users/${receiverId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProfile(data);
    };

    fetchProfile();
  }, [receiverId]);

  return (
    <div className="flex flex-col h-[90vh] w-2/3 bg-gradient-to-t from-orange-100 to-white">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-sm mb-4 p-3 rounded-xl text-sm shadow ${
              msg.sender === myId ? 'bg-orange-100 ml-auto text-right' : 'bg-white'
            }`}
          >
            <div className='flex gap-2'>
              <p className="text-md font-bold text-gray-700">
                {msg.sender === myId ? 'You:' : `${profile?.fullname || 'User'}:`}
              </p>
              <p className="text-gray-800">{msg.text || msg.content}</p>
            </div>
            <span className="text-xs text-gray-400 block mt-1">
              {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <ChatInput onSend={onSend} />
    </div>
  );
};

export default ChatWindow;
