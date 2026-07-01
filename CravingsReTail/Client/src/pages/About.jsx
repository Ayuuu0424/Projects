import React from "react";
import aboutHero from "../assets/Aboutbg.jpeg";
import logo from "../assets/circleLOGO.png";

import { FaUtensils, FaMotorcycle, FaStore, FaHeart } from "react-icons/fa";

const About = () => {
  const stats = [
    {
      number: "50K+",
      label: "Happy Customers",
    },
    {
      number: "1,200+",
      label: "Partner Restaurants",
    },
    {
      number: "3,500+",
      label: "Active Riders",
    },
    {
      number: "⭐ 4.8",
      label: "Average Rating",
    },
  ];

  const features = [
    {
      icon: <FaUtensils />,
      title: "Restaurants",
      desc: "Diverse cuisines from local gems",
    },
    {
      icon: <FaMotorcycle />,
      title: "Riders",
      desc: "Fast, reliable delivery partners",
    },
    {
      icon: <FaStore />,
      title: "Partners",
      desc: "Businesses that grow with us",
    },
    {
      icon: <FaHeart />,
      title: "Community",
      desc: "People at the heart of everything",
    },
  ];

  return (
    <>
      <section
        className="h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${aboutHero})`,
        }}
      >
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 rounded-full bg-white p-2 mb-4"
          />

          <h1 className="text-5xl font-bold text-white">
            About <span className="text-(--primary)">Cravings</span>
          </h1>

          <p className="text-white text-lg mt-4">
            Connecting hungry hearts with amazing food — one delivery at a time.
          </p>
        </div>
      </section>

      <section className="bg-[#44444f] py-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 text-center">
          {stats.map((item, index) => (
            <div key={index}>
              <h3 className="text-3xl font-bold text-orange-700">
                {item.number}
              </h3>

              <p className="text-white mt-2 text-base">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f3ede5]">
        <div className="max-w-5xl mx-auto py-12 px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div>
            <p className="text-(--primary) uppercase text-sm tracking-widest font-semibold mb-3">
              Our Story
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
              Born from a love of great food
            </h2>

            <p className="text-gray-600 text-base leading-7 mb-6">
              Cravings started in 2022 when three food lovers realized that
              finding and ordering from local restaurants was harder than it
              needed to be. We set out to build a platform that puts
              restaurants, riders, and customers first — all in one seamless
              experience.
            </p>

            <p className="text-gray-600 text-base leading-7">
              Today, we operate across dozens of cities, empowering small
              businesses to reach new customers and enabling riders to build a
              flexible livelihood — all while bringing delicious meals straight
              to your door.
            </p>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#e8ddd0] shadow-sm p-4"
              >
                <div className="text-(--primary) text-2xl mb-4">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3ede5] mx-auto py-16 px-6">
        <div className="text-center mb-10">
          <p className="text-(--primary) font-semibold uppercase text-sm tracking-widest mb-2">
            The People Behind Cravings
          </p>
          <h2 className="text-3xl font-bold text-black">Meet The Team</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-(--primary) flex items-center justify-center text-white text-xl font-bold mb-3 shadow-md">
              SR
            </div>
            <p className="font-bold text-black">Sofia Reyes</p>
            <p className="text-(--secondary) text-sm">CEO & Co-Founder</p>

            <div className="w-20 h-20 mx-auto rounded-full bg-(--primary) flex items-center justify-center text-white text-xl font-bold mb-3 shadow-md">
              ML
            </div>
            <p className="font-bold text-black">Marcus Lim</p>
            <p className="text-(--secondary) text-sm">CEO & Co-Founder</p>

            <div className="w-20 h-20 mx-auto rounded-full bg-(--primary) flex items-center justify-center text-white text-xl font-bold mb-3 shadow-md">
              AP
            </div>
            <p className="font-bold text-black">Aisha</p>
            <p className="text-(--secondary) text-sm">Head Of Operations</p>

            <div className="w-20 h-20 mx-auto rounded-full bg-(--primary) flex items-center justify-center text-white text-xl font-bold mb-3 shadow-md">
              JO
            </div>
            <p className="font-bold text-black">James Owusu</p>
            <p className="text-(--secondary) text-sm">Head Of Design</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
