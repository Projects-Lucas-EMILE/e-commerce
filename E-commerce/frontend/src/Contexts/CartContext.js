import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children, initialCartData }) {
  const [cartData, setCartData] = useState(initialCartData);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const addToCart = (item) => {
    setCartData((prevCartData) => [...prevCartData, item]);
  };

  const removeFromCart = (itemId) => {
    setCartData((prevCartData) => prevCartData.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartData([]);
  };

  const totalItems = cartData.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartData, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}
