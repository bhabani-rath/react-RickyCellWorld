import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Role Management",
    href: "/superadmin/roles",
    icon: "shield",
  },
  {
    name: "User Management",
    href: "/superadmin/users",
    icon: "people",
  },
];

function SuperadminSidebar({ isOpen, onClose }) {
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
                admin_panel_settings
              </span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">RCW Superadmin</h1>
              <p className="text-xs text-slate-500">Access Control</p>
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
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
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
            </NavLink>
          ))}
        </nav>

        {/* Back to Admin Link */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <NavLink
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Back to Admin
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default SuperadminSidebar;
