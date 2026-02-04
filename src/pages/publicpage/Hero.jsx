import { useState, useEffect, useCallback, useRef } from "react";

// Hero banner slides data - Enhanced for premium eCommerce experience
const heroSlides = [
 {
   id: 1,
   badge: "New Launch",
   title: "Redmi Note 15 Pro",
   subtitle: "200MP Camera System • 120W HyperCharge • Simply Better",
   price: "₹24,999",
   originalPrice: "₹29,999",
   discount: "17% OFF",
   cta: "Pre-Book Now",
   ctaSecondary: "Know More",
   image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=80",
   theme: {
     primary: "from-orange-500 to-amber-500",
     secondary: "from-orange-50 via-amber-50 to-yellow-50",
     accent: "text-orange-600",
     glow: "bg-orange-400",
     badge: "bg-orange-500",
   }
 },
 {
   id: 2,
   badge: "Best Seller",
   title: "iPhone 15 Pro Max",
   subtitle: "Titanium Design • A17 Pro Chip • Action Button",
   price: "₹1,49,900",
   originalPrice: "₹1,59,900",
   discount: "₹10,000 OFF",
   cta: "Buy Now",
   ctaSecondary: "Compare",
   image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&q=80",
   theme: {
     primary: "from-slate-700 to-slate-900",
     secondary: "from-slate-100 via-gray-50 to-zinc-100",
     accent: "text-slate-800",
     glow: "bg-slate-400",
     badge: "bg-slate-800",
   }
 },
 {
   id: 3,
   badge: "Hot Deal",
   title: "Samsung OLED TV 65\"",
   subtitle: "4K Crystal Display • Neural Quantum Processor • Dolby Atmos",
   price: "₹89,990",
   originalPrice: "₹1,29,990",
   discount: "31% OFF",
   cta: "Shop Now",
   ctaSecondary: "View All TVs",
   image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&q=80",
   theme: {
     primary: "from-blue-600 to-indigo-600",
     secondary: "from-blue-50 via-indigo-50 to-purple-50",
     accent: "text-blue-600",
     glow: "bg-blue-400",
     badge: "bg-blue-600",
   }
 },
 {
   id: 4,
   badge: "Limited Offer",
   title: "MacBook Air M3",
   subtitle: "Supercharged by M3 • 18-hour Battery • Liquid Retina",
   price: "₹1,14,900",
   originalPrice: "₹1,24,900",
   discount: "₹10,000 OFF",
   cta: "Buy Now",
   ctaSecondary: "Trade In",
   image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
   theme: {
     primary: "from-gray-600 to-gray-800",
     secondary: "from-gray-100 via-slate-50 to-gray-100",
     accent: "text-gray-800",
     glow: "bg-gray-400",
     badge: "bg-gray-800",
   }
 },
 {
   id: 5,
   badge: "Summer Sale",
   title: "Daikin Inverter AC",
   subtitle: "5 Star Rating • Whisper Quiet • PM 2.5 Filter",
   price: "₹42,990",
   originalPrice: "₹54,990",
   discount: "22% OFF",
   cta: "Buy Now",
   ctaSecondary: "EMI Options",
   image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",
   theme: {
     primary: "from-cyan-500 to-teal-500",
     secondary: "from-cyan-50 via-sky-50 to-teal-50",
     accent: "text-cyan-600",
     glow: "bg-cyan-400",
     badge: "bg-cyan-600",
   }
 },
];

