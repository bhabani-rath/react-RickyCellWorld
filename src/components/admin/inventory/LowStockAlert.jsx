function LowStockAlert({ lowCount, outCount, onViewLow, onViewOut }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-red-50 border border-amber-200 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-amber-600">
              warning
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Stock Attention Required
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              {lowCount > 0 && (
                <span>
                  <span className="font-semibold text-amber-600">{lowCount}</span> items running low
                </span>
              )}
              {lowCount > 0 && outCount > 0 && " • "}
              {outCount > 0 && (
                <span>
                  <span className="font-semibold text-red-600">{outCount}</span> items out of stock
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pl-13 sm:pl-0">
          {lowCount > 0 && (
            <button
              onClick={onViewLow}
              className="px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
            >
              View Low Stock
            </button>
          )}
          {outCount > 0 && (
            <button
              onClick={onViewOut}
              className="px-4 py-2 text-sm font-semibold text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
            >
              View Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LowStockAlert;
