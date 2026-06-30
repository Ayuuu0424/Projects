import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/pinkLoginBG.jpg";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "customer",
    password: "",
    confirmPassword: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(registerData);
    if (registerData.password !== registerData.confirmPassword) {
      setValidateError("Passwords do not match");
      return;
    }

    setValidateError("");
    console.log("Register data submitted:", registerData);

    const payload = {
      fullName: registerData.fullName,
      email: registerData.email.toLowerCase(),
      phone: registerData.phone,
      role: registerData.role,
      password: registerData.password,
    };

    try {
      const res = await api.post("/auth/register", payload);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
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
                name="role"
                value="customer"
                checked={registerData.role === "customer"}
                onChange={handleChange}
              />
              Customer
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="restaurant"
                checked={registerData.role === "restaurant"}
                onChange={handleChange}
              />
              Restaurant
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="rider"
                checked={registerData.role === "rider"}
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
            value={registerData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-pink-300 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-pink-300 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="tel"
            name="phone"
            value={registerData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border border-pink-300 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
            placeholder="Create password"
            className="w-full border border-pink-300 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full border border-pink-300 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" />I agree to the Terms & Conditions
          </label>

          <button
           onClick={() => toast.success("Registration Successful")}
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition duration-300"
          >
            Register
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <span className="text-pink-600 font-semibold cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
