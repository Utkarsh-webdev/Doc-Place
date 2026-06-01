import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-blue-500 rounded-2xl px-6 sm:px-10 lg:px-14 my-20 overflow-hidden">
      
      {/* Left Side */}
      <div className="flex-1 py-12 sm:py-16 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Book Appointment
          <br />
          With 100+ Trusted Doctors
        </h2>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 w-fit bg-white text-gray-700 px-8 py-3 rounded-full font-medium hover:scale-105 transition-all"
        >
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-1 justify-end items-end">
        <img
          src={assets.appointment_img}
          alt="Doctor"
          className="max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;