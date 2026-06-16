import heroImg from "../assets/slide3.jpg";

const Home = () => {
  return (
    <div>
      <section
        className="h-[90vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-5xl md:text-7xl font-bold text-center">
            Your Favorite Food,
            <br />
            Delivered Fast
          </h1>

          <p className="text-white text-lg mt-6 text-center">
            Order from thousands of restaurants and get it delivered to your
            doorstep
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-(--primary) text-white px-8 py-3 rounded-xl font-semibold hover:bg-(--secondary) transition">
              Sign Up
            </button>

            <button className="bg-white text-(--text) px-8 py-3 rounded-xl font-semibold hover:bg-(--background) transition">
              Order Now
            </button>
          </div>

          <div className="mt-10 w-full max-w-4xl">
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              className="w-full p-4 rounded-xl bg-white outline-none shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
