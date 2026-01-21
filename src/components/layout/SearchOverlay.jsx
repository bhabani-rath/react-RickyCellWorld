import { useState, useEffect, useRef } from "react";

// Mock search data
const recentSearches = ["iPhone 15", "Samsung TV", "Washing Machine"];
const trendingSearches = [
  "iPhone 15",
  "Samsung TV",
  "AC",
  "Laptop",
  "Refrigerator",
];
const browseCategories = [
  { icon: "📱", name: "Mobiles" },
  { icon: "📺", name: "TVs" },
  { icon: "🧊", name: "Fridges" },
  { icon: "❄️", name: "ACs" },
];

// Mock product suggestions
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "Mobile Phones",
    price: "₹1,59,900",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "Mobile Phones",
    price: "₹1,29,999",
  },
  {
    id: 3,
    name: "MacBook Air M3",
    category: "Laptops",
    price: "₹1,14,900",
  },
  {
    id: 4,
    name: 'Samsung 55" 4K Smart TV',
    category: "TVs",
    price: "₹54,990",
  },
];

function SearchOverlay({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setFilteredProducts([]);
    }
  }, [isOpen]);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Panel - Desktop */}
      <div className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-[640px] animate-fadeSlideDown">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-100">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50">
              <span className="material-symbols-outlined text-primary">
                search
              </span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products, brands..."
              className="flex-1 text-base font-medium text-slate-800 placeholder:text-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-slate-400 text-lg">
                  close
                </span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {filteredProducts.length > 0 ? (
              <div className="p-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Products
                </div>
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <a
                      key={product.id}
                      href="#"
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">
                          smartphone
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">
                          {product.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {product.category}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-primary">
                        {product.price}
                      </div>
                      <span className="material-symbols-outlined text-slate-400">
                        arrow_forward_ios
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-5 space-y-6">
                {/* Recent Searches */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Recent Searches
                    </span>
                    <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-2 bg-slate-100 text-sm font-medium text-slate-600 rounded-lg hover:bg-blue-50 hover:text-primary transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Trending
                    </span>
                    <span>🔥</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-2 bg-blue-50 text-sm font-medium text-primary rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Browse Categories */}
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                    Browse Categories
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {browseCategories.map((category) => (
                      <a
                        key={category.name}
                        href="#"
                        className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-xs font-semibold text-slate-600">
                          {category.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          {searchQuery && (
            <div className="p-4 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 h-12 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                <span className="material-symbols-outlined">search</span>
                <span>Search for "{searchQuery}"</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Panel - Mobile (Full Screen) */}
      <div className="md:hidden absolute inset-0 bg-white animate-fadeIn">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-100 safe-area-inset-top">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50">
            <span className="material-symbols-outlined text-primary">
              search
            </span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products, brands..."
            className="flex-1 text-base font-medium text-slate-800 placeholder:text-slate-400 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="w-8 h-8 flex items-center justify-center rounded-lg"
            >
              <span className="material-symbols-outlined text-slate-400 text-lg">
                close
              </span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-sm font-semibold text-primary"
          >
            Cancel
          </button>
        </div>

        {/* Search Results - Mobile */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <div className="p-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                Products
              </div>
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <a
                    key={product.id}
                    href="#"
                    className="flex items-center gap-4 p-3 rounded-xl active:bg-slate-50"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">
                        smartphone
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {product.category}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-primary">
                      {product.price}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* Recent Searches */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Recent Searches
                  </span>
                  <button className="text-xs font-semibold text-primary">
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-2 bg-slate-100 text-sm font-medium text-slate-600 rounded-lg"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Trending
                  </span>
                  <span>🔥</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-2 bg-blue-50 text-sm font-medium text-primary rounded-lg"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse Categories */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Browse Categories
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {browseCategories.map((category) => (
                    <a
                      key={category.name}
                      href="#"
                      className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl"
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-[10px] font-semibold text-slate-600">
                        {category.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button - Mobile */}
        {searchQuery && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 safe-area-inset-bottom">
            <button className="w-full flex items-center justify-center gap-2 h-12 bg-primary text-white font-semibold rounded-xl">
              <span className="material-symbols-outlined">search</span>
              <span>Search for "{searchQuery}"</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay;
