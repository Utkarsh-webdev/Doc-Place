import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-bold">
        Find by Speciality
      </h1>

      <p className="sm:w-1/3 text-center text-sm text-gray-500">
        Simply browse through our extensive list of trusted specialists and
        schedule your appointment hassle-free.
      </p>

      <div className="w-full flex gap-6 pt-8 overflow-x-auto justify-start sm:justify-center scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link onClick={() => window.scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-14 md:w-16"
              />
            </div>

            <p className="mt-3 font-medium text-gray-700">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;