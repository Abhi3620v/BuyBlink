import { useNavigate } from "react-router-dom";
import useCart from "../context/useCart";

function Payment() {
  const { total, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = (method) => {
    const order = {
      id: Date.now(),
      amount: total,
      paymentMethod: method,
      date: new Date(),
    };

    const orders = JSON.parse(localStorage.getItem("buyblink-orders")) || [];
    orders.push(order);

    localStorage.setItem("buyblink-orders", JSON.stringify(orders));

    clearCart();

    navigate("/order-success");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

      <div className="space-y-4">
        <button
          onClick={() => handlePayment("UPI")}
          className="w-full border p-4 rounded hover:bg-gray-100"
        >
          Pay via UPI
        </button>

        <button
          onClick={() => handlePayment("Card")}
          className="w-full border p-4 rounded hover:bg-gray-100"
        >
          Debit / Credit Card
        </button>

        <button
          onClick={() => handlePayment("COD")}
          className="w-full border p-4 rounded hover:bg-gray-100"
        >
          Cash on Delivery
        </button>
      </div>

      <div className="mt-6 text-lg font-bold">Total: ₹{total}</div>
    </div>
  );
}

export default Payment;
