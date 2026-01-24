import { useEffect, useRef, useState } from "react";

function StoreSelectorModal({
  isOpen,
  onClose,
  stores,
  selectedStore,
  onSelectStore,
}) {
  const modalRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // Filter stores based on search
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate getting current location
  const handleUseLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      // In real app, would sort stores by distance
    }, 1500);
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Reset search when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Check if store is currently open
  const isStoreOpen = (hours) => {
    const now = new Date();
    const currentHour = now.getHours();
    // Simple check - assume stores open at 10AM and close at 9PM
    return currentHour >= 10 && currentHour < 21;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-modal-title"
        className="relative w-full max-w-[520px] bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 id="store-modal-title" className="text-xl font-bold text-slate-900">
                Find a Store
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {stores.length} stores available in your area
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all -mr-1 -mt-1"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Search & Location */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">
                search
              </span>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-slate-100 border-0 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <button
              onClick={handleUseLocation}
              disabled={isLocating}
              className="h-11 px-4 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all"
            >
              <span className={`material-symbols-outlined text-lg ${isLocating ? 'animate-pulse' : ''}`}>
                {isLocating ? 'sync' : 'my_location'}
              </span>
              <span className="hidden sm:inline">{isLocating ? 'Finding...' : 'Near Me'}</span>
            </button>
          </div>
        </div>

        {/* Store List */}
        <div className="max-h-[45vh] overflow-y-auto px-4 pb-4">
          {filteredStores.length === 0 ? (
            <div className="py-12 text-center">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
              <p className="text-slate-500">No stores found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredStores.map((store) => {
                const isSelected = selectedStore.id === store.id;
                const storeOpen = isStoreOpen(store.hours);
                
                return (
                  <button
                    key={store.id}
                    onClick={() => onSelectStore(store)}
                    className={`group w-full p-4 rounded-2xl text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 ring-2 ring-blue-500 shadow-sm"
                        : "bg-slate-50 hover:bg-white hover:shadow-md hover:ring-1 hover:ring-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Selection indicator */}
                      <div className={`w-5 h-5 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected 
                          ? "bg-blue-500" 
                          : "border-2 border-slate-300 group-hover:border-slate-400"
                      }`}>
                        {isSelected && (
                          <span className="material-symbols-outlined text-white text-sm">check</span>
                        )}
                      </div>

                      {/* Store details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-bold text-slate-900">{store.name}</span>
                          {store.isFlagship && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full uppercase">
                              ★ Flagship
                            </span>
                          )}
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                            storeOpen 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            {storeOpen ? "Open" : "Closed"}
                          </span>
                        </div>
                        
                        <p className="text-sm text-slate-500 mb-2">{store.address}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">call</span>
                            {store.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            {store.hours}
                          </span>
                          {store.distance && (
                            <span className="flex items-center gap-1 text-blue-600 font-medium">
                              <span className="material-symbols-outlined text-sm">directions_walk</span>
                              {store.distance}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1.5">
                        <a
                          href={store.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-slate-400 hover:text-blue-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                          title="Get Directions"
                        >
                          <span className="material-symbols-outlined text-lg">directions</span>
                        </a>
                        <a
                          href={`tel:${store.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-slate-400 hover:text-green-600 border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all"
                          title="Call Store"
                        >
                          <span className="material-symbols-outlined text-lg">call</span>
                        </a>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="material-symbols-outlined text-lg text-blue-500">storefront</span>
              Selected: <span className="font-semibold text-slate-900">{selectedStore.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-12 px-6 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-12 px-6 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              Confirm Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreSelectorModal;
