import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";
import Subscription from "../models/subscription.model.js";

// for admins only
export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      method: "POST",
      body: {
        subscriptionId: subscription._id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({ success: true, data: subscription, workflowRunId });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const id = req.params.id;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found." });
    }

    Object.assign(subscription, req.body);
    const updatedSubscription = await subscription.save();

    if (req.body.renewalDate || req.body.frequency) {
      await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        method: "POST",
        body: {
          subscriptionId: subscription._id,
        },
        headers: {
          "content-type": "application/json",
        },
        retries: 0,
      });
    }

    res.status(200).json({ success: true, data: updatedSubscription });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const id = req.params.id;

    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found." });
    }

    await Subscription.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Subcription deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id && req.user.role != "admin") {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const id = req.params.id;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(id, {
      status: "cancelled",
    });

    res.status(200).json({ success: true, data: updatedSubscription });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const today = new Date();

    const query = { renewalDate: { $gt: today } };

    if (req.user.role != "admin") {
      query.user = req.user._id;
    }

    const subscriptions = await Subscription.find(query);

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getFilteredUserSubscriptions = async (req, res, next) => {
  const user = req.user.id;

  if (req.user.id != req.params.id && req.user.role != "admin") {
    const error = new Error("You are not the owner of this account");
    error.status = 401;
    throw error;
  }

  const { category, minCost, maxCost, frequency, upcomingIn } = req.query;

  const query = { user };

  if (category) {
    query.category = category;
  }

  if (minCost || maxCost) {
    query.price = {};
    if (minCost) query.price.$gte = Number(minCost);
    if (maxCost) query.price.$lte = Number(maxCost);
  }

  if (frequency) {
    query.frequency = frequency;
  }

  if (upcomingIn) {
    const now = new Date();
    const limit = new Date();
    limit.setDate(now.getDate() + Number(upcomingIn));
    query.renewalDate = { $lte: limit };
  }

  try {
    const subscriptions = await Subscription.find(query);
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
