import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/context/AuthContext";
import { useAuthApi } from "../../modules/auth/api/auth.api";
// 👆 apne actual paths ke hisaab se adjust kar

export default function Navbar() {
  const { user, isAuthenticated, setUser, setAccessToken } = useAuth();
  const { logout } = useAuthApi();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Dropdown ke bahar click hone pe usko band kar do
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // backend: refreshToken null + cookie clear
    } catch (err) {
      console.log("Logout API failed, clearing client state anyway", err);
    } finally {
      setUser(null);
      setAccessToken(null);
      setMenuOpen(false);
      navigate("/login");
    }
  };

  // naam se initials nikalne ke liye (avatar ke andar dikhane hetu)
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-[#15161b] text-[#f6f3ec]">
      <Link to="/products" className="font-display font-semibold text-lg tracking-tight">
        Snitch
      </Link>

      <div className="flex items-center gap-5">
        {isAuthenticated && (
          <Link
            to="/products/new"
            className="text-sm px-4 py-2 rounded-[3px] bg-[#d6a93d] text-[#15161b] font-medium hover:bg-[#a87f22] transition-colors"
          >
            + Add Product
          </Link>
        )}

        {isAuthenticated ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-9 h-9 rounded-full bg-[#f6f3ec] text-[#15161b] font-medium text-sm flex items-center justify-center hover:opacity-90"
              aria-label="Account menu"
            >
              {initials || "U"}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#f6f3ec] text-[#15161b] rounded-[3px] border border-black/10 shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-black/10">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-[#8b8a85] truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#b3452c] hover:bg-black/5"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded-[3px] border border-[#f6f3ec]/30 hover:bg-[#f6f3ec]/10 transition-colors"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}