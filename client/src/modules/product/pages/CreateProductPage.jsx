import { useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/Navbar";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../context/ProductContext";

export default function CreateProductPage() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    await addProduct(payload);
    navigate("/products");
  };

  return (
    <>
      <Navbar />
      <div className="px-6 py-10">
        <ProductForm mode="create" onSubmit={handleCreate} />
      </div>
    </>
  );
}