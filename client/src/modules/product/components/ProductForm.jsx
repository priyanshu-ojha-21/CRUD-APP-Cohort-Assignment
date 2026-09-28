import { useState } from "react";

const inputClass =
  "w-full text-[0.95rem] px-3.5 py-2.5 bg-transparent border border-black/10 rounded-[3px] " +
  "text-[#15161b] placeholder:text-[#8b8a85] outline-none transition-colors " +
  "focus:border-[#15161b] focus-visible:ring-2 focus-visible:ring-[#a87f22] focus-visible:ring-offset-1";

export default function ProductForm({ mode = "create", initialData = null, onSubmit }) {
  const [form, setForm] = useState({
    productName: initialData?.productName || "",
    productImage: initialData?.productImage?.join(", ") || "", // array ko comma-separated string me dikha rahe hain
    productPrice: initialData?.productPrice || "",
    productStock: initialData?.productStock || "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // comma-separated string ko wapas array me todo — backend ko yahi chahiye
      const payload = {
        productName: form.productName,
        productImage: form.productImage.split(",").map((url) => url.trim()).filter(Boolean),
        productPrice: Number(form.productPrice),
        productStock: Number(form.productStock),
      };
      await onSubmit(payload);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-[#f6f3ec] border border-black/10 rounded-[3px] p-6 md:p-8">
      <p className="text-sm text-[#8b8a85] mb-1">
        {mode === "create" ? "New listing" : "Editing product"}
      </p>
      <h2 className="font-display font-medium text-2xl mb-6">
        {mode === "create" ? "Add a product" : "Update product"}
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {error && (
          <div className="text-sm text-[#b3452c] bg-[#b3452c]/[0.08] border border-[#b3452c]/25 rounded-[3px] px-3.5 py-2.5">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="productName" className="text-[0.8rem] text-[#2a2c34]">
            Product name
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            placeholder="Classic jeans"
            value={form.productName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="productImage" className="text-[0.8rem] text-[#2a2c34]">
            Image URLs
          </label>
          <input
            id="productImage"
            name="productImage"
            type="text"
            placeholder="https://img1.jpg, https://img2.jpg"
            value={form.productImage}
            onChange={handleChange}
            className={inputClass}
          />
          <span className="text-[0.72rem] text-[#8b8a85]">Multiple links ko comma se alag kar</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="productPrice" className="text-[0.8rem] text-[#2a2c34]">
              Price (₹)
            </label>
            <input
              id="productPrice"
              name="productPrice"
              type="number"
              placeholder="1000"
              value={form.productPrice}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="productStock" className="text-[0.8rem] text-[#2a2c34]">
              Stock
            </label>
            <input
              id="productStock"
              name="productStock"
              type="number"
              placeholder="50"
              value={form.productStock}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 py-3 rounded-[3px] bg-[#15161b] text-[#f6f3ec] text-[0.95rem] font-medium hover:bg-[#2a2c34] transition-colors disabled:opacity-50"
        >
          {submitting ? "Saving..." : mode === "create" ? "Create product" : "Save changes"}
        </button>
      </form>
    </div>
  );
}