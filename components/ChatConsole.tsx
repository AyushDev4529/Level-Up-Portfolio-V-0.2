import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, Terminal, Loader2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Greetings, Traveler! I am Bit, your automated guide. Ask me anything about this developer's journey.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Filter messages for history (excluding the very first greeting if needed, but Gemini handles it fine)
    const history = messages.filter(m => m.id !== 'init');
    const responseText = await sendMessageToGemini(history, userMsg.text);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const content = !isOpen ? (
    <button 
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-4 bg-slate-900 border-2 border-neon-blue text-neon-blue p-3 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:bg-slate-800 transition-all hover:scale-110 z-[100] group"
    >
      <Terminal className="w-6 h-6 animate-pulse-fast group-hover:animate-none" />
      <span className="absolute right-12 top-2 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Open Comms
      </span>
    </button>
  ) : (
    <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-slate-900/95 backdrop-blur border-2 border-neon-blue rounded-lg shadow-2xl flex flex-col z-[100] overflow-hidden font-mono text-sm h-[500px] max-h-[80vh]">
      {/* Header */}
      <div className="bg-slate-800/80 p-2 flex justify-between items-center border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-2 text-neon-blue">
          <Terminal size={16} />
          <span className="font-bold tracking-wider">COMMS_LINK_V2.0</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white"
        >
          <Minimize2 size={16} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-lg border ${
                msg.role === 'user' 
                  ? 'bg-slate-800 border-slate-600 text-white rounded-br-none' 
                  : 'bg-slate-900 border-neon-blue/50 text-neon-blue rounded-bl-none shadow-[0_0_10px_rgba(0,255,255,0.1)]'
              }`}
            >
              <p>{msg.text}</p>
              <div className="text-[10px] opacity-50 mt-1 text-right">
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-neon-blue/30 text-neon-blue p-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter command..."
          className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-neon-blue transition-colors"
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-neon-blue/10 border border-neon-blue text-neon-blue p-2 rounded hover:bg-neon-blue/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );

  // Use React Portal to render outside the main DOM hierarchy to ensure position:fixed works correctly on all devices
  return createPortal(content, document.body);
};

export default ChatConsole;