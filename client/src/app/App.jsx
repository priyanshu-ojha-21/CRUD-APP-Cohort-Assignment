import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../modules/auth/context/AuthContext";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import LoginPage from "../modules/auth/pages/Login";
import RegisterPage from "../modules/auth/pages/Register";
import EditProductPage from "../modules/product/pages/EditProductPage";
import CreateProductPage from "../modules/product/pages/CreateProductPage";
import ProductListPage from "../modules/product/pages/ProductListPage";
// import ProductForm from "../modules/product/pages/ProductForm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/products" element={<ProductListPage />} />

            <Route path="/products/new" 
                element={
                    <ProtectedRoute><CreateProductPage /></ProtectedRoute>
                }             
            />
            <Route path="/products/:id/edit" 
                element={
                    <ProtectedRoute><EditProductPage /></ProtectedRoute>
                } 
                
            />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;