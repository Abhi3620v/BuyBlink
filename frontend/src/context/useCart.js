import { useContext } from "react";
import { CartContext } from "./Cartcontext";

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;