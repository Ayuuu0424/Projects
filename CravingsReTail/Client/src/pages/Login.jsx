import React, { useState } from "react";
import loginBg from "../assets/pinkLoginBG.jpg";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };

    console.log(payload);
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
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="border border-pink-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="password" className="font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border border-pink-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex justify-end mt-3">
            <button
              type="button"
              className="text-sm text-pink-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition duration-300"
          >
            Login
          </button>

          <p className="text-center mt-5 text-gray-600">
            Don't have an account?{" "}
            <span className="text-pink-600 font-semibold cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
