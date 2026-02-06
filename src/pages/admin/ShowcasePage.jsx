import { useState, useMemo } from "react";
import { useProducts } from "../../context/ProductContext";
import { useShowcase, themePresets, badgeOptions } from "../../context/ShowcaseContext";
import { useInventory } from "../../context/InventoryContext";
import { ROLES } from "../../data/inventory";
import { Navigate } from "react-router-dom";

// Helper to format date for datetime-local input
const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toISOString().slice(0, 16);
};

// Helper to get status of showcase item
const getShowcaseStatus = (item) => {
  const now = new Date();
  
  if (item.startDate && new Date(item.startDate) > now) {
    return { status: "scheduled", label: "Scheduled", color: "bg-blue-100 text-blue-700" };
  }
  
  if (item.endDate && new Date(item.endDate) < now) {
    return { status: "expired", label: "Expired", color: "bg-red-100 text-red-700" };
  }
  
  return { status: "active", label: "Active", color: "bg-green-100 text-green-700" };
};

function ShowcasePage() {
  const { products, categories } = useProducts();
  const { 
    showcaseItems, 
    activeShowcaseCount,
    toggleShowcase, 
    isInShowcase, 
    getShowcaseItem,
    updateShowcaseItem,
    reorderShowcase,
    clearShowcase 
  } = useShowcase();
  const { currentRole } = useInventory();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [previewMode, setPreviewMode] = useState(false);

  // Only Owner can access this page
  if (currentRole !== ROLES.OWNER) {
    return <Navigate to="/admin" replace />;
  }

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !product.name.toLowerCase().includes(query) &&
          !product.brand?.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (categoryFilter !== "all" && product.category !== categoryFilter) {
        return false;
      }
      return true;
    });
  }, [products, searchQuery, categoryFilter]);

  // Get showcase products in order
  const showcaseProducts = useMemo(() => {
    return showcaseItems
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { ...product, showcaseSettings: item } : null;
      })
      .filter(Boolean);
  }, [showcaseItems, products]);

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...showcaseItems];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    reorderShowcase(newOrder);
  };

  const handleMoveDown = (index) => {
    if (index === showcaseItems.length - 1) return;
    const newOrder = [...showcaseItems];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    reorderShowcase(newOrder);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Showcase Manager</h1>
          <p className="text-sm text-slate-500 mt-1">
            Select and arrange products to display in the homepage carousel
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2.5 font-semibold rounded-xl transition-colors flex items-center gap-2 ${
              previewMode
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {previewMode ? "grid_view" : "visibility"}
            </span>
            {previewMode ? "Edit Mode" : "Preview"}
          </button>
          {showcaseItems.length > 0 && (
            <button
              onClick={clearShowcase}
              className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">delete_sweep</span>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Showcase Status Bar */}
      <div className="bg-linear-to-r from-primary/10 via-purple-50 to-pink-50 rounded-xl border border-primary/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">featured_play_list</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                {showcaseItems.length} Products in Showcase
                {activeShowcaseCount !== showcaseItems.length && (
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({activeShowcaseCount} currently active)
                  </span>
                )}
              </p>
              <p className="text-sm text-slate-500">
                Products appear in the homepage hero carousel during their scheduled time
              </p>
            </div>
          </div>
          {showcaseItems.length > 0 && (
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-2 border border-slate-200"
            >
              <span className="material-symbols-outlined text-lg">open_in_new</span>
              View Live
            </a>
          )}
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode - Shows showcase products in order */
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Carousel Preview</h2>
          {showcaseProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">
                featured_play_list
              </span>
              <p>No products in showcase. Add some products to see the preview.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {showcaseProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <span className="text-2xl font-bold text-slate-300 w-8">{index + 1}</span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 text-xs font-bold text-white rounded ${
                          themePresets[product.showcaseSettings.themeIndex]?.badge || "bg-orange-500"
                        }`}
                      >
                        {product.showcaseSettings.badge}
                      </span>
                      {/* Status indicator */}
                      {(() => {
                        const statusInfo = getShowcaseStatus(product.showcaseSettings);
                        return (
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        );
                      })()}
                    </div>
                    <h3 className="font-semibold text-slate-900">{product.name}</h3>
                    <p className="text-sm text-slate-500">
                      {product.brand} • ₹{product.price?.toLocaleString()}
                    </p>
                    {/* Show schedule info if set */}
                    {(product.showcaseSettings.startDate || product.showcaseSettings.endDate) && (
                      <p className="text-xs text-slate-400 mt-1">
                        {product.showcaseSettings.startDate && (
                          <span>From: {new Date(product.showcaseSettings.startDate).toLocaleString()}</span>
                        )}
                        {product.showcaseSettings.startDate && product.showcaseSettings.endDate && " • "}
                        {product.showcaseSettings.endDate && (
                          <span>Until: {new Date(product.showcaseSettings.endDate).toLocaleString()}</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-30"
                    >
                      <span className="material-symbols-outlined">arrow_upward</span>
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === showcaseProducts.length - 1}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-30"
                    >
                      <span className="material-symbols-outlined">arrow_downward</span>
                    </button>
                    <button
                      onClick={() => toggleShowcase(product.id)}
                      className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Edit Mode - Product selection grid */
        <>
          {/* Filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-0 rounded-xl text-sm placeholder-slate-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <span className="text-sm text-slate-500 self-center">
                {filteredProducts.length} products
              </span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const inShowcase = isInShowcase(product.id);
              const showcaseItem = getShowcaseItem(product.id);

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl border-2 p-4 transition-all ${
                    inShowcase
                      ? "border-primary shadow-lg shadow-primary/10"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl object-cover bg-slate-100"
                      />
                      {inShowcase && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {showcaseItems.findIndex((i) => i.productId === product.id) + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-slate-500">{product.brand}</p>
                      <p className="font-bold text-slate-900 mt-1">
                        ₹{product.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Showcase Controls */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    {inShowcase && showcaseItem ? (
                      <div className="space-y-3">
                        {/* Badge Selection */}
                        <div>
                          <label className="text-xs font-medium text-slate-500 block mb-1">
                            Badge
                          </label>
                          <select
                            value={showcaseItem.badge}
                            onChange={(e) =>
                              updateShowcaseItem(product.id, { badge: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                          >
                            {badgeOptions.map((badge) => (
                              <option key={badge} value={badge}>
                                {badge}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Theme Selection */}
                        <div>
                          <label className="text-xs font-medium text-slate-500 block mb-1">
                            Theme
                          </label>
                          <div className="flex gap-2">
                            {themePresets.map((theme, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  updateShowcaseItem(product.id, { themeIndex: idx })
                                }
                                className={`w-8 h-8 rounded-full bg-linear-to-r ${theme.primary} border-2 transition-transform ${
                                  showcaseItem.themeIndex === idx
                                    ? "border-slate-900 scale-110"
                                    : "border-transparent hover:scale-105"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Schedule Section */}
                        <div className="pt-3 mt-3 border-t border-slate-100">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-sm text-blue-500">schedule</span>
                            </div>
                            <label className="text-xs font-semibold text-slate-600">Schedule</label>
                            {/* Status badge */}
                            {(() => {
                              const statusInfo = getShowcaseStatus(showcaseItem);
                              return (
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ml-auto ${statusInfo.color}`}>
                                  {statusInfo.label}
                                </span>
                              );
                            })()}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                              <label className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs text-green-500">play_arrow</span>
                                Start Date
                              </label>
                              <input
                                type="datetime-local"
                                value={formatDateForInput(showcaseItem.startDate)}
                                onChange={(e) =>
                                  updateShowcaseItem(product.id, { 
                                    startDate: e.target.value ? new Date(e.target.value).toISOString() : null 
                                  })
                                }
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary focus:border-primary hover:border-slate-300 transition-colors cursor-pointer"
                              />
                            </div>
                            <div className="relative">
                              <label className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs text-red-500">stop</span>
                                End Date
                              </label>
                              <input
                                type="datetime-local"
                                value={formatDateForInput(showcaseItem.endDate)}
                                onChange={(e) =>
                                  updateShowcaseItem(product.id, { 
                                    endDate: e.target.value ? new Date(e.target.value).toISOString() : null 
                                  })
                                }
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary focus:border-primary hover:border-slate-300 transition-colors cursor-pointer"
                              />
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">info</span>
                            Leave empty for always active
                          </p>
                        </div>

                        <button
                          onClick={() => toggleShowcase(product.id)}
                          className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors text-sm"
                        >
                          Remove from Showcase
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleShowcase(product.id)}
                        className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add to Showcase
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default ShowcasePage;
