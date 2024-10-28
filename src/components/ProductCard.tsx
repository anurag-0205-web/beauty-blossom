import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h1 className="text-xl font-semibold">{product.name}</h1>
        
        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-2">
          {product.features.map((feature, index) => (
            <span key={index} className="text-sm bg-green-50 text-green-700 px-2 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              {feature}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-lg font-semibold">₹{product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-500 ml-2">(incl. of all taxes)</span>
          </div>
        </div>

        {/* Size */}
        <div className="mt-4">
          <span className="text-sm text-gray-600">Size:</span>
          <div className="inline-block ml-2 px-4 py-1 border border-purple-600 text-purple-600 rounded-md">
            {product.size}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-4 flex items-center">
          <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded">
            <span>{product.reviews.rating}</span>
            <Star className="w-4 h-4 ml-1 fill-current" />
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviews.count} Reviews)
          </span>
        </div>

        {/* Quantity */}
        <div className="mt-4 flex items-center">
          <span className="text-sm text-gray-600 mr-2">Quantity:</span>
          <div className="flex items-center border rounded">
            <button
              onClick={() => quantity > 1 && setQuantity(q => q - 1)}
              className="p-1 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="p-1 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => onAddToCart(quantity)}
            className="bg-white border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition-colors"
          >
            Add to cart
          </button>
          <button 
            onClick={() => {
              onAddToCart(quantity);
              alert('Proceeding to checkout...');
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;