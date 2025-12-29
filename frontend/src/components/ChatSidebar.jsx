import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ChatSidebar = ({messages}) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/messages/rooms/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setChatUsers(data);
    };

    fetchChatUsers();
  }, [messages]);

  const handleSelectChat = (roomId, userId) => {
    setSelectedRoom(roomId);
    localStorage.setItem('chatUserId', userId);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="w-1/3 p-2 bg-white border-2 border-gray-200 rounded-lg">
      <div className="p-5 font-bold text-2xl text-orange-600 border-b">Chats</div>
      {chatUsers.map(({ roomId, user, lastMessage,lastTimestamp}) => (
        <div
          key={roomId}
          onClick={() => handleSelectChat(roomId, user._id)}
          className={`px-5 py-4 cursor-pointer border rounded-3xl mt-2 
          ${selectedRoom === roomId ? 'bg-orange-50' : 'hover:bg-orange-50'}`}
        >

          <p className="font-semibold text-gray-800">{user.fullname}</p>
          <p className="hidden md:block text-sm text-gray-600 italic">{lastMessage}</p>
          <p className="hidden md:block text-sm text-gray-600 italic" >{lastTimestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
