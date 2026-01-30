import { useState, useEffect } from "react";
import { useInventory } from "../../../context/InventoryContext";
import { MOVEMENT_TYPES, MOVEMENT_LABELS } from "../../../data/inventory";

const REASONS = [
  { value: MOVEMENT_TYPES.PURCHASE, label: "New Purchase", type: "add" },
  { value: MOVEMENT_TYPES.CORRECTION, label: "Manual Correction", type: "both" },
  { value: MOVEMENT_TYPES.DAMAGE, label: "Damaged Stock", type: "remove" },
  { value: MOVEMENT_TYPES.SALE, label: "Sold / Returned", type: "remove" },
];

function StockUpdateModal({ item, onClose }) {
  const { updateStock } = useInventory();
  
  const [action, setAction] = useState("add"); // add or remove
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState(MOVEMENT_TYPES.PURCHASE);
  const [step, setStep] = useState(1); // 1: form, 2: confirm
  const [error, setError] = useState("");

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setAction("add");
      setQuantity(1);
      setReason(MOVEMENT_TYPES.PURCHASE);
      setStep(1);
      setError("");
    }
  }, [item]);

  // Lock body scroll
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

  if (!item) return null;

  const filteredReasons = REASONS.filter(
    (r) => r.type === "both" || r.type === action
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (action === "remove" && quantity > item.quantity) {
      setError(`Cannot remove more than available stock (${item.quantity})`);
      return;
    }

    // Move to confirmation
    setStep(2);
  };

  const handleConfirm = () => {
    const quantityChange = action === "add" ? quantity : -quantity;
    const reasonLabel = MOVEMENT_LABELS[reason] || reason;
    
    updateStock(item.id, quantityChange, reasonLabel, "User");
    onClose();
  };

  const newQuantity = action === "add" 
    ? item.quantity + quantity 
    : item.quantity - quantity;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {step === 1 ? "Update Stock" : "Confirm Update"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Product Info */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-12 h-12 rounded-lg object-cover bg-slate-100"
              />
              <div>
                <p className="font-semibold text-slate-900 line-clamp-1">
                  {item.product?.name}
                </p>
                <p className="text-sm text-slate-500">
                  Current Stock: <span className="font-bold text-slate-900">{item.quantity}</span>
                </p>
              </div>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Action Toggle */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Action
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAction("add");
                        setReason(MOVEMENT_TYPES.PURCHASE);
                      }}
                      className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                        action === "add"
                          ? "bg-green-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg align-middle mr-1">
                        add
                      </span>
                      Add Stock
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAction("remove");
                        setReason(MOVEMENT_TYPES.DAMAGE);
                      }}
                      className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                        action === "remove"
                          ? "bg-red-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg align-middle mr-1">
                        remove
                      </span>
                      Remove Stock
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 h-12 text-center text-xl font-bold bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Reason
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full py-3 px-4 bg-slate-50 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary"
                  >
                    {filteredReasons.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
                    <span className="material-symbols-outlined text-lg">error</span>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
                >
                  Continue
                </button>
              </form>
            ) : (
              /* Confirmation Step */
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Action</span>
                    <span className={`text-sm font-semibold ${action === "add" ? "text-green-600" : "text-red-600"}`}>
                      {action === "add" ? "Adding" : "Removing"} {quantity} units
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Reason</span>
                    <span className="text-sm font-medium text-slate-900">
                      {MOVEMENT_LABELS[reason]}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                    <span className="text-sm text-slate-500">New Stock Level</span>
                    <span className="text-xl font-bold text-slate-900">
                      {item.quantity} → {newQuantity}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-sm text-amber-700">
                  <span className="material-symbols-outlined text-lg">info</span>
                  <span>This action will be recorded in the inventory history.</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`py-3 text-white font-semibold rounded-xl transition-colors ${
                      action === "add"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StockUpdateModal;
