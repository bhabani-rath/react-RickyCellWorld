import { useState, useEffect, useRef } from "react";

// Brand logos data
const brands = [
{
  name: "Apple",
  logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  slug: "apple",
},
{
  name: "Samsung",
  logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  slug: "samsung",
},
{
  name: "Sony",
  logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  slug: "sony",
},
{
  name: "LG",
  logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg",
  slug: "lg",
},
{
  name: "Dell",
  logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
  slug: "dell",
},
{
  name: "HP",
  logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
  slug: "hp",
},
{
  name: "OnePlus",
  logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/OnePlus_logo.svg",
  slug: "oneplus",
},
{
  name: "Xiaomi",
  logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg",
  slug: "xiaomi",
},
{
  name: "Bose",
  logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Bose_logo.svg",
  slug: "bose",
},
{
  name: "Daikin",
  logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Daikin_logo.svg",
  slug: "daikin",
},
];

function BrandShowcase() {
const [isPaused, setIsPaused] = useState(false);
const [hoveredBrand, setHoveredBrand] = useState(null);
const containerRef = useRef(null);

// Duplicate brands for seamless infinite loop
const duplicatedBrands = [...brands, ...brands, ...brands];

return (
  <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden">
    {/* Subtle background texture */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(241,245,249,0.8)_0%,transparent_70%)]"></div>
    
    <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header - Minimalist & Elegant */}
      <div className="text-center mb-12 lg:mb-16 space-y-3">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Authorized Partners
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 tracking-tight">
          Trusted by <span className="font-semibold">Industry Leaders</span>
        </h2>
        <p className="text-slate-500 text-base max-w-md mx-auto font-light">
          Explore our curated collection of world-class electronics brands
        </p>
      </div>

      {/* Marquee Container */}
      <div 
        ref={containerRef}
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Masks - Left & Right */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div 
          className={`flex gap-6 ${isPaused ? 'animation-paused' : ''}`}
          style={{
            animation: 'scroll 40s linear infinite',
            width: 'fit-content',
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <a
              key={`${brand.slug}-${index}`}
              href={`/category?brand=${brand.slug}`}
              onMouseEnter={() => setHoveredBrand(brand.slug)}
              onMouseLeave={() => setHoveredBrand(null)}
              className="group/item relative flex-shrink-0 w-48 sm:w-56 h-24 sm:h-28 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-white transition-all duration-500 ease-out flex items-center justify-center overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5`}></div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col items-center gap-2 px-4">
                {/* Logo Container with Grayscale Effect */}
                <div className="relative w-full h-10 flex items-center justify-center">
                  {/* Fallback Icon if image fails */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-0 transition-opacity">
                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  
                  {/* Actual Logo */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-50 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700 ease-out transform group-hover/item:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Text fallback on error */}
                  <span className="hidden text-lg font-bold text-slate-400 group-hover/item:text-slate-800 transition-colors">
                    {brand.name}
                  </span>
                </div>

                {/* Brand Name - Reveals on Hover */}
                <span className={`text-xs font-medium tracking-wide uppercase transition-all duration-500 transform ${
                  hoveredBrand === brand.slug 
                    ? 'translate-y-0 opacity-100 text-slate-800' 
                    : 'translate-y-2 opacity-0 text-slate-400'
                }`}>
                  {brand.name}
                </span>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-slate-100/50 to-transparent rounded-bl-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
            </a>
          ))}
        </div>
      </div>

      {/* Second Row - Reverse Direction (Optional visual flair) */}
      <div 
        className="relative mt-6 group hidden lg:block"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

        <div 
          className={`flex gap-6 ${isPaused ? 'animation-paused' : ''}`}
          style={{
            animation: 'scroll-reverse 35s linear infinite',
            width: 'fit-content',
          }}
        >
          {[...duplicatedBrands].reverse().map((brand, index) => (
            <a
              key={`reverse-${brand.slug}-${index}`}
              href={`/category?brand=${brand.slug}`}
              className="group/item relative flex-shrink-0 w-48 h-24 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:border-slate-200 hover:bg-white transition-all duration-500 flex items-center justify-center overflow-hidden hover:shadow-lg hover:-translate-y-1 opacity-60 hover:opacity-100"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-[60%] max-h-[40%] object-contain filter grayscale opacity-40 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 lg:mt-16 text-center">
        <a 
          href="/brands" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group/link"
        >
          <span className="border-b border-transparent group-hover/link:border-slate-900 transition-all">
            View All 1000+ Brands
          </span>
          <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>

    {/* Animation Styles */}
    <style jsx>{`
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-33.33%);
        }
      }
      @keyframes scroll-reverse {
        0% {
          transform: translateX(-33.33%);
        }
        100% {
          transform: translateX(0);
        }
      }
      .animation-paused {
        animation-play-state: paused !important;
      }
    `}</style>
  </section>
);
}

export default BrandShowcase;