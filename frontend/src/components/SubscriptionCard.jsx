import React, { useRef, useState, useEffect } from "react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import EditSubscription from "./EditSubscription";
import DeleteSubscription from "./DeleteSubscription";
import SpotlightCard from "./SpotlightCard";

const SubscriptionCard = ({ subscription, onUpdate, onDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };

    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDetails]);

  return (
    <>
      {/* Main card preview */}
      <SpotlightCard
        className="bg-gray-800 p-4 rounded-lg relative cursor-pointer hover:ring-2 hover:ring-transparent transition"
        onClick={() => setShowDetails(true)}
      >
        <div className="absolute top-2 right-2 flex space-x-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent opening modal
              setEditing(true);
            }}
            className="text-gray-400 hover:text-yellow-400 transition"
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <DeleteSubscription
            subscriptionId={subscription._id}
            onDelete={(id) => {
              onDelete(id);
            }}
            iconOnly
            stopPropagation
          />
        </div>
        <div
          // className="bg-gray-800 p-4 rounded-lg relative cursor-pointer hover:ring-2 hover:ring-yellow-400 transition"
          onClick={() => setShowDetails(true)}
        >
          <h3 className="text-lg font-bold">{subscription.name}</h3>
          <p className="text-sm text-gray-400 space-y-1">
            <span className="block">Amount: {subscription.price}</span>
            <span className="block">
              Next renewal:{" "}
              {new Date(subscription.renewalDate).toLocaleDateString()}
            </span>
          </p>
        </div>
      </SpotlightCard>

      {/* Expanded details modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-900 p-6 rounded-lg w-full max-w-md text-white relative shadow-lg"
          >
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">{subscription.name}</h2>

            <div className="space-y-2 text-sm text-gray-300">
              <p>Amount: {subscription.price}</p>
              <p>
                Renewal Date:{" "}
                {new Date(subscription.renewalDate).toLocaleDateString()}
              </p>
              <p>Frequency: {subscription.frequency}</p>
              <p>Status: {subscription.status}</p>
              <p>Category: {subscription.category}</p>
              <p>Payment Method: {subscription.paymentMethod}</p>
              <p>
                Start Date:{" "}
                {new Date(subscription.startDate).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setEditing(true);
                  setShowDetails(false);
                }}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                <PencilSquareIcon className="h-5 w-5 inline" /> Edit
              </button>
              <DeleteSubscription
                subscriptionId={subscription._id}
                onDelete={(id) => {
                  setShowDetails(false);
                  onDelete(id);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Inline Edit Form */}
      {isEditing && (
        <EditSubscription
          subscription={subscription}
          onClose={() => setEditing(false)}
          onUpdate={(updatedSub) => {
            onUpdate(updatedSub);
            setEditing(false);
          }}
        />
      )}
    </>
  );
};

export default SubscriptionCard;
