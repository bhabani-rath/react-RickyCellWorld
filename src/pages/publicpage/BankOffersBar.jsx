import React, { useState, useEffect, useRef, useCallback } from 'react';

// Bank offers data with enhanced styling per bank
const defaultOffers = [
{
  id: 1,
  bank: "HDFC Bank",
  logo: "https://placehold.co/48x48/e5e7eb/1f2937?text=HDFC",
  title: "10% Instant Discount",
  description: "On orders above ₹3,000 with HDFC Credit Cards",
  badge: "New Users",
  gradient: "from-rose-500 to-pink-600",
  bgAccent: "bg-rose-50",
},
{
  id: 2,
  bank: "ICICI Bank",
  logo: "https://placehold.co/48x48/e5e7eb/1f2937?text=ICICI",
  title: "Flat ₹500 Off",
  description: "Valid on ICICI Credit & Debit Card transactions",
  badge: "Limited Time",
  gradient: "from-orange-500 to-amber-500",
  bgAccent: "bg-orange-50",
},
{
  id: 3,
  bank: "SBI Card",
  logo: "https://placehold.co/48x48/e5e7eb/1f2937?text=SBI",
  title: "No Cost EMI",
  description: "3 & 6 months EMI available on all products",
  badge: "Popular",
  gradient: "from-blue-600 to-indigo-600",
  bgAccent: "bg-blue-50",
},
{
  id: 4,
  bank: "Axis Bank",
  logo: "https://placehold.co/48x48/e5e7eb/1f2937?text=AXIS",
  title: "5% Cashback",
  description: "Up to ₹1,000 cashback per billing cycle",
  badge: null,
  gradient: "from-emerald-500 to-teal-500",
  bgAccent: "bg-emerald-50",
},
{
  id: 5,
  bank: "Kotak Bank",
  logo: "https://placehold.co/48x48/e5e7eb/1f2937?text=KOTAK",
  title: "15% Off First Buy",
  description: "On your first transaction with Kotak cards",
  badge: "Hot Deal",
  gradient: "from-violet-500 to-purple-600",
  bgAccent: "bg-violet-50",
}
];

function BankOffersBar({ offers = defaultOffers }) {
const scrollRef = useRef(null);
const [isPaused, setIsPaused] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);
const [isMobile, setIsMobile] = useState(false);
const [progress, setProgress] = useState(0);
const [hoveredCard, setHoveredCard] = useState(null);

const SLIDE_DURATION = 4000;

// Detect mobile viewport
useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// Progress bar animation
useEffect(() => {
  if (isPaused || isMobile) {
    setProgress(0);
    return;
  }

  let startTime = Date.now();
  let animationFrame;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
    setProgress(newProgress);
    
    if (newProgress < 100) {
      animationFrame = requestAnimationFrame(animate);
    }
  };

  animationFrame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationFrame);
}, [activeIndex, isPaused, isMobile]);

// Auto-slide effect
useEffect(() => {
  if (isPaused || isMobile) return;

  const interval = setInterval(() => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const step = isMobile ? 276 : 336;
    
    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      setActiveIndex(0);
    } else {
      scrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
      setActiveIndex(prev => (prev + 1) % offers.length);
    }
  }, SLIDE_DURATION);

  return () => clearInterval(interval);
}, [isPaused, isMobile, offers.length]);

const handleScroll = () => {
  if (!scrollRef.current) return;
  const step = isMobile ? 276 : 336;
  const newIndex = Math.round(scrollRef.current.scrollLeft / step);
  setActiveIndex(Math.min(newIndex, offers.length - 1));
};

const scrollToIndex = (index) => {
  if (!scrollRef.current) return;
  const step = isMobile ? 276 : 336;
  scrollRef.current.scrollTo({ left: index * step, behavior: 'smooth' });
  setActiveIndex(index);
  setIsPaused(true);
  setTimeout(() => setIsPaused(false), 10000);
};

