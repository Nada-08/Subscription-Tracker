import { useState } from "react";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import Spinner from "./Spinner";
import API_URL from "../../api";

const DeleteSubscription = ({ subscriptionId, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_URL}/api/v1/subscriptions/${subscriptionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include"
        }
      );

      onDelete(subscriptionId);
    } catch (error) {
      console.log(error);
      setError("Failed to delete");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-500 hover:text-red-600"
        // className="bg-white text-black rounded-full p-1 hover:bg-red-500 hover:text-white transition"
        title="Delete"
        disabled={loading}
      >
        {loading ? <Spinner /> : <TrashIcon className="h-5 w-5" />}
      </button>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this subscription?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default DeleteSubscription;
