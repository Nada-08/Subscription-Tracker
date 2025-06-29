import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import API_URL from "../../api";

const EditSubscription = ({ subscription, onClose, onUpdate }) => {
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const [formData, setFormData] = useState({
    name: subscription.name,
    price: subscription.price,
    renewalDate: formatDateForInput(subscription.renewalDate),
    frequency: subscription.frequency,
    status: subscription.status,
    category: subscription.category,
    paymentMethod: subscription.paymentMethod,
    currency: subscription.currency || "EGP",
    startDate: subscription.startDate,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getChangedFields = (original, updated) => {
    const changed = {};

    for (let key in updated) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      const isDateField = key === "renewalDate" || key === "startDate";

      const isDifferent = isDateField
        ? new Date(originalValue).toISOString().slice(0, 10) !==
          new Date(updatedValue).toISOString().slice(0, 10)
        : originalValue !== updatedValue;
      if (isDifferent) {
        changed[key] = isDateField ? new Date(updatedValue) : updatedValue;
      }
    }
    return changed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const payload = getChangedFields(subscription, formData);

      console.log("Payload", payload);

      if (Object.keys(payload).length === 0) {
        setError("No changes detected.");
        setLoading(false);
        return;
      }

      const res = await axios.put(
        `${API_URL}/api/v1/subscriptions/${subscription._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include"
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
      className="fixed inset-0 bg-black/25 backdrop-blur-[1px] flex items-center justify-center z-50"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        ref={modalRef}
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

        <div className="flex gap-3 mb-3">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-2/3 p-2 rounded bg-gray-700 text-white"
            required
            min="0"
            step="0.01"
          />

          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-1/3 p-2 rounded bg-gray-700 text-white"
          >
            <option value="EGP">EGP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <input
          type="date"
          name="renewalDate"
          placeholder="Next Renewal Date"
          value={formData.renewalDate}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          required
        />

        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Select Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <select
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        >
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
          <option value="expired">Expired</option>
          <option value="upcoming">Upcoming</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        >
          {[
            "sports",
            "news",
            "entertainment",
            "lifestyle",
            "technology",
            "finance",
            "politics",
            "other",
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        >
          {["Credit Card", "PayPal", "Bank Transfer", "Cash"].map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>

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
