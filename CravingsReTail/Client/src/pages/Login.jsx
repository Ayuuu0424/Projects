import React, { useState } from "react";
import loginBg from "../assets/pinkLoginBG.jpg";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { setUser, setIsLogin, isLogin } = useAuth();
  const navigate = useNavigate();

  const [validateError, setValidateError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidateError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidateError(errors);
      return;
    }

    setLoading(true);

    //console.log("Login data submitted:", loginData);

    const payload = {
      email: formData.email.toLowerCase(),
      password: formData.password,
    };
    // console.log(payload);

    try {
      const res = await api.post("/auth/login", payload);
      toast.success(res.data.message);
      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
              onChange={handleChange}
              placeholder="Enter your email"
              className={`border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                validateError.email ? "border-red-500" : "border-pink-300"
              }`}
            />
            {validateError.email && (
              <p className="text-red-500 text-sm mt-1">{validateError.email}</p>
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
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-pink-300 p-3 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {validateError.password && (
              <p className="text-red-500 text-sm">{validateError.password}</p>
            )}
          </div>

          <Link
            to="/forgot-password"
            className="text-sm text-pink-600 hover:underline"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
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
  );
};

export default Login;
