import { FaTimes } from "react-icons/fa";

const fieldClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function PriceFilter({
  filters,
  brands,
  activeFilters,
  onChange,
  onRemoveFilter,
  onClearFilters,
}) {
  return (
    <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Product Filters</h2>
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-slate-700">
            Price range
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs text-slate-500">
              Minimum
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.minPrice}
                onChange={(event) => onChange("minPrice", event.target.value)}
                placeholder="No min"
                aria-label="Minimum price"
                className={`${fieldClassName} mt-1`}
              />
            </label>
            <label className="text-xs text-slate-500">
              Maximum
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.maxPrice}
                onChange={(event) => onChange("maxPrice", event.target.value)}
                placeholder="No max"
                aria-label="Maximum price"
                className={`${fieldClassName} mt-1`}
              />
            </label>
          </div>
        </fieldset>

        <label className="block text-sm font-semibold text-slate-700">
          Minimum rating
          <select
            value={filters.minRating}
            onChange={(event) => onChange("minRating", event.target.value)}
            className={`${fieldClassName} mt-1 font-normal`}
          >
            <option value="">Any rating</option>
            <option value="4">4 stars and up</option>
            <option value="3">3 stars and up</option>
            <option value="2">2 stars and up</option>
            <option value="1">1 star and up</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Brand
          <select
            value={filters.brand}
            onChange={(event) => onChange("brand", event.target.value)}
            className={`${fieldClassName} mt-1 font-normal`}
          >
            <option value="">All brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Availability
          <select
            value={filters.availability}
            onChange={(event) => onChange("availability", event.target.value)}
            className={`${fieldClassName} mt-1 font-normal`}
          >
            <option value="all">All products</option>
            <option value="in-stock">In stock</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={filters.discounted}
            onChange={(event) => onChange("discounted", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Discounted products
        </label>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Active filters
          </p>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => onRemoveFilter(key)}
                aria-label={`Remove ${label} filter`}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
              >
                {label}
                <FaTimes aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
