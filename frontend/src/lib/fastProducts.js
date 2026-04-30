import dummyProducts from "../data/dummyProducts";
import {
  getMarketplaceProducts,
  normalizeCatalogType,
  normalizeProductRecord,
} from "./marketplaceStore";

export const getDemoMarketplaceProducts = () =>
  dummyProducts.map((product) =>
    normalizeProductRecord({
      ...product,
      id: `demo-${product.id}`,
      sellerId: "buyblink-platform",
      sellerName: "BuyBlink Curated",
    }),
  );

export const getFastMarketplaceProducts = () => {
  const cachedProducts = getMarketplaceProducts();
  return cachedProducts.length > 0 ? cachedProducts : getDemoMarketplaceProducts();
};

export const getFastMarketplaceProductsForSection = (section) =>
  getFastMarketplaceProducts().filter((product) => {
    const catalogType = normalizeCatalogType(product.catalogType);
    return catalogType === "all" || catalogType === section;
  });
