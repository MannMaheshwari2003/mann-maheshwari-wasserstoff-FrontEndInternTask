'use client';

import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, color: string) => void;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA45B', '#A47FE3', 
  '#7FB069', '#D65DB1', '#845EC2', '#FF9671', '#FFC75F'
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[Math.floor(Math.random() * COLORS.length)]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    onLogin(username.trim(), selectedColor);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Join Collaborative Editor</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Choose a username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Choose your color
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                  selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-800 transform scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Join Now
        </button>
      </form>
    </div>
  );
};

export default Login; 