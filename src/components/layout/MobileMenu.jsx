import { useState, useEffect, useRef } from "react";

// Categories data
const categories = [
  { icon: "📱", name: "Mobile Phones", count: "120+", slug: "mobiles" },
  { icon: "🎧", name: "Accessories", count: "250+", slug: "accessories" },
  { icon: "💻", name: "Laptops", count: "45+", slug: "laptops" },
  { icon: "📺", name: "TVs", count: "65+", slug: "tvs" },
  { icon: "🧊", name: "Fridges", count: "40+", slug: "fridges" },
  { icon: "🌀", name: "Washing Machines", count: "35+", slug: "washing" },
  { icon: "❄️", name: "ACs", count: "50+", slug: "acs" },
  { icon: "🔌", name: "Other", count: "80+", slug: "other" },
];

function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  activeNavItem,
  setActiveNavItem,
  selectedStore,
  onOpenStoreModal,
}) {
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const menuRef = useRef(null);

  // Reset categories expanded state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setIsCategoriesExpanded(false);
    }
  }, [isOpen]);

  const handleNavClick = (linkName, href) => {
    setActiveNavItem(linkName);
    onClose();
    // Smooth scroll after menu closes
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 z-50 h-full w-[85%] max-w-[340px] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
          <a href="#" className="flex items-center gap-2">
            <div className="relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-linear-to-br from-primary to-[#0052A3] text-white font-extrabold text-base">
                R
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-whatsapp rounded-full flex items-center justify-center border-2 border-white">
                <span className="material-symbols-outlined text-white text-[8px] font-bold">
                  check
                </span>
              </div>
            </div>
            <span className="font-extrabold text-slate-800 text-lg">
              Ricky Cell World
            </span>
          </a>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-4">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.hasMegaMenu ? (
                <>
                  {/* Categories Toggle */}
                  <button
                    onClick={() =>
                      setIsCategoriesExpanded(!isCategoriesExpanded)
                    }
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-colors ${
                      activeNavItem === link.name
                        ? "bg-blue-50 text-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                          activeNavItem === link.name
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {link.icon}
                        </span>
                      </div>
                      <span className="font-semibold">{link.name}</span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-xl transition-transform duration-200 ${
                        isCategoriesExpanded ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Categories Accordion */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isCategoriesExpanded ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="pl-6 pr-2 py-2 space-y-1">
                      {categories.map((category) => (
                        <a
                          key={category.slug}
                          href={`#${category.slug}`}
                          onClick={() => onClose()}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-primary transition-colors"
                        >
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                          <span className="ml-auto text-xs text-primary font-semibold">
                            ({category.count})
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.name, link.href)}
                  className={`flex items-center justify-between px-4 py-4 rounded-xl transition-colors ${
                    activeNavItem === link.name
                      ? "bg-blue-50 text-primary"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                        activeNavItem === link.name
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {link.icon}
                      </span>
                    </div>
                    <span className="font-semibold">{link.name}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-linear-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-xl text-slate-400">
                    arrow_forward_ios
                  </span>
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Store Section */}
        <div className="px-4 py-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
            Selected Store
          </div>
          <button
            onClick={onOpenStoreModal}
            className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10">
                <span className="material-symbols-outlined text-primary text-xl">
                  location_on
                </span>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">
                    {selectedStore.name}
                  </span>
                  {selectedStore.isFlagship && (
                    <span className="px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold rounded uppercase">
                      Flagship
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 text-left">
                  {selectedStore.address}
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-primary">Change</span>
          </button>
        </div>

        {/* Login Button */}
        <div className="px-4 py-3 border-t border-slate-100">
          <a
            href="/login"
            className="flex items-center justify-center gap-2 w-full h-12 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-xl">login</span>
            <span>Owner / Manager Login</span>
          </a>
        </div>

        {/* WhatsApp CTA */}
        <div className="p-4 border-t border-slate-100">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-13 bg-linear-to-r from-whatsapp to-[#1FAD54] text-white font-semibold rounded-xl shadow-lg shadow-whatsapp/30 hover:shadow-xl hover:shadow-whatsapp/40 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            <span>Chat with us on WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
