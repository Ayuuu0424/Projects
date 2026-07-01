import React, { useState } from "react";
import contactBg from "../assets/contactBG.jpg";
import api from "../config/api.config";
import toast from "react-hot-toast";

const Contactus = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contactData.name.trim() === "") {
      toast.error("Full Name is required");
      return;
    }

    if (contactData.email.trim() === "") {
      toast.error("Email is required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(contactData.phone)) {
      toast.error("Enter a valid phone number");
      return;
    }

    if (contactData.subject.trim() === "") {
      toast.error("Subject is required");
      return;
    }

    if (contactData.message.trim() === "") {
      toast.error("Message is required");
      return;
    }

    const payload = {
      fullName: contactData.name,
      email: contactData.email.toLowerCase(),
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message,
    };

    try {
      const res = await api.post("/public/contact-us", payload);

      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
      next(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="h-[90vh] flex items-center bg-cover bg-center pl-20"
      style={{
        backgroundImage: `url(${contactBg})`,
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
            name="name"
            placeholder="Enter your full name"
            value={contactData.name}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={contactData.email}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={contactData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />

          <input
            type="text"
            name="subject"
            placeholder="What is this about?"
            value={contactData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Write your message here..."
            value={contactData.message}
            onChange={handleChange}
            className="w-full p-3 border border-(--accent) rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />

          <button
            type="submit"
            className="w-full py-3 bg-(--primary) text-white font-semibold rounded-xl hover:bg-(--secondary) transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
