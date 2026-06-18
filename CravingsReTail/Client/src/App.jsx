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
import RestaurantDashboard from "./pages/RestaurantDashboard";
import Sitemap from "./pages/Sitemap";
import TermsOfService from "./pages/TermsOfService";

const App = () => {
  return (
    <>
      <BrowserRouter>
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
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
