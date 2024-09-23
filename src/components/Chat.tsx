import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { sendMessage, loadMessages, appendMessage } from '../redux/chatSlice';

const PAGE_SIZE = 25;

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const username = sessionStorage.getItem('chatUsername') || 'Anonymous';

  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<string | null>(null);

  // Load initial messages when the component mounts
  useEffect(() => {
    loadMessagesForPage(1);
  }, []);

  // Load more messages when the page changes (when the user scrolls up)
  useEffect(() => {
    if (page > 1) {
      loadMessagesForPage(page);
    }
  }, [page]);

  // Helper function to load messages for a given page
  const loadMessagesForPage = (currentPage: number) => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const startIdx = Math.max(0, savedMessages.length - PAGE_SIZE * currentPage);
    const messagesToLoad = savedMessages.slice(startIdx, savedMessages.length - PAGE_SIZE * (currentPage - 1));

    if (currentPage === 1) {
      // Initial load
      dispatch(loadMessages(messagesToLoad));
    } else {
      // Loading more messages (prepend to the existing list)
      dispatch(loadMessages([...messagesToLoad, ...messages]));
    }

    if (savedMessages.length > 0 && startIdx === 0) {
      const lastMessage = savedMessages[savedMessages.length - 1];
      setLastMessageTimestamp(lastMessage.timestamp);
    }
  };

  // Handle scroll to load more messages
  const handleScroll = () => {
    if (chatBoxRef.current && chatBoxRef.current.scrollTop === 0 && !loading) {
      setLoading(true); 
      setPage(page + 1); 
    }
  };

  // Handle new message sending
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, user: username, timestamp: new Date().toISOString() };
      dispatch(sendMessage(newMessage));
      setMessage('');
    }
  };


  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'chatMessages') {
        const updatedMessages = JSON.parse(e.newValue || '[]');
        const latestMessage = updatedMessages[updatedMessages.length - 1];

        const isMessageAlreadyInStore = messages.some(
          (msg) => msg.timestamp === latestMessage.timestamp && msg.text === latestMessage.text
        );

        if (!isMessageAlreadyInStore && (!lastMessageTimestamp || new Date(latestMessage.timestamp) > new Date(lastMessageTimestamp))) {
          dispatch(appendMessage(latestMessage));
          setLastMessageTimestamp(latestMessage.timestamp);
        }
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [messages, lastMessageTimestamp, dispatch]);

  // Update localStorage when messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="chat-container flex flex-col h-screen bg-gray-100">
      <div
        className="chat-box flex-1 overflow-y-auto p-4"
        onScroll={handleScroll}
        ref={chatBoxRef}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`message mb-4 ${msg.user === username ? 'text-right' : ''}`}>
            <p className="font-semibold">{msg.user}</p>
            <div className={`inline-block p-3 rounded-lg ${msg.user === username ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div>Loading more messages...</div>}
      </div>
      <div className="chat-input p-4 bg-white flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
