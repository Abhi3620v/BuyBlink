import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { normalizeProductRecord } from "../lib/marketplaceStore";
import { productApi } from "../services/api";

const Retail = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";
  const selectedCategory = searchParams.get("category")?.trim() || "";
  const [retailProducts, setRetailProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const response = await productApi.list({
          section: "retail",
          search: searchParams.get("search")?.trim() || "",
          category: selectedCategory,
        });

        setRetailProducts((response.data || []).map(normalizeProductRecord));
      } catch (error) {
        setLoadError(error.message || "Unable to load retail products right now.");
        setRetailProducts([]);
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, [searchParams, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Retail Products</h2>
          <p className="text-sm text-slate-500">
            Explore curated items for everyday shoppers.
          </p>
        </div>

        {(searchTerm || selectedCategory) && (
          <p className="text-sm font-medium text-slate-600">
            Showing
            {selectedCategory ? ` category "${selectedCategory}"` : ""}
            {searchTerm ? ` for "${searchParams.get("search")}"` : ""}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`retail-loading-${index}`}
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
          : retailProducts.map((item) => (
              <ProductCard key={item.id} product={item} mode="retail" />
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

      {!loading && !loadError && retailProducts.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-800">
            No retail products match your search.
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try a different keyword, category, or seller name.
          </p>
        </div>
      )}
    </div>
  );
};

export default Retail;
