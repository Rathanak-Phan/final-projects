import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { getProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
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

  const addToCart = (product) => {
    setCartItems((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app-shell">
      <Navbar cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

      <main className="page-content">
        <div className="page-header">
          <h1>Featured Products</h1>
          <p>Discover our amazing selection of tech products</p>
        </div>

        {loading && <div className="status-message">Loading products...</div>}

        {error && <div className="status-message error">{error}</div>}

        {!loading && !error && (
          <section className="product-grid">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
