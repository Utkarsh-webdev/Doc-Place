import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full bg-[#FAFBFC] min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, Doctor 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Earnings */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#5F6FFF] transition-all">
          <div className="flex items-center gap-4">

            <div className="bg-[#F5F7FF] p-3 rounded-lg">
              <img
                src={assets.earning_icon}
                alt=""
                className="w-8"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-800">
                ₹{dashData.earnings}
              </p>
              <p className="text-sm text-gray-500">
                Earnings
              </p>
            </div>

          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#5F6FFF] transition-all">
          <div className="flex items-center gap-4">

            <div className="bg-[#F5F7FF] p-3 rounded-lg">
              <img
                src={assets.appointments_icon}
                alt=""
                className="w-8"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-sm text-gray-500">
                Appointments
              </p>
            </div>

          </div>
        </div>

        {/* Patients */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#5F6FFF] transition-all">
          <div className="flex items-center gap-4">

            <div className="bg-[#F5F7FF] p-3 rounded-lg">
              <img
                src={assets.patients_icon}
                alt=""
                className="w-8"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-sm text-gray-500">
                Patients
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Latest Appointments */}
      <div className="bg-white border border-gray-100 rounded-xl mt-6">

        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <img
            src={assets.list_icon}
            alt=""
            className="w-5"
          />
          <p className="font-medium text-gray-700">
            Latest Appointments
          </p>
        </div>

        {dashData.latestAppointments?.length > 0 ? (
          dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">

                <img
                  src={
                    item.userData?.image ||
                    assets.profile_pic
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    {item.userData?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.slotDate}
                  </p>
                </div>

              </div>

              {item.cancelled ? (
                <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600">
                  Completed
                </span>
              ) : (
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                  Pending
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No appointments found
          </div>
        )}

      </div>

    </div>
  );
};

export default DoctorDashboard;