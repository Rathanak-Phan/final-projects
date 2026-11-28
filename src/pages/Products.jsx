import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FaExclamationCircle, FaRedo, FaSearchMinus } from "react-icons/fa";
import {
  getProducts,
  searchProductsByCategories,
  getCategories,
  getProductsByCategory,
} from "../services/productService";
import ProductCard from "../components/filters/ProductCard";
import SearchBar from "../components/filters/SearchBar";
import CategoryFilter from "../components/filters/CategoryFilter";
import PriceFilter from "../components/filters/PriceFilter";
import SortDropdown from "../components/filters/SortDropdown";
import Loading from "../components/layout/Loading";

const initialFilters = {
  minPrice: "",
  maxPrice: "",
  minRating: "",
  brand: "",
  availability: "all",
  discounted: false,
};

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
  const [filters, setFilters] = useState(initialFilters);
  const [sortOrder, setSortOrder] = useState("default");
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
        const categorySlugs =
          selectedCategory === "all"
            ? categories.map((category) => category.slug)
            : [selectedCategory];
        data = await searchProductsByCategories(
          debouncedQuery,
          categorySlugs
        );
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
  }, [debouncedQuery, selectedCategory, categories]); 

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  const brands = useMemo(
    () =>
      [...new Set(products.map((product) => product.brand).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b)
      ),
    [products]
  );

  const activeFilters = useMemo(() => {
    const active = [];
    if (filters.minPrice !== "") {
      active.push({ key: "minPrice", label: `Min $${filters.minPrice}` });
    }
    if (filters.maxPrice !== "") {
      active.push({ key: "maxPrice", label: `Max $${filters.maxPrice}` });
    }
    if (filters.minRating !== "") {
      active.push({ key: "minRating", label: `${filters.minRating}+ stars` });
    }
    if (filters.brand) {
      active.push({ key: "brand", label: filters.brand });
    }
    if (filters.availability !== "all") {
      active.push({
        key: "availability",
        label: filters.availability === "in-stock" ? "In stock" : "Out of stock",
      });
    }
    if (filters.discounted) {
      active.push({ key: "discounted", label: "Discounted" });
    }
    return active;
  }, [filters]);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const minPrice = filters.minPrice === "" ? null : Number(filters.minPrice);
      const maxPrice = filters.maxPrice === "" ? null : Number(filters.maxPrice);
      const minRating = filters.minRating === "" ? null : Number(filters.minRating);

      return (
        (minPrice === null || product.price >= minPrice) &&
        (maxPrice === null || product.price <= maxPrice) &&
        (minRating === null || product.rating >= minRating) &&
        (!filters.brand || product.brand === filters.brand) &&
        (filters.availability === "all" ||
          (filters.availability === "in-stock"
            ? product.stock > 0
            : product.stock <= 0)) &&
        (!filters.discounted || product.discountPercentage > 0)
      );
    });

    switch (sortOrder) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating-desc":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "rating-asc":
        return filtered.sort((a, b) => a.rating - b.rating);
      case "name-asc":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return filtered.sort((a, b) => b.title.localeCompare(a.title));
      case "discount-desc":
        return filtered.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
      default:
        return filtered;
    }
  }, [products, filters, sortOrder]);

  useEffect(() => {
    setPage(1);
  }, [filters, sortOrder, products]);

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
  const totalPages = Math.ceil(visibleProducts.length / productsPerPage);

  const startIndex = (page - 1) * productsPerPage;

  const currentProducts = visibleProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleRemoveFilter = (key) => {
    const resetValue = key === "availability" ? "all" : key === "discounted" ? false : "";
    setFilters((current) => ({ ...current, [key]: resetValue }));
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

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
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="w-full shrink-0 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:w-64">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        <PriceFilter
          filters={filters}
          brands={brands}
          activeFilters={activeFilters}
          onChange={handleFilterChange}
          onRemoveFilter={handleRemoveFilter}
          onClearFilters={handleClearFilters}
        />
      </aside>

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

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {visibleProducts.length}
            </span>{" "}
            products
          </p>
          <SortDropdown
            value={sortOrder}
            onChange={setSortOrder}
            onReset={() => setSortOrder("default")}
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
        {!loading && !error && visibleProducts.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <FaSearchMinus className="text-4xl text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Products Found</h3>
            <p className="text-sm text-slate-500 mb-4">
              {products.length > 0
                ? "Try changing or clearing your product filters."
                : debouncedQuery
                ? `No items matched "${debouncedQuery}". Try a different keyword.`
                : "There are currently no products available in this category."}
            </p>
            {(activeFilters.length > 0 || debouncedQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  handleClearFilters();
                  if (debouncedQuery || selectedCategory !== "all") {
                    handleSelectCategory("all");
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && visibleProducts.length > 0 && (
          <>
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