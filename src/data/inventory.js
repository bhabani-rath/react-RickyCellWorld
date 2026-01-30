// Inventory Mock Data for Multi-Store Electronics Retail
// This file simulates backend data - replace with API calls in production

import { products, storeLocations } from "./products";

// ============ ROLES ============
export const ROLES = {
  OWNER: "owner",
  STORE_MANAGER: "store_manager",
};

export const ROLE_LABELS = {
  [ROLES.OWNER]: "Owner",
  [ROLES.STORE_MANAGER]: "Store Manager",
};

// ============ STOCK STATUS ============
export const STOCK_STATUS = {
  HEALTHY: "healthy",
  LOW: "low",
  OUT: "out",
};

// ============ TRANSFER STATUS ============
export const TRANSFER_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  COMPLETED: "completed",
  REJECTED: "rejected",
};

// ============ MOVEMENT TYPES ============
export const MOVEMENT_TYPES = {
  PURCHASE: "purchase",
  SALE: "sale",
  TRANSFER_IN: "transfer_in",
  TRANSFER_OUT: "transfer_out",
  DAMAGE: "damage",
  CORRECTION: "correction",
};

export const MOVEMENT_LABELS = {
  [MOVEMENT_TYPES.PURCHASE]: "New Purchase",
  [MOVEMENT_TYPES.SALE]: "Sale",
  [MOVEMENT_TYPES.TRANSFER_IN]: "Transfer In",
  [MOVEMENT_TYPES.TRANSFER_OUT]: "Transfer Out",
  [MOVEMENT_TYPES.DAMAGE]: "Damaged",
  [MOVEMENT_TYPES.CORRECTION]: "Manual Correction",
};

// ============ INVENTORY ITEMS ============
// Links products to stores with quantity tracking
export const generateInventoryItems = () => {
  const items = [];
  let idCounter = 1;

  products.forEach((product) => {
    storeLocations.forEach((store) => {
      // Generate realistic quantities
      const baseQty = Math.floor(Math.random() * 20);
      const lowThreshold = Math.floor(Math.random() * 5) + 2;

      items.push({
        id: idCounter++,
        productId: product.id,
        storeId: store.id,
        quantity: baseQty,
        lowStockThreshold: lowThreshold,
        lastUpdated: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        // IMEI list for mobile phones
        imeiList:
          product.category === "mobiles"
            ? Array.from({ length: baseQty }, (_, i) =>
                `${product.id}${store.id.substring(0, 3).toUpperCase()}${String(i + 1).padStart(6, "0")}`
              )
            : [],
      });
    });
  });

  return items;
};

// ============ STOCK MOVEMENTS ============
export const generateMovements = (inventoryItems) => {
  const movements = [];
  let idCounter = 1;
  const types = Object.values(MOVEMENT_TYPES);

  inventoryItems.slice(0, 20).forEach((item) => {
    // Generate 2-5 movements per item
    const movementCount = Math.floor(Math.random() * 4) + 2;

    for (let i = 0; i < movementCount; i++) {
      const typeIndex = Math.floor(Math.random() * types.length);
      const qty = Math.floor(Math.random() * 5) + 1;

      movements.push({
        id: idCounter++,
        inventoryItemId: item.id,
        productId: item.productId,
        storeId: item.storeId,
        type: types[typeIndex],
        quantity: types[typeIndex].includes("out") || types[typeIndex] === MOVEMENT_TYPES.SALE || types[typeIndex] === MOVEMENT_TYPES.DAMAGE ? -qty : qty,
        reason: MOVEMENT_LABELS[types[typeIndex]],
        performedBy: "System",
        timestamp: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
    }
  });

  // Sort by date descending
  return movements.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
};

// ============ STOCK TRANSFERS ============
export const initialTransfers = [
  {
    id: 1,
    fromStoreId: "nirakarpur",
    toStoreId: "mandarabasta",
    productId: 1,
    quantity: 2,
    status: TRANSFER_STATUS.PENDING,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: "Store Manager",
  },
  {
    id: 2,
    fromStoreId: "ghoradia",
    toStoreId: "jatnai",
    productId: 3,
    quantity: 1,
    status: TRANSFER_STATUS.COMPLETED,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: "Owner",
  },
];

// ============ HELPER FUNCTIONS ============

// Get stock status based on quantity and threshold
export function getStockStatus(quantity, threshold) {
  if (quantity === 0) return STOCK_STATUS.OUT;
  if (quantity <= threshold) return STOCK_STATUS.LOW;
  return STOCK_STATUS.HEALTHY;
}

// Get status color classes
export function getStatusColor(status) {
  switch (status) {
    case STOCK_STATUS.HEALTHY:
      return { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" };
    case STOCK_STATUS.LOW:
      return { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" };
    case STOCK_STATUS.OUT:
      return { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" };
    default:
      return { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" };
  }
}

// Get transfer status color classes
export function getTransferStatusColor(status) {
  switch (status) {
    case TRANSFER_STATUS.PENDING:
      return { bg: "bg-amber-100", text: "text-amber-700" };
    case TRANSFER_STATUS.APPROVED:
      return { bg: "bg-blue-100", text: "text-blue-700" };
    case TRANSFER_STATUS.COMPLETED:
      return { bg: "bg-green-100", text: "text-green-700" };
    case TRANSFER_STATUS.REJECTED:
      return { bg: "bg-red-100", text: "text-red-700" };
    default:
      return { bg: "bg-slate-100", text: "text-slate-700" };
  }
}

// Format relative time
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// Get product by ID
export function getProductById(productId) {
  return products.find((p) => p.id === productId);
}

// Get store by ID
export function getStoreById(storeId) {
  return storeLocations.find((s) => s.id === storeId);
}

// ============ AI INSIGHTS (MOCK) ============
export const aiInsights = [
  {
    id: 1,
    type: "transfer_suggestion",
    title: "Transfer Recommended",
    message: "iPhone 15 Pro Max is low at Mandarabasta. Nirakarpur has 8 units.",
    action: "Create Transfer",
    priority: "high",
  },
  {
    id: 2,
    type: "stockout_prediction",
    title: "Stock-out Risk",
    message: "Samsung Galaxy S24 may run out at Ghoradia in 3 days based on sales trends.",
    action: "View Product",
    priority: "medium",
  },
  {
    id: 3,
    type: "slow_moving",
    title: "Slow Moving Stock",
    message: "Dell XPS 15 hasn't sold in 45 days. Consider promotion or transfer.",
    action: "Dismiss",
    priority: "low",
  },
];
