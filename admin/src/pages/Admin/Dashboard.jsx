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

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const [day, month, year] = dateString.split("_");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  if (!dashData) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-[#FAFBFC] min-h-screen">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Overview of doctors, patients and appointments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        <div className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#5F6FFF] transition-all">
          <div className="flex items-center gap-4">

            <div className="bg-[#F5F7FF] p-3 rounded-lg">
              <img
                src={assets.doctor_icon}
                alt=""
                className="w-8"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.doctors}
              </p>

              <p className="text-sm text-gray-500">
                Doctors
              </p>
            </div>

          </div>
        </div>

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

      </div>

      {/* Latest Appointments */}
      <div className="bg-white border border-gray-100 rounded-xl mt-6 overflow-hidden">

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

        {dashData.latestAppointment?.length > 0 ? (

          dashData.latestAppointment
            .slice(0, 10)
            .map((item, index) => (

              <div
                key={index}
                className="flex items-center justify-between px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={
                      item.userData?.image &&
                      item.userData.image !== ""
                        ? item.userData.image
                        : assets.profile_pic
                    }
                    alt=""
                    className="w-12 h-12 min-w-[48px] rounded-full object-cover border border-gray-200"
                  />

                  <div>

                    <p className="font-medium text-gray-800">
                      {item.userData?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {formatDate(item.slotDate)}
                    </p>

                  </div>

                </div>

                {item.cancelled ? (
                  <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600">
                    Cancelled
                  </span>
                ) : item.payment ? (
                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600">
                    Paid
                  </span>
                ) : (
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-600">
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

export default Dashboard;