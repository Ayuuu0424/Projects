import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/pinkLoginBG.jpg";
import api from "../config/api.config.js";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    userType: "customer",
    password: "",
    confirmPassword: "",
  });

  const [validateError, setValidateError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";

    if (!formData.email.trim()) errors.email = "Email is required";

    if (!/^[6-9]\d{9}$/.test(formData.phone))
      errors.phone = "Enter a valid phone number";

    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm Password is required";

    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    if (!isChecked) errors.terms = "Please accept the Terms & Conditions";

    return errors;
  };

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

    setValidateError("");
    console.log("Register data submitted:", formData);

    const payload = {
      fullName: formData.fullName,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      userType: formData.userType,
      password: formData.password,
    };

    try {
      const res = await api.post("/auth/register", payload);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.status + " | " + error.response?.data?.message ||
          error.message,
      );
      // toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-[90vh] flex justify-end items-center bg-cover bg-center pr-30"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="w-[450px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Create Account
        </h1>

        <p className="text-gray-600 mt-2">
          Join Cravings and start ordering your favourite food.
        </p>

        <div className="mt-4">
          <label className="font-medium text-gray-700">Register as:</label>

          <div className="flex gap-6 mt-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="userType"
                value="customer"
                checked={formData.userType === "customer"}
                onChange={handleChange}
              />
              Customer
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="userType"
                value="restaurant"
                checked={formData.userType === "restaurant"}
                onChange={handleChange}
              />
              Restaurant
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="userType"
                value="rider"
                checked={formData.userType === "rider"}
                onChange={handleChange}
              />
              Rider
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full border p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${
              validateError.fullName ? "border-red-500" : "border-pink-300"
            }`}
          />

          {validateError.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {validateError.fullName}
            </p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full border p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${
              validateError.email ? "border-red-500" : "border-pink-300"
            }`}
          />

          {validateError.email && (
            <p className="text-red-500 text-sm mt-1">{validateError.email}</p>
          )}

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={`w-full border p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${
              validateError.phone ? "border-red-500" : "border-pink-300"
            }`}
          />

          {validateError.phone && (
            <p className="text-red-500 text-sm mt-1">{validateError.phone}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className={`w-full border p-2.5 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                validateError.password ? "border-red-500" : "border-pink-300"
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

          {validateError.password && (
            <p className="text-red-500 text-sm mt-1">
              {validateError.password}
            </p>
          )}

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className={`w-full border p-2.5 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                validateError.confirmPassword
                  ? "border-red-500"
                  : "border-pink-300"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {validateError.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {validateError.confirmPassword}
            </p>
          )}

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            I agree to the Terms & Conditions
          </label>

          {validateError.terms && (
            <p className="text-red-500 text-sm">{validateError.terms}</p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition duration-300"
          >
            Register
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
