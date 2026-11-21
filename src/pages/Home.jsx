import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

import { getProducts } from "../services/productService";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Our Products
          </h1>

          <p className="text-gray-500 mt-2">
            Discover our latest products and best deals.
          </p>
        </div>

        {/* Loading State */}
        {loading && <Loading />}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16">

            <p className="text-red-500 text-lg font-semibold">
              {error}
            </p>

            <button
              onClick={fetchProducts}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No products found.
          </div>
        )}

        {/* Product List */}
        {!loading && !error && products.length > 0 && (

          <>
            <div className="mb-5 text-gray-600">
              Total Products: <strong>{products.length}</strong>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          </>

        )}

      </div>
    </div>
  );
}
