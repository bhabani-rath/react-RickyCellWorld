import { useState, useEffect, useCallback, useRef } from "react";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import StoreSelectorModal from "./StoreSelectorModal";

// Navigation links data
const navLinks = [
  { name: "Home", href: "#", icon: "home" },
  { name: "Categories", href: "#", hasMegaMenu: true, icon: "category" },
  { name: "Offers", href: "#offers", badge: 5, icon: "local_offer" },
  { name: "Stores", href: "#stores", icon: "store" },
  { name: "Contact", href: "#contact", icon: "call" },
];

// Stores data
const stores = [
  {
    id: "nirakarpur",
    name: "Nirakarpur",
    isFlagship: true,
    address: "Main Road, Nirakarpur, Odisha - 752077",
    phone: "+91 98765 43210",
    hours: "10AM - 9PM",
    mapUrl: "https://maps.google.com/?q=Nirakarpur+Odisha",
  },
  {
    id: "mandarabasta",
    name: "Mandarabasta",
    isFlagship: false,
    address: "Market Complex, Mandarabasta, Odisha",
    phone: "+91 98765 43211",
    hours: "10AM - 9PM",
    mapUrl: "https://maps.google.com/?q=Mandarabasta+Odisha",
  },
  {
    id: "ghoradia",
    name: "Ghoradia",
    isFlagship: false,
    address: "Near Bus Stand, Ghoradia, Odisha",
    phone: "+91 98765 43212",
    hours: "10AM - 8PM",
    mapUrl: "https://maps.google.com/?q=Ghoradia+Odisha",
  },
  {
    id: "jatnai",
    name: "Jatnai",
    isFlagship: false,
    address: "Station Road, Jatnai, Odisha",
    phone: "+91 98765 43213",
    hours: "10AM - 9PM",
    mapUrl: "https://maps.google.com/?q=Jatnai+Odisha",
  },
];

function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [activeNavItem, setActiveNavItem] = useState("Home");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Ref for close timeout
  const closeTimeoutRef = useRef(null);

  // Open mega menu (instant)
  const openMegaMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCategoriesOpen(true);
  }, []);

  // Close mega menu (with delay)
  const closeMegaMenu = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 300); // 300ms delay before closing
  }, []);

  // Toggle mega menu on click
  const toggleMegaMenu = useCallback((e) => {
    e.preventDefault();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCategoriesOpen((prev) => !prev);
  }, []);

  // Scroll handler for compact mode
  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu or modals are open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen || isStoreModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchOpen, isStoreModalOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsStoreModalOpen(false);
        setIsCategoriesOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleStoreSelect = useCallback((store) => {
    setSelectedStore(store);
    setIsStoreModalOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isCompact ? "bg-white/95 backdrop-blur-xl shadow-lg" : "bg-white"
        }`}
      >
        {/* Desktop Navbar */}
        <nav
          className={`hidden lg:flex items-center justify-between max-w-[1280px] mx-auto px-6 transition-all duration-300 ${
            isCompact ? "h-16" : "h-20"
          }`}
        >
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Ricky Cell World"
              className={`transition-all duration-300 ${
                isCompact ? "h-9" : "h-10"
              }`}
            />
            <div className="flex flex-col">
              <span
                className={`font-extrabold text-slate-800 tracking-tight transition-all duration-300 ${
                  isCompact ? "text-lg" : "text-xl"
                }`}
              >
                Ricky Cell World
              </span>
              {!isCompact && (
                <span className="text-[11px] text-slate-500 font-medium">
                  Your Trusted Electronics Partner
                </span>
              )}
            </div>
          </a>

          {/* Center Navigation */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasMegaMenu && openMegaMenu()}
                onMouseLeave={() => link.hasMegaMenu && closeMegaMenu()}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.hasMegaMenu) {
                      toggleMegaMenu(e);
                    }
                    setActiveNavItem(link.name);
                  }}
                  className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeNavItem === link.name ||
                    (link.hasMegaMenu && isCategoriesOpen)
                      ? "bg-blue-50 text-primary"
                      : "text-slate-600 hover:bg-blue-50 hover:text-primary"
                  }`}
                >
                  {link.name}
                  {link.hasMegaMenu && (
                    <span
                      className={`material-symbols-outlined text-base transition-transform duration-200 ${
                        isCategoriesOpen ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  )}
                  {link.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-linear-to-br from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {activeNavItem === link.name && !link.hasMegaMenu && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 hover:bg-blue-50 hover:text-primary transition-all duration-200"
            >
              <span className="material-symbols-outlined text-xl">search</span>
            </button>

            {/* Store Selector */}
            <button
              onClick={() => setIsStoreModalOpen(true)}
              className="flex items-center gap-2.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200"
            >
              <span className="material-symbols-outlined text-primary text-lg">
                location_on
              </span>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-slate-500 font-medium">
                  Shopping at
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {selectedStore.name}
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">
                expand_more
              </span>
            </button>

            {/* Call CTA */}
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary to-[#0052A3] text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              <span>Call Now</span>
            </a>
          </div>
        </nav>

        {/* Mega Menu - Positioned relative to header */}
        <div
          className="hidden lg:block"
          onMouseEnter={openMegaMenu}
          onMouseLeave={closeMegaMenu}
        >
          <MegaMenu
            isOpen={isCategoriesOpen}
            onClose={() => setIsCategoriesOpen(false)}
          />
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden">
          {/* Main Row */}
          <div className="flex items-center justify-between px-4 h-14 bg-white">
            {/* Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>

            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <img src="/logo.png" alt="Ricky Cell World" className="h-8" />
              <span className="font-extrabold text-slate-800 text-base">
                Ricky Cell
              </span>
            </a>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>
          </div>

          {/* Store Strip */}
          <button
            onClick={() => setIsStoreModalOpen(true)}
            className="flex items-center justify-between w-full px-4 h-11 bg-slate-50 border-t border-slate-200"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">
                location_on
              </span>
              <span className="text-xs text-slate-500">Shopping at:</span>
              <span className="text-sm font-semibold text-slate-700">
                {selectedStore.name}
              </span>
            </div>
            <span className="text-xs font-semibold text-primary">Change →</span>
          </button>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 lg:h-20 lg:hidden:h-[100px]" />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        activeNavItem={activeNavItem}
        setActiveNavItem={setActiveNavItem}
        selectedStore={selectedStore}
        onOpenStoreModal={() => {
          setIsMobileMenuOpen(false);
          setTimeout(() => setIsStoreModalOpen(true), 300);
        }}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Store Selector Modal */}
      <StoreSelectorModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        stores={stores}
        selectedStore={selectedStore}
        onSelectStore={handleStoreSelect}
      />
    </>
  );
}

export default Navbar;
