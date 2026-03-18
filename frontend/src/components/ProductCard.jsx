// import React from "react";
// import useCart from "../context/useCart";

// const ProductCard = ({ product, mode }) => {
//   const { addToCart } = useCart();
//   const isWholesale = mode === "wholesale";

//   return (
//     <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition duration-300 flex flex-col">
//       {/* Product Image */}
//       <div className="relative">
//         <img
//           src={product.image || "https://via.placeholder.com/300"}
//           alt={product.name}
//           className="w-full h-44 object-cover rounded-t-xl"
//         />

//         {isWholesale && (
//           <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
//             Wholesale
//           </span>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

//         <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//           {product.description}
//         </p>

//         {/* Price Section */}
//         <div className="mt-3">
//           {isWholesale ? (
//             <>
//               <p className="text-green-600 text-xl font-bold">
//                 ₹{product.wholesalePrice}
//               </p>

//               <p className="text-xs text-gray-500">
//                 Min order: {product.minWholesaleQty} units
//               </p>
//             </>
//           ) : (
//             <p className="text-blue-600 text-xl font-bold">
//               ₹{product.retailPrice}
//             </p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="mt-auto flex gap-2 pt-4">
//           <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
//             View
//           </button>

//           <button
//             onClick={() => addToCart(product, mode)}
//             className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useState } from "react";
import useCart from "../context/useCart";

const ProductCard = ({ product, mode }) => {
  const { addToCart } = useCart();
  const isWholesale = mode === "wholesale";
  const [wishlist, setWishlist] = useState(false);

  const discount =
    product.retailPrice && product.wholesalePrice
      ? Math.round(
          ((product.retailPrice - product.wholesalePrice) /
            product.retailPrice) *
            100,
        )
      : 0;

  return (
    <div className="group bg-white rounded-xl shadow-sm border hover:shadow-xl transition overflow-hidden">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-44 object-cover"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
        >
          {wishlist ? "❤️" : "🤍"}
        </button>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
          <button
            className="bg-white p-3 rounded-full shadow"
            title="Quick View"
          >
            👁
          </button>

          <button
            onClick={() => addToCart(product, mode)}
            className="bg-white p-3 rounded-full shadow"
            title="Add to Cart"
          >
            🛒
          </button>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-2 text-yellow-500 text-sm">
          ⭐⭐⭐⭐☆
          <span className="text-gray-500 ml-2">(124)</span>
        </div>

        {/* Price */}
        <div className="mt-3">
          {isWholesale ? (
            <>
              <p className="text-green-600 text-xl font-bold">
                ₹{product.wholesalePrice}
              </p>

              <p className="text-xs text-gray-500">
                Min order: {product.minWholesaleQty}
              </p>
            </>
          ) : (
            <p className="text-blue-600 text-xl font-bold">
              ₹{product.retailPrice}
            </p>
          )}
        </div>

        {/* Add Button */}
        <button
          onClick={() => addToCart(product, mode)}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
