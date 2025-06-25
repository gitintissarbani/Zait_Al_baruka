// frontend/client/src/components/layout/Header.jsx
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartSidebar from "../cart/CartSidebar";

const Header = () => {
  const { getTotalItems, setShowCart } = useCart();

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <p>
          🎁 Livraison gratuite à partir de 200 MAD | -20% sur votre première
          commande avec le code NOUVEAU20 🎁
        </p>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="logo">
              ZIT AL BARAKA
            </Link>
          </div>

          <div className="nav-center">
            <Link to="/">ACCUEIL</Link>
            <a href="#products">NOS HUILES</a>
            <Link to="/about">NOTRE HISTOIRE</Link>
            <a href="#contact">CONTACT</a>
          </div>

          <div className="nav-right">
            <button className="search-btn">🔍</button>
            <button className="account-btn">👤</button>
            <button className="cart-btn" onClick={() => setShowCart(true)}>
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
};

export default Header;
