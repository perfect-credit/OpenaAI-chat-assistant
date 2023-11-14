import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../config";


const ChatList = ({ selectedIP }) => {
    const [formattedChats, setFormattedChats] = useState([]);

    useEffect(() => {
        // Fetch chats for the selected IP from your API or database
        const fetchChats = async () => {
          try {
            const response = await fetch(`${BASE_URL}/chats/${selectedIP}`);
            if (response.ok) {
              const data = await response.json();
    
              // Check if data.conversations exists before trying to access it
              if (data.chats) {
                // Format the chats and update the state
                const formattedChats = data.chats.reduce((accumulator, chat) => {
                  accumulator.push(
                    { type: "user", content: chat.userQuestion },
                    { type: "assistant", content: chat.assistantResponse }
                  );
                  return accumulator;
                }, []);
    
                setFormattedChats(formattedChats);
              } else {
                console.error('No conversations found in data:', data);
              }
            } else {
              console.error('Error fetching chats:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching chats:', error.message);
          }
        };
    
        fetchChats();
      }, [selectedIP]);
  

  return (
    <div className="chat-container">     
      <h2>Chats for IP = {selectedIP}</h2>
      <div className="chat-messages">
      {formattedChats.map((chat, index) => (
          <div key={index} className={`message ${chat.type}`}>
            {chat.content}
          </div>
        ))}
        </div>
    </div>
  );
};

export default ChatList;
