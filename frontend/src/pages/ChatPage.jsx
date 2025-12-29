import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import ChatToolsPanel from "../components/ChatToolsPanel";
import DashboardHeader from '../components/DashboardHeader';
const API_BASE = import.meta.env.VITE_API_BASE_URL;


import socket from '../components/socket';


const ChatPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const myId = localStorage.getItem('userId');
  const receiverId = localStorage.getItem('chatUserId');

  useEffect(() => {
    const token = localStorage.getItem('token');

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('joinRoom', roomId);
    });

    const fetchMessages = async () => {
      const res = await fetch(`${API_BASE}/api/messages/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('connect');
    };
  }, [roomId, receiverId]);



  const handleSend = async (content) => {

    const message = {
      sender: myId,
      receiver: receiverId,
      content,
    };

    // Save to DB
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(message)
    });

    const savedMessage = await res.json();

    socket.emit('sendMessage', { roomId, message: savedMessage });
    // setMessages((prev) => [...prev, savedMessage]);
  };


  return (
    <div className='h-[90vh]'>
    <div className='p-2 border-b-4 border-gray-200 bg-white shadow-sm'>
      <DashboardHeader />
    </div>
    <div className="flex h-screen">
        <ChatSidebar messages={messages} />
        <ChatWindow messages={messages} onSend={handleSend} myId={myId} receiverId={receiverId} />
        <ChatToolsPanel receiverId={receiverId} />
    </div>
    </div>
  );
};

export default ChatPage;
