import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddUser from "./pages/AddUser.jsx";
import { Toaster } from "react-hot-toast";
import AllUsers from "./pages/AllUsers.jsx";

const App = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white scroll-smooth">
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users" element={<AllUsers />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
