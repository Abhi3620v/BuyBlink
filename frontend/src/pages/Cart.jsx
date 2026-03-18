import useCart from "../context/useCart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (item.mode === "retail" ? item.retailPrice : item.wholesalePrice),
    0,
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>

          <Link
            to="/retail"
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}

                <div>
                  <p className="font-semibold">{item.name}</p>

                  <p className="text-sm text-gray-500">
                    {item.mode === "retail"
                      ? `Retail Price: ₹${item.retailPrice}`
                      : `Wholesale Price: ₹${item.wholesalePrice}`}
                  </p>
                </div>
              </div>

              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="border w-16 px-2 py-1 rounded"
              />

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-8 bg-gray-50 p-6 rounded-lg w-full md:w-96">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₹0</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-green-500 text-white py-2 rounded mt-4"
            >
              Proceed to Checkout
            </button>
          </div>

          <h2 className="text-xl font-bold mt-6">Total: ₹{total}</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
