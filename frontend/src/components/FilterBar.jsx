import React, { useState } from "react";

const FilterBar = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [frequency, setFrequency] = useState("");
  const [upcomingIn, setUpcomingIn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ category, minCost, maxCost, frequency, upcomingIn });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white rounded-2xl p-4 mb-6 shadow-md grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        <option value="">All Categories</option>
        <option value="sports">Sports</option>
        <option value="news">News</option>
        <option value="entertainment">Entertainment</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="technology">Technology</option>
        <option value="finance">Finance</option>
        <option value="politics">Politics</option>
        <option value="other">Other</option>
      </select>

      <input
        type="number"
        placeholder="Min Cost"
        value={minCost}
        onChange={(e) => setMinCost(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <input
        type="number"
        placeholder="Max Cost"
        value={maxCost}
        onChange={(e) => setMaxCost(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        <option value="">All Frequencies</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <input
        type="number"
        placeholder="Upcoming in (days)"
        value={upcomingIn}
        onChange={(e) => setUpcomingIn(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <button
        type="submit"
        className="sm:col-span-2 md:col-span-3 lg:col-span-1 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-md py-2 px-4 transition"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterBar;
