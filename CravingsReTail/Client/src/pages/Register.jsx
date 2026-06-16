import React, { useState } from "react";
import loginBg from "../assets/pinkLoginBG.jpg";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(registerData);
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
              <input type="radio" name="role" value="customer" defaultChecked />
              Customer
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="restaurant" />
              Restaurant
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="rider" />
              Rider
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            name="name"
            value={registerData.name}
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
