import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import CarouselComponent from "../components/CarouselComponent";
import { useAuth } from "../context/AuthContext";
import api from "../config/api.config";
import toast from "react-hot-toast";

import pizza from "../assets/pizza.avif";
import burger from "../assets/burger.jpg";
import noodles from "../assets/noodles.jpg";
import dessert from "../assets/dessert.jpeg";
import cholebhature from "../assets/cholebhature.jpeg";
import dosa from "../assets/dosa.jpg";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [search, setSearch] = useState("");

  const [restaurants, setRestaurants] = useState([]);

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { name: "Pizza", image: pizza },
    { name: "Burger", image: burger },
    { name: "Noodles", image: noodles },
    { name: "Dessert", image: dessert },
    { name: "Cholebhature", image: cholebhature },
    { name: "Dosa", image: dosa },
  ];
  

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setIsLoading(true);

        const res = await api.get("/public/restaurants");

        const formattedRestaurants = res.data.data.map((restaurant) => ({
          id: restaurant._id,
          name: restaurant.restaurantName,

          description:
            restaurant.description ||
            `${restaurant.cuisineType} cuisine in ${restaurant.city}`,

          cuisines: restaurant.cuisineType
            ? restaurant.cuisineType.split(",")
            : [],

          rating: Number(restaurant.rating || 4.5).toFixed(1),

          image: restaurant.images?.length
            ? restaurant.images[0].URL
            : "https://placehold.co/400x250",

          city: restaurant.city,
        }));

        setRestaurants(formattedRestaurants);

        setFilteredRestaurants(formattedRestaurants);
      } catch (error) {
        console.log(error);

        setRestaurants([]);

        setFilteredRestaurants([]);
      } finally {
        setIsLoading(false);
      }
    };

    getRestaurants();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredRestaurants(restaurants);

      return;
    }

    const filtered = restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.city?.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisines.some((item) =>
          item.toLowerCase().includes(search.toLowerCase()),
        )
      );
    });

    setFilteredRestaurants(filtered);
  }, [search, restaurants]);

  const testimonials = [
    {
      name: "Arun J.",
      initials: "AJ",
      title: "Amazing Service!",
      review:
        "The food arrived hot and fresh. The delivery was incredibly fast. Highly impressed with Cravings' service!",
    },
    {
      name: "Sneha P.",
      initials: "SP",
      title: "Best App Ever!",
      review:
        "Easy to use interface, wide variety of restaurants, and quick delivery. I order from Cravings every week!",
    },
    {
      name: "Raj Kumar",
      initials: "RK",
      title: "Excellent Choices",
      review:
        "Love the variety of restaurants available. Found my new favorite spot through Cravings. Definitely worth it!",
    },
  ];

  const stats = [
    {
      number: "2.5M+",
      title: "Successful Deliveries",
      description: "Orders delivered with care and precision",
      color: "text-(--primary)",
    },
    {
      number: "500K+",
      title: "Happy Customers",
      description: "Satisfied users enjoying delicious food",
      color: "text-pink-500",
    },
    {
      number: "5K+",
      title: "Partner Restaurants",
      description: "Restaurants serving amazing cuisine",
      color: "text-(--primary)",
    },
    {
      number: "1K+",
      title: "Active Delivery Partners",
      description: "Riders ensuring quick and safe delivery",
      color: "text-pink-500",
    },
  ];
  return (
    <div>
      <section className="h-[75vh] relative overflow-hidden">
        <div className="absolute inset-0">
          <CarouselComponent />
        </div>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
            Your Favorite Food,
            <br />
            Delivered Fast
          </h1>

          <p className="text-white text-lg mt-6 text-center">
            Order from thousands of restaurants and get it delivered to your
            doorstep
          </p>

          <div className="flex gap-4 mt-8 justify-center">
            {!user && (
              <button
                onClick={() => navigate("/register/customer")}
                className="bg-(--primary) text-white px-8 py-3 rounded-xl font-semibold hover:bg-(--secondary) transition"
              >
                Sign Up
              </button>
            )}

            <button
              onClick={() => navigate("/ordernow")}
              className="bg-white text-(--text) px-8 py-3 rounded-xl font-semibold hover:bg-(--background) transition"
            >
              Order Now
            </button>
          </div>

          <div className="mt-10 w-full max-w-3xl relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants or dishes..."
              className="w-full pl-14 pr-4 py-3 rounded-xl bg-[#f8f2ec] outline-none shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-(--background)">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-(--text)">
            Explore Categories
          </h2>

          <p className="text-center text-gray-600 mt-3">
            Find your favourite food in just a few clicks
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition duration-300 cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 rounded-full object-cover"
                />

                <h3 className="mt-4 font-semibold text-lg">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-b from-(--primary) via-(--secondary) to-(--background)">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-white">
            Featured Restaurants
          </h2>

          <p className="text-white/90 mt-2">
            {filteredRestaurants.length} restaurants available
          </p>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredRestaurants.length === 0 ? (
            <div className="text-center py-20 col-span-3">
              <h2 className="text-white text-2xl font-semibold">
                No Restaurants Found
              </h2>

              <p className="text-white/80 mt-3">
                Try searching something else.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-52 object-cover"
                    />

                    <div className="absolute top-3 right-3 bg-(--primary) text-white px-4 py-1 rounded-full font-semibold">
                      ⭐ {restaurant.rating}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-(--text)">
                      {restaurant.name}
                    </h3>

                    <p className="text-gray-600 leading-7 mt-3 line-clamp-3">
                      {restaurant.description}
                    </p>

                    <div className="flex gap-2 flex-wrap mt-4">
                      {restaurant.cuisines?.map((item) => (
                        <span
                          key={item}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toast("Restaurant menu coming soon!")}
                      className="w-full mt-6 bg-(--primary) text-white py-3 rounded-xl font-semibold hover:bg-(--secondary) transition"
                    >
                      Explore Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#f8f5ef]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center">
            Cravings by the Numbers
          </h2>

          <p className="text-center text-gray-600 mt-2 mb-12">
            See why millions trust us for their daily food delivery needs
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm text-center p-6 max-w-[260px] mx-auto"
              >
                <h3
                  className={`text-5xl font-bold mb-3 ${
                    index === 0 || index === 2
                      ? "text-orange-700"
                      : "text-pink-600"
                  }`}
                >
                  {item.number}
                </h3>

                <h4 className="text-xl font-semibold">{item.title}</h4>

                <p className="text-gray-500 mt-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center">
            What Our Customers Say
          </h2>

          <p className="text-center text-gray-600 mt-3">
            Real feedback from real food lovers
          </p>

          <div className="grid md:grid-cols-3 gap-2 mt-12 justify-items-center">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-[#f8f2ec] rounded-xl shadow-md p-5 h-64 w-full max-w-[350px] hover:shadow-lg transition"
              >
                <div className="flex text-yellow-500 text-lg">⭐⭐⭐⭐⭐</div>

                <h3 className="font-bold text-lg mt-2">{item.title}</h3>

                <p className="text-gray-700 mt-2 leading-5 text-sm line-clamp-3">
                  "{item.review}"
                </p>

                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 rounded-full bg-(--primary) text-white flex items-center justify-center font-bold">
                    {item.initials}
                  </div>

                  <div className="ml-3">
                    <h4 className="font-semibold">{item.name}</h4>

                    <p className="text-gray-500 text-sm">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-(--primary)">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-4xl font-bold text-white">
            Become a Restaurant Partner
          </h2>

          <p className="text-xl text-white/90 mt-3">
            Grow your business with Cravings and reach thousands of hungry
            customers every day.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-(--primary) px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
