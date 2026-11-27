import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { FaExclamationCircle, FaRedo, FaSearchMinus } from "react-icons/fa";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "../services/productService";
import ProductCard from "../components/filters/ProductCard";
import SearchBar from "../components/filters/SearchBar";
import CategoryFilter from "../components/filters/CategoryFilter";
import Loading from "../components/layout/Loading";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const productsPerPage = 9;

  // Fetch available categories on mount (Module 3)
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Category load error:", err));
  }, []);

  // Debounce live search input (Module 2)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch products based on search or category (Modules 1, 2, 3)
  const fetchProductList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let data;
      if (debouncedQuery) {
        data = await searchProducts(debouncedQuery);
      } else if (selectedCategory !== "all") {
        data = await getProductsByCategory(selectedCategory);
      } else {
        data = await getProducts(30, 0);
      }
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Something went wrong while loading products.");
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, selectedCategory]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);


  const handleSelectCategory = (slug) => {
    setSelectedCategory(slug);
    setSearchQuery("");
    setDebouncedQuery("");
    setPage(1);
    if (slug === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (page - 1) * productsPerPage;

  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
    if (value.trim() && selectedCategory !== "all") {
      setSelectedCategory("all");
      setSearchParams({});
    }
  };

  const handleSearchSubmit = () => {
    setDebouncedQuery(searchQuery.trim());
    setPage(1);
  };

  const handleClearSearch = () => {
    setPage(1);
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Category Sidebar & Mobile Dropdown */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 capitalize mb-4">
            {debouncedQuery
              ? `Search Results for "${debouncedQuery}"`
              : selectedCategory === "all"
                ? "All Products"
                : selectedCategory.replace("-", " ")}
          </h1>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            onClearSearch={handleClearSearch}
          />
        </div>

        {/* Loading State */}
        {loading && <Loading />}

        {/* Error State with Retry */}
        {!loading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center">
            <FaExclamationCircle className="text-4xl text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-rose-800 mb-1">Failed to Load Products</h3>
            <p className="text-sm text-rose-600 mb-4">{error}</p>
            <button
              onClick={fetchProductList}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
            >
              <FaRedo /> Retry Request
            </button>
          </div>
        )}

        {/* Empty / No Results State */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <FaSearchMinus className="text-4xl text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Products Found</h3>
            <p className="text-sm text-slate-500 mb-4">
              {debouncedQuery
                ? `No items matched "${debouncedQuery}". Try a different keyword.`
                : "There are currently no products available in this category."}
            </p>
            {(debouncedQuery || selectedCategory !== "all") && (
              <button
                onClick={() => handleSelectCategory("all")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <p className="text-sm text-slate-500 mb-4">
              Showing <span className="font-semibold text-slate-800">{products.length}</span> products
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-8 p-4 bg-white rounded-lg">

              <p>Page {page} of {totalPages}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}