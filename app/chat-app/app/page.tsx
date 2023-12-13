// pages/chat.js
"use client"
import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // eslint-disable-next-line
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
  };

  return (
    <div>
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            {message.sender === 'user' ? 'You: ' : 'Bot: '}
            {message.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ marginBottom: '10px', padding: '10px', flexGrow: 1 }}
        />
        <button onClick={handleSendMessage} style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none' }}>
          Send
        </button>
      </div>
    </div>
  );
};


export default Chat;
