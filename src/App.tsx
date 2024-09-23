import React, { useState } from 'react';
import Chat from './components/Chat';
import NamePrompt from './components/NamePrompt';

const App: React.FC = () => {
  const [username, setUsername] = useState(sessionStorage.getItem('chatUsername')); // Use sessionStorage for username

  return (
    <div>
      {username ? <Chat /> : <NamePrompt onNameSubmit={setUsername} />}
    </div>
  );
};

export default App;
