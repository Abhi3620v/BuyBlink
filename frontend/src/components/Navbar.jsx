import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Boxes,
  ChevronRight,
  Heart,
  LifeBuoy,
  MessageSquare,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  UserCircle2,
} from "lucide-react";
import useAuth from "../context/useAuth";
import useCart from "../context/useCart";
import useCustomerAuth from "../context/useCustomerAuth";
import useWishlist from "../context/useWishlist";
import BrandLogo from "./BrandLogo";

const actionCardBase =
  "group flex h-14 items-center gap-2.5 rounded-2xl border px-3 py-2 text-left transition";

function Navbar() {
  const { user: seller, logout: logoutSeller } = useAuth();
  const { customer, logoutCustomer } = useCustomerAuth();
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [openPanelKey, setOpenPanelKey] = useState(null);

  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }

  const activeSearch = new URLSearchParams(location.search).get("search") || "";
  const currentRouteKey = `${location.pathname}${location.search}`;

  const isPanelOpen = (name) => openPanelKey === `${currentRouteKey}:${name}`;

  const togglePanel = (name) => {
    const nextKey = `${currentRouteKey}:${name}`;
    setOpenPanelKey((current) => (current === nextKey ? null : nextKey));
  };

  const closePanels = () => {
    setOpenPanelKey(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawSearch = formData.get("search");
    const trimmedQuery =
      typeof rawSearch === "string" ? rawSearch.trim() : "";

    const targetPath =
      location.pathname === "/wholesale" ? "/wholesale" : "/retail";

    closePanels();

    if (trimmedQuery) {
      navigate(`${targetPath}?search=${encodeURIComponent(trimmedQuery)}`);
      return;
    }

    navigate(targetPath);
  };

  const accountName = customer?.name || "My Account";
  const accountSubtitle = customer
    ? "Orders, cart, and profile"
    : "User login and signup";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 px-3 py-2.5 text-white backdrop-blur md:px-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-2">
        <div className="grid items-center gap-2 lg:grid-cols-[auto,minmax(0,1fr),auto]">
          <BrandLogo onClick={closePanels} compact />

          <form
            onSubmit={handleSearch}
            key={`${location.pathname}-${activeSearch}`}
            className="flex min-w-0 items-center gap-2"
          >
            <div className="relative min-w-0 flex-1">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="search"
                type="search"
                defaultValue={activeSearch}
                placeholder="Search products or deals"
                className="w-full rounded-full border border-slate-700 bg-slate-900/90 py-2 pl-9 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              />
            </div>

            <button
              type="submit"
              className="shrink-0 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Search
            </button>
          </form>

          <Link
            to="/cart"
            onClick={closePanels}
            className="relative hidden items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 p-2.5 text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300 lg:flex"
          >
            <ShoppingCart size={18} />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-[2px] text-xs text-white">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        <div className="grid gap-2 grid-cols-2 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr),180px,180px,52px]">
          <NavLink
            to="/retail"
            onClick={closePanels}
            className={({ isActive }) =>
              `${actionCardBase} ${
                isActive
                  ? "border-emerald-300/60 bg-emerald-400/16"
                  : "border-emerald-400/20 bg-emerald-400/8 hover:border-emerald-300/50 hover:bg-emerald-300/12"
              }`
            }
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <ShoppingBag size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Retail</p>
              <p className="truncate text-[11px] text-slate-400">
                Single-item shopping
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/wholesale"
            onClick={closePanels}
            className={({ isActive }) =>
              `${actionCardBase} ${
                isActive
                  ? "border-cyan-300/60 bg-cyan-400/16"
                  : "border-cyan-400/20 bg-cyan-400/8 hover:border-cyan-300/50 hover:bg-cyan-300/12"
              }`
            }
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300">
              <Boxes size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Wholesale</p>
              <p className="truncate text-[11px] text-slate-400">
                Bulk pricing deals
              </p>
            </div>
          </NavLink>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => togglePanel("seller")}
              className={`${actionCardBase} w-full border-amber-400/20 bg-amber-400/8 hover:border-amber-300/50 hover:bg-amber-300/12`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-200">
                <Store size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Seller</p>
                <p className="truncate text-[11px] text-slate-400">
                  Store login and dashboard
                </p>
              </div>
            </button>

            {isPanelOpen("seller") && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-80 rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-slate-950/60">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 text-slate-950">
                    <Store size={18} strokeWidth={2.2} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      Seller Center
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Seller registration, seller login, and store tools stay separate from customer accounts.
                    </p>
                  </div>
                </div>

                {seller ? (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">
                        Active Store
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {seller.storeName || seller.name}
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      Open Seller Dashboard
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/dashboard/products"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Manage Products
                      <ChevronRight size={16} />
                    </Link>

                    <button
                      onClick={() => {
                        closePanels();
                        logoutSeller();
                      }}
                      className="w-full rounded-full bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
                    >
                      Seller Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/register"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      Seller Register
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/login"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Seller Login
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => togglePanel("account")}
              className={`${actionCardBase} w-full border-slate-700 bg-slate-900/80 hover:border-slate-500 hover:bg-slate-800`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-200">
                <UserCircle2 size={18} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {accountName}
                </p>
                <p className="truncate text-[11px] text-slate-400">
                  {accountSubtitle}
                </p>
              </div>
            </button>

            {isPanelOpen("account") && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-80 rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-slate-950/60">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-slate-100">
                    <UserCircle2 size={18} strokeWidth={2.2} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      Customer Account
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Customer login and signup are separate from seller access.
                    </p>
                  </div>
                </div>

                {customer ? (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Signed In
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {customer.name}
                      </p>
                      <p className="text-xs text-slate-400">{customer.email}</p>
                    </div>

                    <Link
                      to="/account"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      My Account Hub
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/orders"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      My Orders
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/cart"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Cart and Checkout
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Wishlist
                      <span className="inline-flex items-center gap-2">
                        <Heart size={16} />
                        <span className="text-xs text-slate-400">{wishlistCount}</span>
                      </span>
                    </Link>

                    <Link
                      to="/support"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Customer Service
                      <LifeBuoy size={16} />
                    </Link>

                    <Link
                      to="/support/chat"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Live Support Chat
                      <MessageSquare size={16} />
                    </Link>

                    <Link
                      to="/retail"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Continue Shopping
                      <ChevronRight size={16} />
                    </Link>

                    <button
                      onClick={() => {
                        closePanels();
                        logoutCustomer();
                      }}
                      className="w-full rounded-full bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
                    >
                      User Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/account/login"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                    >
                      User Login
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/account/register"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      User Sign Up
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/account"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Account Overview
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/orders"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Track Orders
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/cart"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      View Cart
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Wishlist
                      <span className="inline-flex items-center gap-2">
                        <Heart size={16} />
                        <span className="text-xs text-slate-400">{wishlistCount}</span>
                      </span>
                    </Link>

                    <Link
                      to="/support"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Customer Service
                      <LifeBuoy size={16} />
                    </Link>

                    <Link
                      to="/support/chat"
                      onClick={closePanels}
                      className="flex items-center justify-between rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                    >
                      Live Support Chat
                      <MessageSquare size={16} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <Link
            to="/cart"
            onClick={closePanels}
            className="relative flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 p-2 text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300 lg:hidden"
          >
            <ShoppingCart size={18} />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-[2px] text-xs text-white">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
