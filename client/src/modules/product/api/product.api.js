import useApi from "../../../shared/api/AxiosInstance";
// 👆 apna actual path daal jaha AxiosInstance.js rakha hai

export const useProductApi = () => {
  const api = useApi();

  // POST /api/products  (authenticated)
  const createProduct = (productData) => api.post("/products", productData);

  // GET /api/products  (public)
  const getAllProducts = () => api.get("/products");

  // GET /api/products/:id  (public)
  const getProductById = (id) => api.get(`/products/${id}`);

  // PUT /api/products/:id  (authenticated)
  const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);

  // DELETE /api/products/:id  (authenticated)
  const deleteProduct = (id) => api.delete(`/products/${id}`);

  return { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
};