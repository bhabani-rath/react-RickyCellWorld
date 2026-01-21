import { useEffect, useRef } from "react";

// Categories data with Material Symbols icons
const categories = [
  {
    icon: "smartphone",
    name: "Mobiles",
    subtitle: "54 Models",
    slug: "mobiles",
  },
  {
    icon: "headphones",
    name: "Accessories",
    subtitle: "200+ Items",
    slug: "accessories",
  },
  {
    icon: "laptop_mac",
    name: "Laptops",
    subtitle: "32 Models",
    slug: "laptops",
  },
  {
    icon: "tv",
    name: "Televisions",
    subtitle: "Smart & 4K",
    slug: "tvs",
  },
  {
    icon: "kitchen",
    name: "Refrigerators",
    subtitle: "Double Door & More",
    slug: "fridges",
  },
  {
    icon: "local_laundry_service",
    name: "Washing Machines",
    subtitle: "Front & Top Load",
    slug: "washing",
  },
  {
    icon: "ac_unit",
    name: "Air Conditioners",
    subtitle: "Split & Window",
    slug: "acs",
  },
  {
    icon: "blender",
    name: "Other Appliances",
    subtitle: "Kitchen & Home",
    slug: "other",
  },
];

// Trending products
const trendingProducts = [
  "iPhone 15 Pro",
  "Sony Bravia OLED",
  "Dyson V15",
  "PS5 Slim",
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
    <div
      ref={menuRef}
      className="fixed left-1/2 -translate-x-1/2 top-20 w-[900px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn z-50"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-4 p-6">
        {categories.map((category, index) => (
          <a
            key={category.slug}
            href={`#${category.slug}`}
            className="group flex flex-col gap-3 p-5 rounded-xl border border-slate-100 bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon Container */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 group-hover:bg-blue-50 transition-colors duration-200">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary text-2xl transition-colors duration-200">
                {category.icon}
              </span>
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                {category.name}
              </span>
              <span className="text-xs text-slate-500">
                {category.subtitle}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Trending Section */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-4">
          {/* Trending Label */}
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-amber-500 text-lg">
              trending_up
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Trending Now
            </span>
          </div>

          {/* Trending Products */}
          <div className="flex items-center gap-1 text-sm text-slate-600">
            {trendingProducts.map((product, index) => (
              <span key={product} className="flex items-center gap-1">
                {index > 0 && <span className="text-slate-300 mx-1">•</span>}
                <a
                  href="#"
                  className="hover:text-primary transition-colors font-medium"
                >
                  {product}
                </a>
              </span>
            ))}
          </div>
        </div>

        {/* View All Deals Link */}
        <a
          href="#deals"
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          View All Deals
          <span className="material-symbols-outlined text-base">
            arrow_forward
          </span>
        </a>
      </div>
    </div>
  );
}

export default MegaMenu;
