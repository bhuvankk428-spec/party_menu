import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await registerUser(formData);
      login(response.token, response.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-xs text-center mb-6">
          Sign up to save your favorite recipes
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded p-3 text-xs mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-250 text-center text-xs">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-red-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;