import React, { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage }),
      });

      const data = await response.json();
      
      let botResponse;
      if (data.status === 'success') {
        botResponse = {
          type: 'bot',
          text: data.response.text,
          additional_info: data.response.additional_info
        };
      } else {
        botResponse = {
          type: 'bot',
          text: data.message,
        };
      }

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 flex-1 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">CDP Support Assistant</h1>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-100 ml-auto max-w-[80%]'
                  : 'bg-gray-100 mr-auto max-w-[80%]'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.text}</div>
              {message.additional_info && (
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-semibold">{message.additional_info.title}</p>
                  <p>Platform: {message.additional_info.platform}</p>
                  <a
                    href={message.additional_info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-block mt-1"
                  >
                    View Full Documentation →
                  </a>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center">
              <RefreshCw className="animate-spin h-6 w-6 text-gray-500" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Segment, mParticle, Lytics, or Zeotap..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;