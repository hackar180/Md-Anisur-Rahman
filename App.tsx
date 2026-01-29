
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ChatInterface from './components/ChatInterface';
import { PRODUCTS, CATEGORIES } from './constants';
import { Category } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.benefits.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content: Product Catalog */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">পণ্য তালিকা ও বিস্তারিত</h2>
                
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="পণ্য খুঁজুন..."
                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'All' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  সব পণ্য
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-green-600 text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
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
                <div className="py-20 text-center">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">দুঃখিত, কোনো পণ্য পাওয়া যায়নি!</h3>
                  <p className="text-gray-500">আপনার সার্চ কুয়েরি পরিবর্তন করে চেষ্টা করুন।</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar: Chat Assistant */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <ChatInterface />
              
              <div className="mt-6 p-5 bg-orange-50 rounded-2xl border border-orange-100">
                <h4 className="text-sm font-bold text-orange-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  দ্রুত সাহায্য
                </h4>
                <ul className="text-xs text-orange-700 space-y-2 font-medium">
                  <li className="cursor-pointer hover:underline" onClick={() => setSearchQuery('রক্তচাপ')}>• উচ্চ রক্তচাপের পণ্য দেখুন</li>
                  <li className="cursor-pointer hover:underline" onClick={() => setSearchQuery('হজম')}>• হজমের সমস্যার সমাধান</li>
                  <li className="cursor-pointer hover:underline" onClick={() => setSearchQuery('চুল পড়া')}>• চুল পড়া রোধের উপায়</li>
                  <li className="cursor-pointer hover:underline" onClick={() => setSearchQuery('ওজন')}>• দ্রুত ওজন কমানোর পণ্য</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-10 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-2">© ২০২৫ মডার্ণ হারবাল গ্রুপ - প্রকৃতির সাথে থাকুন, আজীবন সুস্থ থাকুন।</p>
          <p className="text-gray-400 text-xs">এই অ্যাপটি কেবলমাত্র তথ্যমূলক উদ্দেশ্যে তৈরি। যেকোনো ওষুধ সেবনের আগে চিকিৎসকের পরামর্শ নিন।</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
