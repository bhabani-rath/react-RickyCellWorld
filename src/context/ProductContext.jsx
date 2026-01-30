import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { products as initialProducts, categories, brands } from "../data/products";

const ProductContext = createContext();

const STORAGE_KEY = "rcw_products";

export function ProductProvider({ children }) {
  // Initialize products from localStorage or default data
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load products from localStorage", e);
    }
    return initialProducts;
  });

  // Persist to localStorage whenever products change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products to localStorage", e);
    }
  }, [products]);

  // Add new product
  const addProduct = useCallback((productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(), // Simple unique ID
      rating: productData.rating || 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  }, []);

  // Update existing product
  const updateProduct = useCallback((productId, updates) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, ...updates, updatedAt: new Date().toISOString() }
          : p
      )
    );
  }, []);

  // Delete product
  const deleteProduct = useCallback((productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  // Get product by ID
  const getProduct = useCallback(
    (productId) => products.find((p) => p.id === productId),
    [products]
  );

  // Reset to default products
  const resetProducts = useCallback(() => {
    setProducts(initialProducts);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Computed stats
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const inStockCount = products.filter((p) => p.inStock !== false).length;
    const outOfStockCount = products.filter((p) => p.inStock === false).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
    const categoryCount = [...new Set(products.map((p) => p.category))].length;

    return {
      totalProducts,
      inStockCount,
      outOfStockCount,
      totalValue,
      categoryCount,
    };
  }, [products]);

  const value = useMemo(
    () => ({
      products,
      categories,
      brands,
      stats,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      resetProducts,
    }),
    [products, stats, addProduct, updateProduct, deleteProduct, getProduct, resetProducts]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
