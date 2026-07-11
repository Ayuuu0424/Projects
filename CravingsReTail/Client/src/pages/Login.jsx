import React, { useState } from "react";
import loginBg from "../assets/pinkLoginBG.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import ForgotPasswordModal from "../components/commonModals/ForgotPasswordModal";

const Login = () => {
  const { setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    console.log("Login data submitted:", formData);

    try {
      const res = await api.post("/auth/login", {
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      toast.success(res.data.message);
      sessionStorage.setItem("cravingUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      //console.log(res.data.data.userType);
      setRole(res.data.data.userType);

      res.data.data.userType === "restaurant" &&
        navigate("/restaurant-dashboard");

      res.data.data.userType === "rider" && navigate("/rider-dashboard");

      res.data.data.userType === "admin" && navigate("/admin-dashboard");

      res.data.data.userType === "customer" && navigate("/customer-dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="h-[90vh] flex items-center bg-cover bg-center pl-30"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      >
        <div className="w-[450px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-10">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back 👋🏻</h1>

          <p className="text-gray-600 mt-2">
            Login to continue ordering your favourite food.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                  errors.email ? "border-red-500" : "border-pink-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="password" className="font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full border p-3 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    errors.password ? "border-red-500" : "border-pink-300"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* <Link
            to="/forgot-password"
            className="text-sm text-pink-600 hover:underline"
          >
            Forgot Password?
          </Link> */}

            <div className="flex items-center justify-between mt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="cursor-pointer"
                />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>

              <button
                type="button"
                onClick={() => setIsForgotPasswordModalOpen(true)}
                className="text-sm text-(--color-primary) hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-5 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center mt-5 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-(--primary) hover:underline font-semibold"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          open={isForgotPasswordModalOpen}
          onClose={() => setIsForgotPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default Login;
