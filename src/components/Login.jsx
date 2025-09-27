import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider"; // ✅ import context

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [, setAuthUser] = useAuth(); // ✅ get updater from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:4002/api/v1/user/login",
        formData,
        { withCredentials: true }
      );

      alert(data.message || "Login succeeded");

      // ✅ Save to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // ✅ Update context
      setAuthUser(data.user);

      // ✅ Redirect
      navigate("/");
    } catch (error) {
      const msg = error?.response?.data?.errors || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#1e1e1e] text-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <h1 className="text-white text-center mb-6 text-2xl font-bold">Login</h1>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] mb-4"
        />

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
          />
          <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
            <Eye size={18} />
          </span>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        {/* Terms */}
        <p className="text-xs text-gray-400 mt-4 mb-6 text-center">
          By logging in, you consent to DeepSeek's{" "}
          <a className="underline hover:text-gray-200" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="underline hover:text-gray-200" href="#">
            Privacy Policy
          </a>
          .
        </p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white font-semibold py-3 rounded-lg 
                     transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Redirect */}
        <div className="flex justify-between mt-4 text-sm">
          <span className="text-gray-400">Don’t have an account?</span>
          <Link className="text-[#7a6ff6] hover:underline" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;




