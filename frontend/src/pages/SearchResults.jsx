import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getFastMarketplaceProducts } from "../lib/fastProducts";
import {
  syncMarketplaceProducts,
} from "../lib/marketplaceStore";

const getVisibleProducts = (products, searchTerm) =>
  products.filter((product) =>
    searchTerm
      ? [product.name, product.description, product.category, product.sellerName]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
      : true,
  );

function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim() || "";
  const [products, setProducts] = useState(() =>
    getVisibleProducts(getFastMarketplaceProducts(), searchTerm),
  );
  const [loading, setLoading] = useState(products.length === 0);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fastProducts = getVisibleProducts(getFastMarketplaceProducts(), searchTerm);

    setProducts(fastProducts);
    setLoading(fastProducts.length === 0);
    setLoadError("");

    const loadProducts = async () => {
      try {
        const nextProducts = await syncMarketplaceProducts({
          section: "all",
          search: searchTerm,
        });

        setProducts(getVisibleProducts(nextProducts, searchTerm));
      } catch (error) {
        if (fastProducts.length === 0) {
          setLoadError(error.message || "Unable to load search results right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, [searchTerm]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Search Results</h2>
          <p className="text-sm text-slate-500">
            Browse matching products across retail and wholesale.
          </p>
        </div>

        {searchTerm && (
          <p className="text-sm font-medium text-slate-600">
            Showing results for "{searchTerm}"
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`search-loading-${index}`}
                className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-56 animate-pulse bg-slate-200" />
                <div className="space-y-4 p-5">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 w-full animate-pulse rounded-full bg-slate-200" />
                </div>
              </div>
            ))
          : products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                mode={item.catalogType === "wholesale" ? "wholesale" : "retail"}
              />
            ))}
      </div>

      {!loading && loadError && (
        <div className="mt-10 rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-rose-700">{loadError}</h3>
          <p className="mt-2 text-sm text-rose-600">
            Refresh the page or check whether the backend server is running.
          </p>
        </div>
      )}

      {!loading && !loadError && products.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-800">
            No products match this search.
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try a different keyword, product type, or category.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
