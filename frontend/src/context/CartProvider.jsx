import { useEffect, useState } from "react";
import { CartContext } from "./Cartcontext";

const getItemMode = (mode) => (mode === "wholesale" ? "wholesale" : "retail");

const getUnitPrice = (item) =>
  getItemMode(item.mode) === "wholesale"
    ? Number(item.wholesalePrice) || 0
    : Number(item.retailPrice) || 0;

const getMinimumQuantity = (item, mode = item.mode) =>
  getItemMode(mode) === "wholesale" ? Number(item.minWholesaleQty) || 1 : 1;

const normalizeCartItem = (item) => {
  const mode = getItemMode(item.mode);
  const minimumQuantity = getMinimumQuantity(item, mode);
  const rawQuantity = Number(item.quantity);

  return {
    ...item,
    mode,
    quantity:
      Number.isFinite(rawQuantity) && rawQuantity >= minimumQuantity
        ? rawQuantity
        : minimumQuantity,
  };
};

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("buyblink-cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart)
        ? parsedCart.map(normalizeCartItem)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("buyblink-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedMode = "retail") => {
    const mode = getItemMode(selectedMode);
    const quantityToAdd = getMinimumQuantity(product, mode);

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id && item.mode === mode,
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id && item.mode === mode
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      return [
        ...currentCart,
        normalizeCartItem({
          ...product,
          mode,
          quantity: quantityToAdd,
        }),
      ];
    });
  };

  const removeFromCart = (id, mode) => {
    const itemMode = getItemMode(mode);

    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.id === id && item.mode === itemMode),
      ),
    );
  };

  const updateQuantity = (id, mode, qty) => {
    const itemMode = getItemMode(mode);

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== id || item.mode !== itemMode) {
          return item;
        }

        const minimumQuantity = getMinimumQuantity(item, itemMode);
        const nextQuantity = Number(qty);

        return {
          ...item,
          quantity:
            Number.isFinite(nextQuantity) && nextQuantity >= minimumQuantity
              ? nextQuantity
              : minimumQuantity,
        };
      }),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + getUnitPrice(item) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
