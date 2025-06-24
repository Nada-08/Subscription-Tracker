import React from "react";
import TextPressure from "./TextPressure";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/sign-in");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow">
      <Link to="/" >
      {/* className="text-white text-xl font-bold" */}
       <TextPressure text="SubTracker" spinDuration={30} onHover="speedUp"/>
      </Link>

      <div className="flex gap-6 items-center">
        {isAuthenticated && (
          <>
            {/* <Link to="/dashboard" className="hover:text-gray-300">
              My Subscriptions
            </Link>

            <Link to="/upcoming-renewals" className="hover:text-gray-300">
              Upcoming Renewals
            </Link> */}
            <button
              onClick={handleLogout}
              className="bg-amber-500 px-3 py-1 rounded hover:bg-amber-600"
            >
              Sign Out
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
            {" "}
            <Link to="/sign-in" className="hover:text-gray-300">
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-amber-500 px-3 py-1 rounded hover:bg-amber-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
