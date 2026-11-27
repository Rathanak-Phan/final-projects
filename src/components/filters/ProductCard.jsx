import { FaStar, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const discountedPrice = (
    product.price *
    (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
    >
      <div className="relative bg-slate-100 h-48 flex items-center justify-center p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <span className="absolute top-2.5 right-2.5 bg-slate-800/80 text-white text-xs px-2 py-1 rounded-md capitalize">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              {product.brand}
            </p>
          )}
          <h3 className="font-semibold text-slate-900 line-clamp-1 mb-1" title={product.title}>
            {product.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
            <span className="flex items-center gap-1 font-medium text-amber-500">
              <FaStar />
              <span className="text-slate-700">{product.rating}</span>
            </span>
            <span
              className={`flex items-center gap-1 font-medium ${
                product.stock > 10 ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              <FaBoxOpen />
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100">
            <span className="text-lg font-bold text-slate-900">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-slate-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}