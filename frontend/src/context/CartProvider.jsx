import { useState, useEffect } from "react";
import { CartContext } from "./Cartcontext";

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("buyblink-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("buyblink-cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product, mode) => {
    if (mode === "wholesale" && product.minWholesaleQty > 1) {
      alert(`Minimum wholesale quantity is ${product.minWholesaleQty}`);
    }

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: mode === "wholesale" ? product.minWholesaleQty : 1,
          mode,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
