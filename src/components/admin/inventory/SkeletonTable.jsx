function SkeletonTable({ rows = 5 }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 grid grid-cols-8 gap-4">
          {["Product", "Brand", "Category", "Qty", "Status", "Store", "Updated", "Action"].map(
            (col) => (
              <div
                key={col}
                className="h-4 bg-slate-200 rounded animate-pulse"
                style={{ width: col === "Product" ? "100%" : "80%" }}
              />
            )
          )}
        </div>
        <div className="divide-y divide-slate-100">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="px-6 py-4 grid grid-cols-8 gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-32" />
              </div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-16" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-20" />
              <div className="h-6 bg-slate-200 rounded animate-pulse w-10 mx-auto" />
              <div className="h-6 bg-slate-200 rounded-full animate-pulse w-20" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-24" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-14" />
              <div className="h-8 bg-slate-200 rounded animate-pulse w-16 ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="lg:hidden divide-y divide-slate-100">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 bg-slate-200 rounded-xl animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2" />
                <div className="flex items-center justify-between mt-3">
                  <div className="h-6 bg-slate-200 rounded-full animate-pulse w-20" />
                  <div className="h-6 bg-slate-200 rounded animate-pulse w-14" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonTable;
