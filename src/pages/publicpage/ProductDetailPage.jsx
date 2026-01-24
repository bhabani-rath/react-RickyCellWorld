import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../../data/products";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    setSelectedImage(0);
    setSelectedColor(0);
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  if (!product) return null;

  const images = product.gallery || [product.image];
  const colors = product.colors || [];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-slate-900 selection:text-white">
      
      {/* Floating Header - appears on scroll */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300 ${isScrolled ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-[1600px] mx-auto px-4 lg:px-12 py-3 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">{product.name}</h2>
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-900">${product.price.toLocaleString()}</span>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 lg:px-12 pt-8 pb-24">
        
        {/* Breadcrumb - Subtle */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8 uppercase tracking-wider">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/category" className="hover:text-slate-900 transition-colors">Mobiles</Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 gap-16 items-start relative">
          
          {/* LEFT: Sticky Gallery */}
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Main Image Stage */}
            <div className="relative aspect-4/5 bg-slate-50 rounded-3xl overflow-hidden group">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-contain p-12 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Floating Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.badges?.map(badge => (
                  <span key={badge} className="bg-white/90 backdrop-blur-sm border border-slate-100 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wide">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Wishlist Button */}
              <button className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-slate-100 text-slate-400 hover:text-pink-500 hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-xl">favorite</span>
              </button>
            </div>

            {/* Thumbnails - Horizontal Scroll */}
            {images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar items-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${
                      selectedImage === idx 
                        ? "ring-2 ring-slate-900 ring-offset-2 scale-105" 
                        : "bg-slate-50 hover:bg-slate-100 scale-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover p-1.5 mix-blend-multiply rounded-2xl" />
                    {/* Checkmark for selected */}
                    {selectedImage === idx && (
                       <div className="absolute top-1 right-1 w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[10px] text-white">check</span>
                       </div>
                    )}
                  </button>
                ))}
                
                {/* 'New' Additions Placeholder as requested */}
                 <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-white border border-dashed border-slate-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300 text-2xl">image</span>
                 </div>
              </div>
            )}

            {/* In the Box Section */}
            <div className="bg-slate-50 rounded-3xl p-6 mt-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">In the Box</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                    <span className="material-symbols-outlined text-slate-900 text-2xl">smartphone</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 text-center">iPhone</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                    <span className="material-symbols-outlined text-slate-900 text-2xl">cable</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 text-center">USB-C Cable</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                    <span className="material-symbols-outlined text-slate-900 text-2xl">description</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 text-center">Documentation</span>
                </div>
              </div>
            </div>

            {/* Premium Promise */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 text-amber-400">
                  <span className="material-symbols-outlined">verified</span>
                  <span className="text-xs font-bold uppercase tracking-wider">RickyCell Promise</span>
                </div>
                <h4 className="text-lg font-bold mb-2">100% Genuine Products</h4>
                <p className="text-slate-400 text-sm mb-4">Every device undergoes a 32-point quality check before shipping.</p>
                <div className="flex gap-4 text-xs font-medium text-slate-300">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">local_shipping</span> Free Shipping
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">published_with_changes</span> 30-Day Return
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Review */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
               <div className="flex items-center gap-1 mb-2">
                 {[1, 2, 3, 4, 5].map((s) => (
                   <span key={s} className="material-symbols-outlined text-amber-400 text-lg sm:text-base font-fill">star</span>
                 ))}
               </div>
               <h4 className="font-bold text-slate-900 text-sm mb-2">"Absolutely stunning device!"</h4>
               <p className="text-slate-500 text-xs leading-relaxed mb-4">
                 The titanium finish feels amazing in hand, and the camera upgrade is noticeable immediately. Battery life is a beast.
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">JD</div>
                 <div>
                   <p className="text-xs font-bold text-slate-900">John D.</p>
                   <p className="text-[10px] text-slate-400">Verified Buyer</p>
                 </div>
               </div>
            </div>

            {/* Need Help? */}
            <div className="bg-blue-50 rounded-3xl p-6 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <span className="material-symbols-outlined">support_agent</span>
               </div>
               <div>
                  <h4 className="font-bold text-slate-900 text-sm">Need Help?</h4>
                  <p className="text-xs text-slate-500 mb-1">Talk to an expert</p>
                  <a href="#" className="text-blue-600 text-xs font-bold hover:underline">Chat Now</a>
               </div>
            </div>
          </div>

          {/* RIGHT: Product Details (Scrollable) */}
          <div className="mt-12 lg:mt-0 space-y-10">
            
            {/* Header Info */}
            <div className="space-y-4 border-b border-slate-100 pb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  New Arrival
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <span className="material-symbols-outlined text-sm font-fill">star</span>
                  <span className="text-slate-700 text-sm font-bold">{product.rating}</span>
                  <span className="text-slate-400 text-sm">({product.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                {product.name}
              </h1>
              <p className="text-2xl text-slate-500 font-light">{product.subtitle}</p>

              <div className="pt-4 flex items-baseline gap-4">
                <span className="text-4xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded">
                    Save ${(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Description</h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {product.description || "Experience the future of mobile technology. Designed with precision, crafted for performance, and built to last. This device sets a new standard for what a smartphone can be."}
              </p>
            </div>

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Select Finish</h3>
                    <span className="text-sm text-slate-500">{colors[selectedColor].name}</span>
                 </div>
                 <div className="flex gap-4">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedColor === idx ? "ring-2 ring-offset-2 ring-slate-900" : "hover:scale-110"
                      }`}
                    >
                      <span 
                        className="w-full h-full rounded-full border border-black/5 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      {/* Tooltip */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-6">
               <a 
                href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name} ($${product.price})`)}`}
                target="_blank"
                rel="noreferrer"
                className="col-span-1 py-5 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-green-500/20 active:scale-[0.98]"
              >
                <i className="fab fa-whatsapp text-2xl"></i>
                Buy on WhatsApp
              </a>
              <button className="col-span-1 py-5 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold rounded-2xl transition-all hover:shadow-xl active:scale-[0.98]">
                Add to Bag
              </button>
            </div>

            {/* Bento Grid Features */}
            {product.features && (
              <div className="pt-12">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8">Technical Breakthroughs</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Large Hero Feature */}
                  <div className="col-span-2 p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-colors"></div>
                    <span className="material-symbols-outlined text-4xl mb-4 relative z-10">{product.features[0].icon}</span>
                    <h4 className="text-2xl font-bold mb-2 relative z-10">{product.features[0].title}</h4>
                    <p className="text-slate-300 relative z-10">{product.features[0].desc}</p>
                  </div>

                  {/* Smaller Features */}
                  {product.features.slice(1).map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors group">
                      <span className="material-symbols-outlined text-3xl mb-3 text-slate-700 group-hover:scale-110 transition-transform">{feature.icon}</span>
                      <h4 className="text-sm font-bold text-slate-900 uppercase mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-500 leading-snug">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Refined Tabs & Specs */}
            <div className="pt-20">
              {/* Elegant Centered Tabs */}
              <div className="flex justify-center mb-16">
                <div className="inline-flex items-center bg-slate-100/80 backdrop-blur-md p-1.5 rounded-full border border-slate-200">
                  {["Specifications", "Expert Review", "Elite Warranty"].map((tab) => {
                    const isActive = activeTab === tab.toLowerCase().split(' ')[0];
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                        className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                          isActive
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {activeTab === "specifications" && product.specs ? (
                <div className="space-y-8">
                  {Object.entries(product.specs).map(([category, items], catIdx) => (
                    <div key={category} className="group relative bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden">
                      {/* Decorative Background Icon */}
                      <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[180px] text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-12">
                         {category === 'performance' ? 'developer_board' : category === 'display' ? 'screenshot_monitor' : 'photo_camera'}
                      </span>

                      <div className="relative z-10 flex flex-col md:flex-row gap-8">
                        {/* Category Header */}
                        <div className="md:w-1/4 flex flex-col items-start gap-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                             category === 'performance' ? 'bg-blue-600 shadow-blue-200' : 
                             category === 'display' ? 'bg-purple-600 shadow-purple-200' : 'bg-rose-600 shadow-rose-200'
                          }`}>
                            <span className="material-symbols-outlined text-2xl">
                              {category === 'performance' ? 'memory' : category === 'display' ? 'smartphone' : 'camera'}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 capitalize tracking-tight">{category}</h4>
                          <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                             <div className={`h-full w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 ${
                               category === 'performance' ? 'bg-blue-600' : 
                               category === 'display' ? 'bg-purple-600' : 'bg-rose-600'
                             }`}></div>
                          </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {Object.entries(items).map(([key, value], idx) => (
                            <div key={key} className="relative pl-4 border-l-2 border-slate-100 hover:border-slate-300 transition-colors">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{key}</span>
                              <span className="text-base font-semibold text-slate-900 leading-snug block">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === "specifications" ? (
                 <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">article</span>
                    <p className="text-slate-500">Specifications coming soon.</p>
                 </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <span className="material-symbols-outlined text-3xl text-slate-400">
                      {activeTab === "expert" ? "reviews" : "verified_user"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {activeTab === "expert" ? "Expert Reviews" : "Elite Warranty"}
                  </h3>
                  <p className="text-slate-500 text-sm max-w-md text-center">
                    Detailed information for this section is currently being updated by our team. Check back shortly.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default ProductDetailPage;
