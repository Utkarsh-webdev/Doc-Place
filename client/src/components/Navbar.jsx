import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-between py-4 mb-5 border-b border-gray-200 bg-white sticky top-0 z-50">
        
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="w-44 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <NavLink to="/">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-1 group">
                <p className={isActive ? "text-black" : "text-gray-600 hover:text-black"}>
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
                <p className={isActive ? "text-black" : "text-gray-600 hover:text-black"}>
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
                <p className={isActive ? "text-black" : "text-gray-600 hover:text-black"}>
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
                <p className={isActive ? "text-black" : "text-gray-600 hover:text-black"}>
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
            <div className="relative group hidden md:block">
              <div className="flex items-center gap-2 cursor-pointer">
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
                    onClick={logout}
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
              className="hidden md:block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 overflow-hidden ${
          showMenu ? "w-full" : "w-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img src={assets.logo} className="w-36" alt="Logo" />

          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-7 cursor-pointer"
            alt="Close"
          />
        </div>

        <ul className="flex flex-col gap-2 px-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            HOME
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            ALL DOCTORS
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/about">
            ABOUT
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            CONTACT
          </NavLink>

          {token && (
            <>
              <hr className="my-2" />

              <NavLink
                onClick={() => setShowMenu(false)}
                to="/my-profile"
              >
                My Profile
              </NavLink>

              <NavLink
                onClick={() => setShowMenu(false)}
                to="/my-appointments"
              >
                My Appointments
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;