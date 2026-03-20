import { useContext } from "react";
import WishlistContext from "./WishlistContext";

function useWishlist() {
  return useContext(WishlistContext);
}

export default useWishlist;
