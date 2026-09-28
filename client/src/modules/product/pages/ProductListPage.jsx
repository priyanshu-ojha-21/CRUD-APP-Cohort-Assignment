import { useState } from "react";
import Navbar from "../../../shared/components/Navbar";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

export default function ProductListPage() {
  const { products, loading, error, removeProduct } = useProducts();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setDeletingId(id);
    try {
      await removeProduct(id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-display font-medium text-3xl mb-8">All products</h1>

        {loading && <p className="text-[#8b8a85]">Loading products...</p>}

        {error && (
          <p className="text-[#b3452c] bg-[#b3452c]/[0.08] border border-[#b3452c]/25 rounded-[3px] px-4 py-3">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-[#8b8a85]">No products yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}