const navigateSlide = (direction) => {
  const newIndex = direction === 'next' 
    ? (activeIndex + 1) % offers.length
    : (activeIndex - 1 + offers.length) % offers.length;
  scrollToIndex(newIndex);
  setIsPaused(true);
  setTimeout(() => setIsPaused(false), 10000);
};

return (
  <section className="relative w-full bg-slate-50/50 py-12 lg:py-16 overflow-hidden">
    {/* Subtle background decoration */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
            <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Exclusive Deals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Bank Offers & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Partnerships</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-md">
            Unlock additional savings with leading banking partners
          </p>
        </div>
        
        {/* Navigation Arrows (Desktop) */}
        <div className="hidden sm:flex items-center gap-2">
          <button 
            onClick={() => navigateSlide('prev')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Previous offer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => navigateSlide('next')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Next offer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-8 w-8 sm:w-16 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-8 w-8 sm:w-16 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable Track */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 [-webkit-overflow-scrolling:touch] scrollbar-hide"
        >
          {offers.map((offer, idx) => (
            <div 
              key={offer.id}
              onMouseEnter={() => setHoveredCard(offer.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                snap-start shrink-0 w-[280px] sm:w-[340px] rounded-2xl bg-white 
                border border-slate-100 shadow-sm hover:shadow-xl 
                transition-all duration-500 ease-out cursor-pointer select-none
                transform hover:-translate-y-1 relative overflow-hidden
                ${hoveredCard === offer.id ? 'shadow-lg' : ''}
              `}
            >
              {/* Top Gradient Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${offer.gradient} transform origin-left transition-transform duration-500 ${hoveredCard === offer.id ? 'scale-x-100' : 'scale-x-0'}`}></div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  {/* Bank Logo Container */}
                  <div className={`
                    relative shrink-0 w-14 h-14 rounded-xl ${offer.bgAccent} 
                    flex items-center justify-center overflow-hidden
                    transition-transform duration-500 group-hover:scale-110
                  `}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-0 hover:opacity-10 transition-opacity duration-300`}></div>
                    <img 
                      src={offer.logo} 
                      alt={offer.bank}
                      className="w-10 h-10 object-contain relative z-10"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  
                  {/* Offer Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {offer.bank}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      {offer.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {offer.description}
                </p>

                {/* Footer with Badge and CTA */}
                <div className="mt-4 flex items-center justify-between">
                  {offer.badge ? (
                    <span className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                      bg-gradient-to-r ${offer.gradient} text-white shadow-md shadow-current/20
                      transform transition-transform duration-300 hover:scale-105
                    `}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      {offer.badge}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      Valid till 31st Dec
                    </span>
                  )}
                  
                  {/* Arrow Link */}
                  <button className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    transition-all duration-300 transform
                    ${hoveredCard === offer.id ? 'bg-slate-900 text-white translate-x-0' : 'bg-slate-100 text-slate-400 -translate-x-2 opacity-0'}
                  `}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`
                absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${offer.gradient} 
                rounded-full blur-3xl opacity-0 transition-opacity duration-500 pointer-events-none
                ${hoveredCard === offer.id ? 'opacity-10' : ''}
              `}></div>
            </div>
          ))}
        </div>

        {/* Progress Dots with Integrated Progress Bar */}
        <div className="flex justify-center items-center gap-3 mt-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`View offer ${index + 1} of ${offers.length}`}
              className="relative h-2 rounded-full overflow-hidden bg-slate-200 transition-all duration-500 hover:bg-slate-300"
              style={{ width: activeIndex === index ? '48px' : '12px' }}
            >
              {/* Progress Fill */}
              {activeIndex === index && !isPaused && (
                <div 
                  className="absolute inset-y-0 left-0 bg-slate-900 transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              )}
              {/* Static Fill when paused or active */}
              {(activeIndex !== index || isPaused) && activeIndex === index && (
                <div className="absolute inset-0 bg-slate-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      {isMobile && (
        <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Swipe to explore offers</span>
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
    </div>
    
    {/* Bottom border */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

    <style jsx>{`
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  </section>
);
}

export default BankOffersBar;