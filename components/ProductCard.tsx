
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-green-100 flex flex-col h-full">
      <div className="p-4 bg-green-50 flex-grow">
        <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-white rounded border border-green-200 mb-2">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{product.name}</h3>
        {product.size && <p className="text-xs text-gray-500 mb-2">প্যাক সাইজ: {product.size}</p>}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{product.benefits}</p>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase">MRP</span>
            <span className="text-sm font-bold text-gray-800">{product.mrp}৳</span>
          </div>
          <div className="flex flex-col border-x border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase">DP</span>
            <span className="text-sm font-bold text-green-600">{product.dp}৳</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase">PV</span>
            <span className="text-sm font-bold text-orange-500">{product.pv}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
