import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";

const Dashboard = () => {
  const { aToken, dashData, getDashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500 text-lg">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-[#F8F9FD] min-h-screen">

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <img
            src={assets.doctor_icon}
            alt=""
            className="w-14"
          />
          <div>
            <p className="text-3xl font-bold text-[#1F2937]">
              {dashData.doctors}
            </p>
            <p className="text-gray-500">
              Doctors
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <img
            src={assets.patients_icon}
            alt=""
            className="w-14"
          />
          <div>
            <p className="text-3xl font-bold text-[#1F2937]">
              {dashData.patients}
            </p>
            <p className="text-gray-500">
              Patients
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <img
            src={assets.appointments_icon}
            alt=""
            className="w-14"
          />
          <div>
            <p className="text-3xl font-bold text-[#1F2937]">
              {dashData.appointments}
            </p>
            <p className="text-gray-500">
              Appointments
            </p>
          </div>
        </div>

      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-2xl shadow-sm mt-8 overflow-hidden">

        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <img
            src={assets.list_icon}
            alt=""
            className="w-5"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Appointments
          </h2>
        </div>

        <div>
          {dashData.latestAppointment?.slice(0, 10).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">

                <img
                  src={
                    item.docData?.image ||
                    assets.profile_pic
                  }
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {item.userData?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.slotDate} • {item.slotTime}
                  </p>
                </div>

              </div>

              <div>
                {item.cancelled ? (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                    Cancelled
                  </span>
                ) : item.payment ? (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                    Paid
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
                    Pending
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;