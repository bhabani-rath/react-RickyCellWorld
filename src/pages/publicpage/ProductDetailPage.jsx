import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

import { useStore } from "../../context/StoreContext";

// Icons (Inline SVG components for reliability)
const Icons = {
  star: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  starHalf: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 4.24V15.9l5.92 3.11-1.13-6.58L20.89 9.5l-6.59-.96L12 2.74z"/></svg>,
  starEmpty: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>,
  heart: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  share: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
  truck: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  shield: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  exchange: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l-6 6M4 4l5 5"/></svg>,
  location: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  check: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>,
  info: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  chevronRight: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6"/></svg>,
  chevronDown: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>,
  minus: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  plus: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  search: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  thumbsUp: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>,
  message: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
  camera: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  cart: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
  close: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
};

// Mock data for related products
const relatedProducts = [
  { id: 101, name: "Samsung Galaxy S23", price: 69999, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&q=80", rating: 4.5 },
  { id: 102, name: "iPhone 14 Pro", price: 119900, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&q=80", rating: 4.7 },
  { id: 103, name: "OnePlus 11", price: 56999, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&q=80", rating: 4.4 },
  { id: 104, name: "Google Pixel 7", price: 49999, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff70?w=200&q=80", rating: 4.3 },
];

// Mock reviews
const mockReviews = [
  { id: 1, user: "Rahul Sharma", rating: 5, date: "2 months ago", title: "Excellent phone!", text: "Best camera in this segment. Battery life is amazing, easily lasts full day with heavy usage.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=60"], helpful: 124 },
  { id: 2, user: "Priya Patel", rating: 4, date: "1 month ago", title: "Good but heating issue", text: "Performance is great but phone heats up during gaming. Camera is superb though.", helpful: 89 },
];

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();

  const { currentStore } = useStore();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [exchangeDiscount, setExchangeDiscount] = useState(0);
  
  // Image zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const found = products.find((p) => p.id === parseInt(id) || p.id === id);
    setProduct(found);
    setSelectedImage(0);
    window.scrollTo(0, 0);
    setTimeout(() => setLoading(false), 400);
  }, [id, products]);



  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };



  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  const images = product.gallery || [product.image];
  const colors = product.colors || [];
  const storageOptions = product.storageOptions || [];
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const specs = product.specs || {};
  const specEntries = Object.entries(specs);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600 gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link to="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <Icons.chevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/category" className="hover:text-blue-600 hover:underline">{product.category}</Link>
            <Icons.chevronRight className="w-4 h-4 text-gray-400" />
            <Link to={`/category?brand=${product.brand}`} className="hover:text-blue-600 hover:underline">{product.brand}</Link>
            <Icons.chevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN - Images (Flipkart/Amazon style) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              {/* Main Image with Zoom */}
              <div 
                ref={imageRef}
                className="relative aspect-square bg-white rounded-lg border border-gray-200 p-4 mb-4 cursor-crosshair overflow-hidden group"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <div className="relative w-full h-full">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-transform duration-200 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                    style={isZoomed ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                    } : {}}
                  />
                </div>
                
                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discount > 0 && (
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {discount}% off
                    </span>
                  )}
                  {product.assured && (
                    <div className="bg-white shadow-md rounded px-2 py-1 flex items-center gap-1">
                      <span className="text-blue-600 font-bold text-xs">Assured</span>
                      <Icons.shield className="w-3 h-3 text-blue-600" />
                    </div>
                  )}
                </div>

                {/* Wishlist & Share */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Icons.heart className="w-5 h-5" style={{ fill: isWishlisted ? 'currentColor' : 'none' }} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                    <Icons.share className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${selectedImage === idx ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>


            </div>
          </div>

          {/* MIDDLE/RIGHT COLUMN - Product Info */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Title Section */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-tight mb-2">
                {product.name} {product.subtitle && `(${product.subtitle})`}
              </h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded text-sm font-bold">
                  {product.rating}
                  <Icons.star className="w-3 h-3 ml-1 fill-current" />
                </div>
                <span className="text-gray-500 text-sm">
                  {product.reviews?.toLocaleString()} Ratings & {Math.floor(product.reviews * 0.3)} Reviews
                </span>
                {product.badge && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Price Block - Amazon/Flipkart Style */}
              <div className="mt-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="text-green-600 font-medium">{discount}% off</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Inclusive of all taxes
                </p>
                {product.originalPrice && (
                  <p className="text-sm text-gray-700 mt-2">
                    You Save: <span className="font-semibold text-green-600">₹{(product.originalPrice - product.price).toLocaleString()}</span>
                  </p>
                )}
              </div>

              {/* Offers Strip */}
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-sm">Bank Offer</span>
                  <p className="text-sm text-gray-700">
                    10% off on HDFC Bank Credit Cards, up to ₹1,500. <span className="text-blue-600 cursor-pointer">T&C</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Color: <span className="font-normal text-gray-900">{colors[selectedColor]?.name}</span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`relative w-14 h-14 rounded-lg border-2 overflow-hidden p-1 ${selectedColor === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}
                      title={color.name}
                    >
                      <div 
                        className="w-full h-full rounded-md"
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor === idx && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                          <Icons.check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Selection */}
            {storageOptions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Storage: <span className="font-normal text-gray-900">{storageOptions[selectedStorage]}</span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {storageOptions.map((storage, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedStorage(idx)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${selectedStorage === idx ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}



            {/* Exchange Offer */}
            <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icons.exchange className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Buy with Exchange</h4>
                    <p className="text-sm text-gray-600 mt-1">Up to ₹15,000 off on exchange</p>
                    <p className="text-xs text-gray-500 mt-1">Exchange your old smartphone</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowExchangeModal(true)}
                  className="text-blue-600 font-semibold text-sm hover:underline whitespace-nowrap"
                >
                  {exchangeDiscount > 0 ? 'Change' : 'Select'}
                </button>
              </div>
              {exchangeDiscount > 0 && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-sm text-green-700 font-medium">
                    Exchange discount applied: ₹{exchangeDiscount.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Sold by</span>
                <span className="font-semibold text-gray-900">{currentStore?.name || 'Vijay Sales'}</span>
                <span className="text-gray-400">•</span>
                <span className="text-blue-600 cursor-pointer hover:underline">View all sellers</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">4.5★</span>
                <span className="text-xs text-gray-500">Seller rating</span>
              </div>
            </div>

            {/* Highlights / Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h3>
              <ul className="space-y-2">
                {(product.highlights || product.description?.split('. ').slice(0, 5) || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-200 mb-4">
                <div className="flex gap-6">
                  {['Specifications', 'Description', 'Reviews', 'Q&A'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab.toLowerCase() ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'specifications' && (
                  <div className="animate-fadeIn">
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      {specEntries.slice(0, showAllSpecs ? undefined : 6).map(([key, value], idx) => (
                        <div key={key} className={`flex border-b border-gray-200 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <div className="w-1/3 p-4 text-sm text-gray-600 font-medium border-r border-gray-200">
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="w-2/3 p-4 text-sm text-gray-900">
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                          </div>
                        </div>
                      ))}
                    </div>
                    {specEntries.length > 6 && (
                      <button 
                        onClick={() => setShowAllSpecs(!showAllSpecs)}
                        className="mt-4 w-full py-3 bg-white border border-gray-300 rounded-lg text-blue-600 font-semibold hover:bg-gray-50 transition-colors"
                      >
                        {showAllSpecs ? 'Show Less' : `View All ${specEntries.length} Specs`}
                      </button>
                    )}
                  </div>
                )}

                {activeTab === 'description' && (
                  <div className="animate-fadeIn prose prose-sm max-w-none text-gray-700">
                    <p>{product.description || "No detailed description available."}</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="animate-fadeIn space-y-6">
                    {/* Rating Summary */}
                    <div className="flex items-center gap-8 mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                        <div className="flex text-green-600 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Icons.star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">{product.reviews} Reviews</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-3">{star}</span>
                            <Icons.star className="w-3 h-3 text-gray-400" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 rounded-full" 
                                style={{ width: `${star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : 5}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Review List */}
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                            {review.rating} <Icons.star className="w-3 h-3 fill-current" />
                          </div>
                          <span className="font-semibold text-gray-900">{review.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <span className="font-medium text-gray-700">{review.user}</span>
                          <span>•</span>
                          <span>Verified Purchase</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{review.text}</p>
                        {review.images.length > 0 && (
                          <div className="flex gap-2 mb-3">
                            {review.images.map((img, idx) => (
                              <img key={idx} src={img} alt="" className="w-16 h-16 object-cover rounded border border-gray-200" />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-gray-700">
                            <Icons.thumbsUp className="w-4 h-4" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="hover:text-gray-700">Report</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'q&a' && (
                  <div className="animate-fadeIn text-center py-12 text-gray-500">
                    <Icons.message className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No questions yet. Be the first to ask!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Frequently Bought Together */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Bought Together</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {relatedProducts.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-40 border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                    <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-2" />
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="bg-green-600 text-white text-xs px-1 rounded">{item.rating}★</span>
                      <span className="text-xs text-gray-500">(2,304)</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>



      {/* Exchange Modal (Simplified) */}
      {showExchangeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Exchange Offer</h3>
              <button onClick={() => setShowExchangeModal(false)} className="text-gray-500">
                <Icons.close className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Enter your old phone details to calculate exchange value</p>
            <div className="space-y-3">
              <button 
                onClick={() => { setExchangeDiscount(15000); setShowExchangeModal(false); }}
                className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-500 text-left"
              >
                <div className="flex justify-between">
                  <span className="font-medium">iPhone 12</span>
                  <span className="text-green-600 font-bold">₹15,000</span>
                </div>
                <span className="text-xs text-gray-500">Good condition</span>
              </button>
              <button 
                onClick={() => { setExchangeDiscount(8000); setShowExchangeModal(false); }}
                className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-500 text-left"
              >
                <div className="flex justify-between">
                  <span className="font-medium">Samsung S21</span>
                  <span className="text-green-600 font-bold">₹8,000</span>
                </div>
                <span className="text-xs text-gray-500">Working condition</span>
              </button>
              <button 
                onClick={() => { setExchangeDiscount(0); setShowExchangeModal(false); }}
                className="w-full p-3 text-center text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                I don't want exchange
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ProductDetailPage;