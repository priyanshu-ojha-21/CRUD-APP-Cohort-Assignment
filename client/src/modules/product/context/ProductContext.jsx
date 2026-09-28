import { createContext, useContext, useState, useEffect } from "react";
import { useProductApi } from "../api/product.api";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = useProductApi();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // App load hote hi (ya jab bhi ProductProvider mount ho) saare products le aao
    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const { data } = await getAllProducts();
            setProducts(data.data.products);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Naya product banake list me turant add kar do — dobara poori list fetch karne ki zaroorat nahi
    const addProduct = async (productData) => {
        const { data } = await createProduct(productData);
        setProducts((prev) => [...prev, data.data.product]);
        return data.data.product;
    };

    // Update ke baad list me sirf usi product ko naye data se replace kar do
    const editProduct = async (id, productData) => {
        const { data } = await updateProduct(id, productData);
        setProducts((prev) =>
            prev.map((p) => (p._id === id ? data.data.updatedProduct : p))
        );
        return data.data.updatedProduct;
    };

    // Delete ke baad list me se usi product ko hata do
    const removeProduct = async (id) => {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    // Single product detail chahiye ho (jaise edit form pre-fill karne ke liye)
    const fetchProductById = async (id) => {
        const { data } = await getProductById(id);
        return data.data.product;
    };

    const value = {
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        editProduct,
        removeProduct,
        fetchProductById,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};

export default ProductContext;