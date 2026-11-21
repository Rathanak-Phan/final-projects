import { FaBagShopping, FaCartShopping } from "react-icons/fa6";

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand-wrap">
          <div className="brand-icon">
            <FaBagShopping />
          </div>
          <span className="brand-name">Shop</span>
        </div>

        <button className="cart-button" type="button">
          <FaCartShopping />
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
