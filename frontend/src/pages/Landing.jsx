import { Navigate, Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import ProductCard from "../components/ProductCard";

function Landing() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const featuredProducts = [
    {
      id: 1,
      name: "Organic Honey",
      description: "Pure natural honey",
      retailPrice: 250,
      wholesalePrice: 200,
      minWholesaleQty: 10,
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
    },
    {
      id: 2,
      name: "Premium Coffee",
      description: "Fresh roasted coffee beans",
      retailPrice: 450,
      wholesalePrice: 380,
      minWholesaleQty: 15,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: 3,
      name: "Almond Pack",
      description: "Healthy dry fruits",
      retailPrice: 700,
      wholesalePrice: 600,
      minWholesaleQty: 20,
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <section className="text-center py-20 bg-white">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to <span className="text-green-600">BuyBlink</span>
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Smart marketplace for Retail and Wholesale businesses
        </p>

        <div className="space-x-4">
          <Link
            to="/retail"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Shop Retail
          </Link>

          <Link
            to="/wholesale"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Wholesale Deals
          </Link>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/retail"
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold mb-2">Retail Shopping</h3>
            <p className="text-gray-600">
              Buy products individually at standard retail prices.
            </p>
          </Link>

          <Link
            to="/wholesale"
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold mb-2">Wholesale Buying</h3>
            <p className="text-gray-600">
              Purchase products in bulk with discounted wholesale pricing.
            </p>
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 px-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose BuyBlink?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Retail & Wholesale</h3>
            <p className="text-gray-600">
              Buy products individually or in bulk with flexible pricing.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Smart Dashboard</h3>
            <p className="text-gray-600">
              Manage products, orders, and customers with ease.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Fast Checkout</h3>
            <p className="text-gray-600">
              Smooth cart and checkout experience.
            </p>
          </div>
        </div>
      </section>

      {/* SELLER SECTION */}
      <section className="py-16 text-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Become a Seller</h2>

        <p className="text-gray-600 mb-6">
          Start your online store and sell products worldwide.
        </p>

        <Link
          to="/register"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Start Selling
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6">
        <p>© 2026 BuyBlink. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
