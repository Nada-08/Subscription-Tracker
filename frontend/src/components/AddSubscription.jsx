import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const AddSubscription = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    renewalDate: "",
    frequency: "",
    status: "",
    category: "",
    paymentMethod: "",
    currency: "",
  });
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Conditional validation
    if (!formData.name || !formData.price || !formData.currency) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!formData.renewalDate && !formData.frequency) {
      setError("Either Renewal Date or Frequency must be provided.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
      };

      const res = await axios.post(
        `http://localhost:5500/api/v1/subscriptions`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 201) {
        onAdd(res.data.data);
        onClose();
      } else {
        setError("Failed to update subscription");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding subscription.");
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
          Add Subscription
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
            <option value="currency">Currency</option>
            <option value="EGP">EGP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div className="flex gap-3 mb-3">
          <div className="w-1/2">
            <label className="block text-sm text-gray-300 mb-1">
              From (Start Date)
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm text-gray-300 mb-1">
              To (Renewal Date)
            </label>
            <input
              type="date"
              name="renewalDate"
              value={formData.renewalDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
        </div>

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
          <option value="status">Status</option>
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
          <option value="category">Category</option>
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
          <option value="paymentMethod">Payment Method</option>
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

export default AddSubscription;
