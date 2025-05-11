'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface SessionManagerProps {
  onJoinSession: (sessionId: string) => void;
}

const SessionManager: React.FC<SessionManagerProps> = ({ onJoinSession }) => {
  const [sessionInput, setSessionInput] = useState('');
  const [error, setError] = useState('');

  const createNewSession = () => {
    const newSessionId = uuidv4().substring(0, 8);
    onJoinSession(newSessionId);
  };

  const joinExistingSession = () => {
    if (!sessionInput.trim()) {
      setError('Please enter a session ID');
      return;
    }
    if (!/^[a-zA-Z0-9-]+$/.test(sessionInput)) {
      setError('Session ID should only contain letters, numbers and hyphens');
      return;
    }
    onJoinSession(sessionInput);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto animate-fade-in">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 tracking-tight">
        Join or Create a Session
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
          {error}
        </div>
      )}
      <button
        onClick={createNewSession}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow mb-6 transition-all duration-200"
      >
        + Create New Session
      </button>
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-400">or</span>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={sessionInput}
          onChange={e => { setSessionInput(e.target.value); setError(''); }}
          placeholder="Enter session ID"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <button
          onClick={joinExistingSession}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold text-lg transition-all duration-200"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default SessionManager; 