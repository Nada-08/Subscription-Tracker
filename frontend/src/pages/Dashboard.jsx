import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import SubscriptionCard from "../components/SubscriptionCard";
import AddSubscription from "../components/AddSubscription";
import FilterBar from "../components/FilterBar";
import SubscriptionChart from "../components/SubscriptionChart";
import OcrUploader from "../components/OcrUploader";
import API_URL from "../../api";

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdding, setAdding] = useState(false);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) return;

    const parsedUser = JSON.parse(storedUser);

    setUser(parsedUser);

    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/subscriptions/user/${parsedUser._id}`,
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

  const filteredSubscriptions = showUpcomingOnly
    ? subscriptions.filter((sub) => new Date(sub.renewalDate) > new Date())
    : subscriptions;

  const handleUpdate = (updatedSub) => {
    setSubscriptions((subs) =>
      subs.map((s) => (s._id === updatedSub._id ? updatedSub : s))
    );
  };

  const handleDelete = (deletedId) => {
    setSubscriptions((subs) => subs.filter((s) => s._id !== deletedId));
  };

  const handleAdd = (addedSub) => {
    setSubscriptions((subs) => [addedSub, ...subs]);
  };

  const fetchFilteredSubscriptions = async (filters = {}) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) return;

    const parsedUser = JSON.parse(user);
    const query = new URLSearchParams(filters).toString();

    console.log(parsedUser._id);

    try {
      const res = await axios.get(
        `http://localhost:5500/api/v1/subscriptions/user/${parsedUser._id}/filter?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubscriptions(res.data.data || []);
    } catch (error) {
      console.error("Error filtering subscriptions", error);
    }
  };

  const spendingByCategory = subscriptions.reduce((acc, sub) => {
    const cat = sub.category || "uncategorized";
    acc[cat] = (acc[cat] || 0) + sub.price;
    return acc;
  }, {});

  const chartData = Object.entries(spendingByCategory).map(
    ([category, cost]) => ({ category, cost })
  );

  return (
    <div className="text-white p-8 min-h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h1>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Your Subscriptions</h2>
        <div className="flex items-center justify-between mb-2 gap-2">
          <button
            onClick={() => setShowUpcomingOnly(!showUpcomingOnly)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition 
    ${
      showUpcomingOnly
        ? "bg-amber-400 text-white"
        : "bg-white text-black hover:bg-gray-100"
    }`}
          >
            Upcoming Renewals
          </button>

          <button
            onClick={() => setAdding(true)}
            className={`p-2 rounded-full transition text-black ${
              isAdding
                ? "bg-amber-400 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <OcrUploader onSuccess={handleAdd} />

      <FilterBar onFilter={fetchFilteredSubscriptions} />

      <SubscriptionChart data={chartData} />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map((sub) => (
            <SubscriptionCard
              key={sub._id}
              subscription={sub}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No subscriptions found.</p>
        )}
      </div>

      {isAdding && (
        <AddSubscription onClose={() => setAdding(false)} onAdd={handleAdd} />
      )}
    </div>
  );
};

export default Dashboard;
