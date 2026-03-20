import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getMarketplaceProductsForSection } from "../lib/marketplaceStore";

const Retail = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";
  const retailProducts = getMarketplaceProductsForSection("retail");

  const filteredProducts = retailProducts.filter((item) => {
    if (!searchTerm) {
      return true;
    }

    return [item.name, item.description, item.category, item.sellerName]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(searchTerm));
  });

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Retail Products</h2>
          <p className="text-sm text-slate-500">
            Explore curated items for everyday shoppers.
          </p>
        </div>

        {searchTerm && (
          <p className="text-sm font-medium text-slate-600">
            Showing results for "{searchParams.get("search")}"
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} mode="retail" />
        ))}
      </div>

      {filteredProducts.length === 0 && (
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
