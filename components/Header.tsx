
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="bg-white p-1 rounded-full">
            <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">MXN মডার্ণ হারবাল অ্যাসিস্ট্যান্ট</h1>
        </div>
        <div className="flex items-center space-x-4 text-sm font-medium">
          <span className="hidden sm:inline bg-green-600 px-3 py-1 rounded-full">সাফল্য ও সেবার ৪৪ বৎসর</span>
          <span className="bg-white text-green-800 px-3 py-1 rounded-full border border-green-200">Official Catalog 2025</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
