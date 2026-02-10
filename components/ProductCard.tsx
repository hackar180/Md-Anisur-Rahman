
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col h-full hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white/90 backdrop-blur-md rounded-full border border-emerald-100 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-emerald-700 transition-colors">{product.name}</h3>
        {product.size && <p className="text-[11px] font-semibold text-slate-400 mb-3 uppercase tracking-wider">প্যাক সাইজ: {product.size}</p>}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">{product.benefits}</p>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="grid grid-cols-3 gap-1">
          <div className="text-center p-2 rounded-xl bg-white border border-slate-100">
            <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-tighter">MRP</span>
            <span className="text-sm font-black text-slate-700">{product.mrp}৳</span>
          </div>
          <div className="text-center p-2 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="block text-[9px] text-emerald-600 font-bold uppercase tracking-tighter">DP</span>
            <span className="text-sm font-black text-emerald-700">{product.dp}৳</span>
          </div>
          <div className="text-center p-2 rounded-xl bg-orange-50 border border-orange-100">
            <span className="block text-[9px] text-orange-600 font-bold uppercase tracking-tighter">PV</span>
            <span className="text-sm font-black text-orange-700">{product.pv}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
