import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { products, categories } from "../../data/products";
import ProductCard from "../../components/ui/ProductCard";
import FilterSidebar from "../../components/ui/FilterSidebar";

function CategoryListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial category from URL
  const initialCategory = searchParams.get("category") || null;
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 9;

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  // Get current category name for breadcrumb
  const currentCategoryName = useMemo(() => {
    if (!selectedCategory) return "All Products";
    const cat = categories.find(c => c.slug === selectedCategory);
    return cat ? cat.name : "All Products";
  }, [selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Location filter
      if (selectedLocation) {
        // Assuming products are available in all locations for now unless specified
        // In a real app, products would have a locations array
      }

      // Availability filter
      if (availability.length > 0) {
        const productStatus = product.inStock ? "in-stock" : "out-of-stock";
        if (!availability.includes(productStatus)) {
          return false;
        }
      }

      // Rating filter
      if (minRating > 0 && (product.rating || 0) < minRating) {
        return false;
      }

      // Discount filter
      if (minDiscount > 0) {
        const discount = product.originalPrice 
          ? Math.round((1 - product.price / product.originalPrice) * 100) 
          : 0;
        if (discount < minDiscount) {
          return false;
        }
      }
      
      return true;
    });
  }, [selectedCategory, selectedBrands, priceRange, selectedLocation, availability, minRating, minDiscount]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrands, priceRange, selectedLocation, availability, minRating, minDiscount]);

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setSelectedLocation(null);
    setAvailability([]);
    setMinRating(0);
    setMinDiscount(0);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-primary hover:underline">Home</Link>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-600">{currentCategoryName}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            availability={availability}
            setAvailability={setAvailability}
            minRating={minRating}
            setMinRating={setMinRating}
            minDiscount={minDiscount}
            setMinDiscount={setMinDiscount}
            onClearFilters={handleClearFilters}
          />

          {/* Product Grid */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-600">
                Showing <span className="font-medium">{paginatedProducts.length}</span> of{" "}
                <span className="font-medium">{filteredProducts.length}</span> results
              </p>
              
              {/* Sort Dropdown */}
              <select className="px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                  inventory_2
                </span>
                <p className="text-slate-600">No products found matching your filters.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === i + 1
                        ? "bg-primary text-white"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default CategoryListingPage;
