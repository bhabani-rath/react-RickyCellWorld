import { useEffect, useRef, useState } from "react";

// Trust badges data - Enhanced with SVG icons
const trustBadges = [
{
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  title: "Extended Warranty",
  subtitle: "Up to 2 Years Additional Coverage",
  gradient: "from-blue-500 to-cyan-500",
  bgColor: "bg-blue-50",
  borderColor: "border-blue-100",
},
{
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="m7 15 3-3 3 3" />
    </svg>
  ),
  title: "Free Express Delivery",
  subtitle: "On Orders Above ₹5,000",
  gradient: "from-emerald-500 to-teal-500",
  bgColor: "bg-emerald-50",
  borderColor: "border-emerald-100",
},
{
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  title: "100% Genuine Products",
  subtitle: "Authorized Retailer Guarantee",
  gradient: "from-violet-500 to-purple-500",
  bgColor: "bg-violet-50",
  borderColor: "border-violet-100",
},
{
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <circle cx="7" cy="15" r="1" />
      <circle cx="17" cy="15" r="1" />
    </svg>
  ),
  title: "Easy Installments",
  subtitle: "No Cost EMI & Flexible Plans",
  gradient: "from-amber-500 to-orange-500",
  bgColor: "bg-amber-50",
  borderColor: "border-amber-100",
},
];

// Stats data
const stats = [
{ value: 160, suffix: "+", label: "Stores Nationwide", icon: "store" },
{ value: 10, suffix: "M+", label: "Happy Customers", icon: "users" },
{ value: 1000, suffix: "+", label: "Premium Brands", icon: "award" },
{ value: 24, suffix: "/7", label: "Expert Support", icon: "headphones" },
];

function TrustBadges() {
const [counters, setCounters] = useState(stats.map(() => 0));
const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef(null);

// Intersection Observer for counter animation
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);

// Counter animation effect
useEffect(() => {
  if (!isVisible) return;

  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;

  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    setCounters(
      stats.map((stat) => Math.floor(stat.value * easeOutQuart))
    );

    if (currentStep >= steps) {
      clearInterval(interval);
      setCounters(stats.map((stat) => stat.value));
    }
  }, stepDuration);

  return () => clearInterval(interval);
}, [isVisible]);

return (
  <section ref={sectionRef} className="relative w-full bg-slate-50/50 overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
    </div>

    <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
      {/* Trust Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {trustBadges.map((badge, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Gradient Border Top */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${badge.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            
            {/* Hover Glow Effect */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`}></div>

            <div className="relative flex items-start gap-4">
              {/* Icon Container */}
              <div className={`relative shrink-0 w-14 h-14 rounded-xl ${badge.bgColor} ${badge.borderColor} border flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <div className={`w-7 h-7 ${badge.gradient} bg-clip-text`}>
                  {badge.icon}
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-slate-800 transition-colors">
                  {badge.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {badge.subtitle}
                </p>
              </div>
            </div>

            {/* Arrow indicator on hover */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section - Glassmorphism Card */}
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        
        <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Glow Effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="relative text-center group"
              >
                {/* Value with Counter */}
                <div className="relative inline-block mb-2">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight tabular-nums">
                    {counters[index]}{stat.suffix}
                  </span>
                  {/* Underline decoration */}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
                
                {/* Label */}
                <p className="text-sm sm:text-base text-slate-300 font-medium">
                  {stat.label}
                </p>

                {/* Connecting line (except last) */}
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-slate-600 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60">
        <div className="flex items-center gap-2 text-slate-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Secure Payments</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
        <div className="flex items-center gap-2 text-slate-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100-2H6V7h5a1 1 0 011 1v5h2V8a3 3 0 00-3-3H6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Easy Returns</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
        <div className="flex items-center gap-2 text-slate-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Verified Reviews</span>
        </div>
      </div>
    </div>
  </section>
);
}

export default TrustBadges;