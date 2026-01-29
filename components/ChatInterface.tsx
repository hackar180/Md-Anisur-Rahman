
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'আসসালামু আলাইকুম! আমি মডার্ণ হারবাল এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে পণ্যের দাম, PV এবং যেকোনো স্বাস্থ্য সমস্যায় পরামর্শ দিয়ে সাহায্য করতে পারি। আপনি আজ কি জানতে চান?' }
  ]);
  const [sources, setSources] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    setSources([]);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const result = await getGeminiResponse(userMsg, history);
    setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    setSources(result.sources || []);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100 ring-1 ring-black/5">
      <div className="bg-gradient-to-r from-green-800 to-green-600 p-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-none">মডার্ণ এআই অ্যাসিস্ট্যান্ট</h2>
            <p className="text-green-100 text-[10px] mt-1 flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
              অনলাইন পরামর্শক
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-[#fcfdfc]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm transition-all duration-300 ${
              msg.role === 'user' 
                ? 'bg-green-700 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-green-50 rounded-tl-none ring-1 ring-green-50/50'
            }`}>
              {msg.text}
              
              {msg.role === 'model' && i === messages.length - 1 && sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-green-50">
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-2">আরও জানুন:</p>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((url, idx) => (
                      <a 
                        key={idx} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 transition-colors border border-green-200"
                      >
                        তথ্যসূত্র {idx + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-green-50 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></div>
              </div>
              <span className="text-xs text-slate-400 font-medium italic">অ্যাসিস্ট্যান্ট ভাবছে...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="আপনার সমস্যা বা পণ্যের নাম লিখুন..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-5 pr-14 py-4 text-sm focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bg-green-700 text-white p-2.5 rounded-xl hover:bg-green-800 transition-all shadow-lg disabled:bg-slate-300 disabled:shadow-none"
          >
            <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-400 mt-3">এআই ভুল করতে পারে। গুরুতর অসুস্থতায় চিকিৎসকের পরামর্শ নিন।</p>
      </div>
    </div>
  );
};

export default ChatInterface;
