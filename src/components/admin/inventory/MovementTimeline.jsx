import { MOVEMENT_LABELS, MOVEMENT_TYPES, formatRelativeTime } from "../../../data/inventory";

const MOVEMENT_ICONS = {
  [MOVEMENT_TYPES.PURCHASE]: { icon: "add_circle", color: "text-green-500" },
  [MOVEMENT_TYPES.SALE]: { icon: "shopping_cart", color: "text-blue-500" },
  [MOVEMENT_TYPES.TRANSFER_IN]: { icon: "call_received", color: "text-green-500" },
  [MOVEMENT_TYPES.TRANSFER_OUT]: { icon: "call_made", color: "text-amber-500" },
  [MOVEMENT_TYPES.DAMAGE]: { icon: "broken_image", color: "text-red-500" },
  [MOVEMENT_TYPES.CORRECTION]: { icon: "edit", color: "text-purple-500" },
};

function MovementTimeline({ movements }) {
  if (!movements || movements.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-slate-400">
        No activity recorded yet.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200" />

      <div className="space-y-4">
        {movements.map((movement, idx) => {
          const config = MOVEMENT_ICONS[movement.type] || {
            icon: "history",
            color: "text-slate-400",
          };
          const isPositive = movement.quantity > 0;

          return (
            <div key={movement.id || idx} className="flex gap-4 relative">
              {/* Icon */}
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10">
                <span className={`material-symbols-outlined text-lg ${config.color}`}>
                  {config.icon}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">
                    {MOVEMENT_LABELS[movement.type] || movement.reason}
                  </p>
                  <span
                    className={`text-sm font-bold ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {movement.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-400">
                    {formatRelativeTime(movement.timestamp)}
                  </span>
                  {movement.performedBy && (
                    <>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-400">
                        by {movement.performedBy}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovementTimeline;
