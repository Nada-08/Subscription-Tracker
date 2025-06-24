import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EditSubscription = ({ subscription, onClose, onUpdate }) => {
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    name: subscription.name,
    price: subscription.price,
    renewalDate: formatDateForInput(subscription.renewalDate),
    frequency: subscription.frequency,
    status: subscription.status,
    category: subscription.category,
    paymentMethod: subscription.paymentMethod,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5500/api/v1/subscriptions/${subscription._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 200) {
        onUpdate(res.data.data);
        onClose();
      } else {
        setError("Failed to update subscription");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          {" "}
          Edit Subscription
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Subscription Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          required
          min="0"
          step="0.01"
        />

        <input
          type="date"
          name="renewalDate"
          placeholder="Next Renewal Date"
          value={formData.renewalDate}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          name="frequency"
          placeholder="Frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="paymentMethod"
          placeholder="Payment Method"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default EditSubscription;
