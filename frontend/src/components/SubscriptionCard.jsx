import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import EditSubscription from "./EditSubscription"; // import your edit component

const SubscriptionCard = ({ subscription, onUpdate, onDelete }) => {
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setEditing] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded-lg relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={() => setEditing(true)}
          className="bg-white text-black rounded-full p-1 hover:bg-yellow-400 hover:text-white transition"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(subscription)}
          className="bg-white text-black rounded-full p-1 hover:bg-red-500 hover:text-white transition"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <h3 className="text-lg font-bold">{subscription.name}</h3>
      <p className="text-sm text-gray-400 space-y-1">
        <span className="block">Amount: {subscription.price}</span>
        <span className="block">
          Next renewal: {new Date(subscription.renewalDate).toLocaleDateString()}
        </span>

        {showMore && (
          <>
            <span className="block">Frequency: {subscription.frequency}</span>
            <span className="block">Status: {subscription.status}</span>
            <span className="block">Category: {subscription.category}</span>
            <span className="block">
              Payment Method: {subscription.paymentMethod}
            </span>
          </>
        )}
      </p>

      <button
        className="mt-2 text-sm text-amber-400 hover:underline focus:outline-none"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>

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
    </div>
  );
};

export default SubscriptionCard;
