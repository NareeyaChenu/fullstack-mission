// pages/chat.js
"use client"
import { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SendIcon from '@mui/icons-material/Send';

// Assuming you have a list of users
const userList = ["User1", "User2", "User3"];

type UserType = {
  member_name?: string;
  image_url?: string;
  member_id?: string;

};

type MessageType = {
  message_id?: string,
  event?: EventType,
  message_object?: [MessageObjectType]
};

type EventType = {
  type?: string | null,
  from?: string | null
};

type MessageObjectType = {
  type?: string | null,
  text?: string | null,
  image?: string | null
};


const allmsg: { message: MessageType }[] = [
];

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>('');
  const [selectedUser, setSelectedUser] = useState<UserType | any>(null);
  const [allmessages, setAllMessages] = useState<{ message: MessageType }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<UserType[] | any>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Replace this URL with the actual API endpoint
    const apiUrl = 'http://localhost:5177/api/v1/member';

    // Fetch data from the API using Axios
    axios.get(apiUrl)
      .then(response => setAllUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  useEffect(() => {
    console.log(userId)
    // Replace this URL with the actual API endpoint
    const apiUrl = `http://localhost:5177/api/v1/message?member_id=${userId}`;

    // Fetch data from the API using Axios
    axios.get(apiUrl)
      .then(response => setAllMessages(response.data.reverse()))
      // .then(response => console.log(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  useEffect(() => {
    // Filter users when searchTerm changes
    const filtered = allUsers.filter((user: UserType) =>
      user.member_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]); // Update the filteredUsers when searchTerm or allUsers changes


  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      // Display Snackbar when the message is empty
      setSnackbarOpen(true);
      return;
    }
    const new_msg: { message: MessageType } = {
      message: {
        message_id: "123",
        event: {
          type: "push",
          from: "me"
        },
        message_object: [{
          type: "text",
          text: newMessage,
          image: null
        }]
      }
    };

    allmessages.push(new_msg);
    console.log(allmessages);
    setMessages([...messages, allmessages]);
    setNewMessage('');
  };

  const handleEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the "Enter" key (e.g., adding a new line in the textarea)
      handleSendMessage();
    }
  };

  const handleUserClick = (user: UserType) => {
    setMessages([]);
    setSelectedUser(user);
    setUserId([user.member_id]);
  };

  const handleSnackbarClose = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allmessages]);


  return (
    <div style={{ display: 'flex', margin: '20px' }}>
      {/* User list on the left */}
      <div style={{ flex: '0 0 20%', padding: '15px', borderRight: '1px solid #ccc' }}>
        {/* User search input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            width: '100%',
            boxSizing: 'border-box',
            fontSize: '16px',
            outline: 'none',
          }}
        />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              onClick={() => handleUserClick(user)}
              style={{
                cursor: 'pointer',
                padding: '15px',
                borderBottom: '1px solid #e0e0e0',
                transition: 'background-color 0.3s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                color: '#333',
              }}
            >
              <span>{user.member_name}</span>
              {/* Add any additional elements or icons here if needed */}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area on the right */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
        {/* Display the selected user's name */}
        {selectedUser && (
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            {selectedUser.image_url && (
              <Avatar
                alt={selectedUser.member_name}
                src={selectedUser.image_url}
                style={{
                  width: '80px',
                  height: '80px',
                  marginRight: '20px',
                  border: '2px solid #b1b7bd',
                }}
              />
            )}
            <div>
              <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                Selected User: {selectedUser.member_name}
              </div>
              <div style={{ fontSize: '16px', color: '#555' }}>Channel: {selectedUser.channel}</div>
            </div>
          </div>
        )}

        {/* Chat area on the right */}
        <div style={{ display: 'flex', margin: '10px' }}>
          {/* ... (your existing code) */}
          <div
            ref={chatContainerRef}
            style={{ flex: '1', display: 'flex', flexDirection: 'column', marginLeft: '20px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', height: '500px' }}
          >
            {/* Display messages */}
            {/* Display messages */}
            {allmessages.map((message: any, index: any) => (
              <div key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: message.event.type === "push" ? 'right' : 'left' }}>
                {message.message_objects.map((obj: any, objIndex: any) => (
                  <div key={objIndex} style={{ maxWidth: '70%', wordBreak: 'break-word', borderRadius: '8px', backgroundColor: message.event.type === 'push' ? '#007bff' : '#f0f0f0', color: message.event.type === 'push' ? '#fff' : '#333', padding: '10px', marginLeft: message.event.type === 'push' ? '0' : '10px', marginRight: message.event.type === 'push' ? '10px' : '0' }}>
                    {obj.type === 'text' && <span>{obj.text}</span>}
                    {obj.type === 'image' && <img src={obj.image} alt="Image" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '5px' }} />}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ... (your existing code) */}
        </div>

        {/* Message input and send button */}
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleEnterPress} // Handle "Enter" key press
              placeholder="Type your message..."
              style={{ padding: '10px', flexGrow: 1, border: '1px solid #ccc', borderRadius: '5px', marginRight: '5px' }}
            />
            <AddAPhotoIcon style={{ cursor: 'pointer', marginRight: '5px', color: '#2196F3' }} />
            <button onClick={handleSendMessage} style={{ cursor: 'pointer', border: '1px', padding: '10px', borderRadius: '5px', color: '#2196F3' }}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* ... (previous code) */}

        {/* Snackbar to display when newMessage.trim() === '' */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <MuiAlert onClose={handleSnackbarClose} severity="warning" elevation={6} variant="filled">
            Please enter a message.
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Chat;
