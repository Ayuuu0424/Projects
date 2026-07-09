import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/headerLOGO.png";
import { useAuth } from "../context/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, isLogin, role, setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  // console.log(user);
  // console.log(role);

  const handleNavigate = () => {
    if (role === "restaurant") {
      navigate("/restaurant-dashboard");
    } else if (role === "rider") {
      navigate("/rider-dashboard");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  const handleLogout = async () => {
    try {
      toast.success(res.data.message);

      sessionStorage.removeItem("UserData");
      setUser(null);
      setIsLogin(false);
      setRole(null);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during registration. Please try again.",
      );
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-(--primary) shadow-md">
      <div className="h-16 px-8 flex items-center justify-between">
        <div className="flex-1">
          <Link to="/">
            <img
              src={logo}
              alt="Cravings Logo"
              className="h-14 object-contain"
            />
          </Link>
        </div>

        {/* <div className="flex-1 flex justify-center gap-10"> </div> */}

        <div className="flex-1 flex justify-end items-center gap-4">
          {isLogin ? (
            <div className="flex items-center gap-4 border-l-2 pl-4">
              <button
                onClick={handleNavigate}
                className="w-10 h-10 rounded-full overflow-hidden border border-(--accent)"
              >
                <img
                  src={user?.photo.url}
                  alt={user?.fullName}
                  className="w-full h-full object-cover"
                />
              </button>

              <div
                onClick={handleNavigate}
                className="cursor-pointer flex flex-col"
              >
                <span className="font-semibold text-(--primary-text)">
                  {user?.fullName}
                </span>

                <span className="text-xs text-white/80 capitalize">
                  {user?.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="text-white text-xl hover:text-(--primary-text) "
              >
                <AiOutlineLogout />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-(--background) text-(--primary) font-semibold border border-(--background) transition-all duration-300 hover:bg-(--accent) hover:text-(--primary-text)"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-(--accent) text-(--primary-text) font-semibold border border-(--accent) transition-all duration-300 hover:bg-(--background) hover:text-(--primary)"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
