import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5500/api/v1/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const jsonRes = await res.json();

      if (!res.ok) {
        alert(jsonRes.message || "Sign in failed");
        return;
      }
      console.log("User", JSON.stringify(jsonRes.user));

      localStorage.setItem("token", jsonRes.data.token);
      localStorage.setItem("user", JSON.stringify(jsonRes.data.user));

      console.log("SignIn response:", jsonRes);
      console.log("Local Storage User: ", localStorage.getItem("user"));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-indigo-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded transition"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignIn;
