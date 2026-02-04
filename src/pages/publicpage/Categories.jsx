import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

// Featured categories with enhanced styling
const featuredCategories = [
 {
   name: "Mobile Phones",
   subtitle: "Latest Flagships & 5G Devices",
   slug: "mobiles",
   image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
   size: "large",
   accent: "from-violet-500 to-fuchsia-500",
   glow: "shadow-violet-500/20",
   icon: (
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="1.5"/>
       <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round"/>
     </svg>
   ),
   count: "2,400+ Products"
 },
 {
   name: "Laptops",
   subtitle: "Pro Powerhouses",
   slug: "laptops",
   image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
   size: "wide",
   accent: "from-blue-500 to-cyan-500",
   glow: "shadow-blue-500/20",
   icon: (
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="1.5"/>
       <path d="M2 17h20v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" strokeWidth="1.5"/>
     </svg>
   ),
   count: "850+ Products"
 },
 {
   name: "Audio",
   subtitle: "Hi-Fi Experience",
   slug: "audio",
   image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
   size: "square",
   accent: "from-amber-500 to-orange-500",
   glow: "shadow-amber-500/20",
   icon: (
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeWidth="1.5"/>
       <path d="M19 10v2a7 7 0 01-14 0v-2" strokeWidth="1.5"/>
       <path d="M12 19v4" strokeWidth="1.5"/>
       <path d="M8 23h8" strokeWidth="1.5"/>
     </svg>
   ),
   count: "1,200+ Products"
 },
 {
   name: "Wearables",
   subtitle: "Smart Living",
   slug: "wearables",
   image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
   size: "square",
   accent: "from-emerald-500 to-teal-500",
   glow: "shadow-emerald-500/20",
   icon: (
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <rect x="7" y="3" width="10" height="18" rx="4" strokeWidth="1.5"/>
       <path d="M12 8v4" strokeWidth="1.5" strokeLinecap="round"/>
     </svg>
   ),
   count: "600+ Products"
 },
];

// Quick categories with images - transformed into visual cards
const quickCategories = [
 { 
   name: "TVs & Home", 
   slug: "tvs", 
   image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
   itemCount: "320+",
   color: "from-rose-500 to-pink-500"
 },
 { 
   name: "AC & Cooling", 
   slug: "acs", 
   image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
   itemCount: "150+",
   color: "from-indigo-500 to-violet-500"
 },
 { 
   name: "Cameras", 
   slug: "cameras", 
   image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
   itemCount: "240+",
   color: "from-pink-500 to-rose-500"
 },
 { 
   name: "Appliances", 
   slug: "appliances", 
   image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
   itemCount: "1,200+",
   color: "from-teal-500 to-emerald-500"
 },
];

