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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Overview of your store operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-blue-600 dark:text-blue-400">
                inventory_2
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalProducts}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Products</p>
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-amber-600 dark:text-amber-400">
                warning
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stockAlerts.lowStock}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Low Stock</p>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400">
                error
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stockAlerts.outOfStock}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Out of Stock</p>
            </div>
          </div>
        </div>

        {/* Pending Transfers */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-purple-600 dark:text-purple-400">
                swap_horiz
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{pendingTransfers}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Pending Transfers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 transition-colors">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            to="/admin/products"
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors group"
          >
            <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              add_box
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">
              Add Product
            </span>
          </Link>

          <Link
            to="/admin/inventory"
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-xl transition-colors group"
          >
            <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500 group-hover:text-green-600 dark:group-hover:text-green-400">
              inventory
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-green-700 dark:group-hover:text-green-400">
              View Inventory
            </span>
          </Link>

          <Link
            to="/admin/inventory/transfer"
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-colors group"
          >
            <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400">
              swap_horiz
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-700 dark:group-hover:text-purple-400">
              Stock Transfer
            </span>
          </Link>

          <Link
            to="/category"
            target="_blank"
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl transition-colors group"
          >
            <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400">
              storefront
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-amber-700 dark:group-hover:text-amber-400">
              View Store
            </span>
          </Link>
        </div>
      </div>

      {/* Alerts Summary */}
      {stockAlerts.total > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">
                  notifications_active
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Stock Alerts</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
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
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">insights</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Owner Insights</h2>
            </div>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 text-xs font-bold rounded-full">
              Owner Only
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-white dark:border-slate-700">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{showcaseCount}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Showcase Products</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-white dark:border-slate-700">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalProducts}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Inventory</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-white dark:border-slate-700">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{(stats.totalValue / 1000).toFixed(1)}K</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Catalog Value</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-white dark:border-slate-700">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingTransfers}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Pending Actions</p>
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
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 transition-colors">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Products by Category</h2>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          You have products across {stats.categoryCount} categories.
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
