import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "EGP"],
      default: "EGP",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired", "upcoming"],
      default: "active",
    },
    startDate: {
      type: Date,
    },
    renewalDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Helper to convert frequency to days
const frequencyToDays = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  yearly: 365,
};

// Pre-save hook
subscriptionSchema.pre("save", function (next) {
  const freqDays = frequencyToDays[this.frequency];

  // If only startDate exists, calculate renewalDate
  if (this.startDate && !this.renewalDate && freqDays) {
    const newDate = new Date(this.startDate);
    newDate.setDate(newDate.getDate() + freqDays);
    this.renewalDate = newDate;
  }

  // If only renewalDate exists, calculate startDate
  if (!this.startDate && this.renewalDate && freqDays) {
    const newDate = new Date(this.renewalDate);
    newDate.setDate(newDate.getDate() - freqDays);
    this.startDate = newDate;
  }

  // Set expired if renewalDate is in the past
  if (this.renewalDate && this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

// Custom schema-level validation: at least one of startDate or renewalDate
subscriptionSchema.path("renewalDate").validate(function () {
  return this.startDate || this.renewalDate;
}, "Either start date or renewal date must be provided");

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
