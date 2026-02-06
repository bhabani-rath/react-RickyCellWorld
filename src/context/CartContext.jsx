import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";

const CartContext = createContext();

const STORAGE_KEY = "rcw_cart";

export function CartProvider({ children }) {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    return [];
  });

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      // Check if item already exists (match by id, color, and storage)
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor?.name === product.selectedColor?.name &&
          item.selectedStorage === product.selectedStorage
      );

      if (existingIndex > -1) {
        // Update quantity if item exists
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      // Add new item
      return [
        ...prev,
        {
          ...product,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId, selectedColor, selectedStorage) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedColor?.name === selectedColor?.name &&
            item.selectedStorage === selectedStorage
          )
      )
    );
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId, selectedColor, selectedStorage, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId &&
        item.selectedColor?.name === selectedColor?.name &&
        item.selectedStorage === selectedStorage
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Check if item is in cart
  const isInCart = useCallback(
    (productId, selectedColor, selectedStorage) => {
      return cartItems.some(
        (item) =>
          item.id === productId &&
          item.selectedColor?.name === selectedColor?.name &&
          item.selectedStorage === selectedStorage
      );
    },
    [cartItems]
  );

  // Get item quantity in cart
  const getItemQuantity = useCallback(
    (productId, selectedColor, selectedStorage) => {
      const item = cartItems.find(
        (item) =>
          item.id === productId &&
          item.selectedColor?.name === selectedColor?.name &&
          item.selectedStorage === selectedStorage
      );
      return item?.quantity || 0;
    },
    [cartItems]
  );

  // Computed values
  const cartSummary = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalSavings = cartItems.reduce((sum, item) => {
      const originalPrice = item.originalPrice || item.price;
      return sum + (originalPrice - item.price) * item.quantity;
    }, 0);
    const deliveryFee = subtotal >= 500 ? 0 : 40;
    const total = subtotal + deliveryFee;

    return {
      totalItems,
      subtotal,
      totalSavings,
      deliveryFee,
      total,
      isEmpty: cartItems.length === 0,
    };
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      cartSummary,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    }),
    [
      cartItems,
      cartSummary,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
