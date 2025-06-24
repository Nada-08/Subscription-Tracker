import React from "react";
import { motion } from "framer-motion";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded transition"
          >
            Sign Up
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
