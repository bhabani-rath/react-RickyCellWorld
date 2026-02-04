import { useEffect, useRef, useState } from "react";

const features = [
 {
   icon: (
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
       <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
     </svg>
   ),
   title: "Authorized Dealer",
   description: "100% genuine products with official warranty",
   gradient: "from-emerald-500 to-teal-500",
   bgColor: "bg-emerald-50",
 },
 {
   icon: (
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
       <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
     </svg>
   ),
   title: "Instant Support",
   description: "Direct WhatsApp line for immediate assistance",
   gradient: "from-blue-500 to-indigo-500",
   bgColor: "bg-blue-50",
 },
 {
   icon: (
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
       <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
     </svg>
   ),
   title: "Express Delivery",
   description: "Same-day dispatch or convenient store pickup",
   gradient: "from-amber-500 to-orange-500",
   bgColor: "bg-amber-50",
 },
 {
   icon: (
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
       <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
     </svg>
   ),
   title: "Secure Payment",
   description: "UPI, Cards, EMI & COD options available",
   gradient: "from-violet-500 to-purple-500",
   bgColor: "bg-violet-50",
 },
];

function Features() {
 const [isVisible, setIsVisible] = useState(false);
 const sectionRef = useRef(null);

 useEffect(() => {
   const observer = new IntersectionObserver(
     ([entry]) => {
       if (entry.isIntersecting) {
         setIsVisible(true);
         observer.disconnect();
       }
     },
     { threshold: 0.2 }
   );

   if (sectionRef.current) {
     observer.observe(sectionRef.current);
   }

   return () => observer.disconnect();
 }, []);

 return (
   <section ref={sectionRef} className="relative w-full bg-white overflow-hidden">
     {/* Top border with gradient */}
     <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
     
     <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
         {features.map((feature, index) => (
           <div
             key={index}
             className={`group relative p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 ease-out transform ${
               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
             }`}
             style={{ transitionDelay: `${index * 100}ms` }}
           >
             {/* Hover gradient glow */}
             <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl`}></div>
             
             <div className="relative flex items-start gap-4">
               {/* Icon Container */}
               <div className={`relative shrink-0 w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                 <div className={`w-6 h-6 text-slate-700 transition-colors duration-300`}>
                   {feature.icon}
                 </div>
                 {/* Subtle gradient overlay on icon bg */}
                 <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
               </div>

               {/* Content */}
               <div className="flex-1 min-w-0">
                 <h3 className="font-semibold text-slate-900 text-base mb-1 group-hover:text-slate-800 transition-colors">
                   {feature.title}
                 </h3>
                 <p className="text-slate-500 text-sm leading-relaxed">
                   {feature.description}
                 </p>
               </div>
             </div>

             {/* Animated corner accent */}
             <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-tr-2xl rounded-bl-[100px] transition-opacity duration-500`}></div>
             
             {/* Bottom line accent on hover */}
             <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`}></div>
           </div>
         ))}
       </div>

       {/* Trust indicators row */}
       <div className="mt-12 pt-8 border-t border-slate-100">
         <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
           <div className="flex items-center gap-2">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
             </svg>
             <span className="font-medium">ISO 9001 Certified</span>
           </div>
           <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
           <div className="flex items-center gap-2">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
             <span className="font-medium">4.9/5 Customer Rating</span>
           </div>
           <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
           <div className="flex items-center gap-2">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
             </svg>
             <span className="font-medium">Trusted by 10M+ Customers</span>
           </div>
         </div>
       </div>
     </div>
     
     {/* Bottom border with gradient */}
     <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
   </section>
 );
}

export default Features;