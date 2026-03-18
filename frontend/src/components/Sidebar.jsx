import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-black text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-10">BuyBlink</h2>

      <nav className="space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-green-500" : "hover:bg-gray-800"
            }`
          }
        >
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className="block px-3 py-2 rounded hover:bg-gray-800"
        >
          Products
        </NavLink>

        <NavLink
          to="/dashboard/orders"
          className="block px-3 py-2 rounded hover:bg-gray-800"
        >
          Orders
        </NavLink>

        <NavLink
          to="/dashboard/customers"
          className="block px-3 py-2 rounded hover:bg-gray-800"
        >
          Customers
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
