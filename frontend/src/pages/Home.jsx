import { Link } from "react-router-dom";
import SpotlightCard from "../components/SpotlightCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Invalid user data in localStorage.", err.message);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20 min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
        Track Your Subscriptions Effortlessly
      </h1>

      <p className="text-gray-300 text-lg mb-6 max-w-xl">
        Never miss a renewal. Stay on top of your subscriptions in one place.
      </p>

      <div className="space-x-4">
        <Link
          to="/sign-up"
          className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
        >
          Get Started
        </Link>

        <Link
          to="/sign-in"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Sign In
        </Link>
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-6 text-gray-300">
        {/* <div className="bg-gray-800 p-4 rounded-lg"> */}
        <SpotlightCard>
          <h3 className="text-xl font-semibold text-white mb-2">
            Smart Reminders
          </h3>
          <p className="text-sm">
            Get notified before any renewal. Stay in control of your spending.
          </p>
        </SpotlightCard>
        {/* </div> */}

        {/* <div className="bg-gray-800 p-4 rounded-lg"> */}
        <SpotlightCard>
          <h3 className="text-xl font-semibold text-white mb-2">
            Dashboard Overview
          </h3>
          <p className="text-sm">
            Track all your subscriptions in one simple view.
          </p>
        </SpotlightCard>
        {/* </div> */}

        {/* <div className="bg-gray-800 p-4 rounded-lg"> */}
        <SpotlightCard>
          <h3 className="text-xl font-semibold text-white mb-2">
            Easy Management
          </h3>
          <p className="text-sm">
            Update, cancel, or renew subscriptions in a few clicks.
          </p>
          {/* </div> */}
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Home;