function Categories() {
 const navigate = useNavigate();
 const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 const [hoveredCard, setHoveredCard] = useState(null);
 const [hoveredQuick, setHoveredQuick] = useState(null);
 const cardRefs = useRef({});

 const handleMouseMove = (e, slug) => {
   const rect = cardRefs.current[slug]?.getBoundingClientRect();
   if (rect) {
     setMousePosition({
       x: e.clientX - rect.left,
       y: e.clientY - rect.top,
     });
   }
 };

 const handleCategoryClick = (slug) => {
   if (slug === "all") {
     navigate("/category");
   } else {
     navigate(`/category?category=${slug}`);
   }
 };

 return (
   <section id="categories" className="relative py-20 lg:py-28 bg-slate-50/50 overflow-hidden">
     {/* Background Elements */}
     <div className="absolute inset-0 pointer-events-none">
       <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
       <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
       <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
     </div>

     <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
       {/* Header with decorative line */}
       <div className="flex items-end justify-between mb-12 lg:mb-16">
         <div className="space-y-2">
           <div className="flex items-center gap-3">
             <div className="h-px w-12 bg-gradient-to-r from-slate-900 to-transparent"></div>
             <span className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Browse Collection</span>
           </div>
           <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
             Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Category</span>
           </h2>
         </div>
         <p className="hidden lg:block text-slate-500 max-w-xs text-right text-sm leading-relaxed">
           Explore our curated collection of premium electronics across {featuredCategories.length} major categories
         </p>
       </div>

       {/* Asymmetric Bento Grid */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 auto-rows-[200px] lg:auto-rows-[240px]">
         {featuredCategories.map((category) => {
           const isHovered = hoveredCard === category.slug;
           
           return (
             <div
               key={category.slug}
               ref={(el) => (cardRefs.current[category.slug] = el)}
               onClick={() => handleCategoryClick(category.slug)}
               onMouseEnter={() => setHoveredCard(category.slug)}
               onMouseLeave={() => setHoveredCard(null)}
               onMouseMove={(e) => handleMouseMove(e, category.slug)}
               className={`
                 group relative overflow-hidden cursor-pointer
                 ${category.size === "large" ? "lg:col-span-5 lg:row-span-2 rounded-[2rem]" : ""}
                 ${category.size === "wide" ? "lg:col-span-7 rounded-3xl" : ""}
                 ${category.size === "square" ? "lg:col-span-3 rounded-3xl" : ""}
                 ${category.glow} hover:shadow-2xl
                 transition-all duration-500 ease-out
               `}
             >
               {/* Spotlight Effect */}
               <div 
                 className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                 style={{
                   background: isHovered ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 40%)` : 'none'
                 }}
               ></div>

               {/* Background Image with Parallax Zoom */}
               <div className="absolute inset-0 overflow-hidden">
                 <img
                   src={category.image}
                   alt={category.name}
                   className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                 />
                 {/* Dynamic Gradient Overlay */}
                 <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-60 mix-blend-multiply group-hover:opacity-70 transition-opacity duration-500`}></div>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
               </div>

               {/* Glassmorphism Content Card */}
               <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                 {/* Top Section */}
                 <div className="flex justify-between items-start">
                   <div className={`w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isHovered ? 'shadow-lg' : ''}`}>
                     {category.icon}
                   </div>
                   
                   {/* Floating Badge */}
                   <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide opacity-0 transform -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                     {category.count}
                   </div>
                 </div>

                 {/* Bottom Content */}
                 <div className="space-y-3 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                   <div className="space-y-1">
                     <h3 className={`font-bold text-white tracking-tight ${category.size === "large" ? "text-3xl lg:text-4xl" : "text-2xl"}`}>
                       {category.name}
                     </h3>
                     <p className="text-white/80 text-sm font-medium">{category.subtitle}</p>
                   </div>
                   
                   {/* Animated CTA Line */}
                   <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                     <span className="text-sm font-semibold tracking-wide">Explore</span>
                     <svg 
                       className="w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-2" 
                       fill="none" 
                       stroke="currentColor" 
                       viewBox="0 0 24 24"
                     >
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                   </div>
                 </div>
               </div>

               {/* Border Gradient Animation */}
               <div className={`absolute inset-0 rounded-[inherit] border border-white/20 group-hover:border-white/40 transition-colors duration-500 pointer-events-none`}></div>
               <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/10 to-transparent"></div>
             </div>
           );
         })}
       </div>

       {/* Quick Categories - Now with Images as Horizontal Scroll */}
       <div className="mt-12 lg:mt-16">
         <div className="flex items-center justify-between mb-6">
           <h3 className="text-lg font-semibold text-slate-900">More Categories</h3>
           <button 
             onClick={() => navigate("/category")}
             className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 group"
           >
             View All
             <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
           </button>
         </div>
         
         {/* Horizontal Scroll Container */}
         <div className="relative group/scroll">
           {/* Gradient Masks */}
           <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none"></div>
           <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none"></div>
           
           <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide [-webkit-overflow-scrolling:touch]">
             {quickCategories.map((category, index) => (
               <div
                 key={category.slug}
                 onClick={() => handleCategoryClick(category.slug)}
                 onMouseEnter={() => setHoveredQuick(category.slug)}
                 onMouseLeave={() => setHoveredQuick(null)}
                 className="group relative flex-shrink-0 w-40 sm:w-48 snap-start cursor-pointer"
               >
                 {/* Card Container */}
                 <div className="relative h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                   {/* Background Image */}
                   <img
                     src={category.image}
                     alt={category.name}
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   
                   {/* Gradient Overlay */}
                   <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 mix-blend-multiply group-hover:opacity-80 transition-opacity duration-500`}></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                   
                   {/* Content */}
                   <div className="absolute inset-0 p-4 flex flex-col justify-end">
                     <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                       <p className="text-white/70 text-xs font-medium mb-1">{category.itemCount} items</p>
                       <h4 className="text-white font-bold text-lg leading-tight">{category.name}</h4>
                     </div>
                     
                     {/* Hover Arrow */}
                     <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                       </svg>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
             
             {/* View All Card */}
             <div
               onClick={() => navigate("/category")}
               className="group relative flex-shrink-0 w-40 sm:w-48 snap-start cursor-pointer"
             >
               <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center gap-3 border border-slate-800">
                 <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                   <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                   </svg>
                 </div>
                 <span className="text-slate-400 font-medium text-sm group-hover:text-white transition-colors">Explore All</span>
                 
                 {/* Animated Rings */}
                 <div className="absolute inset-0 rounded-2xl border border-slate-700 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"></div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Ambient Glow at Bottom */}
       <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
     </div>

     {/* Custom Animations */}
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

export default Categories;