export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      {/* Mobile / Tablet Category Dropdown */}
      <div className="lg:hidden mb-4">
        <label htmlFor="category-select" className="block text-sm font-semibold text-slate-700 mb-1">
          Category
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Category Sidebar */}
      <div className="hidden lg:block bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-3 px-2">Categories</h2>
        <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
          <li>
            <button
              onClick={() => onSelectCategory("all")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium capitalize transition cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}