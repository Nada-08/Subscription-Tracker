import React, { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionCard from "../components/SubscriptionCard";

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) return;

    console.log("Raw user from localStorage:", storedUser);

    const parsedUser = JSON.parse(storedUser);
    console.log("Parsed user:", parsedUser);

    setUser(parsedUser);

    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/subscriptions/user/${parsedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscriptions(res.data.data || []);
      } catch (error) {
        console.error("Error fetching subscriptions", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleUpdate = (updatedSub) => {
    setSubscriptions((subs) =>
      subs.map((s) => (s._id === updatedSub._id ? updatedSub : s))
    );
  };

  return (
    <div className="text-white p-8 min-h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Your Subscriptions</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <SubscriptionCard subscription={sub} onUpdate={handleUpdate} />
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No subscriptions found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
