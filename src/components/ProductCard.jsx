import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

function ProductCard({ product, onAddToCart }) {
  const rating = Number(product.rating ?? 0);
  const category = product.category
    ? product.category
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "General";

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <div className="rating-badge">
          <FaStar />
          <span>{rating.toFixed(1)}</span>
        </div>

        <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
      </div>

      <div className="product-content">
        <p className="product-category">{category}</p>
        <h2>{product.title}</h2>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${Number(product.price).toFixed(2)}</span>

          <button type="button" className="add-button" onClick={handleAddToCart}>
            <FaCartShopping />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
