import {
  ArrowRight,
  CalendarDays,
  MailCheck,
  MessageSquarePlus,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useCustomerAuth from "../context/useCustomerAuth";
import {
  addProductReview,
  getAllProductReviews,
  getOrders,
} from "../lib/marketplaceStore";

const formatCurrency = (value) =>
  `Rs.${Number(value || 0).toLocaleString("en-IN")}`;

function Orders() {
  const { customer } = useCustomerAuth();
  const lastOrderEmail = localStorage.getItem("buyblink-last-order-email") || "";
  const emailStatus =
    localStorage.getItem("buyblink-last-order-email-status") || "Unavailable";
  const [reviewTarget, setReviewTarget] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: "5",
    title: "",
    comment: "",
  });
  const [allReviews, setAllReviews] = useState(() => getAllProductReviews());
  const reviewerEmail = customer?.email || lastOrderEmail;
  const reviewerName = customer?.name || "Verified Buyer";

  const orders = getOrders()
    .filter((order) => {
      const orderEmail = order.customer?.email || order.shipping?.email || "";
      return customer ? orderEmail === customer.email : orderEmail === lastOrderEmail;
    })
    .sort(
      (firstOrder, secondOrder) =>
        new Date(secondOrder.date) - new Date(firstOrder.date),
    );

  const reviewMap = useMemo(() => {
    const map = new Map();

    allReviews.forEach((review) => {
      map.set(`${review.orderId}-${review.productId}-${review.customerEmail}`, review);
    });

    return map;
  }, [allReviews]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewTarget || !reviewerEmail) {
      return;
    }

    addProductReview({
      orderId: reviewTarget.orderId,
      productId: reviewTarget.product.id,
      mode: reviewTarget.product.mode,
      sellerId: reviewTarget.product.sellerId,
      sellerName: reviewTarget.product.sellerName,
      customerEmail: reviewerEmail,
      customerName: reviewerName,
      productName: reviewTarget.product.name,
      rating: Number(reviewForm.rating) || 5,
      title: reviewForm.title.trim(),
      comment: reviewForm.comment.trim(),
    });

    setAllReviews(getAllProductReviews());
    setReviewTarget(null);
    setReviewForm({
      rating: "5",
      title: "",
      comment: "",
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.08),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_54%,_#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                Order History
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight">
                Track every BuyBlink order in one place.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Review item-level seller status, shipping details, and your latest
                confirmation-email state without leaving the premium buyer flow.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Orders
                </p>
                <p className="mt-2 text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Buyer
                </p>
                <p className="mt-2 text-sm font-bold">
                  {customer?.name || "Guest Checkout"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Email Status
                </p>
                <p className="mt-2 text-sm font-bold">{emailStatus}</p>
              </div>
            </div>
          </div>
        </section>

        {orders.length === 0 ? (
          <section className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <ShoppingBag size={30} />
            </div>
            <h2 className="mt-6 text-3xl font-black text-slate-950">
              No orders to show yet.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              {customer
                ? "Start shopping and your premium order history will appear here."
                : "Sign in or place an order to unlock detailed tracking and confirmation history."}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {!customer && (
                <Link
                  to="/account/login"
                  className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  User Login
                </Link>
              )}
              <Link
                to="/retail"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Start Shopping
              </Link>
            </div>
          </section>
        ) : (
          <section className="mt-8 space-y-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {order.paymentMethod}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        Order Confirmed
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-black text-slate-950">
                      {order.id}
                    </h2>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={16} className="text-cyan-600" />
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Truck size={16} className="text-emerald-600" />
                        {order.shipping?.city}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MailCheck size={16} className="text-amber-600" />
                        {order.shipping?.email || order.customer?.email}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:w-[360px]">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Order Total
                      </p>
                      <p className="mt-2 text-xl font-bold text-slate-950">
                        {formatCurrency(order.amount)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Shipping To
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-950">
                        {order.shipping?.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.shipping?.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {(order.items || []).map((item) => {
                    const unitPrice =
                      item.mode === "wholesale"
                        ? Number(item.wholesalePrice) || 0
                        : Number(item.retailPrice) || 0;
                    const existingReview = reviewerEmail
                      ? reviewMap.get(`${order.id}-${item.id}-${reviewerEmail}`)
                      : null;
                    const canReview =
                      (item.sellerStatus || "New") === "Delivered" &&
                      Boolean(reviewerEmail);

                    return (
                      <div
                        key={`${order.id}-${item.id}-${item.mode}`}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{item.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                              {item.mode} | Qty {item.quantity}
                            </p>
                          </div>

                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {item.sellerStatus || "New"}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                          <span className="inline-flex items-center gap-2">
                            <PackageCheck
                              size={16}
                              className="text-emerald-600"
                            />
                            Sold by {item.sellerName}
                          </span>
                          <span>{formatCurrency(unitPrice)} each</span>
                        </div>

                        {canReview && (
                          <div className="mt-4 border-t border-slate-200 pt-4">
                            {existingReview ? (
                              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                <p className="font-semibold">Review submitted</p>
                                <p className="mt-1">
                                  {existingReview.rating}/5 | {existingReview.title}
                                </p>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setReviewTarget({ orderId: order.id, product: item });
                                  setReviewForm({
                                    rating: "5",
                                    title: "",
                                    comment: "",
                                  });
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                              >
                                <MessageSquarePlus size={16} />
                                Write Review
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Continue Shopping
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/cart"
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                  >
                    Open Cart
                  </Link>
                  <Link
                    to={`/support?order=${encodeURIComponent(order.id)}`}
                    className="rounded-full border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                  >
                    Report an Issue
                  </Link>
                  <Link
                    to={`/support/chat?order=${encodeURIComponent(order.id)}`}
                    className="rounded-full border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
                  >
                    Chat with Support
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>

      {reviewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.25)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Verified Buyer Review
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Review {reviewTarget.product.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Share a thoughtful review now that the order has been delivered.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReviewTarget(null)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="mt-8 space-y-5">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">
                  Rating
                </span>
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm((currentForm) => ({
                      ...currentForm,
                      rating: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} / 5
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">
                  Review Title
                </span>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) =>
                    setReviewForm((currentForm) => ({
                      ...currentForm,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Short headline for your review"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">
                  Review Comment
                </span>
                <textarea
                  rows={5}
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm((currentForm) => ({
                      ...currentForm,
                      comment: e.target.value,
                    }))
                  }
                  placeholder="Tell other buyers about quality, sustainability, packaging, and overall experience."
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
                  required
                />
              </label>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setReviewTarget(null)}
                  className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Cancel
                </button>
                <button className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
