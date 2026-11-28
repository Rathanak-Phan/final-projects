// SortDropdown component handles product sorting options
export default function SortDropdown({ value, onChange, onReset }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label
        htmlFor="product-sort"
        className="text-sm font-medium text-slate-600"
      >
        Sort products
      </label>

      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="default">Default order</option>
        <optgroup label="Price">
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </optgroup>
        <optgroup label="Rating">
          <option value="rating-desc">Rating: Highest First</option>
          <option value="rating-asc">Rating: Lowest First</option>
        </optgroup>
        <optgroup label="Name">
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </optgroup>
        <optgroup label="Discount">
          <option value="discount-desc">Discount: Highest First</option>
        </optgroup>
      </select>

      {value !== "default" && (
        <button
          type="button"
          onClick={onReset}
          className="rounded-md px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset sorting
        </button>
      )}
    </div>
  );
}