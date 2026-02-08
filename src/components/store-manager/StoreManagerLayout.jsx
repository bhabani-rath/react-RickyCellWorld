import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useInventory } from "../../context/InventoryContext";
import { ROLES } from "../../data/inventory";
import StoreManagerSidebar from "./StoreManagerSidebar";
import AdminHeader from "../admin/AdminHeader"; // Reuse header for now

function StoreManagerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, currentRole, isLoading } = useInventory();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate("/login", { 
        state: { from: location },
        replace: true 
      });
      return;
    }

    if (currentRole !== ROLES.STORE_MANAGER) {
      // If not a manager, redirect back (or to their appropriate dashboard)
      navigate("/"); 
    }
  }, [user, currentRole, isLoading, navigate, location]);

  if (isLoading || !user || currentRole !== ROLES.STORE_MANAGER) return null;

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
      <StoreManagerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Header - Reusing AdminHeader but it works generally */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StoreManagerLayout;
