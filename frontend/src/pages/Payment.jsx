import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import useCart from "../context/useCart";
import useCustomerAuth from "../context/useCustomerAuth";
import {
  getOrders,
  queueOrderConfirmationEmail,
  saveOrders,
} from "../lib/marketplaceStore";

const formatCurrency = (value) =>
  `Rs.${Number(value || 0).toLocaleString("en-IN")}`;

const getNextOrderId = (orders) => {
  const maxSequence = orders.reduce((maxValue, order) => {
    const sequence = Number(String(order.id || "").replace("ORD-", ""));
    return Number.isFinite(sequence) ? Math.max(maxValue, sequence) : maxValue;
  }, 1000);

  return `ORD-${maxSequence + 1}`;
};

const paymentMethods = [
  {
    id: "UPI",
    title: "UPI",
    description: "Fast bank-to-bank payment with your preferred UPI app.",
    icon: Smartphone,
    accent: "emerald",
  },
  {
    id: "Card",
    title: "Debit / Credit Card",
    description: "Use major cards with secure checkout protection.",
    icon: CreditCard,
    accent: "cyan",
  },
  {
    id: "COD",
    title: "Cash on Delivery",
    description: "Pay at delivery while keeping the order locked in now.",
    icon: Banknote,
    accent: "amber",
  },
];

function Payment() {
  const { cart, total, clearCart } = useCart();
  const { customer } = useCustomerAuth();
  const navigate = useNavigate();
  const shipping = JSON.parse(localStorage.getItem("buyblink-shipping") || "{}");

  const handlePayment = (method) => {
    const orders = getOrders();
    const order = {
      id: getNextOrderId(orders),
      amount: total,
      paymentMethod: method,
      status: "Placed",
      date: new Date().toISOString(),
      shipping,
      customer: customer
        ? {
            name: customer.name,
            email: customer.email,
            age: customer.age,
            gender: customer.gender,
          }
        : {
            name: shipping.name || "Guest Customer",
            email: shipping.email || "",
          },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        mode: item.mode,
        quantity: item.quantity,
        retailPrice: item.retailPrice,
        wholesalePrice: item.wholesalePrice,
        minWholesaleQty: item.minWholesaleQty,
        category: item.category || "General",
        catalogType: item.catalogType || item.mode,
        sellerId: item.sellerId || "buyblink-platform",
        sellerName: item.sellerName || "BuyBlink Curated",
        sellerStatus: "New",
      })),
    };

    saveOrders([order, ...orders]);

    const emailRecord = queueOrderConfirmationEmail(order);

    localStorage.setItem("buyblink-last-order-id", order.id);
    localStorage.setItem("buyblink-last-order-email", shipping.email || "");
    localStorage.setItem(
      "buyblink-last-order-email-status",
      emailRecord ? emailRecord.status : "Unavailable",
    );

    clearCart();
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.08),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_55%,_#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                Payment Step
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight">
                Choose how you want to pay.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Your order summary, shipping details, and confirmation email data
                will be finalized the moment you confirm payment.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Order Total
                </p>
                <p className="mt-2 text-2xl font-bold">{formatCurrency(total)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Buyer Email
                </p>
                <p className="mt-2 text-sm font-bold">
                  {shipping.email || customer?.email || "Not provided"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Security
                </p>
                <p className="mt-2 text-2xl font-bold">Protected</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.15fr),380px]">
          <section className="space-y-5">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const accentClasses =
                method.accent === "emerald"
                  ? "bg-emerald-100 text-emerald-700"
                  : method.accent === "cyan"
                    ? "bg-cyan-100 text-cyan-700"
                    : "bg-amber-100 text-amber-700";

              return (
                <button
                  key={method.id}
                  onClick={() => handlePayment(method.id)}
                  className="group w-full rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <span
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accentClasses}`}
                      >
                        <Icon size={24} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Payment Method
                        </p>
                        <h2 className="mt-2 text-2xl font-black text-slate-950">
                          {method.title}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                          {method.description}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-slate-800">
                      Pay Now
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </button>
              );
            })}
          </section>

          <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <BrandLogo theme="light" compact showTagline={false} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Final Summary
                  </p>
                  <h3 className="text-xl font-black text-slate-950">
                    One step left
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {cart.map((item) => {
                  const lineTotal =
                    item.quantity *
                    (item.mode === "wholesale"
                      ? Number(item.wholesalePrice) || 0
                      : Number(item.retailPrice) || 0);

                  return (
                    <div
                      key={`${item.id}-${item.mode}`}
                      className="flex items-start justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                          {item.mode} • Qty {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-slate-950">
                        {formatCurrency(lineTotal)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl bg-slate-950 px-5 py-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Total Due</span>
                  <span className="text-2xl font-black">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-950">
                What happens next
              </h3>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Order gets confirmed
                    </p>
                    <p className="mt-1">
                      Your order is saved immediately after you select a payment
                      method.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                    <ShieldCheck size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Email confirmation is prepared
                    </p>
                    <p className="mt-1">
                      We generate the confirmation details for the buyer email
                      address provided at shipping.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Payment;
