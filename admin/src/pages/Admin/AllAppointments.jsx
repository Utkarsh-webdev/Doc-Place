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
    <div className="w-full p-6 bg-[#FAFBFC] min-h-screen">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Appointments
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all appointments
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {/* Appointment List */}
        <div className="max-h-[80vh] overflow-y-auto">

          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={item._id}
                className="group flex flex-wrap md:grid md:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Index */}
                <p className="hidden md:block text-gray-500">
                  {index + 1}
                </p>

                {/* Patient */}
                <div>
                  <p className="font-medium text-gray-800">
                    {item.userData?.name || "Unknown"}
                  </p>
                </div>

                {/* Age */}
                <p className="text-gray-700">
                  {item.userData?.dob
                    ? calculateAge(item.userData.dob)
                    : "N/A"}
                </p>

                {/* Date */}
                <div>
                  <p className="text-gray-800">
                    {item.slotDate
                      ? slotDateFormat(item.slotDate)
                      : "N/A"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {item.slotTime}
                  </p>
                </div>

                {/* Doctor */}
                <div className="flex items-center gap-3">

                  <img
                    src={item.docData?.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      Dr. {item.docData?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.docData?.speciality}
                    </p>
                  </div>

                </div>

                {/* Fees */}
                <p className="font-medium text-[#5F6FFF]">
                  {currency}
                  {item.amount}
                </p>

                {/* Status / Action */}
                <div className="relative flex items-center">

                  {item.cancelled ? (
                    <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600">
                      Cancelled
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          item.payment
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {item.payment
                          ? "Paid"
                          : "Pending"}
                      </span>

                      <button
                        onClick={() =>
                          cancelAppointment(item._id)
                        }
                        className="absolute hidden group-hover:block left-0 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-gray-500">
              No Appointments Found
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AllAppointment;