import { useEffect } from "react";
import { useInventory } from "../../../context/InventoryContext";
import { getStatusColor, formatRelativeTime, STOCK_STATUS } from "../../../data/inventory";
import { storeLocations } from "../../../data/products";
import MovementTimeline from "./MovementTimeline";

const STATUS_LABELS = {
  [STOCK_STATUS.HEALTHY]: "In Stock",
  [STOCK_STATUS.LOW]: "Low Stock",
  [STOCK_STATUS.OUT]: "Out of Stock",
};

function InventoryDetailDrawer({ item, onClose, onUpdate }) {
  const { permissions, allInventoryItems, getMovementsForItem } = useInventory();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [item, onClose]);

  if (!item) return null;

  const colors = getStatusColor(item.status);
  const movements = getMovementsForItem(item.id);

  // Get stock at all stores for this product (Owner only)
  const storeStock = permissions.canViewAllStores
    ? storeLocations.map((store) => {
        const inventoryItem = allInventoryItems.find(
          (i) => i.productId === item.productId && i.storeId === store.id
        );
        return {
          store,
          quantity: inventoryItem?.quantity || 0,
          status: inventoryItem
            ? getStatusColor(
                inventoryItem.quantity === 0
                  ? STOCK_STATUS.OUT
                  : inventoryItem.quantity <= inventoryItem.lowStockThreshold
                  ? STOCK_STATUS.LOW
                  : STOCK_STATUS.HEALTHY
              )
            : null,
        };
      })
    : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl overflow-y-auto animate-slideInFromRight">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-slate-900">Inventory Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Summary */}
          <div className="flex items-start gap-4">
            <img
              src={item.product?.image}
              alt={item.product?.name}
              className="w-20 h-20 rounded-xl object-cover bg-slate-100"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">
                {item.product?.name}
              </h3>
              <p className="text-sm text-slate-500">
                {item.product?.brand} • {item.product?.category}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold rounded-full ${colors.bg} ${colors.text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  {STATUS_LABELS[item.status]}
                </span>
                <span className="text-2xl font-bold text-slate-900">
                  {item.quantity}
                </span>
                <span className="text-sm text-slate-500">units</span>
              </div>
            </div>
          </div>

          {/* Current Store Info */}
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  Current Store
                </p>
                <p className="text-lg font-semibold text-slate-900 mt-0.5">
                  {item.store?.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  Last Updated
                </p>
                <p className="text-sm text-slate-700 mt-0.5">
                  {formatRelativeTime(item.lastUpdated)}
                </p>
              </div>
            </div>
          </div>

          {/* Store-wise Availability (Owner Only) */}
          {storeStock && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">
                Availability Across Stores
              </h4>
              <div className="space-y-2">
                {storeStock.map(({ store, quantity, status }) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {store.isFlagship && (
                        <span className="material-symbols-outlined text-amber-500 text-sm">
                          star
                        </span>
                      )}
                      <span className="text-sm font-medium text-slate-700">
                        {store.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {status && (
                        <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                      )}
                      <span className="text-lg font-bold text-slate-900">
                        {quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IMEI List (if applicable) */}
          {item.imeiList && item.imeiList.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">
                Serial / IMEI Numbers ({item.imeiList.length})
              </h4>
              <div className="bg-slate-50 rounded-xl p-3 max-h-40 overflow-y-auto">
                <div className="space-y-1">
                  {item.imeiList.slice(0, 10).map((imei, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <code className="text-slate-600 font-mono">{imei}</code>
                      <span className="text-xs text-green-600 font-medium">
                        Available
                      </span>
                    </div>
                  ))}
                  {item.imeiList.length > 10 && (
                    <p className="text-xs text-slate-400 mt-2">
                      +{item.imeiList.length - 10} more...
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Movement Timeline */}
          {permissions.canViewHistory && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">
                Recent Activity
              </h4>
              <MovementTimeline movements={movements.slice(0, 5)} />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {onUpdate && (
          <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
            <button
              onClick={() => onUpdate(item)}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
            >
              Update Stock
            </button>
          </div>
        )}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInFromRight {
          animation: slideInFromRight 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default InventoryDetailDrawer;
