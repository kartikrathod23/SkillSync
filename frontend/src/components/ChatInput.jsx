import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message); // emit via socket
    setMessage('');
  };

  return (
    <div className="p-4 bg-amber-50 border-t flex items-center gap-2 shadow-inner">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
        className="flex-1 border-2 border-orange-300 p-2 rounded-full outline-none text-sm bg-white"
      />
      <button
        onClick={handleSend}
        className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
      >
        Send
      </button>
    </div>

  );
};

export default ChatInput;
