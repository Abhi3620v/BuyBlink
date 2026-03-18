import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import useCart from "../context/useCart";
import { ShoppingCart } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold">
          BuyBlink
        </Link>

        <Link to="/retail" className="hover:text-green-400">
          Retail
        </Link>

        <Link to="/wholesale" className="hover:text-purple-400">
          Wholesale
        </Link>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative hover:text-green-400">
          <ShoppingCart size={22} />

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        <Link to="/orders" className="hover:text-green-600">
          Orders
        </Link>
        {!user ? (
          <>
            <Link to="/login" className="hover:text-green-400">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-green-400">
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
