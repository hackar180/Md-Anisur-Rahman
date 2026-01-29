
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
    // Artificial delay to ensure all assets are ready and show branding
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1200);
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
      <div className="fixed inset-0 bg-[#0a2e1f] flex flex-col items-center justify-center z-[9999]">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-green-800 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-white text-3xl font-black tracking-tighter mb-2">MXN MODERN HERBAL</h1>
          <p className="text-emerald-400 text-sm font-bold tracking-widest animate-pulse">ডিজিটাল ক্যাটালগ লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content: Product Catalog */}
          <div className="lg:col-span-8 space-y-6 order-2 lg:order-1">
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center">
                    পণ্য তালিকা
                    <span className="ml-3 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                      {filteredProducts.length}টি পণ্য
                    </span>
                  </h2>
                  <p className="text-slate-500 mt-2 font-medium">প্রকৃতি থেকে সংগৃহীত শুদ্ধ হারবাল পণ্যসমূহ</p>
                </div>
                
                <div className="relative group w-full md:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="নাম বা উপকারিতা লিখে খুঁজুন..."
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  />
                  <svg className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-6 py-3 rounded-2xl text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === 'All' 
                      ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-900/20' 
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-200 hover:text-emerald-700'
                  }`}
                >
                  সব পণ্য
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-2xl text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === cat 
                        ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-900/20' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-200 hover:text-emerald-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-inner">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">দুঃখিত, কোনো পণ্য পাওয়া যায়নি!</h3>
                  <p className="text-slate-500 mt-2">অন্য কোনো নাম বা ক্যাটাগরি দিয়ে চেষ্টা করুন।</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Chat Assistant */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              <ChatInterface />
              
              <div className="p-8 bg-gradient-to-br from-emerald-900 to-green-950 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em] mb-4">দ্রুত খুঁজে নিন</h4>
                <div className="space-y-3 relative z-10">
                  {[
                    { text: 'হজম সমস্যার সমাধান', query: 'হজম' },
                    { text: 'চুল পড়া রোধের শ্যাম্পু', query: 'শ্যাম্পু' },
                    { text: 'ডায়াবেটিস নিয়ন্ত্রণ', query: 'করলা' },
                    { text: 'স্মৃতিশক্তি বৃদ্ধির ওষুধ', query: 'স্মৃতি' }
                  ].map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setSearchQuery(item.query);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full text-left group flex items-center text-sm font-semibold hover:text-emerald-400 transition-colors py-1"
                    >
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-all"></span>
                      {item.text}
                      <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tighter">MXN MODERN HERBAL</h3>
          </div>
          <p className="text-slate-500 text-sm font-medium mb-2">সাফল্য ও সেবার ৪৪ বৎসর - ২০২৫</p>
          <p className="text-slate-400 text-xs max-w-lg mx-auto leading-relaxed px-4">
            এটি একটি আধুনিক ডিজিটাল ক্যাটালগ এবং পরামর্শক। কোনো ওষুধের ব্যবহারের আগে অবশ্যই অভিজ্ঞ চিকিৎসকের পরামর্শ নিন। প্রাকৃতিক চিকিৎসা দীর্ঘমেয়াদী সুফল বয়ে আনে।
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
