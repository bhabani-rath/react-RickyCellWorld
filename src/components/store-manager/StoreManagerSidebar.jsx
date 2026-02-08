import { NavLink, useLocation } from "react-router-dom";
import { useInventory } from "../../context/InventoryContext";

const navigation = [
  {
    name: "Dashboard",
    href: "/store-manager",
    icon: "dashboard",
    end: true,
  },
  {
    name: "Products",
    href: "/store-manager/products",
    icon: "inventory_2",
  },
  {
    name: "Stock Overview",
    href: "/store-manager/inventory",
    icon: "warehouse",
  },
  {
    name: "Stock Transfer",
    href: "/store-manager/inventory/transfer",
    icon: "swap_horiz",
  },
];

function StoreManagerSidebar({ isOpen, onClose }) {
  const { stockAlerts } = useInventory();
  const location = useLocation();

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">
                storefront
              </span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 dark:text-white">RCW Manager</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Store Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shadow-sm ring-1 ring-emerald-200 dark:ring-emerald-800"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <span className={`material-symbols-outlined text-xl ${
                location.pathname === item.href ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"
              }`}>
                {item.icon}
              </span>
              {item.name}
              
              {/* Alert Badge for Stock Overview */}
              {item.href === "/store-manager/inventory" && stockAlerts.total > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded-full">
                  {stockAlerts.total}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 dark:border-slate-700">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800">
            <h3 className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">
              My Store Alerts
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-900/70 dark:text-emerald-300/70">Low Stock</span>
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 rounded-full">
                  {stockAlerts.lowStock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-900/70 dark:text-emerald-300/70">Out of Stock</span>
                <span className="px-2 py-0.5 text-xs font-bold bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 rounded-full">
                  {stockAlerts.outOfStock}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default StoreManagerSidebar;
