export default function SortDropdown({ value, onChange, onReset }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="product-sort" className="text-sm font-medium text-slate-600">
        Sort by
      </label>
      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="default">Default order</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: Highest</option>
        <option value="rating-asc">Rating: Lowest</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
        <option value="discount-desc">Highest Discount</option>
      </select>
      {value !== "default" && (
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Reset sorting
        </button>
      )}
    </div>
  );
}
