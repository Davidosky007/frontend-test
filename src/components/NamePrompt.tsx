import React, { useState } from 'react';

interface NamePromptProps {
  onNameSubmit: (name: string) => void;
}

const NamePrompt: React.FC<NamePromptProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      sessionStorage.setItem('chatUsername', name); 
      onNameSubmit(name);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Enter your name to join the chat</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your name"
        />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default NamePrompt;
