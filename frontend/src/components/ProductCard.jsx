import { Heart, Leaf, Star } from "lucide-react";
import { useMemo } from "react";
import useCart from "../context/useCart";
import useWishlist from "../context/useWishlist";
import { getProductReviewSummary } from "../lib/marketplaceStore";

function ProductCard({ product, mode }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const selectedMode = mode === "wholesale" ? "wholesale" : "retail";
  const isWholesale = selectedMode === "wholesale";
  const wishlist = isInWishlist(product.id, selectedMode);
  const reviewSummary = useMemo(
    () =>
      getProductReviewSummary(
        product.id,
        product.rating || 4.8,
        product.reviewCount || 124,
      ),
    [product.id, product.rating, product.reviewCount],
  );

  const discount =
    product.retailPrice && product.wholesalePrice
      ? Math.round(
          ((product.retailPrice - product.wholesalePrice) /
            product.retailPrice) *
            100,
        )
      : 0;

  const filledStars = Math.round(reviewSummary.rating);

  return (
    <div className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)]">
      <div className="relative">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
            {discount}% OFF
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product, selectedMode)}
          className="absolute right-4 top-4 rounded-full bg-white/92 p-2 shadow-sm transition hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={16}
            className={wishlist ? "fill-rose-500 text-rose-500" : "text-rose-500"}
          />
        </button>

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-slate-950/78 px-4 py-3 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
              {isWholesale ? "Wholesale" : "Retail"}
            </p>
            <p className="text-sm font-semibold">Ready to add</p>
          </div>

          <button
            onClick={() => addToCart(product, selectedMode)}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Add
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Leaf size={13} />
              Sustainability {(product.sustainabilityScore || 80)}/100
            </div>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            {reviewSummary.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((starNumber) => (
              <Star
                key={starNumber}
                size={14}
                className={
                  starNumber <= filledStars
                    ? "fill-amber-400 text-amber-400"
                    : "text-amber-200"
                }
              />
            ))}
          </span>
          <span className="text-slate-500">({reviewSummary.reviewCount})</span>
        </div>

        <div className="mt-5">
          {isWholesale ? (
            <>
              <p className="text-2xl font-black text-slate-950">
                Rs.{product.wholesalePrice}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                Min order {product.minWholesaleQty} units
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-black text-slate-950">
                Rs.{product.retailPrice}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                Premium retail pricing
              </p>
            </>
          )}
        </div>

        <button
          onClick={() => addToCart(product, selectedMode)}
          className="mt-5 w-full rounded-full bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
