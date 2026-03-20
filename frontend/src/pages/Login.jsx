import { BarChart3, Boxes, Store } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { AUTH_FIELD_BASE, AUTH_VARIANTS } from "../components/authTheme";
import useAuth from "../context/useAuth";

const sellerHighlights = [
  {
    icon: Store,
    title: "Store-first access",
    description:
      "Log in to manage your storefront, products, and customer activity from one seller workspace.",
  },
  {
    icon: Boxes,
    title: "Catalog control",
    description:
      "Add inventory once and route products into retail or wholesale with the right pricing setup.",
  },
  {
    icon: BarChart3,
    title: "Operational visibility",
    description:
      "Track orders, customers, and seller-side performance from the dashboard built for your store.",
  },
];

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = AUTH_VARIANTS.seller;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthShell
      variant="seller"
      badge="Seller Access"
      title="Sign in to run your BuyBlink store with confidence."
      description="Access your seller dashboard, manage products, fulfil orders, and stay in control of retail and wholesale operations from one premium workspace."
      formTitle="Seller Login"
      formDescription="Use your seller credentials to enter the dashboard and continue managing your store."
      stats={[
        { label: "Dashboard", value: "Live" },
        { label: "Catalog", value: "Retail + Bulk" },
        { label: "Support", value: "Seller Ready" },
      ]}
      highlights={sellerHighlights}
      alternateQuestion="New seller on BuyBlink?"
      alternateText="Register your store"
      alternateTo="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            placeholder="seller@store.com"
            required
            className={`${AUTH_FIELD_BASE} ${theme.focus}`}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            required
            className={`${AUTH_FIELD_BASE} ${theme.focus}`}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
          Seller login is separate from customer login so storefront management and buyer activity remain clearly organized.
        </div>

        <button
          className={`w-full rounded-2xl py-3.5 text-sm font-semibold transition ${theme.button}`}
        >
          Open Seller Dashboard
        </button>
      </form>
    </AuthShell>
  );
}

export default Login;
