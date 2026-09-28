import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

const EyeIcon = ({ off }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    {off ? (
      <>
        <path d="M3 3l18 18" strokeLinecap="round" />
        <path d="M10.6 5.2A10.6 10.6 0 0112 5c5 0 9 4 10 7-.5 1.4-1.5 2.9-2.9 4.1M6.6 6.6C4.4 8 2.9 10 2 12c1 3 5 7 10 7 1.5 0 2.9-.3 4.1-.9" strokeLinecap="round" />
        <path d="M9.9 9.9a3 3 0 004.2 4.2" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

// shared input styling so every field looks identical
const inputClass =
  "w-full text-[0.95rem] px-3.5 py-2.5 bg-transparent border border-black/10 rounded-[3px] " +
  "text-[#15161b] placeholder:text-[#8b8a85] outline-none transition-colors " +
  "focus:border-[#15161b] focus-visible:ring-2 focus-visible:ring-[#a87f22] focus-visible:ring-offset-1";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");   // 👈 naya state, error message ke liye

  const { login } = useAuthApi();
  const { setUser, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await login(form);
      setUser(data.data.user);
      setAccessToken(data.data.accessToken);
      navigate("/products");   // login ke baad kaha bhejna hai
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout
      headline="Dressed for the days that matter."
      sub="Sign in to track orders, save pieces, and check out faster next time."
    >
      <p className="text-sm text-[#8b8a85] mb-1">Welcome back</p>
      <h2 className="font-display font-medium text-3xl mb-8">Log in</h2>

      <form className="flex flex-col gap-[1.15rem]" onSubmit={handleSubmit} noValidate>
        {error && (
            <div className="text-sm text-[#b3452c] bg-[#b3452c]/[0.08] border border-[#b3452c]/25 rounded-[3px] px-3.5 py-2.5">
                {error}
            </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[0.8rem] text-[#2a2c34]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-[0.8rem] text-[#2a2c34]">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              className={inputClass + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b8a85] hover:text-[#15161b]"
            >
              <EyeIcon off={showPassword} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[0.82rem]">
          <label className="flex items-center gap-2 text-[#2a2c34]">
            <input type="checkbox" className="accent-[#15161b]" />
            Keep me signed in
          </label>
          <a href="#" className="underline decoration-black/10 underline-offset-4 hover:decoration-[#15161b]">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="mt-1 py-3 rounded-[3px] bg-[#15161b] text-[#f6f3ec] text-[0.95rem] font-medium hover:bg-[#2a2c34] transition-colors"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 pt-5 border-t border-black/10 text-[0.87rem] text-[#8b8a85]">
        New here?{" "}
        <a href="/register" className="underline decoration-black/10 underline-offset-4 hover:decoration-[#15161b] text-[#15161b]">
          Create an account
        </a>
      </p>
    </AuthLayout>
  );
}