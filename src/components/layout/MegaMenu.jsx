import { useEffect, useRef } from "react";

// Featured categories with images - bento grid layout
const featuredCategories = [
  {
    name: "Mobile Phones",
    subtitle: "Latest iOS & Android flagships",
    slug: "mobiles",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
    size: "large", // Takes left column
  },
  {
    name: "Laptops & Computers",
    subtitle: "Shop Now",
    slug: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    size: "medium",
  },
  {
    name: "Audio",
    subtitle: "Premium Sound",
    slug: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    size: "small",
  },
  {
    name: "Wearables",
    subtitle: "Smart Watches",
    slug: "wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    size: "small",
  },
];

// Quick links for other categories - with images
const quickCategories = [
  { icon: "tv", name: "TVs", slug: "tvs", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80" },
  { icon: "kitchen", name: "Refrigerators", slug: "fridges", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80" },
  { icon: "ac_unit", name: "ACs", slug: "acs", image: "/images/ac1.png" },
  { icon: "local_laundry_service", name: "Washing", slug: "washing", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80" },
];

// Trending products with icons
const trendingProducts = [
  { name: "iPhone 15 Pro", icon: "phone_iphone" },
  { name: "Sony Bravia OLED", icon: "tv" },
  { name: "Dyson V15", icon: "vacuum" },
  { name: "PS5 Slim", icon: "sports_esports" },
];


function MegaMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Menu Container */}
      <div
        ref={menuRef}
        className="fixed left-1/2 -translate-x-1/2 top-20 w-[960px] max-w-[95vw] z-50"
        onMouseLeave={onClose}
      >
        {/* Menu Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl shadow-black/10 border border-slate-200 overflow-hidden animate-slideDown">
          
          {/* Decorative gradient orbs */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-linear-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Header */}
          <div className="relative px-8 pt-6 pb-4 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Shop by Category</h3>
                  <p className="text-xs text-slate-500">Explore our premium collection</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
              </button>
            </div>
          </div>

          {/* Featured Categories - Bento Grid */}
          <div className="relative grid grid-cols-3 gap-4 p-6" style={{ gridTemplateRows: 'repeat(2, 140px)' }}>
            {/* Mobile Phones - Large Card (spans 2 rows) */}
            <a
              href="#mobiles"
              className="group relative row-span-2 rounded-2xl overflow-hidden bg-slate-900 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={featuredCategories[0].image}
                alt={featuredCategories[0].name}
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white mb-1">{featuredCategories[0].name}</h3>
                <p className="text-sm text-white/70 mb-3">{featuredCategories[0].subtitle}</p>
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                  Explore
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </div>
            </a>

            {/* Laptops - Medium Card (top right) */}
            <a
              href="#laptops"
              className="group relative col-span-2 rounded-2xl overflow-hidden bg-blue-900 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={featuredCategories[1].image}
                alt={featuredCategories[1].name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
              <div className="absolute top-1/2 -translate-y-1/2 left-5">
                <h3 className="text-lg font-bold text-white mb-2">{featuredCategories[1].name}</h3>
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                  Shop Now
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </div>
            </a>

            {/* Audio - Small Card (bottom middle) */}
            <a
              href="#audio"
              className="group relative rounded-2xl overflow-hidden bg-amber-100 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={featuredCategories[2].image}
                alt={featuredCategories[2].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
                <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-slate-900 text-sm font-semibold rounded-full flex items-center gap-2 shadow-lg">
                  <span className="material-symbols-outlined text-base">headphones</span>
                  {featuredCategories[2].name}
                </span>
              </div>
            </a>

            {/* Wearables - Small Card (bottom right) */}
            <a
              href="#wearables"
              className="group relative rounded-2xl overflow-hidden bg-slate-200 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={featuredCategories[3].image}
                alt={featuredCategories[3].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
                <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-slate-900 text-sm font-semibold rounded-full flex items-center gap-2 shadow-lg">
                  <span className="material-symbols-outlined text-base">watch</span>
                  {featuredCategories[3].name}
                </span>
              </div>
            </a>
          </div>

          {/* Quick Category Cards - Small image cards */}
          <div className="grid grid-cols-4 gap-3 px-6 pb-4">
            {quickCategories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="group relative h-24 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-lg">{cat.icon}</span>
                  <span className="text-sm font-semibold text-white">{cat.name}</span>
                </div>
              </a>
            ))}
          </div>

          {/* View All Link */}
          <div className="flex justify-end px-6 pb-4">
            <a
              href="#all"
              className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors"
            >
              View All Categories
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </a>
          </div>

          {/* Trending Section - Elegant Light Design */}
          <div className="relative mx-6 mb-6 p-4 rounded-2xl bg-linear-to-r from-slate-50 via-white to-slate-50 border border-slate-100 overflow-hidden">
            {/* Subtle decorative accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 via-purple-500 to-pink-500 rounded-l-2xl" />
            
            <div className="relative flex items-center pl-4">
              {/* Trending Label */}
              <div className="flex items-center gap-2 pr-5 border-r border-slate-200">
                <span className="material-symbols-outlined text-orange-500 text-xl">
                  local_fire_department
                </span>
                <span className="text-sm font-bold text-slate-800">
                  Hot Now
                </span>
              </div>

              {/* Trending Products */}
              <div className="flex items-center gap-2 px-4 flex-1">
                {trendingProducts.map((product) => (
                  <a
                    key={product.name}
                    href="#"
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-500 text-base transition-colors">
                      {product.icon}
                    </span>
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
                      {product.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* View All Link - Subtle text style */}
              <a
                href="#deals"
                className="group flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
                <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease forwards;
        }
      `}</style>
    </>
  );
}

export default MegaMenu;

