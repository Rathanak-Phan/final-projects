import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaTags } from "react-icons/fa";
import { getCategories, getProducts } from "../services/productService";
import ProductCard from "../components/filters/ProductCard";
import Loading from "../components/layout/Loading";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [catData, prodData] = await Promise.all([
          getCategories(),
          getProducts(8, 0),
        ]);
        setCategories(catData.slice(0, 8));
        setFeatured(prodData.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const handleCategoryCardClick = (slug) => {
    navigate(`/products?category=${slug}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Discover Quality Products at Great Prices
        </h1>
        <p className="text-blue-100 max-w-xl mb-6">
          Browse our catalog across dozens of categories, search live, and explore top-rated items.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Browse All Products <FaArrowRight />
        </Link>
      </section>

      {/* Category Cards (Module 3) */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-slate-900">Shop by Category</h2>
          <Link to="/products" className="text-sm font-semibold text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryCardClick(cat.slug)}
              className="bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md rounded-xl p-5 text-left transition flex items-center gap-3 cursor-pointer"
            >
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <FaTags />
              </div>
              <span className="font-semibold text-slate-800 capitalize">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products (Module 1) */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
          <Link to="/products" className="text-sm font-semibold text-blue-600 hover:underline">
            Explore More
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}