import { Link } from "react-router-dom";

function Orders() {
  const orders = JSON.parse(localStorage.getItem("buyblink-orders")) || [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl text-gray-600 mb-4">
            You haven't placed any orders yet.
          </h2>

          <Link
            to="/retail"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Order ID: {order.id}</p>

                <p className="text-sm text-gray-600">
                  Payment Method: {order.paymentMethod}
                </p>

                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <div className="text-lg font-bold text-green-600">
                ₹{order.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
