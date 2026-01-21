function ProductCard({ product }) {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-100 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
      <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-t-xl overflow-hidden">
        {/* Stock Badge */}
        <div
          className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 ${
            product.inStock
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-amber-100 text-amber-700 border border-amber-200"
          }`}
        >
          <span className="material-symbols-outlined text-xs">
            {product.inStock ? "check_circle" : "warning"}
          </span>
          {product.inStock ? "In Stock" : "Low Stock"}
        </div>

        {/* Heart Icon */}
        <button className="absolute top-3 right-3 z-10 text-slate-300 hover:text-red-500 transition-colors">
          <span className="material-symbols-outlined">favorite</span>
        </button>

        {/* Product Image */}
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url('${product.image}')` }}
        ></div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-slate-900 font-bold text-lg mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mb-4">{product.variant}</p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-extrabold text-primary-dark">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
          <button className="w-full bg-whatsapp hover:bg-green-600 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[20px]">chat</span>
            Buy on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
