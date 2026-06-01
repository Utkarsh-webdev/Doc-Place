import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // For testing
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Navigation */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink to="/">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 group">
              <p
                className={
                  isActive ? "text-black" : "text-gray-600 hover:text-black"
                }
              >
                HOME
              </p>

              <div
                className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/doctors">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 group">
              <p
                className={
                  isActive ? "text-black" : "text-gray-600 hover:text-black"
                }
              >
                ALL DOCTORS
              </p>

              <div
                className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/about">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 group">
              <p
                className={
                  isActive ? "text-black" : "text-gray-600 hover:text-black"
                }
              >
                ABOUT
              </p>

              <div
                className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/contact">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 group">
              <p
                className={
                  isActive ? "text-black" : "text-gray-600 hover:text-black"
                }
              >
                CONTACT
              </p>

              <div
                className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </div>
          )}
        </NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="Profile"
              />

              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="Dropdown"
              />
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 top-8 pt-4 hidden group-hover:block z-20">
              <div className="min-w-48 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col gap-3 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:text-blue-500"
                >
                  My Profile
                </p>

                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer hover:text-blue-500"
                >
                  My Appointments
                </p>

                <p
                  onClick={() => setToken(false)}
                  className="cursor-pointer hover:text-red-500"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;