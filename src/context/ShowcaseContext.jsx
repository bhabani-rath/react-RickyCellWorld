import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { useProducts } from "./ProductContext";

const ShowcaseContext = createContext();

const STORAGE_KEY = "rcw_showcase";

// Theme presets for carousel slides
const themePresets = [
  {
    primary: "from-orange-500 to-amber-500",
    secondary: "from-orange-50 via-amber-50 to-yellow-50",
    accent: "text-orange-600",
    glow: "bg-orange-400",
    badge: "bg-orange-500",
  },
  {
    primary: "from-slate-700 to-slate-900",
    secondary: "from-slate-100 via-gray-50 to-zinc-100",
    accent: "text-slate-800",
    glow: "bg-slate-400",
    badge: "bg-slate-800",
  },
  {
    primary: "from-blue-600 to-indigo-600",
    secondary: "from-blue-50 via-indigo-50 to-purple-50",
    accent: "text-blue-600",
    glow: "bg-blue-400",
    badge: "bg-blue-600",
  },
  {
    primary: "from-emerald-500 to-teal-500",
    secondary: "from-emerald-50 via-teal-50 to-cyan-50",
    accent: "text-emerald-600",
    glow: "bg-emerald-400",
    badge: "bg-emerald-500",
  },
  {
    primary: "from-purple-500 to-pink-500",
    secondary: "from-purple-50 via-pink-50 to-rose-50",
    accent: "text-purple-600",
    glow: "bg-purple-400",
    badge: "bg-purple-500",
  },
];

// Badge options for showcase products
const badgeOptions = [
  "New Launch",
  "Best Seller",
  "Hot Deal",
  "Limited Offer",
  "Summer Sale",
  "Flash Sale",
  "Trending",
  "Editor's Pick",
];

export function ShowcaseProvider({ children }) {
  const { products, getProduct } = useProducts();

  // Initialize showcase from localStorage
  const [showcaseItems, setShowcaseItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load showcase from localStorage", e);
    }
    return []; // Array of { productId, badge, themeIndex, startDate, endDate }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(showcaseItems));
    } catch (e) {
      console.error("Failed to save showcase to localStorage", e);
    }
  }, [showcaseItems]);

  // Add product to showcase
  const addToShowcase = useCallback((productId, badge = "New Launch", themeIndex = 0) => {
    setShowcaseItems((prev) => {
      if (prev.some((item) => item.productId === productId)) {
        return prev; // Already in showcase
      }
      return [...prev, { productId, badge, themeIndex: themeIndex % themePresets.length }];
    });
  }, []);

  // Remove product from showcase
  const removeFromShowcase = useCallback((productId) => {
    setShowcaseItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  // Toggle product in showcase
  const toggleShowcase = useCallback((productId) => {
    setShowcaseItems((prev) => {
      const exists = prev.some((item) => item.productId === productId);
      if (exists) {
        return prev.filter((item) => item.productId !== productId);
      }
      const themeIndex = prev.length % themePresets.length;
      // Default: start now, no end date (always active)
      return [...prev, { 
        productId, 
        badge: "New Launch", 
        themeIndex,
        startDate: null, // null means immediately active
        endDate: null,   // null means no expiry
      }];
    });
  }, []);

  // Check if a showcase item is currently active based on dates
  const isShowcaseActive = useCallback((item) => {
    const now = new Date();
    
    // Check start date
    if (item.startDate) {
      const start = new Date(item.startDate);
      if (now < start) return false; // Not started yet
    }
    
    // Check end date
    if (item.endDate) {
      const end = new Date(item.endDate);
      if (now > end) return false; // Already expired
    }
    
    return true; // Active
  }, []);

  // Update showcase item settings
  const updateShowcaseItem = useCallback((productId, updates) => {
    setShowcaseItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, ...updates } : item
      )
    );
  }, []);

  // Reorder showcase items
  const reorderShowcase = useCallback((newOrder) => {
    setShowcaseItems(newOrder);
  }, []);

  // Check if product is in showcase
  const isInShowcase = useCallback(
    (productId) => showcaseItems.some((item) => item.productId === productId),
    [showcaseItems]
  );

  // Get showcase item details
  const getShowcaseItem = useCallback(
    (productId) => showcaseItems.find((item) => item.productId === productId),
    [showcaseItems]
  );

  // Generate carousel slides from showcase items (only active ones)
  const getShowcaseSlides = useCallback(() => {
    return showcaseItems
      .filter((item) => isShowcaseActive(item)) // Only include active items
      .map((item) => {
        const product = getProduct(item.productId);
        if (!product) return null;

        const theme = themePresets[item.themeIndex] || themePresets[0];
        const discount = product.originalPrice
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0;

        return {
          id: product.id,
          badge: item.badge,
          title: product.name,
          subtitle: product.subtitle || `${product.brand} • ${product.category}`,
          price: `₹${product.price?.toLocaleString()}`,
          originalPrice: product.originalPrice ? `₹${product.originalPrice?.toLocaleString()}` : null,
          discount: discount > 0 ? `${discount}% OFF` : null,
          cta: "Buy Now",
          ctaSecondary: "Know More",
          image: product.image,
          theme,
          productId: product.id,
        };
      })
      .filter(Boolean);
  }, [showcaseItems, getProduct, isShowcaseActive]);

  // Get count of active showcase items
  const activeShowcaseCount = useMemo(() => {
    return showcaseItems.filter((item) => isShowcaseActive(item)).length;
  }, [showcaseItems, isShowcaseActive]);

  // Clear all showcase items
  const clearShowcase = useCallback(() => {
    setShowcaseItems([]);
  }, []);

  const value = useMemo(
    () => ({
      showcaseItems,
      showcaseCount: showcaseItems.length,
      activeShowcaseCount,
      themePresets,
      badgeOptions,
      addToShowcase,
      removeFromShowcase,
      toggleShowcase,
      updateShowcaseItem,
      reorderShowcase,
      isInShowcase,
      isShowcaseActive,
      getShowcaseItem,
      getShowcaseSlides,
      clearShowcase,
    }),
    [
      showcaseItems,
      activeShowcaseCount,
      addToShowcase,
      removeFromShowcase,
      toggleShowcase,
      updateShowcaseItem,
      reorderShowcase,
      isInShowcase,
      isShowcaseActive,
      getShowcaseItem,
      getShowcaseSlides,
      clearShowcase,
    ]
  );

  return (
    <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>
  );
}

export function useShowcase() {
  const context = useContext(ShowcaseContext);
  if (!context) {
    throw new Error("useShowcase must be used within a ShowcaseProvider");
  }
  return context;
}

export { themePresets, badgeOptions };
