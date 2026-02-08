import { useState, useEffect } from "react";
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
    user,
    logout,
  } = useInventory();

  // Profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Notifications dropdown state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Theme state - persisted to localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('rcw_darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Sample notifications
  const notifications = [
    { id: 1, title: "Low Stock Alert", message: "iPhone 15 Pro is running low at Main Store", time: "5 min ago", unread: true },
    { id: 2, title: "Transfer Completed", message: "Stock transfer #127 has been completed", time: "1 hour ago", unread: true },
    { id: 3, title: "New Order", message: "You have 3 new orders pending", time: "2 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Apply dark mode to document
  useEffect(() => {
    localStorage.setItem('rcw_darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown') && !e.target.closest('.profile-trigger')) {
        setProfileOpen(false);
      }
      if (!e.target.closest('.notifications-dropdown') && !e.target.closest('.notifications-trigger')) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 transition-colors">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">menu</span>
        </button>

        {/* Store Selector - Owner Only */}
        {permissions.canViewAllStores && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Viewing:</span>
            <select
              value={selectedStoreId || "all"}
              onChange={(e) =>
                setSelectedStoreId(e.target.value === "all" ? null : e.target.value)
              }
              className="px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-700 dark:text-white border-0 rounded-lg focus:ring-2 focus:ring-primary"
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
      <div className="flex items-center gap-2">
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

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
            {darkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="notifications-trigger p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
              notifications
            </span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="notifications-dropdown absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0 ${
                      notification.unread ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full ${notification.unread ? "bg-blue-500" : "bg-transparent"}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{notification.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notification.message}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
                <button className="text-sm text-primary hover:text-primary-dark font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="profile-trigger flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">
                person
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-800 dark:text-white">{user?.name || "Admin"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role === ROLES.OWNER ? "Owner" : "Manager"}</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-lg hidden md:block">
              expand_more
            </span>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="profile-dropdown absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.name || "Admin User"}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.username || "admin"}@rickycellworld.com</p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">person</span>
                  My Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">settings</span>
                  Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">help</span>
                  Help & Support
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-1">
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
