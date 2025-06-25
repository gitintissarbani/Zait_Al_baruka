// frontend/client/src/components/products/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      {/* Discount badge */}
      <span className="discount-badge">-20%</span>

      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          {product.image ? (
            <img
              src={`http://localhost:8000${product.image}`}
              alt={product.name}
            />
          ) : (
            <div className="product-placeholder">
              <span>🍃</span>
            </div>
          )}

          {/* Quick view on hover */}
          <div className="product-overlay">
            <button className="quick-view">APERÇU RAPIDE</button>
          </div>
        </div>
      </Link>

      <div className="product-info">
        <div className="product-rating">
          ⭐⭐⭐⭐⭐ <span>(4.8/5)</span>
        </div>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price">
          <span className="original-price">
            {(parseFloat(product.price) * 1.25).toFixed(2)} MAD
          </span>
          <span className="current-price">{product.price} MAD</span>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "RUPTURE DE STOCK" : "AJOUTER AU PANIER"}
        </button>

        {product.stock <= 5 && product.stock > 0 && (
          <p className="stock-warning">Plus que {product.stock} en stock!</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
