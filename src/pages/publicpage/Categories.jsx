import { useNavigate } from "react-router-dom";
import WhatsAppButton from "../../components/ui/WhatsAppButton";

// Featured categories with images - bento grid layout
const featuredCategories = [
  {
    name: "Mobile Phones",
    subtitle: "Latest iOS & Android Flagships",
    slug: "mobiles",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    size: "large", // Takes left column, spans 2 rows
  },
  {
    name: "Laptops & Computers",
    subtitle: "Shop Now",
    slug: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    size: "medium", // Wide card, spans 2 columns
  },
  {
    name: "Audio",
    subtitle: "Premium Sound",
    slug: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    size: "small",
  },
  {
    name: "Wearables",
    subtitle: "Smart Watches",
    slug: "wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    size: "small",
  },
];

// Quick links for other categories - with images
const quickCategories = [
  { icon: "tv", name: "TVs", slug: "tvs", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80" },
  { icon: "kitchen", name: "Refrigerators", slug: "fridges", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80" },
  { icon: "ac_unit", name: "ACs", slug: "acs", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
  { icon: "local_laundry_service", name: "Washing", slug: "washing", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80" },
  { icon: "grid_view", name: "View All", slug: "all", highlight: true },
];

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    if (slug === "all") {
      navigate("/category");
    } else {
      navigate(`/category?category=${slug}`);
    }
  };

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Shop by Category
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredCategories.map((category) => (
            <div
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer
                ${category.size === "large" ? "md:row-span-2 min-h-[400px] md:min-h-[500px]" : ""}
                ${category.size === "medium" ? "md:col-span-2 min-h-[240px]" : ""}
                ${category.size === "small" ? "min-h-[240px]" : ""}
              `}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 ${
                category.size === "medium" 
                  ? "bg-gradient-to-r from-black/70 via-black/40 to-transparent" 
                  : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              }`}></div>
              
              {/* Content */}
              <div className={`absolute bottom-0 left-0 p-6 ${category.size === "medium" ? "" : "right-0"}`}>
                <p className="text-white/80 text-sm mb-1">{category.subtitle}</p>
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Categories Row - with background images */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickCategories.map((category) => (
            <div
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[160px] cursor-pointer ${
                category.highlight ? "bg-gradient-to-br from-primary to-primary-700" : ""
              }`}
            >
              {/* Background Image - only for non-highlighted items */}
              {!category.highlight && category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              
              {/* Dark Overlay - only for items with images */}
              {!category.highlight && (
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
              )}
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-white text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <h3 className="text-white text-base font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <WhatsAppButton />
      </div>
    </section>
  );
}

export default Categories;
