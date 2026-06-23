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
    <div className="w-full max-w-6xl m-5">

      <p className="mb-3 text-lg font-medium">
        All Appointments
      </p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">

        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] py-3 px-6 border-b font-medium text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* No Appointments */}
        {appointments.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No Appointments Found
          </div>
        )}

        {/* Appointments */}
        {appointments.map((item, index) => (
          <div
            key={item._id || index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50"
          >

            <p>{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={item.userData?.image || assets.profile_pic}
                alt=""
              />
              <p>{item.userData?.name}</p>
            </div>

            {/* Payment */}
            <p
              className={`text-xs inline border px-2 py-1 rounded-full w-fit ${
                item.payment
                  ? "border-green-500 text-green-600"
                  : "border-red-500 text-red-600"
              }`}
            >
              {item.payment ? "Online" : "Cash"}
            </p>

            {/* Age */}
            <p>
              {item.userData?.dob
                ? calculateAge(item.userData.dob)
                : "N/A"}
            </p>

            {/* Date */}
            <p>
              {item.slotDate}, {item.slotTime}
            </p>

            {/* Fees */}
            <p>₹{item.amount}</p>

            {/* Action */}
            <div>
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-medium">
                  Cancelled
                </p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">
                  Completed
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    onClick={() =>
                      cancelAppointment(item._id)
                    }
                    className="w-8 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />

                  <img
                    onClick={() =>
                      completeAppointment(item._id)
                    }
                    className="w-8 cursor-pointer"
                    src={assets.tick_icon}
                    alt=""
                  />
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