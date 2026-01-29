
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ChatInterface from './components/ChatInterface';
import { PRODUCTS, CATEGORIES } from './constants';
import { Category } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate initial data loading to prevent blank screen flash
    const timer = setTimeout(() => setIsInitializing(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.benefits.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#f0f7f4] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-green-900 font-bold text-lg animate-pulse">মডার্ণ ক্যাটালগ লোড হচ্ছে...</h2>
        <p className="text-green-600 text-sm mt-2">প্রকৃতির সাথে থাকুন, আজীবন সুস্থ থাকুন।</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] selection:bg-green-100 selection:text-green-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content: Product Catalog */}
          <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
            <section className="bg-white p-4 sm:p-8 rounded-[2rem] shadow-xl shadow-green-900/5 border border-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">পণ্য তালিকা</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">আপনার পছন্দের পণ্যটি খুঁজুন</p>
                </div>
                
                <div className="relative group w-full md:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="নাম বা সমস্যা লিখে খুঁজুন..."
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-600 focus:bg-white outline-none transition-all group-hover:border-slate-300"
                  />
                  <svg className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-6 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === 'All' 
                      ? 'bg-green-800 text-white shadow-lg shadow-green-900/20' 
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  সব পণ্য
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === cat 
                        ? 'bg-green-800 text-white shadow-lg shadow-green-900/20' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">দুঃখিত, কোনো পণ্য পাওয়া যায়নি!</h3>
                  <p className="text-slate-500 mt-2 max-w-xs mx-auto">আপনার সার্চ কুয়েরি পরিবর্তন করে অথবা অন্য ক্যাটাগরি সিলেক্ট করে চেষ্টা করুন।</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar: Chat Assistant */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-28 space-y-6">
              <ChatInterface />
              
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2rem] border border-orange-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                  <svg className="w-16 h-16 text-orange-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-[11px] font-black text-orange-800 uppercase tracking-widest mb-4 flex items-center">
                  <span className="w-5 h-[1px] bg-orange-300 mr-2"></span>
                  দ্রুত একশন
                </h4>
                <ul className="space-y-3">
                  {[
                    { text: 'উচ্চ রক্তচাপের পণ্য', query: 'রক্তচাপ' },
                    { text: 'হজম সমস্যার সমাধান', query: 'হজম' },
                    { text: 'চুল পড়া রোধের উপায়', query: 'চুল পড়া' },
                    { text: 'ওজন কমানোর ওষুধ', query: 'ওজন' }
                  ].map((item, idx) => (
                    <li 
                      key={idx}
                      className="group flex items-center text-[13px] font-bold text-slate-700 cursor-pointer hover:text-green-800 transition-colors"
                      onClick={() => {
                        setSearchQuery(item.query);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                      {item.text}
                      <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-8 h-[1px] bg-slate-200"></div>
            <div className="w-2 h-2 bg-green-700 rotate-45"></div>
            <div className="w-8 h-[1px] bg-slate-200"></div>
          </div>
          <p className="text-slate-800 font-bold text-sm mb-2">মডার্ণ হারবাল গ্রুপ - ২০২৫</p>
          <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">এই প্ল্যাটফর্মটি কেবলমাত্র তথ্যমূলক উদ্দেশ্যে তৈরি। যেকোনো স্বাস্থ্য বিষয়ক সিদ্ধান্ত গ্রহণের আগে অবশ্যই রেজিস্টার্ড চিকিৎসকের পরামর্শ নিন।</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
