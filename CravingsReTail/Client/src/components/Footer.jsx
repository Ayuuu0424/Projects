import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/circleLOGO.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-10 py-8">
        <p className="text-center text-gray-300 mb-6">
          — Your favorite food delivery platform connecting customers with
          restaurants and riders. —
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <img
              src={logo}
              alt="Cravings Logo"
              className="w-32 h-32 object-contain bg-white rounded-full p-2"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/contact-us">Contact Us</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">For Restaurants</h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <a href="#">Partner With Us</a>
              <a href="#">Restaurant Dashboard</a>
              <a href="#">Business Growth</a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Feedback & Support</h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <a href="#">Submit Feedback</a>
              <a href="#">Help Center</a>
              <Link to="/contact-us">Contact Us</Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-600" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-300">
          <p>© 2026 Cravings. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
