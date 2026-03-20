import { useEffect, useMemo, useState } from "react";
import useCustomerAuth from "./useCustomerAuth";
import WishlistContext from "./WishlistContext";
import { getMarketplaceProducts } from "../lib/marketplaceStore";

const WISHLIST_KEY = "buyblink-user-wishlist";

const readWishlistStore = () => {
  try {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const writeWishlistStore = (value) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(value));
};

const getWishlistScope = (customer) =>
  customer?.email?.trim().toLowerCase() || "guest";

function WishlistProvider({ children }) {
  const { customer } = useCustomerAuth();
  const wishlistScope = getWishlistScope(customer);
  const [wishlistStore, setWishlistStore] = useState(() => readWishlistStore());
  const wishlistEntries = useMemo(
    () => wishlistStore[wishlistScope] || [],
    [wishlistStore, wishlistScope],
  );

  useEffect(() => {
    writeWishlistStore(wishlistStore);
  }, [wishlistStore]);

  const wishlistItems = useMemo(() => {
    const productMap = new Map(
      getMarketplaceProducts().map((product) => [product.id, product]),
    );

    return wishlistEntries
      .map((entry) => {
        const product = productMap.get(entry.productId);

        if (!product) {
          return null;
        }

        return {
          ...entry,
          product,
        };
      })
      .filter(Boolean)
      .sort(
        (firstItem, secondItem) =>
          new Date(secondItem.addedAt) - new Date(firstItem.addedAt),
      );
  }, [wishlistEntries]);

  const isInWishlist = (productId, mode = "retail") =>
    wishlistEntries.some(
      (entry) => entry.productId === productId && entry.mode === mode,
    );

  const toggleWishlist = (product, mode = "retail") => {
    const normalizedMode = mode === "wholesale" ? "wholesale" : "retail";

    setWishlistStore((currentStore) => {
      const currentEntries = currentStore[wishlistScope] || [];
      const exists = currentEntries.some(
        (entry) =>
          entry.productId === product.id && entry.mode === normalizedMode,
      );

      if (exists) {
        return {
          ...currentStore,
          [wishlistScope]: currentEntries.filter(
            (entry) =>
              !(
                entry.productId === product.id && entry.mode === normalizedMode
              ),
          ),
        };
      }

      return {
        ...currentStore,
        [wishlistScope]: [
          {
            productId: product.id,
            mode: normalizedMode,
            addedAt: new Date().toISOString(),
          },
          ...currentEntries,
        ],
      };
    });
  };

  const removeFromWishlist = (productId, mode = "retail") => {
    setWishlistStore((currentStore) => ({
      ...currentStore,
      [wishlistScope]: (currentStore[wishlistScope] || []).filter(
        (entry) => !(entry.productId === productId && entry.mode === mode),
      ),
    }));
  };

  const clearWishlist = () => {
    setWishlistStore((currentStore) => ({
      ...currentStore,
      [wishlistScope]: [],
    }));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistEntries.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
