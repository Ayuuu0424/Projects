import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Feedback from "./pages/Feedback";
import HelpCenter from "./pages/HelpCenter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OrderNow from "./pages/OrderNow";
import Partner from "./pages/Partner";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Register from "./pages/Register";
import Sitemap from "./pages/Sitemap";
import TermsOfService from "./pages/TermsOfService";
import { Toaster } from "react-hot-toast";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import RestaurantDashboard from "./pages/dashboard/RestaurantDashboard";
import RiderDashboard from "./pages/dashboard/RiderDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ordernow" element={<OrderNow />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/restaurantdashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          {/* Dashboard Routes */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route
            path="/restaurant-dashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
