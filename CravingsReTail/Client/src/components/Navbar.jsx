import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/headerLOGO.png";

const Navbar = () => {
  return (
    <nav className="bg-(--primary) shadow-md">
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

        <div className="flex-1 flex justify-center gap-10">
          <Link
            to="/"
            className="text-(--primary-text) font-medium hover:text-(--accent) transition"
          >
            Home
          </Link>

          <Link
            to="/contactus"
            className="text-(--primary-text) font-medium hover:text-(--accent) transition"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex-1 flex justify-end gap-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
