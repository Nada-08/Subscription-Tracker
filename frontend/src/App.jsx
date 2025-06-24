import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  console.log("app is rendering");

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white scroll-smooth">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
