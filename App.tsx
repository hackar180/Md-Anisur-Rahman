
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ChatInterface from './components/ChatInterface';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES, BUSINESS_INFO } from './constants';
import { Category, Product } from './types';
import { generateProductImage, IMAGE_PROMPTS } from './services/geminiService';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'business'>('catalog');
  const [isInitializing, setIsInitializing] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: Category.TOILETRIES,
    mrp: 0,
    dp: 0,
    pv: 0
  });
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof IMAGE_PROMPTS>('shampoo');

  useEffect(() => {
    // Load products from initial constants + local storage
    const savedProducts = localStorage.getItem('mxn_user_products');
    const userProducts = savedProducts ? JSON.parse(savedProducts) : [];
    setProducts([...INITIAL_PRODUCTS, ...userProducts]);
    
    const timer = setTimeout(() => setIsInitializing(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.imageUrl) return;

    const productToAdd: Product = {
      ...newProduct as Product,
      id: `user-${Date.now()}`
    };

    const updatedUserProducts = [...(products.filter(p => p.id.startsWith('user-'))), productToAdd];
    localStorage.setItem('mxn_user_products', JSON.stringify(updatedUserProducts));
    setProducts([...INITIAL_PRODUCTS, ...updatedUserProducts]);
    setShowAddModal(false);
    setNewProduct({ category: Category.TOILETRIES, mrp: 0, dp: 0, pv: 0 });
  };

  const handleAIImageGen = async () => {
    setIsGeneratingImage(true);
    try {
      const url = await generateProductImage(selectedStyle, newProduct.name);
      setNewProduct(prev => ({ ...prev, imageUrl: url }));
    } catch (err) {
      alert("ছবি তৈরিতে সমস্যা হয়েছে। এপিআই কী চেক করুন।");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.benefits.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-[#0a2e1f] flex flex-col items-center justify-center z-[9999]">
        <div className="w-20 h-20 border-4 border-emerald-900 border-t-emerald-400 rounded-full animate-spin mb-6"></div>
        <h1 className="text-white text-3xl font-black tracking-tighter">MXN MODERN HERBAL</h1>
        <p className="text-emerald-400 text-sm mt-2 animate-pulse uppercase tracking-widest font-bold">সেবার ৪৪ বৎসর</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f2] selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      
      {/* Quick Contact Bar */}
      <div className="bg-emerald-800 text-white py-2.5 sticky top-20 z-40 shadow-lg border-b border-emerald-700">
        <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-bold uppercase tracking-wider">মডার্ণ এআই ২৪/৭ চালু আছে</span>
          </div>
          <div className="h-4 w-[1px] bg-emerald-700 hidden sm:block"></div>
          <button onClick={() => setShowAddModal(true)} className="bg-white text-emerald-900 px-4 py-1 rounded-full text-xs font-black shadow-lg hover:bg-emerald-100 transition-colors">
            + নতুন পণ্য যোগ করুন
          </button>
          <div className="h-4 w-[1px] bg-emerald-700 hidden sm:block"></div>
          <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="flex items-center gap-2 text-xs font-black bg-emerald-700 hover:bg-emerald-600 px-4 py-1.5 rounded-full transition-all border border-emerald-500/30">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.87 4.87l.774-1.548a1 1 0 011.06-.539l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            কল করুন: {BUSINESS_INFO.contact.phone}
          </a>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 flex gap-2 border border-white">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-10 py-4 rounded-[2rem] text-sm font-black transition-all duration-300 flex items-center ${activeTab === 'catalog' ? 'bg-emerald-800 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              প্রোডাক্ট ক্যাটালগ
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`px-10 py-4 rounded-[2rem] text-sm font-black transition-all duration-300 flex items-center ${activeTab === 'business' ? 'bg-emerald-800 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              আয়ের সুযোগ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {activeTab === 'catalog' ? (
              <div className="bg-white p-6 sm:p-12 rounded-[3rem] shadow-2xl border border-white">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-10">
                  <h2 className="text-4xl font-black text-slate-800 tracking-tighter">প্রোডাক্ট গ্যালারি</h2>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="খুঁজুন..."
                    className="w-full md:w-80 pl-6 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all ${selectedCategory === 'All' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    সব পণ্য ({products.length})
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-[3rem] shadow-xl">
                 <h2 className="text-3xl font-black mb-8 text-emerald-900">এমএক্সএন মেম্বারশিপ ও আয়ের উৎস</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                      <h4 className="font-black text-emerald-800 mb-4">💎 VIP সুবিধা</h4>
                      <ul className="space-y-2 text-sm text-slate-600 font-bold">
                        {BUSINESS_INFO.membership.vip.benefits.map((b,i) => <li key={i}>✅ {b}</li>)}
                      </ul>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                      <h4 className="font-black text-orange-800 mb-4">💰 আয়ের উৎসসমূহ</h4>
                      <ul className="space-y-2 text-sm text-slate-600 font-bold">
                        {BUSINESS_INFO.incomeSources.map((s,i) => <li key={i}>🔸 {s}</li>)}
                      </ul>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Contact Card with Phone Number */}
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-50 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16"></div>
              <h4 className="text-2xl font-black text-slate-800 mb-8 relative">লিডারের সাথে যোগাযোগ</h4>
              
              <div className="space-y-6 relative">
                <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-16 h-16 bg-emerald-800 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-emerald-900/20">AR</div>
                  <div>
                    <p className="text-lg font-black text-slate-800 leading-none mb-1">{BUSINESS_INFO.contact.name}</p>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{BUSINESS_INFO.contact.rank}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <a 
                    href={`tel:${BUSINESS_INFO.contact.phone}`}
                    className="flex items-center justify-center gap-3 w-full py-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black shadow-xl shadow-emerald-900/20 transition-all active:scale-95 group"
                  >
                    <svg className="w-6 h-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                      <path fillRule="evenodd" d="M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    সরাসরি কল করুন
                  </a>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href={BUSINESS_INFO.contact.whatsapp} 
                      target="_blank" 
                      className="flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95"
                    >
                      WhatsApp
                    </a>
                    <a 
                      href={BUSINESS_INFO.contact.messenger} 
                      target="_blank" 
                      className="flex items-center justify-center gap-2 py-4 bg-[#006AFF] hover:bg-[#005cd9] text-white rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95"
                    >
                      Messenger
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ChatInterface />
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-emerald-900 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-black">নতুন পণ্য যোগ করুন</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-8 space-y-6 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2">পণ্যের নাম</label>
                    <input required type="text" value={newProduct.name || ''} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">MRP</label>
                      <input type="number" value={newProduct.mrp} onChange={e => setNewProduct({...newProduct, mrp: +e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">DP</label>
                      <input type="number" value={newProduct.dp} onChange={e => setNewProduct({...newProduct, dp: +e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">PV</label>
                      <input type="number" value={newProduct.pv} onChange={e => setNewProduct({...newProduct, pv: +e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2">উপকারিতা</label>
                    <textarea rows={3} value={newProduct.benefits || ''} onChange={e => setNewProduct({...newProduct, benefits: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"></textarea>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2">AI ইমেজ জেনারেটর</label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.keys(IMAGE_PROMPTS).map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setSelectedStyle(style as any)}
                        className={`py-2 px-3 rounded-xl text-[10px] font-black uppercase border transition-all ${selectedStyle === style ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-emerald-300'}`}
                      >
                        {style} স্টাইল
                      </button>
                    ))}
                  </div>
                  
                  <div className="aspect-square bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden">
                    {newProduct.imageUrl ? (
                      <img src={newProduct.imageUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6">
                        <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <p className="text-[10px] text-slate-400 font-bold">ইমেজ প্রিভিউ</p>
                      </div>
                    )}
                    {isGeneratingImage && (
                      <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest">এআই ছবি তৈরি করছে...</p>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAIImageGen}
                    disabled={isGeneratingImage || !newProduct.name}
                    className="w-full py-4 bg-emerald-100 text-emerald-800 rounded-2xl font-black text-sm hover:bg-emerald-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
                    AI দিয়ে ছবি বানান
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-4">
                <button type="submit" className="flex-grow py-5 bg-emerald-800 text-white rounded-2xl font-black shadow-xl shadow-emerald-900/20 hover:scale-[1.02] transition-all active:scale-95">ক্যাটালগে সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