function Hero() {
 const [currentSlide, setCurrentSlide] = useState(0);
 const [isAutoPlaying, setIsAutoPlaying] = useState(true);
 const [progress, setProgress] = useState(0);
 const progressRef = useRef(null);
 const slideRef = useRef(null);

 const SLIDE_DURATION = 5000;

 // Progress bar animation
 useEffect(() => {
   if (!isAutoPlaying) {
     setProgress(0);
     return;
   }

   const startTime = Date.now();
   const animate = () => {
     const elapsed = Date.now() - startTime;
     const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
     setProgress(newProgress);
     
     if (newProgress < 100) {
       progressRef.current = requestAnimationFrame(animate);
     }
   };
   
   progressRef.current = requestAnimationFrame(animate);
   
   return () => cancelAnimationFrame(progressRef.current);
 }, [currentSlide, isAutoPlaying]);

 // Auto-rotate slides
 useEffect(() => {
   if (!isAutoPlaying) return;

   const interval = setInterval(() => {
     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
   }, SLIDE_DURATION);

   return () => clearInterval(interval);
 }, [isAutoPlaying]);

 const goToSlide = useCallback((index) => {
   if (index === currentSlide) return;
   setCurrentSlide(index);
   setIsAutoPlaying(false);
   setTimeout(() => setIsAutoPlaying(true), 10000);
 }, [currentSlide]);

 const nextSlide = useCallback(() => {
   setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
   setIsAutoPlaying(false);
   setTimeout(() => setIsAutoPlaying(true), 10000);
 }, []);

 const prevSlide = useCallback(() => {
   setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
   setIsAutoPlaying(false);
   setTimeout(() => setIsAutoPlaying(true), 10000);
 }, []);

 const slide = heroSlides[currentSlide];

 return (
   <section className="relative w-full overflow-hidden bg-white">
     {/* Animated Background Mesh */}
     <div className={`absolute inset-0 bg-gradient-to-br ${slide.theme.secondary} transition-all duration-1000 ease-in-out`}>
       <div className="absolute inset-0 opacity-30">
         <div className={`absolute top-0 -left-4 w-72 h-72 ${slide.theme.glow} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
         <div className={`absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
         <div className={`absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>
       </div>
     </div>

     {/* Main Container */}
     <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
       <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] md:min-h-[600px] lg:min-h-[650px] py-12 lg:py-0">
         
         {/* Left Content */}
         <div 
           ref={slideRef}
           key={`content-${currentSlide}`}
           className="flex flex-col gap-5 lg:gap-6 items-start z-10 order-2 lg:order-1 animate-fade-in-up"
         >
           {/* Badge with Pulse Effect */}
           <div className="flex items-center gap-3">
             <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${slide.theme.badge} text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-current/20`}>
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
               </span>
               {slide.badge}
             </span>
             <span className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200">
               Free Delivery Available
             </span>
           </div>

           {/* Title with Gradient Text Option */}
           <div className="space-y-2">
             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
               {slide.title}
             </h1>
           </div>

           {/* Subtitle with Better Typography */}
           <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
             {slide.subtitle}
           </p>

           {/* Price Section - Redesigned */}
           <div className="flex flex-wrap items-baseline gap-3 mt-2 bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/60 shadow-sm">
             <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
               {slide.price}
             </span>
             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
               <span className="text-lg text-slate-400 line-through font-medium decoration-slate-400 decoration-2">
                 {slide.originalPrice}
               </span>
               <span className={`px-3 py-1.5 bg-gradient-to-r ${slide.theme.primary} text-white text-sm font-bold rounded-lg shadow-md shadow-current/20`}>
                 {slide.discount}
               </span>
             </div>
           </div>

           {/* CTAs - Enhanced with Gradients and Icons */}
           <div className="flex flex-wrap gap-4 mt-2 w-full sm:w-auto">
             <button className={`group relative overflow-hidden bg-gradient-to-r ${slide.theme.primary} text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-current/20 hover:shadow-2xl hover:shadow-current/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 min-w-[160px] justify-center`}>
               <span className="relative z-10">{slide.cta}</span>
               <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
               </svg>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
             </button>
             
             <button className="group px-8 py-4 rounded-2xl font-bold text-base text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 min-w-[160px] justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
               {slide.ctaSecondary}
               <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </button>
           </div>

           {/* Trust Indicators */}
           <div className="flex items-center gap-4 mt-4 text-xs font-medium text-slate-500">
             <span className="flex items-center gap-1.5">
               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
               Genuine Product
             </span>
             <span className="w-1 h-1 rounded-full bg-slate-300"></span>
             <span className="flex items-center gap-1.5">
               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
               2 Year Warranty
             </span>
           </div>
         </div>

         {/* Right - Product Image with 3D Effect */}
         <div 
           key={`image-${currentSlide}`}
           className="relative flex items-center justify-center order-1 lg:order-2 animate-fade-in-scale"
         >
           <div className="relative w-full max-w-md lg:max-w-xl xl:max-w-2xl group perspective-1000">
             {/* Glow Effect Behind Image */}
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] ${slide.theme.glow} rounded-full blur-[100px] opacity-30 transition-all duration-1000`}></div>
             
             {/* Image Container with Float Animation */}
             <div className="relative transform transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-6 preserve-3d animate-float">
               <img
                 src={slide.image}
                 alt={slide.title}
                 className="w-full h-auto object-contain drop-shadow-2xl filter brightness-105 contrast-105"
               />
               
               {/* Reflection/Shine Effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
             </div>

             {/* Floating Price Tag */}
             <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:right-0 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 animate-bounce-slow hidden sm:block">
               <div className="flex items-center gap-2">
                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                   <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                 <div>
                   <p className="text-xs text-slate-500 font-semibold">Lowest Price</p>
                   <p className="text-sm font-bold text-slate-900">Guaranteed</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>

     {/* Glassmorphic Navigation */}
     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border border-white/50">
       {/* Previous Button */}
       <button
         onClick={prevSlide}
         aria-label="Previous slide"
         className="w-10 h-10 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-slate-100 group"
       >
         <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
         </svg>
       </button>

       {/* Progress Indicators */}
       <div className="flex items-center gap-2">
         {heroSlides.map((_, index) => (
           <button
             key={index}
             onClick={() => goToSlide(index)}
             aria-label={`Go to slide ${index + 1}`}
             className="relative h-1.5 rounded-full overflow-hidden bg-slate-200 transition-all duration-500 hover:bg-slate-300"
             style={{ width: currentSlide === index ? '48px' : '12px' }}
           >
             {currentSlide === index && isAutoPlaying && (
               <div 
                 className={`absolute inset-y-0 left-0 bg-gradient-to-r ${slide.theme.primary} transition-all duration-100 ease-linear`}
                 style={{ width: `${progress}%` }}
               />
             )}
             {currentSlide === index && !isAutoPlaying && (
               <div className={`absolute inset-0 bg-gradient-to-r ${slide.theme.primary}`} />
             )}
           </button>
         ))}
       </div>

       {/* Next Button */}
       <button
         onClick={nextSlide}
         aria-label="Next slide"
         className="w-10 h-10 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-slate-100 group"
       >
         <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
         </svg>
       </button>
     </div>

     {/* Side Navigation (Desktop) */}
     <button
       onClick={prevSlide}
       aria-label="Previous slide"
       className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md text-slate-700 items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50 z-10 group"
     >
       <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
       </svg>
     </button>
     <button
       onClick={nextSlide}
       aria-label="Next slide"
       className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md text-slate-700 items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50 z-10 group"
     >
       <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
       </svg>
     </button>

     {/* Custom Styles for Animations */}
     <style jsx>{`
       @keyframes blob {
         0% { transform: translate(0px, 0px) scale(1); }
         33% { transform: translate(30px, -50px) scale(1.1); }
         66% { transform: translate(-20px, 20px) scale(0.9); }
         100% { transform: translate(0px, 0px) scale(1); }
       }
       .animate-blob {
         animation: blob 7s infinite;
       }
       .animation-delay-2000 {
         animation-delay: 2s;
       }
       .animation-delay-4000 {
         animation-delay: 4s;
       }
       @keyframes float {
         0%, 100% { transform: translateY(0px); }
         50% { transform: translateY(-20px); }
       }
       .animate-float {
         animation: float 6s ease-in-out infinite;
       }
       @keyframes bounce-slow {
         0%, 100% { transform: translateY(0); }
         50% { transform: translateY(-10px); }
       }
       .animate-bounce-slow {
         animation: bounce-slow 3s ease-in-out infinite;
       }
       @keyframes fade-in-up {
         0% { opacity: 0; transform: translateY(30px); }
         100% { opacity: 1; transform: translateY(0); }
       }
       .animate-fade-in-up {
         animation: fade-in-up 0.6s ease-out forwards;
       }
       @keyframes fade-in-scale {
         0% { opacity: 0; transform: scale(0.9); }
         100% { opacity: 1; transform: scale(1); }
       }
       .animate-fade-in-scale {
         animation: fade-in-scale 0.6s ease-out forwards;
       }
       .perspective-1000 {
         perspective: 1000px;
       }
       .preserve-3d {
         transform-style: preserve-3d;
       }
       .rotate-y-12:hover {
         transform: rotateY(12deg);
       }
       .rotate-x-6:hover {
         transform: rotateX(6deg);
       }
     `}</style>
   </section>
 );
}

export default Hero;