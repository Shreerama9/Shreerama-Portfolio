'use client';

import { useState, useEffect } from 'react';
import Chatbot from '../../components/Chatbot';

export default function ChatbotPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  // Check for system dark mode preference on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 005.646 15.354l2.353 2.353a1 1 0 001.414 0l2.353-2.353zm-4.707-2.292a7 7 0 00-7.07 0 7 7 0 007.07 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Header */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl font-bold mb-4 font-Outfit ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Chat with Shreerama AI
          </h1>
          <p className={`text-lg mb-8 font-Outfit ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I'm your AI assistant powered by Shreerama's professional experience and expertise. 
            Ask me about his projects, technical skills, or career journey.
          </p>
          
          {/* Quick Start Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <button 
              onClick={() => {
                // This will be handled by the chatbot component internally
                const event = new CustomEvent('chatbot-message', { detail: 'Tell me about your key projects' });
                window.dispatchEvent(event);
              }}
              className={`p-4 rounded-lg font-Outfit transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              <h3 className="font-semibold mb-2">🚀 Projects</h3>
              <p className="text-sm">Explore my recent work</p>
            </button>
            
            <button 
              onClick={() => {
                const event = new CustomEvent('chatbot-message', { detail: 'What are your technical skills?' });
                window.dispatchEvent(event);
              }}
              className={`p-4 rounded-lg font-Outfit transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              <h3 className="font-semibold mb-2">💻 Skills</h3>
              <p className="text-sm">Technical expertise</p>
            </button>
            
            <button 
              onClick={() => {
                const event = new CustomEvent('chatbot-message', { detail: 'What can you help me with?' });
                window.dispatchEvent(event);
              }}
              className={`p-4 rounded-lg font-Outfit transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              <h3 className="font-semibold mb-2">🤝 Help</h3>
              <p className="text-sm">How I can assist</p>
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot 
        isOpen={true} 
        onClose={() => {}}
        isDarkMode={isDarkMode}
        alwaysOpen={true}
      />
    </div>
  );
}
