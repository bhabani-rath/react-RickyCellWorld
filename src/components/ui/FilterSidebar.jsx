import { categories, brands, storeLocations } from "../../data/products";

function FilterSidebar({ 
  selectedCategory, 
  setSelectedCategory,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  selectedLocation,
  setSelectedLocation,
  availability,
  setAvailability,
  minRating,
  setMinRating,
  minDiscount,
  setMinDiscount,
  onClearFilters
}) {
  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleCategoryToggle = (slug) => {
    if (selectedCategory === slug) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(slug);
    }
  };

  const handleAvailabilityToggle = (status) => {
    if (availability.includes(status)) {
      setAvailability(availability.filter(s => s !== status));
    } else {
      setAvailability([...availability, status]);
    }
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label 
                key={cat.slug} 
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === cat.slug}
                  onChange={() => handleCategoryToggle(cat.slug)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className={`text-sm transition-colors ${
                  selectedCategory === cat.slug 
                    ? "text-primary font-medium" 
                    : "text-slate-600 group-hover:text-slate-900"
                }`}>
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label 
                key={brand} 
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className={`text-sm transition-colors ${
                  selectedBrands.includes(brand)
                    ? "text-primary font-medium" 
                    : "text-slate-600 group-hover:text-slate-900"
                }`}>
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Price Range</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Min"
              />
              <span className="text-slate-400">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Availability Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Availability</h3>
          <div className="space-y-2">
            {[
              { id: "in-stock", label: "In Stock" },
              { id: "out-of-stock", label: "Out of Stock" }
            ].map((status) => (
              <label 
                key={status.id} 
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={availability.includes(status.id)}
                  onChange={() => handleAvailabilityToggle(status.id)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className={`text-sm transition-colors ${
                  availability.includes(status.id)
                    ? "text-primary font-medium" 
                    : "text-slate-600 group-hover:text-slate-900"
                }`}>
                  {status.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Customer Rating Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Customer Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label 
                key={rating} 
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                  onClick={(e) => {
                    if (minRating === rating) {
                      e.preventDefault();
                      setMinRating(0);
                    }
                  }}
                  className="w-4 h-4 border-slate-300 text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-slate-200'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-slate-600 ml-1">& Up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Discount</h3>
          <div className="space-y-2">
            {[
              { value: 50, label: "50% or more" },
              { value: 40, label: "40% or more" },
              { value: 30, label: "30% or more" },
              { value: 20, label: "20% or more" },
              { value: 10, label: "10% or more" },
            ].map((discount) => (
              <label 
                key={discount.value} 
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="discount"
                  checked={minDiscount === discount.value}
                  onChange={() => setMinDiscount(minDiscount === discount.value ? 0 : discount.value)}
                  onClick={(e) => {
                    if (minDiscount === discount.value) {
                      e.preventDefault();
                      setMinDiscount(0);
                    }
                  }}
                  className="w-4 h-4 border-slate-300 text-primary focus:ring-primary"
                />
                <span className={`text-sm transition-colors ${
                  minDiscount === discount.value
                    ? "text-primary font-medium" 
                    : "text-slate-600 group-hover:text-slate-900"
                }`}>
                  {discount.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Store Location Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Store Location</h3>
          <div className="space-y-2">
            {storeLocations.map((location) => (
              <label 
                key={location.id} 
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="location"
                  checked={selectedLocation === location.id}
                  onChange={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
                  onClick={(e) => {
                    if (selectedLocation === location.id) {
                      e.preventDefault();
                      setSelectedLocation(null);
                    }
                  }}
                  className="w-4 h-4 border-slate-300 text-primary focus:ring-primary"
                />
                <span className={`text-sm transition-colors ${
                  selectedLocation === location.id
                    ? "text-primary font-medium" 
                    : "text-slate-600 group-hover:text-slate-900"
                }`}>
                  {location.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={onClearFilters}
          className="w-full py-2.5 px-4 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}

export default FilterSidebar;
