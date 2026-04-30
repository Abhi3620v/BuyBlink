import { Heart, LifeBuoy, Package } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { AUTH_FIELD_BASE, AUTH_VARIANTS } from "../components/authTheme";
import useCustomerAuth from "../context/useCustomerAuth";

const customerHighlights = [
  {
    icon: Package,
    title: "Orders in one place",
    description:
      "Track shipments, review delivered products, and manage the buyer journey from your account hub.",
  },
  {
    icon: Heart,
    title: "Saved shopping flow",
    description:
      "Keep products in your wishlist and return later with a cleaner, more premium shopping experience.",
  },
  {
    icon: LifeBuoy,
    title: "Support on standby",
    description:
      "Raise complaints, continue support chats, and keep customer-service history connected to your account.",
  },
];

function UserLogin() {
  const { loginCustomer } = useCustomerAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";
  const theme = AUTH_VARIANTS.customer;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const success = await loginCustomer(email, password);

    if (success) {
      navigate(redirectPath || "/account");
    }
  };

  return (
    <AuthShell
      variant="customer"
      badge="Customer Access"
      title="Sign in to continue your premium BuyBlink shopping journey."
      description="Access your account, orders, wishlist, saved addresses, and support history from one polished customer experience."
      formTitle="Customer Login"
      formDescription="Use your customer email and password to continue shopping, tracking orders, and managing your account."
      stats={[
        { label: "Orders", value: "Tracked" },
        { label: "Wishlist", value: "Saved" },
        { label: "Support", value: "Connected" },
      ]}
      highlights={customerHighlights}
      alternateQuestion="New to BuyBlink?"
      alternateText="Create customer account"
      alternateTo={redirectPath ? `/account/register?redirect=${encodeURIComponent(redirectPath)}` : "/account/register"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {redirectPath && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <p className="font-semibold">Please login to continue</p>
            <p className="mt-1 text-amber-700">Sign in to your account to proceed with your order. Your cart items are saved.</p>
          </div>
        )}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            placeholder="abhinav@gmail.com"
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
          Customer login is different from seller login so your orders, support activity, and profile experience stay focused on shopping.
        </div>

        <button
          className={`w-full rounded-2xl py-3.5 text-sm font-semibold transition ${theme.button}`}
        >
          Open My Account
        </button>
      </form>
    </AuthShell>
  );
}

export default UserLogin;
