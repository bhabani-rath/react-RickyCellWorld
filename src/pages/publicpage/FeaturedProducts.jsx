import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Enhanced product data with ratings
const bestSellers = [
 {
   id: 1,
   name: "Samsung Galaxy S24 Ultra",
   variant: "512GB • Titanium Gray",
   price: 129999,
   originalPrice: 149999,
   discount: 13,
   inStock: true,
   image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80",
   badge: "Best Seller",
   rating: 4.8,
   reviews: 1240
 },
 {
   id: 2,
   name: "iPhone 15 Pro Max",
   variant: "256GB • Natural Titanium",
   price: 149900,
   originalPrice: 159900,
   discount: 6,
   inStock: true,
   image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
   badge: "Popular",
   rating: 4.9,
   reviews: 856
 },
 {
   id: 3,
   name: "MacBook Air M3",
   variant: "8GB • 256GB SSD • Midnight",
   price: 114900,
   originalPrice: 124900,
   discount: 8,
   inStock: true,
   image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
   badge: "New",
   rating: 4.7,
   reviews: 432
 },
 {
   id: 4,
   name: "Sony WH-1000XM5",
   variant: "Wireless • Noise Cancelling",
   price: 29990,
   originalPrice: 34990,
   discount: 14,
   inStock: true,
   image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
   rating: 4.6,
   reviews: 2103
 },
 {
   id: 5,
   name: "Apple Watch Series 9",
   variant: "GPS • 45mm • Starlight",
   price: 44900,
   originalPrice: 49900,
   discount: 10,
   inStock: false,
   image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
   rating: 4.8,
   reviews: 567
 },
 {
   id: 6,
   name: "Sony PlayStation 5 Slim",
   variant: "Disc Edition • 1TB",
   price: 49990,
   originalPrice: 54990,
   discount: 9,
   inStock: true,
   image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80",
   badge: "Hot",
   rating: 4.9,
   reviews: 3421
 },
];

const exclusiveDeals = [
 {
   id: 7,
   name: "LG 55\" OLED C3 4K TV",
   variant: "Smart TV • Dolby Vision",
   price: 119990,
   originalPrice: 159990,
   discount: 25,
   inStock: true,
   image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
   badge: "25% OFF",
   rating: 4.7,
   reviews: 892
 },
 {
   id: 8,
   name: "Daikin 1.5 Ton 5 Star AC",
   variant: "Inverter Split AC",
   price: 42990,
   originalPrice: 54990,
   discount: 22,
   inStock: true,
   image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
   badge: "Deal",
   rating: 4.5,
   reviews: 445
 },
 {
   id: 9,
   name: "Samsung Front Load Washer",
   variant: "8KG • AI EcoBubble",
   price: 39990,
   originalPrice: 49990,
   discount: 20,
   inStock: true,
   image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80",
   rating: 4.6,
   reviews: 223
 },
 {
   id: 10,
   name: "Samsung Bespoke Fridge",
   variant: "653L • Frost Free",
   price: 89990,
   originalPrice: 109990,
   discount: 18,
   inStock: true,
   image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80",
   badge: "Premium",
   rating: 4.8,
   reviews: 334
 },
];

// Format price with Indian locale
const formatPrice = (price) => {
 return new Intl.NumberFormat('en-IN', {
   style: 'currency',
   currency: 'INR',
   maximumFractionDigits: 0,
 }).format(price);
};

// Star Rating Component
const StarRating = ({ rating, reviews }) => (
 <div className="flex items-center gap-1.5">
   <div className="flex items-center">
     {[...Array(5)].map((_, i) => (
       <svg
         key={i}
         className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
         viewBox="0 0 20 20"
       >
         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
       </svg>
     ))}
   </div>
   <span className="text-xs text-slate-500 font-medium">({reviews})</span>
 </div>
);

