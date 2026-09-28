import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import { useAuthApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

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

const inputClass =
  "w-full text-[0.95rem] px-3.5 py-2.5 bg-transparent border border-black/10 rounded-[3px] " +
  "text-[#15161b] placeholder:text-[#8b8a85] outline-none transition-colors " +
  "focus:border-[#15161b] focus-visible:ring-2 focus-visible:ring-[#a87f22] focus-visible:ring-offset-1";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const { register } = useAuthApi();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await register(form);
            navigate("/login");   // register pe tokens nahi milte (yaad hai?), isliye login pe bhej do
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

  return (
    <AuthLayout
      headline="Your wardrobe, one account away."
      sub="Create an account to check out faster and keep an order history."
    >
      <p className="text-sm text-[#8b8a85] mb-1">First time here</p>
      <h2 className="font-display font-medium text-3xl mb-8">Create account</h2>

      <form className="flex flex-col gap-[1.15rem]" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[0.8rem] text-[#2a2c34]">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Your Full Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            className={inputClass}
          />
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                autoComplete="new-password"
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

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-[0.8rem] text-[#2a2c34]">
              Confirm
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className={inputClass + " pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b8a85] hover:text-[#15161b]"
              >
                <EyeIcon off={showConfirm} />
              </button>
            </div>
          </div>
        </div>

        <p className="text-[0.76rem] text-[#8b8a85] -mt-1">
          At least 8 characters, with a number and a symbol.
        </p>

        <button
          type="submit"
          className="mt-1 py-3 rounded-[3px] bg-[#15161b] text-[#f6f3ec] text-[0.95rem] font-medium hover:bg-[#2a2c34] transition-colors"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 pt-5 border-t border-black/10 text-[0.87rem] text-[#8b8a85]">
        Already have an account?{" "}
        <a href="/login" className="underline decoration-black/10 underline-offset-4 hover:decoration-[#15161b] text-[#15161b]">
          Log in
        </a>
      </p>
    </AuthLayout>
  );
}