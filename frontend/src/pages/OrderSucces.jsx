import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Order Placed Successfully 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Your order has been placed successfully.
      </p>

      <Link to="/orders" className="bg-blue-500 text-white px-6 py-2 rounded">
        View Orders
      </Link>

      <Link to="/" className="bg-green-500 text-white px-6 py-2 rounded">
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;
