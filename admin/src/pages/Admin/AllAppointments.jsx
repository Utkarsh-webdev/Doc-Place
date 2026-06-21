import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointment = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
  } = useContext(AdminContext);

  const {
    calculateAge,
    slotDateFormat,
    currency,
  } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full m-5">
      <p className="mb-4 text-lg font-semibold text-gray-700">
        All Appointments
      </p>

      <div className="bg-white border rounded-lg overflow-hidden">

        {/* Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 text-gray-600 font-medium text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Data */}
        <div className="max-h-[80vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={item._id}
                className="group flex flex-wrap md:grid md:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center gap-4 py-3 px-6 border-b text-sm text-gray-600 hover:bg-gray-50 transition-all"
              >
                <p className="hidden md:block">
                  {index + 1}
                </p>

                {/* Patient */}
                <div>
                  <p className="font-medium text-gray-800">
                    {item.userData?.name || "Unknown"}
                  </p>
                </div>

                {/* Age */}
                <p>
                  {item.userData?.dob && calculateAge
                    ? calculateAge(item.userData.dob)
                    : "N/A"}
                </p>

                {/* Date */}
                <div>
                  <p>
                    {item.slotDate && slotDateFormat
                      ? slotDateFormat(item.slotDate)
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.slotTime}
                  </p>
                </div>

                {/* Doctor */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.docData?.image}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover bg-gray-100"
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      Dr. {item.docData?.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {item.docData?.speciality}
                    </p>
                  </div>
                </div>

                {/* Fees */}
                <p className="font-medium">
                  {currency}
                  {item.amount}
                </p>

                {/* Action */}
                <div className="relative flex justify-center">
                  {item.cancelled ? (
                    <span className="text-red-500 font-medium text-sm">
                      Cancelled
                    </span>
                  ) : (
                    <>
                      <span
                        className={`font-medium text-sm ${
                          item.payment
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {item.payment
                          ? "Paid"
                          : "Pending"}
                      </span>

                      <button
                        onClick={() =>
                          cancelAppointment(
                            item._id
                          )
                        }
                        className="absolute hidden group-hover:flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No Appointments Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointment;