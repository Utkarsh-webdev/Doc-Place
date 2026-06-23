import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashboard = () => {

  const {
    dToken,
    dashData,
    getDashData,
  } = useContext(DoctorContext);

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
    <div className="m-5">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl p-5 border flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
          <img
            src={assets.earning_icon}
            alt=""
            className="w-14"
          />
          <div>
            <p className="text-2xl font-bold">
              ₹{dashData.earnings}
            </p>
            <p className="text-gray-500">
              Earnings
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
          <img
            src={assets.appointments_icon}
            alt=""
            className="w-14"
          />
          <div>
            <p className="text-2xl font-bold">
              {dashData.appointments}
            </p>
            <p className="text-gray-500">
              Appointments
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
          <img
            src={assets.patients_icon}
            alt=""
            className="w-14"
          />
          <div>
            <p className="text-2xl font-bold">
              {dashData.patients}
            </p>
            <p className="text-gray-500">
              Patients
            </p>
          </div>
        </div>

      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-xl border mt-8 overflow-hidden">

        <div className="flex items-center gap-3 px-5 py-4 border-b bg-gray-50">
          <img
            src={assets.list_icon}
            alt=""
            className="w-5"
          />
          <p className="font-semibold">
            Latest Appointments
          </p>
        </div>

        {dashData.latestAppointments?.map(
          (item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-4 border-b hover:bg-gray-50"
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
                  <p className="font-medium">
                    {item.userData?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.slotDate}
                  </p>
                </div>

              </div>

              {item.cancelled ? (
                <span className="text-red-500 text-sm">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="text-green-500 text-sm">
                  Completed
                </span>
              ) : (
                <span className="text-blue-500 text-sm">
                  Pending
                </span>
              )}
            </div>
          )
        )}

      </div>

    </div>
  );
};

export default DoctorDashboard;