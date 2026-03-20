import {
  ArrowUpRight,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../context/useAuth";
import useBusinessMode from "../context/useBusinessMode";
import BrandLogo from "./BrandLogo";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/products", label: "Products", icon: Package },
  { to: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { to: "/dashboard/customers", label: "Customers", icon: Users },
];

function Sidebar() {
  const { user } = useAuth();
  const { mode } = useBusinessMode();

  return (
    <aside className="border-b border-slate-800 bg-slate-950/95 lg:w-80 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between gap-3">
          <BrandLogo compact theme="dark" />
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
            {mode}
          </span>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-white/[0.03] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950">
              <Store size={20} strokeWidth={2.2} />
            </div>

            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Seller Store
              </p>
              <p className="truncate text-base font-semibold text-white">
                {user?.storeName || user?.name}
              </p>
              <p className="truncate text-sm text-slate-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => {
            const ItemIcon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-3 transition ${
                    isActive
                      ? "bg-emerald-400/12 text-white shadow-[0_18px_40px_rgba(16,185,129,0.12)]"
                      : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.05]">
                    <ItemIcon size={18} />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </div>

                <ArrowUpRight size={16} className="text-slate-500" />
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 pt-8">
          <Link
            to="/retail"
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-emerald-400/30 hover:text-white"
          >
            View Retail Store
            <ArrowUpRight size={16} />
          </Link>

          <Link
            to="/wholesale"
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          >
            View Wholesale Store
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
