import React, { useState } from "react";
import contactBg from "../assets/contactBG.jpg";
import api from "../config/api.config";
import toast from "react-hot-toast";

const Contactus = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (data.phone && !/^[6-9]\d{9}$/.test(data.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!data.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!data.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      Object.values(validationErrors).forEach((error) => {
        toast.error(error);
      });

      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        email: formData.email.toLowerCase(),
      };

      const res = await api.post("/public/contact-us", payload);

      toast.success(res.data.message);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="h-[90vh] flex items-center bg-cover bg-center pl-20"
      style={{
        backgroundImage: "url('/contactBG.jpg')",
      }}
    >
      <div className="w-125 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-(--primary)">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mt-2 mb-8">
          Have a question? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}

          <input
            type="text"
            name="subject"
            placeholder="What is this about?"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}

          <textarea
            rows="5"
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-(--primary) text-white font-semibold rounded-xl hover:bg-(--secondary) transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
