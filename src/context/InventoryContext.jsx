  import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import {
  ROLES,
  generateInventoryItems,
  generateMovements,
  initialTransfers,
  getStockStatus,
  MOVEMENT_TYPES,
  TRANSFER_STATUS,
} from "../data/inventory";
import { storeLocations } from "../data/products";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  // ============ STATE ============
  
  // Role simulation - persist to localStorage
  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem('rcw_currentRole');
    return saved ? JSON.parse(saved) : null;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rcw_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  // For Store Manager, which store they manage
  const [managedStoreId, setManagedStoreId] = useState(() => {
    const saved = localStorage.getItem('rcw_managedStoreId');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Currently selected store for viewing (Owner can switch)
  const [selectedStoreId, setSelectedStoreId] = useState(() => {
    const saved = localStorage.getItem('rcw_selectedStoreId');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Inventory data
  const [inventoryItems, setInventoryItems] = useState(() => generateInventoryItems());
  const [movements, setMovements] = useState(() => generateMovements(generateInventoryItems()));
  const [transfers, setTransfers] = useState(initialTransfers);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // ============ PERSIST SESSION ============
  useEffect(() => {
    localStorage.setItem('rcw_currentRole', JSON.stringify(currentRole));
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('rcw_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rcw_managedStoreId', JSON.stringify(managedStoreId));
  }, [managedStoreId]);

  useEffect(() => {
    localStorage.setItem('rcw_selectedStoreId', JSON.stringify(selectedStoreId));
  }, [selectedStoreId]);

  // ============ PERMISSIONS ============
  
  const permissions = useMemo(() => ({
    canEdit: currentRole === ROLES.OWNER || currentRole === ROLES.STORE_MANAGER,
    canTransfer: currentRole === ROLES.OWNER || currentRole === ROLES.STORE_MANAGER,
    canApproveTransfer: currentRole === ROLES.OWNER,
    canViewAllStores: currentRole === ROLES.OWNER,
    canViewHistory: true, // All remaining roles can view history
  }), [currentRole]);

  // ============ COMPUTED DATA ============
  
  // Get effective store filter
  const effectiveStoreId = useMemo(() => {
    if (currentRole === ROLES.STORE_MANAGER) {
      return managedStoreId; // Manager always sees their store
    }
    return selectedStoreId; // Owner can see all (null) or specific
  }, [currentRole, managedStoreId, selectedStoreId]);

  // Filtered inventory based on role and selection
  const filteredInventory = useMemo(() => {
    if (!effectiveStoreId) return inventoryItems;
    return inventoryItems.filter((item) => item.storeId === effectiveStoreId);
  }, [inventoryItems, effectiveStoreId]);

  // Low stock and out of stock counts
  const stockAlerts = useMemo(() => {
    const items = effectiveStoreId
      ? inventoryItems.filter((i) => i.storeId === effectiveStoreId)
      : inventoryItems;
      
    const lowStock = items.filter(
      (i) => i.quantity > 0 && i.quantity <= i.lowStockThreshold
    ).length;
    const outOfStock = items.filter((i) => i.quantity === 0).length;
    
    return { lowStock, outOfStock, total: lowStock + outOfStock };
  }, [inventoryItems, effectiveStoreId]);

  // ============ ACTIONS ============
  
  // Login Action
  const login = useCallback((username, password) => {
    // Simple demo auth
    if (username === "admin" && password === "12345") {
      setCurrentRole(ROLES.OWNER);
      setUser({ name: "Admin User", username: "admin", role: ROLES.OWNER });
      setSelectedStoreId(null);
      return { success: true };
    }
    
    if (username === "manager" && password === "12345") {
      setCurrentRole(ROLES.STORE_MANAGER);
      const storeId = storeLocations[0].id; // Default to first store for demo
      setManagedStoreId(storeId);
      setUser({ name: "Store Manager", username: "manager", role: ROLES.STORE_MANAGER, storeId });
      return { success: true, redirectTo: "/store-manager" };
    }

    if (username === "superadmin" && password === "12345") {
      setCurrentRole("SUPERADMIN");
      setUser({ name: "Super Admin", username: "superadmin", role: "SUPERADMIN" });
      setSelectedStoreId(null);
      return { success: true, redirectTo: "/superadmin" };
    }
    
    return { success: false, message: "Invalid credentials" };
  }, []);

  // Logout Action
  const logout = useCallback(() => {
    setCurrentRole(null);
    setUser(null);
    setManagedStoreId(null);
    setSelectedStoreId(null);
    // Clear localStorage
    localStorage.removeItem('rcw_currentRole');
    localStorage.removeItem('rcw_user');
    localStorage.removeItem('rcw_managedStoreId');
    localStorage.removeItem('rcw_selectedStoreId');
  }, []);

  // Update stock quantity
  const updateStock = useCallback((inventoryItemId, quantityChange, reason, performedBy = "User") => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id !== inventoryItemId) return item;
        
        const newQuantity = Math.max(0, item.quantity + quantityChange);
        return {
          ...item,
          quantity: newQuantity,
          lastUpdated: new Date().toISOString(),
        };
      })
    );

    // Record movement
    const item = inventoryItems.find((i) => i.id === inventoryItemId);
    const actor = user ? user.name : performedBy;
    
    if (item) {
      const newMovement = {
        id: movements.length + 1,
        inventoryItemId,
        productId: item.productId,
        storeId: item.storeId,
        type: quantityChange > 0 ? MOVEMENT_TYPES.PURCHASE : MOVEMENT_TYPES.SALE,
        quantity: quantityChange,
        reason,
        performedBy: actor,
        timestamp: new Date().toISOString(),
      };
      setMovements((prev) => [newMovement, ...prev]);
    }

    return true;
  }, [inventoryItems, movements, user]);

  // Create transfer request
  const createTransfer = useCallback((fromStoreId, toStoreId, productId, quantity) => {
    const newTransfer = {
      id: transfers.length + 1,
      fromStoreId,
      toStoreId,
      productId,
      quantity,
      status: TRANSFER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      createdBy: currentRole === ROLES.OWNER ? "Owner" : "Store Manager",
    };
    
    setTransfers((prev) => [newTransfer, ...prev]);
    return newTransfer;
  }, [transfers, currentRole]);

  // Approve/Complete transfer
  const updateTransferStatus = useCallback((transferId, newStatus) => {
    setTransfers((prev) =>
      prev.map((t) => {
        if (t.id !== transferId) return t;
        
        const updated = { ...t, status: newStatus };
        
        if (newStatus === TRANSFER_STATUS.COMPLETED) {
          updated.completedAt = new Date().toISOString();
          
          // Actually move the stock
          setInventoryItems((items) =>
            items.map((item) => {
              if (item.productId === t.productId) {
                if (item.storeId === t.fromStoreId) {
                  return { ...item, quantity: Math.max(0, item.quantity - t.quantity), lastUpdated: new Date().toISOString() };
                }
                if (item.storeId === t.toStoreId) {
                  return { ...item, quantity: item.quantity + t.quantity, lastUpdated: new Date().toISOString() };
                }
              }
              return item;
            })
          );
        }
        
        return updated;
      })
    );
  }, []);

  // Get movements for a specific inventory item
  const getMovementsForItem = useCallback((inventoryItemId) => {
    return movements.filter((m) => m.inventoryItemId === inventoryItemId);
  }, [movements]);

  // Get inventory item by product and store
  const getInventoryItem = useCallback((productId, storeId) => {
    return inventoryItems.find(
      (i) => i.productId === productId && i.storeId === storeId
    );
  }, [inventoryItems]);

  // Simulate loading
  const simulateLoading = useCallback(async (duration = 800) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, duration));
    setIsLoading(false);
  }, []);

  // ============ CONTEXT VALUE ============
  
  const value = useMemo(() => ({
    // Role & Store
    currentRole,
    setCurrentRole,
    managedStoreId,
    setManagedStoreId,
    selectedStoreId,
    setSelectedStoreId,
    effectiveStoreId,
    
    // Permissions
    permissions,
    
    // Data
    inventoryItems: filteredInventory,
    allInventoryItems: inventoryItems,
    movements,
    transfers,
    stockAlerts,
    isLoading,
    user,
    
    // Actions
    login,
    logout,
    updateStock,
    createTransfer,
    updateTransferStatus,
    getMovementsForItem,
    getInventoryItem,
    simulateLoading,
  }), [
    currentRole,
    managedStoreId,
    selectedStoreId,
    effectiveStoreId,
    permissions,
    filteredInventory,
    inventoryItems,
    movements,
    transfers,
    stockAlerts,
    isLoading,
    updateStock,
    createTransfer,
    updateTransferStatus,
    getMovementsForItem,
    getInventoryItem,
    simulateLoading,
  ]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}
