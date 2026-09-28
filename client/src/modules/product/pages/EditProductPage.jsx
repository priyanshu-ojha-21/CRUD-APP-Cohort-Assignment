import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/Navbar";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../context/ProductContext";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, editProduct } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleUpdate = async (payload) => {
    await editProduct(id, payload);
    navigate("/products");
  };

  return (
    <>
      <Navbar />
      <div className="px-6 py-10">
        {loading && <p className="text-center text-[#8b8a85]">Loading...</p>}
        {error && <p className="text-center text-[#b3452c]">{error}</p>}
        {product && (
          <ProductForm mode="edit" initialData={product} onSubmit={handleUpdate} />
        )}
      </div>
    </>
  );
}