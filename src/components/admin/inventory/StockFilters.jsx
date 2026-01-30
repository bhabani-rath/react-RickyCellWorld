import { STOCK_STATUS } from "../../../data/inventory";

const STATUS_LABELS = {
  all: "All",
  [STOCK_STATUS.HEALTHY]: "In Stock",
  [STOCK_STATUS.LOW]: "Low Stock",
  [STOCK_STATUS.OUT]: "Out of Stock",
};

function StockFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  categories,
  resultCount,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by product name, brand, or category..."
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border-0 rounded-xl text-sm placeholder-slate-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full"
          >
            <span className="material-symbols-outlined text-slate-400 text-lg">
              close
            </span>
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Status Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <button
              key={value}
              onClick={() => onStatusChange(value)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                statusFilter === value
                  ? value === STOCK_STATUS.OUT
                    ? "bg-red-500 text-white"
                    : value === STOCK_STATUS.LOW
                    ? "bg-yellow-500 text-white"
                    : value === STOCK_STATUS.HEALTHY
                    ? "bg-green-500 text-white"
                    : "bg-primary text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category Filter & Count */}
        <div className="flex items-center gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 text-sm font-medium bg-slate-100 border-0 rounded-xl focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{resultCount}</span> items
          </span>
        </div>
      </div>
    </div>
  );
}

export default StockFilters;
