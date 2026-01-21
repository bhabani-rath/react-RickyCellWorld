import { useEffect, useRef } from "react";

function StoreSelectorModal({
  isOpen,
  onClose,
  stores,
  selectedStore,
  onSelectStore,
}) {
  const modalRef = useRef(null);
  const confirmedStoreRef = useRef(selectedStore);

  // Track the store to be confirmed (not yet applied)
  useEffect(() => {
    if (isOpen) {
      confirmedStoreRef.current = selectedStore;
    }
  }, [isOpen, selectedStore]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-modal-title"
        className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
      >
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-primary to-[#0052A3] px-6 py-5 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

          <div className="relative flex items-center justify-between">
            <div>
              <h2
                id="store-modal-title"
                className="text-lg font-bold text-white"
              >
                Select Your Store
              </h2>
              <p className="text-sm text-white/80">
                Choose nearest store for availability
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Store List */}
        <div className="max-h-[50vh] overflow-y-auto p-4 space-y-3">
          {stores.map((store) => {
            const isSelected = selectedStore.id === store.id;
            return (
              <button
                key={store.id}
                onClick={() => onSelectStore(store)}
                className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {/* Radio indicator */}
                <div
                  className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? "border-primary" : "border-slate-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-scaleIn" />
                  )}
                </div>

                {/* Store info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-800">
                      {store.name}
                    </span>
                    {store.isFlagship && (
                      <span className="px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold rounded uppercase">
                        Flagship
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{store.address}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                      {store.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      {store.hours}
                    </span>
                  </div>
                </div>

                {/* Map link */}
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-colors flex-shrink-0"
                  aria-label={`Open ${store.name} in Google Maps`}
                >
                  <span className="material-symbols-outlined text-xl">
                    location_on
                  </span>
                </a>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-4 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 h-12 px-6 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-12 px-6 bg-gradient-to-r from-primary to-[#0052A3] text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
          >
            Confirm Store
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreSelectorModal;
