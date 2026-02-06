import { useProducts } from "../../context/ProductContext";
import { useInventory } from "../../context/InventoryContext";
import { useShowcase } from "../../context/ShowcaseContext";
import { ROLES } from "../../data/inventory";
import { Link } from "react-router-dom";

function DashboardPage() {
  const { stats } = useProducts();
  const { stockAlerts, transfers, currentRole } = useInventory();
  const { showcaseCount } = useShowcase();

  const pendingTransfers = transfers.filter((t) => t.status === "pending").length;
  const isOwner = currentRole === ROLES.OWNER;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of your store operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-blue-600">
                inventory_2
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.totalProducts}</p>
              <p className="text-sm text-slate-500">Total Products</p>
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-amber-600">
                warning
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{stockAlerts.lowStock}</p>
              <p className="text-sm text-slate-500">Low Stock</p>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-red-600">
                error
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stockAlerts.outOfStock}</p>
              <p className="text-sm text-slate-500">Out of Stock</p>
            </div>
          </div>
        </div>

        {/* Pending Transfers */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-purple-600">
                swap_horiz
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{pendingTransfers}</p>
              <p className="text-sm text-slate-500">Pending Transfers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            to="/admin/products"
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-blue-50 rounded-xl transition-colors group"
          >
            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-blue-600">
              add_box
            </span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
              Add Product
            </span>
          </Link>

          <Link
            to="/admin/inventory"
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-green-50 rounded-xl transition-colors group"
          >
            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-green-600">
              inventory
            </span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-green-700">
              View Inventory
            </span>
          </Link>

          <Link
            to="/admin/inventory/transfer"
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-purple-50 rounded-xl transition-colors group"
          >
            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-purple-600">
              swap_horiz
            </span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-purple-700">
              Stock Transfer
            </span>
          </Link>

          <Link
            to="/category"
            target="_blank"
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-amber-50 rounded-xl transition-colors group"
          >
            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-amber-600">
              storefront
            </span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-amber-700">
              View Store
            </span>
          </Link>
        </div>
      </div>

      {/* Alerts Summary */}
      {stockAlerts.total > 0 && (
        <div className="bg-linear-to-r from-amber-50 to-red-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600">
                  notifications_active
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Stock Alerts</h3>
                <p className="text-sm text-slate-600">
                  {stockAlerts.lowStock} low stock, {stockAlerts.outOfStock} out of stock items need attention
                </p>
              </div>
            </div>
            <Link
              to="/admin/inventory"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Review Now
            </Link>
          </div>
        </div>
      )}

      {/* Owner Insights - Only visible to Owner */}
      {isOwner && (
        <div className="bg-linear-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-xl border border-purple-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">insights</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">Owner Insights</h2>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
              Owner Only
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white/60 rounded-lg p-4 border border-white">
              <p className="text-2xl font-bold text-purple-600">{showcaseCount}</p>
              <p className="text-sm text-slate-600">Showcase Products</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 border border-white">
              <p className="text-2xl font-bold text-blue-600">{stats.totalProducts}</p>
              <p className="text-sm text-slate-600">Total Inventory</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 border border-white">
              <p className="text-2xl font-bold text-green-600">₹{(stats.totalValue / 1000).toFixed(1)}K</p>
              <p className="text-sm text-slate-600">Catalog Value</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 border border-white">
              <p className="text-2xl font-bold text-amber-600">{pendingTransfers}</p>
              <p className="text-sm text-slate-600">Pending Actions</p>
            </div>
          </div>

          <Link
            to="/admin/showcase"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-lg">featured_play_list</span>
            Manage Showcase
          </Link>
        </div>
      )}

      {/* Categories Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Products by Category</h2>
        <div className="text-sm text-slate-500">
          You have products across {stats.categoryCount} categories.
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
