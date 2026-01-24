import { useEffect, useRef } from "react";

// Clean category data matching the design reference
const menuCategories = [
  { icon: "smartphone", name: "Mobiles", count: "54 Models", slug: "mobiles" },
  { icon: "headphones", name: "Accessories", count: "200+ Items", slug: "audio" },
  { icon: "laptop", name: "Laptops", count: "32 Models", slug: "laptops" },
  { icon: "tv", name: "Televisions", count: "Smart & 4K", slug: "tvs" },
  { icon: "kitchen", name: "Refrigerators", count: "Double Door & More", slug: "fridges" },
  { icon: "local_laundry_service", name: "Washing Machines", count: "Front & Top Load", slug: "washing" },
  { icon: "ac_unit", name: "Air Conditioners", count: "Split & Window", slug: "acs" },
  { icon: "blender", name: "Other Appliances", count: "Kitchen & Home", slug: "appliances" },
];

function MegaMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Menu Container */}
      <div
        ref={menuRef}
        className="fixed left-1/2 -translate-x-1/2 top-20 w-[1000px] max-w-[95vw] z-50 pointer-events-none" // pointer-events-none on wrapper to let clicks pass through padding if any
      >
        {/* Menu Card */}
        <div className="bg-white rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-6 pointer-events-auto animate-slideDown">
          
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                   <span className="material-symbols-outlined text-blue-600">grid_view</span>
                </div>
                <div>
                   <h2 className="text-lg font-bold text-slate-900 leading-tight">Shop by Category</h2>
                   <p className="text-xs text-slate-500 font-medium">Explore our premium collection</p>
                </div>
             </div>
             <button 
               onClick={onClose}
               className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-all"
             >
               <span className="material-symbols-outlined text-lg">close</span>
             </button>
          </div>

          {/* Grid of Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {menuCategories.map((cat, idx) => (
              <a 
                key={idx}
                href={`#${cat.slug}`}
                className="flex flex-col p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-slate-100 group"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-white group-hover:bg-blue-600 flex items-center justify-center shadow-sm mb-4 transition-colors duration-300">
                  <span className="material-symbols-outlined text-slate-600 group-hover:text-white text-2xl transition-colors duration-300">
                    {cat.icon}
                  </span>
                </div>
                
                {/* Text */}
                <h3 className="text-base font-bold text-slate-900 mb-1">{cat.name}</h3>
                <p className="text-xs font-medium text-slate-500">{cat.count}</p>
              </a>
            ))}
          </div>

          {/* Trending Footer */}
          <div className="flex items-center justify-between bg-slate-50 rounded-xl px-6 py-4 border border-slate-100">
             <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider text-xs">
                   <span className="material-symbols-outlined text-lg">trending_up</span>
                   Trending Now
                </div>
                
                <div className="hidden md:flex items-center gap-6 text-slate-600 font-medium">
                   {["iPhone 15 Pro", "Sony Bravia OLED", "Dyson V15", "PS5 Slim"].map((item, i) => (
                      <span key={i} className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition-colors">
                         <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                         {item}
                      </span>
                   ))}
                </div>
             </div>

             <a href="#" className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
                View All Deals
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
             </a>
          </div>

        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}

export default MegaMenu;

