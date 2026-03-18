import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import useBusinessMode from "../context/useBusinessMode";
// import DashboardLayout from "../layout/DashboardLayout";

function Dashboard() {
  const { user } = useAuth();
  const { mode } = useBusinessMode();

  // Protect route
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6">
        {mode === "retail" ? "Retail Overview" : "Wholesale Overview"}
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Products</p>
          <h3 className="text-2xl font-bold mt-2">0</h3>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">
            {mode === "retail" ? "Retail Orders" : "Wholesale Orders"}
          </p>
          <h3 className="text-2xl font-bold mt-2">0</h3>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">
            {mode === "retail" ? "Retail Revenue" : "Wholesale Revenue"}
          </p>
          <h3 className="text-2xl font-bold mt-2">₹0</h3>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">Current Mode</h3>
        <p className="text-gray-600">
          You are currently managing your store in{" "}
          <span className="font-semibold capitalize">{mode}</span> mode.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
