import React from "react";
import TextPressure from "./TextPressure";
import { Link } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow">
      <div className="w-fit max-w-full">
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          <TextPressure text="SubTrackt" spinDuration={30} onHover="speedUp" />
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        {isAuthenticated && (
          <>
            {isAdmin && (
              <>
                <Link
                  to="/add-user"
                  className=" text-white hover:text-gray-300"
                >
                  Add User
                </Link>
                <Link to="/users" className="hover:text-gray-300">
                  All Users
                </Link>
                <Link to="/subscriptions" className="hover:text-gray-300">
                  All Subscriptions
                </Link>
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-amber-400 px-3 py-1 rounded hover:bg-amber-500"
            >
              Sign Out
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
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
