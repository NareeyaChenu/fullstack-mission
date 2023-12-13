// pages/chat.js
"use client"
import { useState } from 'react';

// Assuming you have a list of users
const userList = ["User1", "User2", "User3"];

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
  };

  const handleEnterPress = (e : any) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the "Enter" key (e.g., adding a new line in the textarea)
      handleSendMessage();
    }
  };

  const userList = ["User1", "User2", "User3"];

  const handleUserClick = (user : any) => {
    setSelectedUser(user);
    setMessages([]);
  };

  return (
    <div style={{ display: 'flex', margin: '20px' }}>
      {/* User list on the left */}
      <div style={{ flex: '0 0 20%', padding: '10px', borderRight: '1px solid #ccc' }}>
        <h2>Users</h2>
        <ul>
          {userList.map((user, index) => (
            <li key={index} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
              {user}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area on the right */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
        {/* Display the selected user's name */}
        {selectedUser && <div style={{ marginBottom: '10px' }}>Selected User: {selectedUser}</div>}

        <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map((message, index) => (
            <div key={index} style={{ marginBottom: '10px', textAlign: message.sender === 'user' ? 'left' : 'right' }}>
              {message.sender === 'user' ? 'You: ' : 'Bot: '}
              {message.text}
            </div>
          ))}
        </div>

        {/* Message input and send button */}
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleEnterPress} // Handle "Enter" key press
            placeholder="Type your message..."
            style={{ marginBottom: '10px', padding: '10px', flexGrow: 1 }}
          />
          <button onClick={handleSendMessage} style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;



