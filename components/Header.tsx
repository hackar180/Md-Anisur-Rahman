
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#0a2e1f] text-white shadow-xl sticky top-0 z-50 border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="flex items-center space-x-4 mb-4 md:mb-0 group cursor-pointer">
          <div className="bg-white p-2 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-green-300">MXN MODERN HERBAL</h1>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-green-400">সাফল্য ও সেবার ৪৪ বৎসর</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs font-semibold">Official 2025 Digital Catalog</span>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95">
            সদস্য হোন
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
