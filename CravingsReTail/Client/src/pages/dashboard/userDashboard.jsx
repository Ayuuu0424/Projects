import React, { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaUserTag,
} from "react-icons/fa";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("UserData")));
  }, []);

  if (!userData) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[90vh] bg-(--background) py-10 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-(--primary)">
              Welcome Back, {userData.fullName}! 👋
            </h1>

            <p className="text-gray-600 mt-3 text-lg">
              Ready to order something delicious today?
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-(--primary) shadow-lg">
              <img
                src={userData.photo}
                alt={userData.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-(--text) mt-5">
              {userData.fullName}
            </h2>

            <p className="text-(--primary) text-lg capitalize mt-1">
              {userData.role}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-(--background) rounded-2xl p-5 shadow-md">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                <FaUser className="text-(--primary)" />
                Full Name
              </h3>

              <p className="text-xl font-semibold text-(--text) mt-2">
                {userData.fullName}
              </p>
            </div>

            <div className="bg-(--background) rounded-2xl p-5 shadow-md">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                <FaEnvelope className="text-(--primary)" />
                Email
              </h3>

              <p className="text-xl font-semibold text-(--text) mt-2 break-all">
                {userData.email}
              </p>
            </div>

            <div className="bg-(--background) rounded-2xl p-5 shadow-md">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                <FaPhone className="text-(--primary)" />
                Phone
              </h3>

              <p className="text-xl font-semibold text-(--text) mt-2">
                {userData.phone}
              </p>
            </div>

            <div className="bg-(--background) rounded-2xl p-5 shadow-md">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                <FaUserTag className="text-(--primary)" />
                Role
              </h3>
              <p className="text-xl font-semibold text-(--primary) mt-2 capitalize">
                {userData.role}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-(--primary) mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="bg-white border border-pink-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <FaShoppingBag className="text-4xl text-(--primary) mx-auto" />
                <h3 className="mt-4 font-semibold text-(--text)">My Orders</h3>
              </div>

              <div className="bg-white border border-pink-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <FaHeart className="text-4xl text-(--primary) mx-auto" />
                <h3 className="mt-4 font-semibold text-(--text)">Wishlist</h3>
              </div>

              <div className="bg-white border border-pink-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <FaMapMarkerAlt className="text-4xl text-(--primary) mx-auto" />
                <h3 className="mt-4 font-semibold text-(--text)">Addresses</h3>
              </div>

              <div className="bg-white border border-pink-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <FaCog className="text-4xl text-(--primary) mx-auto" />
                <h3 className="mt-4 font-semibold text-(--text)">Settings</h3>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button className="flex items-center gap-2 bg-(--primary) text-white px-8 py-3 rounded-xl font-semibold hover:bg-(--secondary) transition duration-300">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
