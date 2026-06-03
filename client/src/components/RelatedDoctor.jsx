import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctor = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) =>
          doc.speciality === speciality &&
          doc._id !== docId
      );

      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900">
      <h1 className="text-3xl font-bold">
        Related Doctors
      </h1>

      <p className="sm:w-1/3 text-center text-sm text-gray-500">
        Simply browse through our extensive list of trusted doctors and
        book your appointment with ease.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {relDoc.slice(0, 4).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white shadow-sm hover:shadow-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover bg-blue-50"
            />

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>

              <h2 className="text-lg font-semibold mt-2 text-gray-800">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/doctors")}
        className="mt-8 px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        View All Doctors
      </button>
    </div>
  );
};

export default RelatedDoctor;