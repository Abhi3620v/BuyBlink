import { useState } from "react";

const categoryOptions = [
  "Eco Essentials",
  "Home and Kitchen",
  "Personal Care",
  "Office and Stationery",
  "Packaging Supplies",
  "Fashion and Accessories",
  "Food and Grocery",
];

const createInitialFormData = (catalogType = "retail") => ({
  name: "",
  description: "",
  category: "Eco Essentials",
  catalogType,
  sustainabilityScore: "80",
  retailPrice: "",
  wholesalePrice: "",
  minWholesaleQty: "10",
  inventory: "",
  image: "",
});

function ProductForm({
  onSaveProduct,
  onClose,
  editProduct,
  defaultCatalogType = "retail",
}) {
  const [formData, setFormData] = useState(
    editProduct
      ? {
          ...editProduct,
          sustainabilityScore: String(editProduct.sustainabilityScore || 80),
          minWholesaleQty: String(editProduct.minWholesaleQty || 1),
          inventory: String(editProduct.inventory || ""),
        }
      : createInitialFormData(defaultCatalogType),
  );
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    setUploadingImage(true);

    reader.onload = () => {
      setFormData((currentFormData) => ({
        ...currentFormData,
        image: typeof reader.result === "string" ? reader.result : "",
      }));
      setUploadingImage(false);
    };

    reader.onerror = () => {
      setUploadingImage(false);
      alert("Unable to read the selected image. Please try another file.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSaveProduct({
      ...formData,
      sustainabilityScore: Number(formData.sustainabilityScore) || 80,
      retailPrice: Number(formData.retailPrice) || 0,
      wholesalePrice: Number(formData.wholesalePrice) || 0,
      minWholesaleQty: Number(formData.minWholesaleQty) || 1,
      inventory: Number(formData.inventory) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.25)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Seller Catalog
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Choose where the product should appear and it will publish into
              the matching storefront automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Product Name
              </span>
              <input
                type="text"
                name="name"
                placeholder="Premium product title"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Category
              </span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Description
            </span>
            <textarea
              name="description"
              placeholder="Describe why buyers should choose this product."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Catalog Type
              </span>
              <select
                name="catalogType"
                value={formData.catalogType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
              >
                <option value="retail">Retail only</option>
                <option value="wholesale">Wholesale only</option>
                <option value="all">Retail and wholesale</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Sustainability Score
              </span>
              <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Eco impact rating
                    </p>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      Give every product a score from 1 to 100 based on materials,
                      packaging, and sustainability practices.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-lg font-black text-emerald-700">
                    {formData.sustainabilityScore}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  name="sustainabilityScore"
                  value={formData.sustainabilityScore}
                  onChange={handleChange}
                  className="mt-4 w-full accent-emerald-500"
                />
              </div>
            </label>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Product Image
              </span>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-24 w-24 overflow-hidden rounded-2xl bg-white">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Preview
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                    />
                    <input
                      type="text"
                      name="image"
                      placeholder="Or paste an image URL"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-400"
                    />
                    <p className="text-xs text-slate-500">
                      {uploadingImage
                        ? "Uploading preview..."
                        : "Upload an image from your device or paste a URL."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Retail Price
              </span>
              <input
                type="number"
                min="0"
                name="retailPrice"
                placeholder="499"
                value={formData.retailPrice}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Wholesale Price
              </span>
              <input
                type="number"
                min="0"
                name="wholesalePrice"
                placeholder="320"
                value={formData.wholesalePrice}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Min Wholesale Qty
              </span>
              <input
                type="number"
                min="1"
                name="minWholesaleQty"
                placeholder="10"
                value={formData.minWholesaleQty}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Inventory
              </span>
              <input
                type="number"
                min="0"
                name="inventory"
                placeholder="120"
                value={formData.inventory}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
              />
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {editProduct ? "Update Product" : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
