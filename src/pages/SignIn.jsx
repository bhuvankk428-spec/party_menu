import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

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
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Party Menu Sign In
        </h2>
        <p className="text-gray-500 text-xs text-center mb-6">
          Log in with admin@example.com / admin123
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded p-3 text-xs mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-650 hover:bg-red-700 text-white font-bold text-sm py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-250 text-center text-xs">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-600 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;