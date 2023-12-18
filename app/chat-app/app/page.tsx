// pages/chat.js
"use client"
import { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';
import axios from 'axios';


// Assuming you have a list of users
const userList = ["User1", "User2", "User3"];

type UserType = {
  member_name?: string;
  image_url?: string;
  member_id? : string;

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

var users = [
  {
    name: "User1",
    image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    channel: "channel1"
  },
  {
    name: "User2",
    image:  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    channel: "channel1"
  },
  {
    name: "User3",
    image:  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    channel: "channel1"
  },
];

const allmsg: { message: MessageType }[] = [
  {
    message: {
      message_id: "1",
      event: {
        type: "receive",
        from: "me",
      },
      message_object: [
        {
          type: "text",
          text: "Hii",
          image: null,
        },
      ],
    },
  },
];

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>('');
  const [selectedUser, setSelectedUser] = useState<UserType | any>(null);
  const [allmessages, setAllMessages] = useState<{ message: MessageType }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [allUsers , setAllUsers] = useState<UserType[] | any>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

  // Save data to localStorage whenever allmessages changes
  useEffect(() => {
    setAllMessages(allmsg);
  }, [allmsg]);

  useEffect(() => {
    // Replace this URL with the actual API endpoint
    const apiUrl = 'http://localhost:5177/api/v1/member';

    // Fetch data from the API using Axios
    axios.get(apiUrl)
    .then(response => setAllUsers(response.data))
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter users when searchTerm changes
    const filtered = allUsers.filter((user : UserType) =>
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
    setSelectedUser(user);
    setMessages([]);
    setAllMessages([]);
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
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
              {user.member_name}
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
                  width: '80px', // Adjust the width to make the Avatar larger
                  height: '80px', // Adjust the height accordingly
                  marginRight: '20px',
                  border: '2px solid #b1b7bd', // Add a border for a stylish look
                }}
              />
            )}
            <div>
              <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                Selected User: {selectedUser.member_name}
              </div>
              <div style={{ marginBottom: '10px', fontSize: '16px', color: '#555' }}>Channel: {selectedUser.channel}</div>
            </div>
          </div>
        )}

        {/* Chat area on the right */}
        <div style={{ display: 'flex', margin: '10px' }}>
          {/* ... (your existing code) */}
          <div
            ref={chatContainerRef}
            style={{ flex: '1', display: 'flex', flexDirection: 'column', marginLeft: '20px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', height: '400px' }}
          >
            {/* Display messages */}
            {allmessages.map((message: any, index: any) => (
              <div key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: message.message.event.type === "push" ? 'right' : 'left' }}>
                {message.message.message_object[0].text}
              </div>
            ))}
          </div>

          {/* ... (your existing code) */}
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
