import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(email, password);
      login(response.token, response.user);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-stone-200/50 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent tracking-tight">
            Party Menu
          </h1>
          <p className="text-stone-400 font-medium text-sm">
            Sign in to access your culinary collections
          </p>
        </div>

        {error && (
          <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4 text-center text-sm font-bold text-rose-600 flex items-center justify-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-white border border-stone-200/80 rounded-2xl px-5 py-3.5 text-stone-700 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 text-sm shadow-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-white border border-stone-200/80 rounded-2xl px-5 py-3.5 text-stone-700 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 text-sm shadow-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold text-sm py-4 rounded-2xl shadow-lg shadow-orange-500/15 hover:shadow-orange-500/25 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="border-t border-stone-100 pt-6 text-center text-sm font-semibold">
          <p className="text-stone-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-rose-500 hover:text-rose-600 hover:underline transition font-bold"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;