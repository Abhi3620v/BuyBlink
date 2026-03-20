import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, ShieldCheck, Truck } from "lucide-react";
import BrandLogo from "./BrandLogo";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.3fr,1fr,1fr,1fr]">
        <div>
          <BrandLogo theme="light" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
            BuyBlink helps modern shoppers discover premium everyday products
            while giving sellers a smarter way to grow retail and wholesale
            revenue.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
              <ShieldCheck size={15} className="text-emerald-600" />
              Secure checkout
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
              <Truck size={15} className="text-cyan-600" />
              Fast delivery
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">
            Explore
          </h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <Link to="/retail" className="block transition hover:text-slate-950">
              Retail Shopping
            </Link>
            <Link
              to="/wholesale"
              className="block transition hover:text-slate-950"
            >
              Wholesale Deals
            </Link>
            <Link to="/orders" className="block transition hover:text-slate-950">
              Order Tracking
            </Link>
            <Link to="/cart" className="block transition hover:text-slate-950">
              Cart and Checkout
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">
            Sellers
          </h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <Link to="/register" className="block transition hover:text-slate-950">
              Register Store
            </Link>
            <Link to="/login" className="block transition hover:text-slate-950">
              Seller Login
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              Seller Dashboard
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">
            Contact
          </h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p className="inline-flex items-center gap-2">
              <Mail size={15} className="text-slate-400" />
              support@buyblink.com
            </p>
            <p className="inline-flex items-center gap-2">
              <Phone size={15} className="text-slate-400" />
              +91 98765 43210
            </p>
            <p>Mon - Sat, 9:00 AM to 7:00 PM</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-5 text-center text-sm text-slate-500">
        Copyright 2026 BuyBlink. Crafted for premium retail and wholesale commerce.
      </div>
    </footer>
  );
}

export default Footer;
