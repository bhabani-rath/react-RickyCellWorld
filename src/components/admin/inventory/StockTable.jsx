import { getStatusColor, formatRelativeTime, STOCK_STATUS } from "../../../data/inventory";

const STATUS_LABELS = {
  [STOCK_STATUS.HEALTHY]: "In Stock",
  [STOCK_STATUS.LOW]: "Low Stock",
  [STOCK_STATUS.OUT]: "Out of Stock",
};

function StockTable({ items, onRowClick, onUpdateClick }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="sticky top-0 px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Product
              </th>
              <th className="sticky top-0 px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="sticky top-0 px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Category
              </th>
              <th className="sticky top-0 px-4 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="sticky top-0 px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="sticky top-0 px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Store
              </th>
              <th className="sticky top-0 px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Updated
              </th>
              {onUpdateClick && (
                <th className="sticky top-0 px-4 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const colors = getStatusColor(item.status);
              return (
                <tr
                  key={item.id}
                  onClick={() => onRowClick(item)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <p className="font-medium text-slate-900 line-clamp-1">
                          {item.product?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {item.product?.brand}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 capitalize">
                    {item.product?.category}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg font-bold ${colors.text}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${colors.bg} ${colors.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {STATUS_LABELS[item.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {item.store?.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-400">
                    {formatRelativeTime(item.lastUpdated)}
                  </td>
                  {onUpdateClick && (
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={(e) => onUpdateClick(item, e)}
                        className="px-4 py-2 text-sm font-semibold text-primary hover:text-primary-dark hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Update
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-slate-100">
        {items.map((item) => {
          const colors = getStatusColor(item.status);
          return (
            <div
              key={item.id}
              onClick={() => onRowClick(item)}
              className="p-4 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-900 line-clamp-1">
                        {item.product?.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {item.product?.brand} • {item.store?.name}
                      </p>
                    </div>
                    <span className={`text-xl font-bold ${colors.text}`}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${colors.bg} ${colors.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {STATUS_LABELS[item.status]}
                    </span>
                    {onUpdateClick && (
                      <button
                        onClick={(e) => onUpdateClick(item, e)}
                        className="px-3 py-1.5 text-sm font-semibold text-primary"
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StockTable;
