import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_USERS } from "../shared/superadminData";
import UserTable from "./UserTable";

function UserManagementPage() {
  const [users] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeUsers = users.filter(u => u.status === 'active').length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;

  const handleEdit = (user) => {
    console.log("Edit user:", user);
    // TODO: Navigate to edit page
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
    // TODO: Show confirmation modal
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="text-slate-500 mt-1">
          Manage user accounts and role assignments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Users
            </p>
            <p className="text-3xl font-bold mt-1 text-slate-700">
              {users.length}
            </p>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-slate-700">
              people
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Active Users
            </p>
            <p className="text-3xl font-bold mt-1 text-green-600">
              {activeUsers}
            </p>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-green-600">
              check_circle
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Pending Invites
            </p>
            <p className="text-3xl font-bold mt-1 text-yellow-600">
              {pendingUsers}
            </p>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-yellow-600">
              pending
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Add User Button */}
        <Link
          to="/superadmin/users/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
        >
          <span className="material-symbols-outlined text-lg">person_add</span>
          Add User
        </Link>
      </div>

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default UserManagementPage;
