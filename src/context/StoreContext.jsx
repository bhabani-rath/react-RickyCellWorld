import { createContext, useContext, useState, useEffect } from "react";
import { storeLocations } from "../data/products";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Initialize from localStorage or default to first store
  const [selectedStore, setSelectedStore] = useState(() => {
    const savedStoreId = localStorage.getItem("selectedStoreId");
    if (savedStoreId) {
      const foundStore = storeLocations.find(s => s.id === savedStoreId);
      if (foundStore) return foundStore;
    }
    return storeLocations[0];
  });

  const handleSetStore = (store) => {
    setSelectedStore(store);
    localStorage.setItem("selectedStoreId", store.id);
  };

  return (
    <StoreContext.Provider value={{ selectedStore, setSelectedStore: handleSetStore }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
