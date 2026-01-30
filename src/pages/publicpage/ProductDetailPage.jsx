import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showMobileGallery, setShowMobileGallery] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const imageRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const foundProduct = products.find((p) => p.id === parseInt(id) || p.id === id);
    setProduct(foundProduct);
    setSelectedImage(0);
    setSelectedColor(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id, products]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for zoom effect
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  // Touch swipe for mobile gallery
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const images = product?.gallery || [product?.image];
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && selectedImage < images.length - 1) {
        setSelectedImage(prev => prev + 1);
      } else if (diff < 0 && selectedImage > 0) {
        setSelectedImage(prev => prev - 1);
      }
    }
  };

  // Loading State
  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-neutral-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const images = product.gallery || [product.image];
  const colors = product.colors || [];
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-['Inter',system-ui,-apple-system,sans-serif] selection:bg-neutral-900 selection:text-white antialiased">
      
      {/* ═══════════════════════════════════════════════════════════════════════════
          FLOATING HEADER (Appears on scroll)
      ═══════════════════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-2xl border-b border-neutral-200/60 shadow-sm shadow-neutral-900/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 sm:h-18 flex items-center justify-between gap-4">
              {/* Product Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neutral-100 p-1.5 flex-shrink-0">
                  <img 
                    src={images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply" 
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-neutral-900 text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-neutral-500 truncate hidden sm:block">{product.subtitle}</p>
                </div>
              </div>
              
              {/* Price & CTA */}
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="text-right hidden sm:block">
                  <span className="font-bold text-neutral-900">₹{product.price.toLocaleString()}</span>
                </div>
                <button className="bg-neutral-900 text-white px-4 sm:px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-800 active:scale-95 transition-all whitespace-nowrap">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════════
          MOBILE BOTTOM BAR (Fixed on mobile)
      ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-white/95 backdrop-blur-xl border-t border-neutral-200/60 shadow-2xl shadow-neutral-900/10">
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-neutral-500 font-medium">Total Price</p>
              <p className="text-xl font-bold text-neutral-900">₹{(product.price * quantity).toLocaleString()}</p>
            </div>
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all active:scale-90 ${
                isWishlisted 
                  ? 'bg-rose-50 border-rose-200 text-rose-500' 
                  : 'bg-neutral-50 border-neutral-200 text-neutral-400'
              }`}
            >
              <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            <button className="flex-1 max-w-[180px] h-12 bg-neutral-900 text-white rounded-xl font-semibold text-sm hover:bg-neutral-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Add to Bag
            </button>
          </div>
          {/* Safe area padding for notched devices */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-10 pb-32 lg:pb-20">
        
        {/* Breadcrumb - Hidden on mobile */}
        <nav className="hidden sm:flex items-center gap-2 text-[11px] font-medium text-neutral-400 mb-6 lg:mb-10 uppercase tracking-[0.12em]">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/category" className="hover:text-neutral-900 transition-colors">{product.category}</Link>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-neutral-700">{product.name}</span>
        </nav>

        {/* Mobile Back Button */}
        <div className="sm:hidden mb-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-20">
          
          {/* ═══════════════════════════════════════════════════════════════════════
              LEFT COLUMN - Gallery
          ═══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Main Image Container */}
            <div 
              ref={imageRef}
              className="relative aspect-square sm:aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl sm:rounded-3xl overflow-hidden group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={() => window.innerWidth < 640 && setShowMobileGallery(true)}
            >
              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, neutral 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />
              
              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className={`max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-700 ease-out select-none ${
                    isZoomed ? 'scale-110 sm:scale-125' : 'scale-100'
                  }`}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                  }}
                  draggable={false}
                />
              </div>

              {/* Image Counter - Mobile */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {images.map((_, idx) => (
                    <span 
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        selectedImage === idx ? 'bg-white w-4' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Tap to expand hint - Mobile */}
              <div className="absolute bottom-4 right-4 sm:hidden">
                <div className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex flex-col gap-2">
                {discount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    {discount}% OFF
                  </span>
                )}
                {product.badges?.map((badge) => (
                  <span
                    key={badge}
                    className="bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-neutral-200/50 shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Wishlist Button - Desktop */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWishlisted(!isWishlisted);
                }}
                className={`absolute top-3 sm:top-6 right-3 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-90 ${
                  isWishlisted 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-white/90 backdrop-blur-md text-neutral-500 hover:text-rose-500'
                }`}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              {/* Navigation Arrows - Desktop */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full items-center justify-center shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 hidden sm:flex ${
                      selectedImage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    disabled={selectedImage === 0}
                  >
                    <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setSelectedImage(prev => Math.min(images.length - 1, prev + 1))}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full items-center justify-center shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 hidden sm:flex ${
                      selectedImage === images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    disabled={selectedImage === images.length - 1}
                  >
                    <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip - Hidden on very small screens */}
            {images.length > 1 && (
              <div 
                ref={galleryRef}
                className="hidden sm:flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide"
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                      selectedImage === idx
                        ? "ring-2 ring-neutral-900 ring-offset-2 shadow-lg"
                        : "opacity-60 hover:opacity-100 bg-neutral-100"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover p-2 mix-blend-multiply" 
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              {[
                { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", title: "100% Authentic", desc: "Verified Products" },
                { icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", title: "Free Shipping", desc: "On orders ₹999+" },
                { icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99", title: "Easy Returns", desc: "30-Day Policy", hideOnMobile: true }
              ].filter(item => !item.hideOnMobile || window.innerWidth >= 640).map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/60 hover:border-neutral-300 transition-all duration-300 ${
                    idx === 2 ? 'hidden sm:block' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm leading-tight">{item.title}</h4>
                      <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════
              RIGHT COLUMN - Product Details
          ═══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start space-y-6 sm:space-y-8">
            
            {/* Product Header */}
            <div className="space-y-4">
              {/* Category Label */}
              <p className="text-[10px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-[0.15em]">
                {product.category}
              </p>
              
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-neutral-200'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral-900">{product.rating}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <Link 
                  to="#reviews" 
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
                >
                  {product.reviews} reviews
                </Link>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-neutral-200" />

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-neutral-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-neutral-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Save {discount}%
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-neutral-500">
                Inclusive of all taxes. Free shipping on this item.
              </p>
            </div>

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-neutral-900">Color</h4>
                  <span className="text-sm text-neutral-500">{colors[selectedColor]?.name}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 ${
                        selectedColor === idx
                          ? "ring-2 ring-neutral-900 ring-offset-2 scale-105"
                          : "hover:scale-105 opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                    >
                      <span className="absolute inset-0 rounded-xl border border-black/10" />
                      {selectedColor === idx && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg 
                            className={`w-4 h-4 ${
                              ['#fff', '#ffffff', '#f5f5f5', '#fafafa'].includes(color.hex.toLowerCase())
                                ? 'text-neutral-900' 
                                : 'text-white'
                            }`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-neutral-900">Quantity</h4>
              <div className="inline-flex items-center border border-neutral-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-all active:bg-neutral-100"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-14 text-center text-sm font-semibold text-neutral-900 tabular-nums">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-all active:bg-neutral-100"
                  aria-label="Increase quantity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* CTA Buttons - Desktop Only */}
            <div className="hidden lg:flex flex-col gap-3 pt-2">
              <button className="w-full h-14 bg-neutral-900 text-white rounded-2xl font-semibold text-base hover:bg-neutral-800 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-neutral-900/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Add to Bag — ₹{(product.price * quantity).toLocaleString()}
              </button>
              
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} (₹${product.price.toLocaleString()})`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-14 bg-[#25D366] text-white rounded-2xl font-semibold text-base hover:bg-[#20BD5A] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-[#25D366]/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order via WhatsApp
              </a>
            </div>

            {/* Divider */}
            <hr className="border-neutral-200" />

            {/* Tabs */}
            <div className="space-y-6">
              {/* Tab Headers */}
              <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl">
                {['specs', 'description', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-white text-neutral-900 shadow-sm' 
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="min-h-[180px] sm:min-h-[200px]">
                {/* Specs Tab */}
                {activeTab === 'specs' && (
                  <div className="space-y-4 animate-fadeIn">
                    {product.specs ? (
                      <>
                        {/* Device Specs */}
                        <div className="space-y-2">
                          {product.specs.processor && (
                            <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                              <span className="text-sm text-neutral-600 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                                </svg>
                                Processor
                              </span>
                              <span className="text-sm font-medium text-neutral-900">{product.specs.processor}</span>
                            </div>
                          )}
                          {product.specs.display && (
                            <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                              <span className="text-sm text-neutral-600 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                                Display
                              </span>
                              <span className="text-sm font-medium text-neutral-900">{product.specs.display}</span>
                            </div>
                          )}
                          {product.specs.camera && (
                            <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                              <span className="text-sm text-neutral-600 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                                Camera
                              </span>
                              <span className="text-sm font-medium text-neutral-900">{product.specs.camera}</span>
                            </div>
                          )}
                          {(product.specs.storage || product.specs.ram) && (
                            <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                              <span className="text-sm text-neutral-600 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                                Storage / RAM
                              </span>
                              <span className="text-sm font-medium text-neutral-900">
                                {[product.specs.storage, product.specs.ram].filter(Boolean).join(' / ')}
                              </span>
                            </div>
                          )}
                          {product.specs.battery && (
                            <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                              <span className="text-sm text-neutral-600 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                                </svg>
                                Battery
                              </span>
                              <span className="text-sm font-medium text-neutral-900">{product.specs.battery}</span>
                            </div>
                          )}
                          {product.specs.antutuScore && (
                            <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                              <span className="text-sm text-neutral-600 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                                AnTuTu Score
                              </span>
                              <span className="text-sm font-bold text-emerald-600">{product.specs.antutuScore.toLocaleString()}</span>
                            </div>
                          )}
                          {product.specs.performance && (
                            <div className="flex justify-between items-center py-2.5">
                              <span className="text-sm text-neutral-600 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                                Performance
                              </span>
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                product.specs.performance === 'flagship' ? 'bg-purple-100 text-purple-700' :
                                product.specs.performance === 'high' ? 'bg-blue-100 text-blue-700' :
                                product.specs.performance === 'mid' ? 'bg-green-100 text-green-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {product.specs.performance === 'flagship' ? '🚀 Flagship' :
                                 product.specs.performance === 'high' ? '⚡ High-End' :
                                 product.specs.performance === 'mid' ? '💪 Mid-Range' :
                                 '💰 Budget'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Warranty & Box Contents */}
                        {(product.warranty || product.boxContents) && (
                          <div className="pt-4 border-t border-neutral-100">
                            {product.warranty && (
                              <div className="flex items-start gap-2 mb-3">
                                <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                                <div>
                                  <span className="text-xs font-semibold text-neutral-400 uppercase">Warranty</span>
                                  <p className="text-sm text-neutral-900">{product.warranty}</p>
                                </div>
                              </div>
                            )}
                            {product.boxContents && (
                              <div className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <div>
                                  <span className="text-xs font-semibold text-neutral-400 uppercase">In The Box</span>
                                  <p className="text-sm text-neutral-900">{product.boxContents}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-neutral-500 text-center py-8">No specifications available</p>
                    )}
                  </div>
                )}

                {/* Description Tab */}
                {activeTab === 'description' && (
                  <div className="animate-fadeIn space-y-4">
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {product.description || "Meticulously crafted for those who appreciate the perfect balance of form and function. Every detail has been considered to deliver an unparalleled experience that exceeds expectations. Built with premium materials and cutting-edge technology."}
                    </p>
                    
                    {/* Highlights */}
                    {product.highlights && (
                      <div className="pt-4 border-t border-neutral-100">
                        <h5 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Key Highlights</h5>
                        <div className="whitespace-pre-line text-sm text-neutral-700">{product.highlights}</div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="text-center py-10 sm:py-12 animate-fadeIn">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-neutral-900 mb-1">No reviews yet</h5>
                    <p className="text-sm text-neutral-500">Be the first to share your experience</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            FEATURES SECTION
        ═══════════════════════════════════════════════════════════════════════════ */}
        {product.features && (
          <section className="mt-16 sm:mt-24 lg:mt-32">
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-3">Why Choose This</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
                Designed for Excellence
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {product.features.map((feature, i) => (
                <div 
                  key={i} 
                  className={`group p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:-translate-y-1 ${
                    i === 0 
                      ? 'sm:col-span-2 lg:col-span-2 bg-neutral-900 text-white' 
                      : 'bg-white border border-neutral-200 text-neutral-900 hover:border-neutral-300 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 ${
                    i === 0 ? 'bg-white/10' : 'bg-neutral-100'
                  }`}>
                    <svg 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${i === 0 ? 'text-white' : 'text-neutral-600'}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${i === 0 ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ═══════════════════════════════════════════════════════════════════════════
          MOBILE FULLSCREEN GALLERY MODAL
      ═══════════════════════════════════════════════════════════════════════════ */}
      {showMobileGallery && (
        <div className="fixed inset-0 z-100 bg-black sm:hidden">
          {/* Close Button */}
          <button 
            onClick={() => setShowMobileGallery(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Image */}
          <div 
            className="w-full h-full flex items-center justify-center p-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImage === idx ? 'bg-white w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* ═══════════════════════════════════════════════════════════════════════════
          CUSTOM STYLES
      ═══════════════════════════════════════════════════════════════════════════ */}
      <style>{`
        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Fade in animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Smooth font rendering */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}

export default ProductDetailPage;