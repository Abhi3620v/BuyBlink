import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessModeProvider from "./context/BusinessModeProvider";
import Retail from "./pages/Retail";
import Wholesale from "./pages/Wholesale";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Customer from "./pages/Customer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSucces";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BusinessModeProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />

            {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="products" element={<Product />} />

              <Route path="orders" element={<Order />} />

              <Route path="customers" element={<Customer />} />
            </Route>

            <Route path="/retail" element={<Retail />} />
            <Route path="/wholesale" element={<Wholesale />} />
          </Routes>
        </BusinessModeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
