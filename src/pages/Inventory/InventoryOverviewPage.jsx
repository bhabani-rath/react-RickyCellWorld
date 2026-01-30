import { useState, useMemo, useEffect } from "react";
import { useInventory } from "../../context/InventoryContext";
import { getProductById, getStoreById, getStockStatus, STOCK_STATUS } from "../../data/inventory";
import StockTable from "../../components/admin/inventory/StockTable";
import StockFilters from "../../components/admin/inventory/StockFilters";
import LowStockAlert from "../../components/admin/inventory/LowStockAlert";
import InventoryDetailDrawer from "../../components/admin/inventory/InventoryDetailDrawer";
import StockUpdateModal from "../../components/admin/inventory/StockUpdateModal";
import SkeletonTable from "../../components/admin/inventory/SkeletonTable";
import EmptyState from "../../components/ui/EmptyState";
import AIInsightCard from "../../components/admin/inventory/AIInsightCard";
import { aiInsights } from "../../data/inventory";

function InventoryOverviewPage() {
  const { inventoryItems, stockAlerts, isLoading, simulateLoading, permissions } = useInventory();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, healthy, low, out
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // UI states
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateModalItem, setUpdateModalItem] = useState(null);
  const [showAIInsights, setShowAIInsights] = useState(true);

  // Simulate initial load
  useEffect(() => {
    simulateLoading(600);
  }, []);

  // Enrich inventory items with product data
  const enrichedItems = useMemo(() => {
    return inventoryItems.map((item) => {
      const product = getProductById(item.productId);
      const store = getStoreById(item.storeId);
      const status = getStockStatus(item.quantity, item.lowStockThreshold);
      
      return {
        ...item,
        product,
        store,
        status,
      };
    });
  }, [inventoryItems]);

  // Apply filters
  const filteredItems = useMemo(() => {
    return enrichedItems.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.product?.name.toLowerCase().includes(query);
        const matchesBrand = item.product?.brand.toLowerCase().includes(query);
        const matchesCategory = item.product?.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }

      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) return false;

      // Category filter
      if (categoryFilter !== "all" && item.product?.category !== categoryFilter) return false;

      return true;
    });
  }, [enrichedItems, searchQuery, statusFilter, categoryFilter]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(enrichedItems.map((i) => i.product?.category).filter(Boolean))];
    return cats;
  }, [enrichedItems]);

  // Handle row click
  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  // Handle update click
  const handleUpdateClick = (item, e) => {
    e.stopPropagation();
    setUpdateModalItem(item);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stock Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor inventory across all products
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-700">
              {enrichedItems.filter((i) => i.status === STOCK_STATUS.HEALTHY).length} Healthy
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-sm font-medium text-yellow-700">
              {stockAlerts.lowStock} Low
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm font-medium text-red-700">
              {stockAlerts.outOfStock} Out
            </span>
          </div>
        </div>
      </div>

      {/* Low Stock Alert Banner */}
      {stockAlerts.total > 0 && (
        <LowStockAlert
          lowCount={stockAlerts.lowStock}
          outCount={stockAlerts.outOfStock}
          onViewLow={() => setStatusFilter(STOCK_STATUS.LOW)}
          onViewOut={() => setStatusFilter(STOCK_STATUS.OUT)}
        />
      )}

      {/* AI Insights */}
      {showAIInsights && permissions.canEdit && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-purple-500">
                auto_awesome
              </span>
              AI Recommendations
            </h2>
            <button
              onClick={() => setShowAIInsights(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Dismiss all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aiInsights.slice(0, 3).map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <StockFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        resultCount={filteredItems.length}
      />

      {/* Content */}
      {isLoading ? (
        <SkeletonTable rows={8} />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          icon="inventory_2"
          title="No inventory items found"
          description={
            searchQuery || statusFilter !== "all" || categoryFilter !== "all"
              ? "Try adjusting your filters to see more results."
              : "Start by adding products to your inventory."
          }
          actionLabel={searchQuery ? "Clear Search" : undefined}
          onAction={searchQuery ? () => setSearchQuery("") : undefined}
        />
      ) : (
        <StockTable
          items={filteredItems}
          onRowClick={handleRowClick}
          onUpdateClick={permissions.canEdit ? handleUpdateClick : undefined}
        />
      )}

      {/* Detail Drawer */}
      <InventoryDetailDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdate={permissions.canEdit ? (item) => {
          setSelectedItem(null);
          setUpdateModalItem(item);
        } : undefined}
      />

      {/* Update Modal */}
      <StockUpdateModal
        item={updateModalItem}
        onClose={() => setUpdateModalItem(null)}
      />
    </div>
  );
}

export default InventoryOverviewPage;
