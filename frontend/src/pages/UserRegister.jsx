import { Heart, MapPin, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { AUTH_FIELD_BASE, AUTH_VARIANTS } from "../components/authTheme";
import useCustomerAuth from "../context/useCustomerAuth";

const customerHighlights = [
  {
    icon: ShoppingBag,
    title: "Faster premium shopping",
    description:
      "Create your account once and keep your order flow, cart progress, and account experience connected.",
  },
  {
    icon: Heart,
    title: "Wishlist and reviews",
    description:
      "Save favorites, come back later, and review products after delivery to build more buyer trust.",
  },
  {
    icon: MapPin,
    title: "Address-ready account",
    description:
      "Set up your customer profile first, then manage saved addresses and smoother checkout from your account hub.",
  },
];

function UserRegister() {
  const { registerCustomer } = useCustomerAuth();
  const navigate = useNavigate();
  const theme = AUTH_VARIANTS.customer;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (event) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const success = await registerCustomer(formData);

    if (success) {
      navigate("/account");
    }
  };

  return (
    <AuthShell
      variant="customer"
      badge="Customer Registration"
      title="Create your BuyBlink customer account and shop with confidence."
      description="Sign up once to unlock your premium buyer hub with orders, wishlist, saved addresses, support tools, and a smoother shopping flow."
      formTitle="Customer Sign Up"
      formDescription="Set up your customer profile with the details needed for account access and future frontend features."
      stats={[
        { label: "Checkout", value: "Smoother" },
        { label: "Wishlist", value: "Enabled" },
        { label: "Account Hub", value: "Ready" },
      ]}
      highlights={customerHighlights}
      alternateQuestion="Already have a customer account?"
      alternateText="Sign in here"
      alternateTo="/account/login"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Full Name
          </span>
          <input
            type="text"
            name="name"
            placeholder="Abhinav Singh"
            required
            className={`${AUTH_FIELD_BASE} ${theme.focus}`}
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            placeholder="abhinav@gmail.com"
            required
            className={`${AUTH_FIELD_BASE} ${theme.focus}`}
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            required
            className={`${AUTH_FIELD_BASE} ${theme.focus}`}
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Age</span>
            <input
              type="number"
              name="age"
              placeholder="21"
              required
              className={`${AUTH_FIELD_BASE} ${theme.focus}`}
              value={formData.age}
              onChange={handleChange}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Gender</span>
            <select
              name="gender"
              required
              className={`${AUTH_FIELD_BASE} ${theme.focus}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
          Your customer signup uses the same structure you asked for: name, email, password, age, and gender.
        </div>

        <button
          className={`w-full rounded-2xl py-3.5 text-sm font-semibold transition ${theme.button}`}
        >
          Create Customer Account
        </button>
      </form>
    </AuthShell>
  );
}

export default UserRegister;
