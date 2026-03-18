import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../context/useCart";

function Checkout() {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("buyblink-shipping", JSON.stringify(shipping));

    navigate("/payment");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* SHIPPING FORM */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="city"
            placeholder="City"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button className="bg-green-500 text-white px-6 py-2 rounded">
            Continue to Payment
          </button>
        </form>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-gray-50 p-6 rounded-lg h-fit">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
