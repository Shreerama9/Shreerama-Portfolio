import { useState, useEffect } from "react";

export default function Chatbot({ isOpen, onClose, isDarkMode, alwaysOpen = false }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm Shreerama — an engineer who builds AI systems, full-stack tools, and automation workflows. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle custom events from dedicated page
  useEffect(() => {
    const handleCustomMessage = (event) => {
      const message = event.detail;
      if (message && isOpen) {
        setInput(message);
        // Auto-submit the message
        setTimeout(() => {
          const formEvent = new Event('submit', { cancelable: true });
          const form = document.querySelector('form');
          if (form) {
            form.dispatchEvent(formEvent);
          }
        }, 100);
      }
    };

    window.addEventListener('chatbot-message', handleCustomMessage);
    return () => {
      window.removeEventListener('chatbot-message', handleCustomMessage);
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
        const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const aiReply = {
          role: 'assistant',
          content: `Error: ${errorData.error || response.statusText}`,
        };
        setMessages((prevMessages) => [...prevMessages, aiReply]);
        return;
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: data.reply
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage = {
        role: 'assistant',
        content: 'Error: Could not connect to the bot.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 h-96 md:w-96 md:h-[500px]">
      <div className={`flex flex-col h-full rounded-lg shadow-2xl border ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 rounded-t-lg ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-100 border-gray-200'
        } border-b`}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className={`font-semibold font-Outfit ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Shreerama AI
            </h3>
          </div>
          {!alwaysOpen && (
            <button
              onClick={onClose}
              className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`px-3 py-2 rounded-lg max-w-[80%] text-sm font-Outfit ${
                  msg.role === 'user' 
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.content.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < msg.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className={`px-3 py-2 rounded-lg text-sm font-Outfit ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-100'
                  : 'bg-gray-200 text-gray-800'
              }`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className={`p-3 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex space-x-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-Outfit focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
              } border`}
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500 transition-colors font-Outfit text-sm"
              disabled={!input.trim() || isLoading}
            >    
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
