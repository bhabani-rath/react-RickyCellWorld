import { NavLink } from "react-router-dom";
import { useInventory } from "../../context/InventoryContext";
import { ROLES } from "../../data/inventory";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    end: true,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: "inventory_2",
  },
  {
    name: "Showcase",
    href: "/admin/showcase",
    icon: "featured_play_list",
    ownerOnly: true,
  },
  {
    name: "Stock Overview",
    href: "/admin/inventory",
    icon: "warehouse",
  },
  {
    name: "Stock Transfer",
    href: "/admin/inventory/transfer",
    icon: "swap_horiz",
    requiresTransfer: true,
  },
];

function AdminSidebar({ isOpen, onClose }) {
  const { permissions, stockAlerts, currentRole } = useInventory();

  const filteredNav = navigation.filter((item) => {
    if (item.requiresTransfer && !permissions.canTransfer) return false;
    if (item.ownerOnly && currentRole !== ROLES.OWNER) return false;
    return true;
  });

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">
                inventory
              </span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">RCW Admin</h1>
              <p className="text-xs text-slate-500">Inventory System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {filteredNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
              {item.name}
              
              {/* Alert Badge for Stock Overview */}
              {item.href === "/admin/inventory" && stockAlerts.total > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                  {stockAlerts.total}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Stock Alerts
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Low Stock</span>
                <span className="px-2 py-0.5 text-xs font-bold bg-yellow-100 text-yellow-700 rounded-full">
                  {stockAlerts.lowStock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Out of Stock</span>
                <span className="px-2 py-0.5 text-xs font-bold bg-red-100 text-red-700 rounded-full">
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

export default AdminSidebar;