// Enhanced Product Card
function ProductCard({ product, index }) {
 const navigate = useNavigate();
 const [isHovered, setIsHovered] = useState(false);
 const [imageLoaded, setImageLoaded] = useState(false);

 const discountAmount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

 return (
   <div
     onClick={() => navigate(`/product/${product.id}`)}
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
     className="group relative shrink-0 w-[260px] sm:w-[280px] bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
     style={{ animationDelay: `${index * 50}ms` }}
   >
     {/* Image Container */}
     <div className="relative h-[220px] bg-gradient-to-b from-slate-50 to-white overflow-hidden">
       {/* Loading Skeleton */}
       {!imageLoaded && (
         <div className="absolute inset-0 bg-slate-100 animate-pulse" />
       )}
       
       <img
         src={product.image}
         alt={product.name}
         onLoad={() => setImageLoaded(true)}
         className={`w-full h-full object-contain p-6 transition-all duration-700 ease-out ${
           isHovered ? 'scale-110' : 'scale-100'
         } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
       />
       
       {/* Gradient Overlay on Hover */}
       <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`}></div>

       {/* Discount Badge */}
       {discountAmount > 0 && (
         <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full shadow-lg shadow-red-500/30 z-10">
           {discountAmount}% OFF
         </div>
       )}
       
       {/* Product Badge */}
       {product.badge && !discountAmount > 0 && (
         <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-full shadow-lg z-10">
           {product.badge}
         </div>
       )}

       {/* Wishlist Button */}
       <button 
         onClick={(e) => {
           e.stopPropagation();
           // Wishlist logic
         }}
         className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all duration-300 z-20 ${
           isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
         }`}
       >
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
         </svg>
       </button>

       {/* Out of Stock Overlay */}
       {!product.inStock && (
         <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
           <span className="px-4 py-2 bg-slate-900/90 text-white text-sm font-semibold rounded-lg shadow-lg">
             Out of Stock
           </span>
         </div>
       )}

       {/* Quick Action Bar */}
       <div className={`absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 transform transition-transform duration-500 ${isHovered && product.inStock ? 'translate-y-0' : 'translate-y-full'}`}>
         <button 
           onClick={(e) => {
             e.stopPropagation();
             // Add to cart logic
           }}
           className="w-full py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
         >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
           </svg>
           Add to Cart
         </button>
       </div>
     </div>

     {/* Content */}
     <div className="p-5 space-y-3">
       {/* Rating */}
       {product.rating && <StarRating rating={product.rating} reviews={product.reviews} />}
       
       {/* Title */}
       <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
         {product.name}
       </h3>
       
       {/* Variant */}
       <p className="text-xs text-slate-500 font-medium">{product.variant}</p>
       
       {/* Price Section */}
       <div className="flex items-end gap-2 pt-1">
         <span className="text-xl font-black text-slate-900 tracking-tight">
           {formatPrice(product.price)}
         </span>
         {product.originalPrice > product.price && (
           <span className="text-sm text-slate-400 line-through font-medium mb-0.5">
             {formatPrice(product.originalPrice)}
           </span>
         )}
       </div>

       {/* Savings Tag */}
       {product.originalPrice > product.price && (
         <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           Save {formatPrice(product.originalPrice - product.price)}
         </div>
       )}
     </div>
   </div>
 );
}

// Product Section with Enhanced Navigation
function ProductSection({ title, subtitle, products, viewAllLink, bgColor = "bg-white", icon: Icon }) {
 const scrollRef = useRef(null);
 const [canScrollLeft, setCanScrollLeft] = useState(false);
 const [canScrollRight, setCanScrollRight] = useState(true);
 const [isDragging, setIsDragging] = useState(false);
 const [startX, setStartX] = useState(0);
 const [scrollLeft, setScrollLeft] = useState(0);

 const checkScrollButtons = () => {
   if (scrollRef.current) {
     const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
     setCanScrollLeft(scrollLeft > 10);
     setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
   }
 };

 useEffect(() => {
   checkScrollButtons();
   const ref = scrollRef.current;
   if (ref) {
     ref.addEventListener('scroll', checkScrollButtons, { passive: true });
     return () => ref.removeEventListener('scroll', checkScrollButtons);
   }
 }, []);

 const scroll = (direction) => {
   if (scrollRef.current) {
     const scrollAmount = 300;
     scrollRef.current.scrollBy({
       left: direction === 'left' ? -scrollAmount : scrollAmount,
       behavior: 'smooth'
     });
   }
 };

 // Mouse drag handling for desktop swipe feel
 const handleMouseDown = (e) => {
   setIsDragging(true);
   setStartX(e.pageX - scrollRef.current.offsetLeft);
   setScrollLeft(scrollRef.current.scrollLeft);
 };

 const handleMouseUp = () => {
   setIsDragging(false);
 };

 const handleMouseMove = (e) => {
   if (!isDragging) return;
   e.preventDefault();
   const x = e.pageX - scrollRef.current.offsetLeft;
   const walk = (x - startX) * 2;
   scrollRef.current.scrollLeft = scrollLeft - walk;
 };

 return (
   <section className={`relative py-16 lg:py-20 ${bgColor} overflow-hidden`}>
     {/* Background decoration */}
     <div className="absolute inset-0 pointer-events-none opacity-50">
       <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
     </div>

     <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
       {/* Section Header */}
       <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
         <div className="space-y-2">
           <div className="flex items-center gap-2 text-slate-500">
             {Icon && (
               <span className="p-2 bg-slate-100 rounded-lg">
                 <Icon className="w-5 h-5" />
               </span>
             )}
             <span className="text-xs font-semibold tracking-widest uppercase">Curated Selection</span>
           </div>
           <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{title}</h2>
           {subtitle && <p className="text-slate-500 max-w-md">{subtitle}</p>}
         </div>
         
         <div className="flex items-center gap-4">
           {/* Custom Scroll Buttons */}
           <div className="hidden sm:flex items-center gap-2">
             <button
               onClick={() => scroll('left')}
               disabled={!canScrollLeft}
               className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                 canScrollLeft 
                   ? 'border-slate-200 text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:scale-110 shadow-lg' 
                   : 'border-slate-100 text-slate-300 cursor-not-allowed'
               }`}
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
             </button>
             <button
               onClick={() => scroll('right')}
               disabled={!canScrollRight}
               className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                 canScrollRight 
                   ? 'border-slate-200 text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:scale-110 shadow-lg' 
                   : 'border-slate-100 text-slate-300 cursor-not-allowed'
               }`}
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </button>
           </div>

           <a 
             href={viewAllLink || "#"} 
             className="group flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
           >
             View All Products
             <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
             </svg>
           </a>
         </div>
       </div>

       {/* Products Carousel with Drag Support */}
       <div className="relative group/carousel">
         {/* Gradient Masks */}
         <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r ${bgColor} to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}></div>
         <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l ${bgColor} to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}></div>

         <div
           ref={scrollRef}
           onMouseDown={handleMouseDown}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
           onMouseMove={handleMouseMove}
           className={`flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 pt-2 [-webkit-overflow-scrolling:touch] scrollbar-hide cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
         >
           {products.map((product, index) => (
             <div key={product.id} className="snap-start">
               <ProductCard product={product} index={index} />
             </div>
           ))}
         </div>
       </div>

       {/* Mobile Scroll Hint */}
       <div className="sm:hidden mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium animate-pulse">
         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
         </svg>
         <span>Swipe to explore</span>
         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
         </svg>
       </div>
     </div>

     <style jsx>{`
       .scrollbar-hide::-webkit-scrollbar {
         display: none;
       }
     `}</style>
   </section>
 );
}

// Icons as components
const TrendingIcon = ({ className }) => (
 <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
 </svg>
);

const OfferIcon = ({ className }) => (
 <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
 </svg>
);

function FeaturedProducts() {
 return (
   <>
     <ProductSection
       title="Best Sellers"
       subtitle="Most loved products by our customers this month"
       products={bestSellers}
       viewAllLink="/category/bestsellers"
       bgColor="bg-slate-50"
       icon={TrendingIcon}
     />
     <ProductSection
       title="Exclusive Deals"
       subtitle="Limited time offers on premium electronics"
       products={exclusiveDeals}
       viewAllLink="/category/deals"
       bgColor="bg-white"
       icon={OfferIcon}
     />
   </>
 );
}

export default FeaturedProducts;