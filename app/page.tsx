'use client';

import React, { useState } from 'react';
import Login from './components/Login';
import Editor from './components/Editor';
import SessionManager from './components/SessionManager';

export default function Home() {
  const [user, setUser] = useState<{ username: string; color: string } | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleLogin = (username: string, color: string) => {
    setUser({ username, color });
  };

  const handleJoinSession = (id: string) => {
    setSessionId(id);
  };

  const handleLogout = () => {
    setUser(null);
    setSessionId(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Live Collaborative Editor</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600 font-medium">
            Real-time editing. Modern UI. No backend required.
          </p>
        </header>

        {!user ? (
          <div className="animate-fade-in">
            <Login onLogin={handleLogin} />
          </div>
        ) : !sessionId ? (
          <SessionManager onJoinSession={handleJoinSession} />
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: user.color }}></span>
                <span className="font-semibold text-gray-800">{user.username}</span>
                <span className="text-xs text-gray-400">(You)</span>
                <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Session: {sessionId}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
            <Editor username={user.username} userColor={user.color} sessionId={sessionId} />
            <div className="mt-8 bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100">
              <ul className="list-disc list-inside space-y-1">
                <li>All users in this session edit the same document in real-time</li>
                <li>Active users are shown at the top</li>
                <li>Each user has a unique color and name</li>
                <li>No backend or database required (WebRTC powered)</li>
                <li>Modern, responsive, and interactive UI</li>
                <li>Use the Save button to download the document</li>
              </ul>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} Live Collaborative Editor. Built with Next.js, Froala, Y.js, and TailwindCSS.</p>
        </footer>
      </div>
    </main>
  );
}
