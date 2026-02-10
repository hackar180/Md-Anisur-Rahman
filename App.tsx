
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ChatInterface from './components/ChatInterface';
import { PRODUCTS, CATEGORIES, BUSINESS_INFO } from './constants';
import { Category } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'business'>('catalog');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1200);
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
        <div className="w-20 h-20 border-4 border-emerald-900 border-t-emerald-400 rounded-full animate-spin mb-6"></div>
        <h1 className="text-white text-2xl font-black tracking-tighter">MXN MODERN HERBAL</h1>
        <p className="text-emerald-400 text-xs mt-2 animate-pulse uppercase tracking-widest font-bold">সেবার ৪৪ বৎসর</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f2]">
      <Header />
      
      {/* Contact Quick Access Bar */}
      <div className="bg-emerald-900 text-white py-2 sticky top-20 z-40 shadow-lg">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-widest">
          <a href={BUSINESS_INFO.contact.whatsapp} target="_blank" className="flex items-center hover:text-emerald-300 transition-colors">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span> Join WhatsApp Group
          </a>
          <a href={BUSINESS_INFO.contact.messenger} target="_blank" className="flex items-center hover:text-emerald-300 transition-colors">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span> Messenger Community
          </a>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-[2rem] shadow-xl border border-slate-100 flex gap-2">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-8 py-3 rounded-[1.8rem] text-sm font-bold transition-all ${activeTab === 'catalog' ? 'bg-emerald-800 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              প্রোডাক্ট ক্যাটালগ
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`px-8 py-3 rounded-[1.8rem] text-sm font-bold transition-all ${activeTab === 'business' ? 'bg-emerald-800 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              বিজনেস প্ল্যান
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            {activeTab === 'catalog' ? (
              <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight">প্রোডাক্ট গ্যালারি</h2>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="পণ্য বা সমস্যা লিখে খুঁজুন..."
                    className="w-full md:w-72 pl-6 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                  {['All', ...CATEGORIES].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={`px-5 py-2.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-emerald-700 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >
                      {cat === 'All' ? 'সব পণ্য' : cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Business Info Section */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-50">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.822a.75.75 0 01.212.087l6 4.5a.75.75 0 010 1.182l-6 4.5a.75.75 0 01-.824 0l-6-4.5a.75.75 0 010-1.182l6-4.5a.75.75 0 01.212-.087zm.356 7.39l4.5-3.375-4.5-3.375-4.5 3.375 4.5 3.375z"/></svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-800">বিজনেস গাইডলাইন</h2>
                      <p className="text-emerald-600 font-bold">বিশ্বাস • সেবা • আয়</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-6 rounded-3xl">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <span className="w-2 h-6 bg-emerald-600 rounded-full mr-3"></span> ১৬টি আয়ের উৎস
                      </h3>
                      <ul className="space-y-3">
                        {BUSINESS_INFO.incomeSources.map((s, i) => (
                          <li key={i} className="flex items-center text-sm font-semibold text-slate-600">
                            <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <span className="w-2 h-6 bg-amber-600 rounded-full mr-3"></span> মেম্বারশিপ প্যাকেজ
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm">
                          <p className="font-bold text-emerald-800 mb-1">MBO / VIP মেম্বার</p>
                          <p className="text-xs text-slate-500">৫০০ পয়েন্ট পারচেজ (৳১০০০–৳১৫০০) + আইডি কার্ড ফি ৳৩১০</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm">
                          <p className="font-bold text-slate-800 mb-1">সরাসরি ইনকাম</p>
                          <p className="text-xs text-slate-500">খুচরা লাভে ৩০% এবং ডাইরেক্ট বোনাস ৩৮% পর্যন্ত সুযোগ।</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-emerald-900 rounded-3xl text-white">
                    <h3 className="text-xl font-bold mb-4">আন্তর্জাতিক মান ও সার্টিফিকেট</h3>
                    <div className="flex flex-wrap gap-3">
                      {['BSTI', 'ISO', 'HACCP', 'GMP', 'FDA', 'HALAL'].map(c => (
                        <span key={c} className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-xs font-black">{c}</span>
                      ))}
                    </div>
                    <p className="mt-4 text-emerald-300 text-xs font-medium leading-relaxed">💯% গুণমান ও বিশ্বাসযোগ্যতার সাথে ৪৪ বছর ধরে আপনাদের পাশে।</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <ChatInterface />
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="text-slate-800 text-lg font-black mb-6 relative">যোগাযোগ ও সহায়তা</h4>
              <div className="space-y-4 relative">
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-emerald-800 text-white rounded-xl flex items-center justify-center font-black">AR</div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{BUSINESS_INFO.contact.name}</p>
                    <p className="text-[10px] font-bold text-emerald-600">{BUSINESS_INFO.contact.rank}</p>
                  </div>
                </div>
                <a 
                  href={BUSINESS_INFO.contact.whatsapp} 
                  target="_blank" 
                  className="block w-full text-center py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold shadow-lg shadow-green-600/20 transition-all active:scale-95"
                >
                  WhatsApp Group
                </a>
                <a 
                  href={BUSINESS_INFO.contact.messenger} 
                  target="_blank" 
                  className="block w-full text-center py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                >
                  Messenger Group
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs mb-4">Developed for MXN Modern Herbal Community • 2025</p>
          <p className="text-slate-300 text-[10px] max-w-lg mx-auto italic">
            সতর্কতা: পণ্য ব্যবহারের পূর্বে চিকিৎসকের পরামর্শ নিন। বিজনেস মেম্বারশিপের জন্য অফিসিয়াল ব্রাঞ্চে যোগাযোগ করুন।
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
