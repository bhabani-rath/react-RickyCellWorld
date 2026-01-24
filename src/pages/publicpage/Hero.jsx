import { useState, useEffect, useCallback } from "react";

// Carousel slides data
const heroSlides = [
  {
    id: 1,
    badge: "New Arrivals",
    title: "Upgrade Your",
    highlight: "Digital Life.",
    description:
      "Authorized retailer for Apple, Samsung, and more. Get the latest tech with official manufacturer warranty.",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    productName: "iPhone 15 Pro Max",
    productTagline: "Titanium. So strong. So light.",
  },
  {
    id: 2,
    badge: "Best Sellers",
    title: "Premium",
    highlight: "Smart TVs.",
    description:
      "Experience cinema at home with 4K OLED displays from Sony, Samsung, and LG. Free installation included.",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    productName: "Sony Bravia XR OLED",
    productTagline: "The pinnacle of picture quality.",
  },
  {
    id: 3,
    badge: "Hot Deals",
    title: "Cool Your",
    highlight: "Summer.",
    description:
      "Energy-efficient inverter ACs from top brands. Up to 5-star ratings with instant cooling technology.",
    image:
      "/images/ac.png",
    productName: "Daikin Inverter AC",
    productTagline: "Whisper quiet. Ultra efficient.",
  },
  { 
    id: 4,
    badge: "Trending",
    title: "Power Your",
    highlight: "Productivity.",
    description:
      "Latest laptops from Apple, Dell, HP, and Lenovo. Perfect for work, gaming, and creativity.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    productName: "MacBook Air M3",
    productTagline: "Supercharged by M3 chip.",
  },
  {
    id: 5,
    badge: "Just Launched",
    title: "Smart Home",
    highlight: "Appliances.",
    description:
      "Modern refrigerators, washing machines, and kitchen appliances. Built for the connected home.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    productName: "Samsung Bespoke Fridge",
    productTagline: "Customize your style.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-white opacity-50"></div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 items-start">
            {/* Badge with animation */}
            <div
              key={`badge-${slide.id}`}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-xs font-bold uppercase tracking-wider animate-fadeIn"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {slide.badge}
            </div>

            {/* Title with animation */}
            <h1
              key={`title-${slide.id}`}
              className="text-5xl sm:text-6xl font-extrabold text-primary-dark leading-[1.1] tracking-tight animate-fadeIn"
            >
              {slide.title} <br />
              <span className="text-primary">{slide.highlight}</span>
            </h1>

            {/* Description with animation */}
            <p
              key={`desc-${slide.id}`}
              className="text-lg text-slate-600 max-w-md font-medium animate-fadeIn"
            >
              {slide.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button className="bg-primary hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
                View Offers
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
              <button className="bg-white border border-slate-200 text-slate-900 px-8 py-3.5 rounded-lg font-bold text-base transition-all hover:bg-slate-50 flex items-center gap-2">
                <span className="material-symbols-outlined text-whatsapp">
                  chat
                </span>
                WhatsApp Us
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex items-center gap-3 mt-4">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Hero Image Carousel */}
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
            {/* Image with fade transition */}
            {heroSlides.map((s, index) => (
              <div
                key={s.id}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url('${s.image}')` }}
              />
            ))}

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 via-black/30 to-transparent h-1/2" />

            {/* Product info */}
            <div
              key={`product-${slide.id}`}
              className="absolute bottom-0 left-0 w-full p-8 animate-fadeIn"
            >
              <p className="text-white font-bold text-xl">
                {slide.productName}
              </p>
              <p className="text-slate-200 text-sm">{slide.productTagline}</p>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>

            {/* Slide counter */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold">
              {currentSlide + 1} / {heroSlides.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
