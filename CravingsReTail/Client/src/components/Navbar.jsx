import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/headerLOGO.png";
import { useAuth } from "../context/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { user, setUser, isLogin, setIsLogin } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("UserData");
    setIsLogin(false);
    setUser(false);
    navigate("/");
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
              <div className="w-10 h-10 rounded-full overflow-hidden border border-(--accent)">
                <img
                  src={user?.photo}
                  alt={user?.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <Link
                to="/user/dashboard"
                className="font-semibold text-(--primary-text) hover:text-(--primary)"
              >9
                {user.fullName}
              </Link>

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
