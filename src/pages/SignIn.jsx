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
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
   const response = await loginUser(email, password);

login(response.data.token, response.data.user);

navigate("/");

  } catch (error) {
    console.error(error);
    setError(error.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Party Menu
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-center text-red-600">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-2 block font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border p-3 outline-none focus:border-red-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded-lg border p-3 outline-none focus:border-red-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="mt-6 rounded-lg bg-gray-100 p-4 text-sm">
          <div className="mt-6 text-center">
  <p>
    Don't have an account?{" "}
    <Link
      to="/register"
      className="text-red-600 font-semibold"
    >
      Create one
    </Link>
  </p>
</div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;