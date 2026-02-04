import { useEffect, useRef, useState, useCallback } from "react";

// Haversine formula for distance calculation
function calculateDistance(lat1, lon1, lat2, lon2) {
const R = 6371;
const dLat = (lat2 - lat1) * Math.PI / 180;
const dLon = (lon2 - lon1) * Math.PI / 180;
const a = 
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
  Math.sin(dLon/2) * Math.sin(dLon/2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
return R * c;
}

// Store coordinates (Odisha locations)
const storeCoordinates = {
nirakarpur: { lat: 19.9913, lng: 85.5333 },
mandarabasta: { lat: 20.0167, lng: 85.5500 },
ghoradia: { lat: 20.0389, lng: 85.5000 },
jatnai: { lat: 19.9500, lng: 85.6000 },
};

// City data for manual selection
const cities = [
{ name: "Bhubaneswar", lat: 20.2961, lng: 85.8245 },
{ name: "Cuttack", lat: 20.4625, lng: 85.8830 },
{ name: "Puri", lat: 19.8135, lng: 85.8312 },
{ name: "Nirakarpur", lat: 19.9913, lng: 85.5333 },
{ name: "Khordha", lat: 20.1806, lng: 85.6186 },
{ name: "Pipili", lat: 20.1167, lng: 85.8333 },
{ name: "Jatni", lat: 20.1500, lng: 85.7000 },
];

// SVG Icons
const Icons = {
search: (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
),
location: (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
),
spinner: (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
),
close: (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
),
check: (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
),
store: (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
),
phone: (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
),
navigation: (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.894-.447L15 7m0 13V7" />
  </svg>
),
error: (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
),
info: (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
),
city: (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
),
};

function StoreSelectorModal({
isOpen,
onClose,
stores = [],
selectedStore,
onSelectStore,
}) {
const modalRef = useRef(null);
const [searchQuery, setSearchQuery] = useState("");
const [isLocating, setIsLocating] = useState(false);
const [userLocation, setUserLocation] = useState(null);
const [storesWithDistance, setStoresWithDistance] = useState([]);
const [locationError, setLocationError] = useState("");
const [isClosing, setIsClosing] = useState(false);

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

// Filter stores
const filteredStores = storesWithDistance.filter(store => 
  store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  store.address.toLowerCase().includes(searchQuery.toLowerCase())
);

// IP Geolocation fallback
const getIPLocation = useCallback(async () => {
  try {
    const response = await fetch("https://ip-api.com/json/?fields=status,message,lat,lon,city,regionName");
    const data = await response.json();
    
    if (data.status === "success") {
      return {
        lat: data.lat,
        lng: data.lon,
        city: data.city,
        region: data.regionName
      };
    }
    return null;
  } catch (error) {
    console.error("IP API error:", error);
    return null;
  }
}, []);

// GPS Location handler
const handleUseLocation = useCallback(async () => {
  setIsLocating(true);
  setLocationError("");
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const accuracy = position.coords.accuracy;
        
        if (accuracy > 5000) {
          const ipLocation = await getIPLocation();
          if (ipLocation) {
            setUserLocation({ lat: ipLocation.lat, lng: ipLocation.lng });
            setLocationError(`Using IP location: ${ipLocation.city}, ${ipLocation.region}`);
            setIsLocating(false);
            return;
          }
        }
        
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      },
      async (error) => {
        const ipLocation = await getIPLocation();
        if (ipLocation) {
          setUserLocation({ lat: ipLocation.lat, lng: ipLocation.lng });
          setLocationError(`GPS unavailable. Using IP: ${ipLocation.city}, ${ipLocation.region}`);
        } else {
          setLocationError("Unable to detect location. Please select your city manually.");
        }
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    const ipLocation = await getIPLocation();
    if (ipLocation) {
      setUserLocation({ lat: ipLocation.lat, lng: ipLocation.lng });
      setLocationError(`Using IP location: ${ipLocation.city}, ${ipLocation.region}`);
    } else {
      setLocationError("Location not available. Please select your city manually.");
    }
    setIsLocating(false);
  }
}, [getIPLocation]);

// Close animation handler
const handleClose = useCallback(() => {
  setIsClosing(true);
  setTimeout(() => {
    setIsClosing(false);
    onClose();
  }, 300);
}, [onClose]);

// Backdrop click
const handleBackdropClick = (e) => {
  if (modalRef.current && !modalRef.current.contains(e.target)) {
    handleClose();
  }
};

// Reset on open
useEffect(() => {
  if (isOpen) {
    setSearchQuery("");
    setLocationError("");
    setIsClosing(false);
  }
}, [isOpen]);

// Check store hours
const isStoreOpen = () => {
  const hour = new Date().getHours();
  return hour >= 10 && hour < 21;
};

if (!isOpen) return null;

return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    onClick={handleBackdropClick}
  >
    {/* Animated Backdrop */}
    <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} />

    {/* Modal Container */}
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
    >
      {/* Header */}
      <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="p-2 bg-blue-100 rounded-xl text-blue-600">
                {Icons.store}
              </span>
              Find a Store
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {stores.length} locations across Odisha
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
          >
            {Icons.close}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-5 flex gap-3">
          <div className="flex-1 relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              {Icons.search}
            </span>
            <input
              type="text"
              placeholder="Search stores by name or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-slate-100 border-2 border-transparent rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
          <button
            onClick={handleUseLocation}
            disabled={isLocating}
            className="h-12 px-4 flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-60 transition-all duration-200 shadow-lg shadow-slate-900/20 active:scale-95"
          >
            {isLocating ? Icons.spinner : Icons.location}
            <span className="hidden sm:inline">{isLocating ? 'Finding...' : 'Near Me'}</span>
          </button>
        </div>

        {/* Status Messages */}
        {locationError && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3 animate-fade-in">
            <span className="text-amber-600 mt-0.5">{Icons.error}</span>
            <div>
              <p className="text-sm font-medium text-amber-800">{locationError}</p>
              <p className="text-xs text-amber-600 mt-0.5">Select your city below for better accuracy</p>
            </div>
          </div>
        )}
        
        {userLocation && !locationError && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 animate-fade-in">
            <span className="text-emerald-600">{Icons.check}</span>
            <div>
              <p className="text-sm font-medium text-emerald-800">Location detected successfully</p>
              <p className="text-xs text-emerald-600">Stores sorted by distance from you</p>
            </div>
          </div>
        )}

        {/* City Selector */}
        <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
          <p className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <span className="text-blue-600">{Icons.city}</span>
            Popular Cities in Odisha
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  setUserLocation({ lat: city.lat, lng: city.lng });
                  setLocationError("");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
                  userLocation?.lat === city.lat 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25" 
                    : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Store List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50/30">
        {filteredStores.length === 0 ? (
          <div className="py-16 flex flex-col items-center text-center animate-fade-in">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-slate-400 text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No stores found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search or location</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredStores.map((store, index) => {
              const isSelected = selectedStore?.id === store.id;
              const open = isStoreOpen();
              
              return (
                <button
                  key={store.id}
                  onClick={() => onSelectStore(store)}
                  className={`group relative p-5 rounded-2xl text-left transition-all duration-300 border-2 ${
                    isSelected
                      ? "bg-white border-blue-500 shadow-lg shadow-blue-500/10"
                      : "bg-white border-transparent shadow-sm hover:shadow-md hover:border-slate-200"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex gap-4">
                    {/* Selection Indicator */}
                    <div className={`w-6 h-6 mt-1 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-200 ${
                      isSelected ? "bg-blue-500 border-blue-500" : "border-slate-300 group-hover:border-blue-400"
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Store Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-slate-900 text-base">{store.name}</h3>
                        {store.isFlagship && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-md shadow-sm">
                            FLAGSHIP
                          </span>
                        )}
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                          open 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {open ? "OPEN NOW" : "CLOSED"}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2 leading-relaxed">
                        {store.address}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="text-slate-400">{Icons.phone}</span>
                          {store.phone}
                        </span>
                        
                        {store.distance && (
                          <span className="flex items-center gap-1.5 font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {store.distance}
                          </span>
                        )}
                        
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          10 AM - 9 PM
                        </span>
                      </div>
                    </div>

                    {/* Directions Button */}
                    <a
                      href={store.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border border-slate-100 hover:border-blue-200 shrink-0"
                      title="Get directions"
                    >
                      {Icons.navigation}
                    </a>
                  </div>

                  {/* Selected Accent Line */}
                  {isSelected && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-500 rounded-r-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-5 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 p-3 bg-slate-50 rounded-xl">
          <span className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
            {Icons.store}
          </span>
          <span className="font-medium text-slate-700">Selected:</span>
          <span className="font-semibold text-slate-900 truncate flex-1">
            {selectedStore?.name}
          </span>
          {selectedStore?.isFlagship && (
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded">
              FLAGSHIP
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 h-12 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleClose}
            className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 0.3s ease-out forwards;
      }
    `}</style>
  </div>
);
}

export default StoreSelectorModal;