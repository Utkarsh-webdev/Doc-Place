import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  const specialities = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  useEffect(() => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) =>
            doc.speciality.toLowerCase() ===
            speciality.toLowerCase()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="py-10">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Find Your Doctor
        </h1>

        <p className="text-gray-500 mt-2">
          Browse through our trusted specialists and book an appointment.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex flex-wrap lg:flex-col gap-3">
          {specialities.map((item) => (
            <button
              key={item}
              onClick={() =>
                speciality === item
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item}`)
              }
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 text-left
                ${
                  speciality === item
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="flex-1">
          {filterDoc.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-gray-700">
                No Doctors Found
              </h2>
              <p className="text-gray-500 mt-2">
                Try selecting another speciality.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterDoc.map((doctor) => (
                <div
                  key={doctor._id}
                  onClick={() =>
                    navigate(`/appointment/${doctor._id}`)
                  }
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-blue-50 overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Available
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800">
                      {doctor.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {doctor.speciality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;