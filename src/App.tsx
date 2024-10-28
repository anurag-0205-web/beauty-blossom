import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Shield, Truck, Timer } from 'lucide-react';
import ProductCard from './components/ProductCard';
import DeliveryEstimator from './components/DeliveryEstimator';
import Cart from './components/Cart';
import SearchBar from './components/SearchBar';
import { Product } from './types';
import { products } from './data/products';
import { calculateDeliveryDate } from './utils/delivery';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pincode, setPincode] = useState('');
  const [cartItems, setCartItems] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  // Memoize filtered products for performance
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, category]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'haircare', name: 'Hair Care' },
    { id: 'perfumes', name: 'Perfumes' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1 flex items-center justify-start">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-2xl font-bold text-purple-600">Beauty Blossom</h1>
            </div>
            
            <div className="flex-1 flex items-center justify-end">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="bg-white shadow-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`text-sm font-medium transition-colors ${
                  category === cat.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProduct ? (
          <DeliveryEstimator
            pincode={pincode}
            setPincode={setPincode}
            product={selectedProduct}
          />
        ) : null}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(quantity) => {
                addToCart(product, quantity);
                setSelectedProduct(product);
              }}
            />
          ))}
        </div>
      </main>

      {/* Trust Badges */}
      <div className="bg-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600 mr-2" />
              <span>101% Original</span>
            </div>
            <div className="flex items-center justify-center">
              <Timer className="w-6 h-6 text-purple-600 mr-2" />
              <span>Lowest Price</span>
            </div>
            <div className="flex items-center justify-center">
              <Truck className="w-6 h-6 text-purple-600 mr-2" />
              <span>Free Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={cartTotal}
      />
    </div>
  );
}

export default App;