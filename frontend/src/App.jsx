import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
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
import useAuth from "./context/useAuth";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import Support from "./pages/Support";
import SupportChat from "./pages/SupportChat";
import Wishlist from "./pages/Wishlist";
import WishlistProvider from "./context/WishlistProvider";
import Account from "./pages/Account";

function ProtectedDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout />;
}

function App() {
  return (
    <Router>
      <BusinessModeProvider>
        <WishlistProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/chat" element={<SupportChat />} />
            <Route path="/account/login" element={<UserLogin />} />
            <Route path="/account/register" element={<UserRegister />} />

            <Route path="/dashboard" element={<ProtectedDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Product />} />
              <Route path="orders" element={<Order />} />
              <Route path="customers" element={<Customer />} />
            </Route>

            <Route path="/retail" element={<Retail />} />
            <Route path="/wholesale" element={<Wholesale />} />
          </Routes>
        </WishlistProvider>
      </BusinessModeProvider>
    </Router>
  );
}

export default App;
