import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-blue-600 rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden">
      
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-20">
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Book Appointment <br />
          with the Best Doctors
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white text-sm font-light">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Profiles"
          />

          <p>
            Simply browse through our extensive list of specialists,
            <br />
            and schedule your appointment today.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-700 text-sm font-medium hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <img
            className="w-3"
            src={assets.arrow_icon}
            alt="Arrow"
          />
        </a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex items-end justify-center">
        <img
          className="w-full max-w-md lg:max-w-lg"
          src={assets.header_img}
          alt="Doctors"
        />
      </div>

    </div>
  );
};

export default Header;