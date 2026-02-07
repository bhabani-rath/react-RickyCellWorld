import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import SuperadminSidebar from "./shared/SuperadminSidebar";

function SuperadminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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

  return (
    <div className="min-h-screen bg-slate-50">
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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          {/* Left Side - Mobile Menu + Breadcrumbs */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100"
            >
              <span className="material-symbols-outlined text-slate-600">menu</span>
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="material-symbols-outlined text-slate-400 text-base">
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
                    <span className="text-slate-900 font-medium">{crumb.label}</span>
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

          {/* Right Side - User Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-dark rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">
                person
              </span>
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
