import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments = [],
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full p-6 bg-[#FAFBFC] min-h-screen">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Appointments
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all patient appointments
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No Appointments Found
          </div>
        )}

        {/* Appointment List */}
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between gap-4 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            {/* Number */}
            <p className="text-gray-600">
              {index + 1}
            </p>

            {/* Patient */}
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={item.userData?.image || assets.profile_pic}
                alt=""
              />

              <div>
                <p className="font-medium text-gray-800">
                  {item.userData?.name}
                </p>
              </div>
            </div>

            {/* Payment */}
            <div>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.payment
                    ? "bg-green-50 text-green-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {item.payment ? "Online" : "Cash"}
              </span>
            </div>

            {/* Age */}
            <p className="text-gray-700">
              {item.userData?.dob
                ? calculateAge(item.userData.dob)
                : "N/A"}
            </p>

            {/* Date & Time */}
            <div>
              <p className="text-gray-800">
                {item.slotDate}
              </p>
              <p className="text-xs text-gray-500">
                {item.slotTime}
              </p>
            </div>

            {/* Fees */}
            <p className="font-medium text-[#5F6FFF]">
              ₹{item.amount}
            </p>

            {/* Status / Action */}
            <div>
              {item.cancelled ? (
                <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600">
                  Completed
                </span>
              ) : (
                <div className="flex items-center gap-2">

                  <button
                    onClick={() =>
                      cancelAppointment(item._id)
                    }
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <img
                      className="w-5 h-5"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  </button>

                  <button
                    onClick={() =>
                      completeAppointment(item._id)
                    }
                    className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <img
                      className="w-5 h-5"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </button>

                </div>
              )}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default DoctorAppointments;