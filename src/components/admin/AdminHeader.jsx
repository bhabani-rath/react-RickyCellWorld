import { useInventory } from "../../context/InventoryContext";
import { ROLES, ROLE_LABELS } from "../../data/inventory";
import { storeLocations } from "../../data/products";

function AdminHeader({ onMenuClick }) {
  const {
    currentRole,
    setCurrentRole,
    selectedStoreId,
    setSelectedStoreId,
    managedStoreId,
    setManagedStoreId,
    permissions,
  } = useInventory();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100"
        >
          <span className="material-symbols-outlined text-slate-600">menu</span>
        </button>

        {/* Store Selector - Owner Only */}
        {permissions.canViewAllStores && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-slate-500">Viewing:</span>
            <select
              value={selectedStoreId || "all"}
              onChange={(e) =>
                setSelectedStoreId(e.target.value === "all" ? null : e.target.value)
              }
              className="px-3 py-1.5 text-sm font-medium bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Stores</option>
              {storeLocations.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Role Switcher (For Demo) */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
          <span className="hidden sm:inline text-xs text-amber-600 font-medium">
            Demo Role:
          </span>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="text-sm font-semibold text-amber-700 bg-transparent border-0 focus:ring-0 cursor-pointer"
          >
            {Object.entries(ROLE_LABELS).map(([role, label]) => (
              <option key={role} value={role}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Store Manager Store Selector */}
        {currentRole === ROLES.STORE_MANAGER && (
          <select
            value={managedStoreId}
            onChange={(e) => setManagedStoreId(e.target.value)}
            className="hidden sm:block px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg focus:ring-2 focus:ring-primary"
          >
            {storeLocations.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name} Store
              </option>
            ))}
          </select>
        )}

        {/* User Avatar */}
        <div className="w-9 h-9 bg-primary-dark rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-lg">
            person
          </span>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
