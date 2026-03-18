import React from "react";
import dummyProducts from "../data/dummyProducts";
import ProductCard from "../components/ProductCard";

const Wholesale = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Wholesale Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dummyProducts.map((item) => (
          <ProductCard key={item.id} product={item} mode="wholesale" />
        ))}
      </div>
    </div>
  );
};

export default Wholesale;
