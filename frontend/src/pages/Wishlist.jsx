import { Heart, ShoppingCart, Sparkles, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useWishlist from "../context/useWishlist";

function Wishlist() {
  const { wishlistItems, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(244,114,182,0.1),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.1),_transparent_26%),linear-gradient(180deg,_#f8fafc_0%,_#fdf2f8_46%,_#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-200/80">
                Wishlist
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight">
                Save products you want to come back to.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Keep your favorite retail and wholesale products in one curated
                space, then move them to cart whenever you are ready.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Saved Products
                </p>
                <p className="mt-2 text-2xl font-bold">{wishlistItems.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Ready for Cart
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {wishlistItems.filter((item) => item.product).length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {wishlistItems.length === 0 ? (
          <section className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-rose-500">
              <Heart size={30} />
            </div>
            <h2 className="mt-6 text-3xl font-black text-slate-950">
              Your wishlist is empty.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Tap the heart on any product card to save it here and build your own
              shortlist for later.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/retail"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore Retail
              </Link>
              <Link
                to="/wholesale"
                className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore Wholesale
              </Link>
            </div>
          </section>
        ) : (
          <>
            <section className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-950">
                    Your saved shortlist
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Save now, compare later, and move the best picks to cart when ready.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  <ShoppingCart size={16} />
                  Open Cart
                </Link>
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
                >
                  <Trash2 size={16} />
                  Clear Wishlist
                </button>
              </div>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {wishlistItems.map((item) => (
                <ProductCard
                  key={`${item.productId}-${item.mode}`}
                  product={item.product}
                  mode={item.mode}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
