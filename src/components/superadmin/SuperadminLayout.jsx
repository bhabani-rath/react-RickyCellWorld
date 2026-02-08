import { useState, useEffect } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { useInventory } from "../../context/InventoryContext";
import SuperadminSidebar from "./shared/SuperadminSidebar";

function SuperadminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('rcw_darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isLoading } = useInventory();

  // Apply dark mode
  useEffect(() => {
    localStorage.setItem('rcw_darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Auth check
  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [user, isLoading, navigate, location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown') && !e.target.closest('.profile-trigger')) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // Generate breadcrumb from path
  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/superadmin' }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      if (index > 0) { // Skip 'superadmin'
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        breadcrumbs.push({ label, path: currentPath });
      }
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SuperadminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 transition-colors">
          {/* Left Side - Mobile Menu + Breadcrumbs */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">menu</span>
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-base">
                      chevron_right
                    </span>
                  )}
                  {index === 0 ? (
                    <Link
                      to={crumb.path}
                      className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">home</span>
                    </Link>
                  ) : index === breadcrumbs.length - 1 ? (
                    <span className="text-slate-900 dark:text-white font-medium">{crumb.label}</span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
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

            {/* Profile */}
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
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="profile-dropdown absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.name || "Super Admin"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user?.username || "superadmin"}@rickycellworld.com</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg">settings</span>
                      Settings
                    </button>
                  </div>
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

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SuperadminLayout;
