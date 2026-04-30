import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getFastMarketplaceProductsForSection } from "../lib/fastProducts";
import {
  syncMarketplaceProducts,
} from "../lib/marketplaceStore";

const getVisibleProducts = (products, searchTerm, selectedCategory) =>
  products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch = searchTerm
      ? [product.name, product.description, product.category, product.sellerName]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(searchTerm))
      : true;

    return matchesCategory && matchesSearch;
  });

const Wholesale = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";
  const selectedCategory = searchParams.get("category")?.trim() || "";
  const [wholesaleProducts, setWholesaleProducts] = useState(() =>
    getVisibleProducts(
      getFastMarketplaceProductsForSection("wholesale"),
      searchTerm,
      selectedCategory,
    ),
  );
  const [loading, setLoading] = useState(wholesaleProducts.length === 0);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fastProducts = getVisibleProducts(
      getFastMarketplaceProductsForSection("wholesale"),
      searchTerm,
      selectedCategory,
    );

    setWholesaleProducts(fastProducts);
    setLoading(fastProducts.length === 0);
    setLoadError("");

    const loadProducts = async () => {
      try {
        const products = await syncMarketplaceProducts({
          section: "wholesale",
          search: searchParams.get("search")?.trim() || "",
          category: selectedCategory,
        });

        setWholesaleProducts(
          getVisibleProducts(products, searchTerm, selectedCategory),
        );
      } catch (error) {
        if (fastProducts.length === 0) {
          setLoadError(error.message || "Unable to load wholesale products right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, [searchParams, searchTerm, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Wholesale Products</h2>
          <p className="text-sm text-slate-500">
            Search bulk-ready inventory and discounted pricing.
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
                key={`wholesale-loading-${index}`}
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
          : wholesaleProducts.map((item) => (
              <ProductCard key={item.id} product={item} mode="wholesale" />
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

      {!loading && !loadError && wholesaleProducts.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-800">
            No wholesale products match your search.
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try a broader term, different category, or another seller.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wholesale;
