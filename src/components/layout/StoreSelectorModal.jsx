import { useEffect, useRef, useState } from "react";

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Store coordinates (Odisha locations - ACCURATE coordinates)
// Nirakarpur is in Khordha district, Odisha
const storeCoordinates = {
  nirakarpur: { lat: 19.9913, lng: 85.5333 },    // Nirakarpur, Khordha
  mandarabasta: { lat: 20.0167, lng: 85.5500 },  // Mandarabasta area
  ghoradia: { lat: 20.0389, lng: 85.5000 },      // Ghoradia area
  jatnai: { lat: 19.9500, lng: 85.6000 },        // Jatnai area
};

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
  const [userLocation, setUserLocation] = useState(null);
  const [storesWithDistance, setStoresWithDistance] = useState([]);
  const [locationError, setLocationError] = useState("");

  // Initialize stores with distance
  useEffect(() => {
    if (userLocation) {
      const withDistance = stores.map(store => {
        const coords = storeCoordinates[store.id];
        if (coords) {
          const distance = calculateDistance(
            userLocation.lat, userLocation.lng,
            coords.lat, coords.lng
          );
          return { ...store, distance: distance.toFixed(1) + " km" };
        }
        return store;
      });
      // Sort by distance
      withDistance.sort((a, b) => {
        const distA = parseFloat(a.distance) || 999;
        const distB = parseFloat(b.distance) || 999;
        return distA - distB;
      });
      setStoresWithDistance(withDistance);
    } else {
      setStoresWithDistance(stores);
    }
  }, [stores, userLocation]);

  // Filter stores based on search
  const filteredStores = storesWithDistance.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current location with HIGH ACCURACY (uses GPS)
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    
    setIsLocating(true);
    setLocationError("");
    
    console.log("Requesting HIGH ACCURACY location (GPS)...");
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("✅ Location received:", position.coords.latitude, position.coords.longitude);
        console.log("Accuracy:", position.coords.accuracy, "meters");
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      },
      (error) => {
        console.log("❌ Location error:", error.code, error.message);
        let errorMsg = "";
        
        switch(error.code) {
          case 1: // PERMISSION_DENIED
            errorMsg = "📍 Location access denied. Please click the lock icon in browser address bar → Allow location access → Try again.";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMsg = "📍 Location unavailable. Please enable GPS/Location on your device.";
            break;
          case 3: // TIMEOUT
            errorMsg = "📍 Location request timed out. Please try again.";
            break;
          default:
            errorMsg = "📍 Unable to get location. Please try again.";
        }
        
        setLocationError(errorMsg);
        setIsLocating(false);
      },
      { 
        enableHighAccuracy: true, // Use GPS for accurate location
        timeout: 15000, // Wait up to 15 seconds for GPS
        maximumAge: 0 // Always get fresh location
      }
    );
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setLocationError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Check if store is currently open
  const isStoreOpen = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 21;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[520px] bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Find a Store</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {stores.length} stores available
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
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
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleUseLocation}
              disabled={isLocating}
              className="h-11 px-4 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-lg ${isLocating ? 'animate-spin' : ''}`}>
                {isLocating ? 'sync' : 'my_location'}
              </span>
              <span className="hidden sm:inline">{isLocating ? 'Finding...' : 'Near Me'}</span>
            </button>
          </div>
          
          {locationError && (
            <div className="mt-3 p-3 bg-red-50 rounded-xl flex items-center gap-2 text-red-600 text-sm">
              <span className="material-symbols-outlined text-lg">error</span>
              {locationError}
            </div>
          )}
          {userLocation && !locationError && (
            <div className="mt-3 p-3 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-1">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Location detected!
              </div>
              <p className="text-xs text-green-600 pl-7">
                📍 Your coordinates: {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E
              </p>
              <p className="text-xs text-green-600 pl-7 mt-1">
                Stores sorted by distance from you
              </p>
            </div>
          )}
        </div>

        {/* Store List */}
        <div className="max-h-[45vh] overflow-y-auto px-4 pb-4 space-y-2">
          {filteredStores.length === 0 ? (
            <div className="py-12 text-center">
              <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
              <p className="text-slate-500 mt-2">No stores found</p>
            </div>
          ) : (
            filteredStores.map((store) => {
              const isSelected = selectedStore.id === store.id;
              const open = isStoreOpen();
              
              return (
                <button
                  key={store.id}
                  onClick={() => onSelectStore(store)}
                  className={`w-full p-4 rounded-2xl text-left transition-all ${
                    isSelected
                      ? "bg-blue-50 ring-2 ring-blue-500"
                      : "bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Radio */}
                    <div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      isSelected ? "border-blue-500 bg-blue-500" : "border-slate-300"
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-slate-900">{store.name}</span>
                        {store.isFlagship && (
                          <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded">
                            FLAGSHIP
                          </span>
                        )}
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                          open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {open ? "OPEN" : "CLOSED"}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-500 mb-2">{store.address}</p>
                      
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">call</span>
                          {store.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          {store.hours}
                        </span>
                        {store.distance && (
                          <span className="flex items-center gap-1 text-blue-600 font-semibold">
                            <span className="material-symbols-outlined text-sm">near_me</span>
                            {store.distance}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Map Button */}
                    <a
                      href={store.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 flex-shrink-0"
                    >
                      <span className="material-symbols-outlined">directions</span>
                    </a>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
            <span className="material-symbols-outlined text-blue-500">storefront</span>
            <span>Selected:</span>
            <span className="font-semibold text-slate-900">{selectedStore.name}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-12 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-12 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700"
            >
              Confirm Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreSelectorModal;
