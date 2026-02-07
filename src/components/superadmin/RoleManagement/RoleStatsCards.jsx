function RoleStatsCards({ totalRoles, activeRoles, totalPrivileges }) {
  const stats = [
    {
      label: "Total Roles",
      value: totalRoles,
      icon: "shield",
      color: "text-slate-700",
    },
    {
      label: "Active Roles",
      value: activeRoles,
      icon: "check_circle",
      color: "text-green-600",
    },
    {
      label: "Total Privileges",
      value: totalPrivileges,
      icon: "lock_open",
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className={`text-3xl font-bold mt-1 ${stat.color}`}>
              {stat.value}
            </p>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
            <span className={`material-symbols-outlined text-2xl ${stat.color}`}>
              {stat.icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoleStatsCards;
