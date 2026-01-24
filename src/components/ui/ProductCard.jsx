import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in ${product.name} priced at $${product.price}. Is it available?`
  );
  const whatsappLink = `https://wa.me/919876543210?text=${whatsappMessage}`;

  // Calculate discount percentage if originalPrice exists
  const discountPercent = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : null;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100">
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-900 overflow-hidden">
        {/* Stock Badge */}
        {product.inStock && (
          <span className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-md shadow-sm">
            IN STOCK
          </span>
        )}
        
        {/* Discount Badge */}
        {discountPercent && (
          <span className="absolute top-3 right-3 z-10 px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-md">
            -{discountPercent}%
          </span>
        )}
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="font-semibold text-slate-900 text-base leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Subtitle - colored to match reference */}
        <p className="text-sm text-green-600 font-medium mb-3">{product.subtitle}</p>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-slate-200'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-slate-500 ml-1">({product.reviews || 0})</span>
          </div>
        )}
        
        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-xl font-bold text-slate-900">
            ${product.price.toLocaleString()}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-slate-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* View Detail Button */}
          <Link
            to={`/product/${product.id}`}
            className="flex-1 flex items-center justify-center gap-1 py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-slate-50 hover:border-slate-300"
          >
            <span className="material-symbols-outlined text-lg">visibility</span>
            View Detail
          </Link>
          
          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
