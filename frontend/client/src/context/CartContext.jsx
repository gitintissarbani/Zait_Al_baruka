// frontend/client/src/context/CartContext.jsx
import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    setCart([...cart, product]);
  };

  const getTotalItems = () => cart.length;
  const getTotalPrice = () => "0.00";

  return (
    <CartContext.Provider
      value={{
        cart,
        showCart,
        setShowCart,
        addToCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
