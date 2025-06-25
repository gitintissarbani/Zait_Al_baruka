// frontend/client/src/components/cart/CartSidebar.jsx
import { useCart } from "../../context/CartContext";

const CartSidebar = () => {
  const {
    cart,
    showCart,
    setShowCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  if (!showCart) return null;

  return (
    <div className={`cart-sidebar ${showCart ? "active" : ""}`}>
      <div className="cart-header">
        <h3>MON PANIER ({getTotalItems()})</h3>
        <button className="close-cart" onClick={() => setShowCart(false)}>
          ×
        </button>
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-icon">🛒</span>
            <p>Votre panier est vide</p>
            <button onClick={() => setShowCart(false)}>
              CONTINUER MES ACHATS
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.image ? (
                      <img
                        src={`http://localhost:8000${item.image}`}
                        alt={item.name}
                      />
                    ) : (
                      <div className="cart-item-placeholder">🍃</div>
                    )}
                  </div>

                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{item.price} MAD</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{getTotalPrice()} MAD</span>
              </div>
              <div className="summary-row">
                <span>Livraison</span>
                <span>
                  {parseFloat(getTotalPrice()) >= 200 ? "GRATUITE" : "30 MAD"}
                </span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>
                  {parseFloat(getTotalPrice()) >= 200
                    ? getTotalPrice()
                    : (parseFloat(getTotalPrice()) + 30).toFixed(2)}{" "}
                  MAD
                </span>
              </div>

              <button className="checkout-btn">COMMANDER</button>
              <button
                className="continue-shopping"
                onClick={() => setShowCart(false)}
              >
                Continuer mes achats
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
