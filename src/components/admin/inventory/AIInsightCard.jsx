const PRIORITY_COLORS = {
  high: { bg: "bg-red-50", border: "border-red-200", icon: "text-red-500" },
  medium: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500" },
  low: { bg: "bg-slate-50", border: "border-slate-200", icon: "text-slate-400" },
};

const TYPE_ICONS = {
  transfer_suggestion: "swap_horiz",
  stockout_prediction: "trending_down",
  slow_moving: "schedule",
};

function AIInsightCard({ insight, onAction, onDismiss }) {
  const colors = PRIORITY_COLORS[insight.priority] || PRIORITY_COLORS.low;
  const icon = TYPE_ICONS[insight.type] || "lightbulb";

  return (
    <div
      className={`${colors.bg} ${colors.border} border rounded-xl p-4 relative group`}
    >
      {/* AI Badge */}
      <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
        AI
      </div>

      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
          <span className={`material-symbols-outlined text-xl ${colors.icon}`}>
            {icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900">
            {insight.title}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
            {insight.message}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => onAction?.(insight)}
              className="px-3 py-1.5 text-xs font-semibold text-primary bg-white hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
            >
              {insight.action}
            </button>
            <button
              onClick={() => onDismiss?.(insight)}
              className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsightCard;
