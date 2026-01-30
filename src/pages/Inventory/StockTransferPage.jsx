import { useState, useMemo } from "react";
import { useInventory } from "../../context/InventoryContext";
import { getProductById, getStoreById, getTransferStatusColor, formatRelativeTime, TRANSFER_STATUS } from "../../data/inventory";
import { products, storeLocations } from "../../data/products";
import EmptyState from "../../components/ui/EmptyState";

const STATUS_LABELS = {
  [TRANSFER_STATUS.PENDING]: "Pending Approval",
  [TRANSFER_STATUS.APPROVED]: "Approved",
  [TRANSFER_STATUS.COMPLETED]: "Completed",
  [TRANSFER_STATUS.REJECTED]: "Rejected",
};

function StockTransferPage() {
  const {
    transfers,
    createTransfer,
    updateTransferStatus,
    permissions,
    getInventoryItem,
    effectiveStoreId,
  } = useInventory();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fromStoreId: effectiveStoreId || storeLocations[0].id,
    toStoreId: "",
    productId: "",
    quantity: 1,
  });
  const [error, setError] = useState("");

  // Filter transfers based on role
  const filteredTransfers = useMemo(() => {
    if (permissions.canViewAllStores) return transfers;
    return transfers.filter(
      (t) => t.fromStoreId === effectiveStoreId || t.toStoreId === effectiveStoreId
    );
  }, [transfers, permissions.canViewAllStores, effectiveStoreId]);

  // Get available stock for selected product at source store
  const sourceStock = useMemo(() => {
    if (!formData.fromStoreId || !formData.productId) return null;
    const item = getInventoryItem(parseInt(formData.productId), formData.fromStoreId);
    return item?.quantity || 0;
  }, [formData.fromStoreId, formData.productId, getInventoryItem]);

  // Get destination stock preview
  const destStock = useMemo(() => {
    if (!formData.toStoreId || !formData.productId) return null;
    const item = getInventoryItem(parseInt(formData.productId), formData.toStoreId);
    return item?.quantity || 0;
  }, [formData.toStoreId, formData.productId, getInventoryItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.toStoreId) {
      setError("Please select a destination store");
      return;
    }
    if (!formData.productId) {
      setError("Please select a product");
      return;
    }
    if (formData.fromStoreId === formData.toStoreId) {
      setError("Source and destination cannot be the same");
      return;
    }
    if (formData.quantity > sourceStock) {
      setError(`Only ${sourceStock} units available at source`);
      return;
    }

    createTransfer(
      formData.fromStoreId,
      formData.toStoreId,
      parseInt(formData.productId),
      formData.quantity
    );

    setShowForm(false);
    setFormData({
      fromStoreId: effectiveStoreId || storeLocations[0].id,
      toStoreId: "",
      productId: "",
      quantity: 1,
    });
  };

  const handleApprove = (transfer) => {
    updateTransferStatus(transfer.id, TRANSFER_STATUS.COMPLETED);
  };

  const handleReject = (transfer) => {
    updateTransferStatus(transfer.id, TRANSFER_STATUS.REJECTED);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stock Transfer</h1>
          <p className="text-sm text-slate-500 mt-1">
            Move inventory between store locations
          </p>
        </div>
        {permissions.canTransfer && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            New Transfer
          </button>
        )}
      </div>

      {/* Create Transfer Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Create Transfer Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Source Store */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  From Store
                </label>
                <select
                  value={formData.fromStoreId}
                  onChange={(e) =>
                    setFormData({ ...formData, fromStoreId: e.target.value })
                  }
                  disabled={!permissions.canViewAllStores}
                  className="w-full py-3 px-4 bg-slate-50 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary disabled:opacity-60"
                >
                  {storeLocations.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Store */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  To Store
                </label>
                <select
                  value={formData.toStoreId}
                  onChange={(e) =>
                    setFormData({ ...formData, toStoreId: e.target.value })
                  }
                  className="w-full py-3 px-4 bg-slate-50 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select destination...</option>
                  {storeLocations
                    .filter((s) => s.id !== formData.fromStoreId)
                    .map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Product */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Product
              </label>
              <select
                value={formData.productId}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value, quantity: 1 })
                }
                className="w-full py-3 px-4 bg-slate-50 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary"
              >
                <option value="">Select product...</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.brand})
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Preview */}
            {formData.productId && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Source Stock
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {sourceStock ?? "--"}
                  </p>
                </div>
                {formData.toStoreId && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-blue-500 uppercase tracking-wider mb-1">
                      Destination Stock
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {destStock ?? "--"} → {(destStock ?? 0) + formData.quantity}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Quantity to Transfer
              </label>
              <input
                type="number"
                min="1"
                max={sourceStock || 999}
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                className="w-full py-3 px-4 bg-slate-50 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
              >
                Create Transfer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Transfer List */}
      {filteredTransfers.length === 0 ? (
        <EmptyState
          icon="swap_horiz"
          title="No transfers yet"
          description="Stock transfers between stores will appear here."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {filteredTransfers.map((transfer) => {
            const product = getProductById(transfer.productId);
            const fromStore = getStoreById(transfer.fromStoreId);
            const toStore = getStoreById(transfer.toStoreId);
            const statusColors = getTransferStatusColor(transfer.status);

            return (
              <div
                key={transfer.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 line-clamp-1">
                      {product?.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {transfer.quantity} units
                    </p>
                  </div>
                </div>

                {/* Transfer Direction */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700">
                    {fromStore?.name}
                  </span>
                  <span className="material-symbols-outlined text-slate-400">
                    arrow_forward
                  </span>
                  <span className="font-medium text-slate-700">
                    {toStore?.name}
                  </span>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors.bg} ${statusColors.text}`}
                  >
                    {STATUS_LABELS[transfer.status]}
                  </span>

                  {transfer.status === TRANSFER_STATUS.PENDING &&
                    permissions.canApproveTransfer && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(transfer)}
                          className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(transfer)}
                          className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                  <span className="text-xs text-slate-400">
                    {formatRelativeTime(transfer.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StockTransferPage;
