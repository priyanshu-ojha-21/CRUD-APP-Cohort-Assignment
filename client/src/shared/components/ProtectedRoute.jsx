import { Navigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/context/AuthContext";
// 👆 apna actual path daal AuthContext ka

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // AuthContext abhi bhi "session restore" kar raha hai (refresh-token + getMe chal rahe hain)
  // Is dauran kuch decide mat karo, warna login wale user ko bhi galti se /login pe bhej doge
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#8b8a85]">Loading...</div>;
  }

  // Loading complete ho gaya aur user logged in nahi hai — login pe bhej do
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Sab sahi hai — jo page maanga tha wahi render karo
  return children;
}