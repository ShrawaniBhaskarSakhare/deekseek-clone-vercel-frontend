import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:4002/api/v1/user/signup",
        formData,
        { withCredentials: true }
      );
      alert(data.message || "Signup Succeeded");
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.errors || "Signup Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#1e1e1e] text-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <h1 className="text-white text-center mb-6 text-2xl font-bold">Signup</h1>

        <input
          className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] mb-4"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] mb-4"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] mb-4"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="relative mb-4">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
            <Eye size={18} />
          </span>
        </div>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <p className="text-xs text-gray-400 mt-4 mb-6 text-center">
          By signing up or logging in, you consent to DeepSeek's{" "}
          <a className="underline hover:text-gray-200" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="underline hover:text-gray-200" href="#">
            Privacy Policy
          </a>
          .
        </p>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Signing..." : "Signup"}
        </button>

        <div className="flex justify-between mt-4 text-sm">
          <a className="text-[#7a6ff6] hover:underline" href="#">
            Already registered?
          </a>
          <Link className="text-[#7a6ff6] hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;



