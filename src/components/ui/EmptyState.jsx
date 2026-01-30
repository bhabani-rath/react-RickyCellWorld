function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 py-16 px-8">
      <div className="max-w-sm mx-auto text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl text-slate-400">
            {icon}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{description}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-6 py-2.5 text-sm font-semibold text-primary bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
